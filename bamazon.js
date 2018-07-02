require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "bamazon",
});

connection.connect(function(err){
    if (err){
        console.log("error connecting: " + err.stack)
    }
    loadProducts();
});

var loadProducts = function(err){
    connection.query("SELECT * FROM products", function(err, res){
        console.table(res);

        promptCustomerforItem(res);
    });
}

var promptCustomerforItem = function(inventory){
    inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "Please type the Id number of the item you would like to choose",
            validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
        }
    ]).then(function(val){
        checkIfShouldExit(val.choice);
        var choiceId = parseInt(val.choice);
        var product = checkInventory(choiceId, inventory)

        if (product) {
            promptCustomerForQuantity(product);
        }
        else {
            console.log("If an item does not appear in our records, it does not exist");
            loadProducts();
        }
    });
}

var promptCustomerForQuantity = function(product){
    inquirer.prompt([
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy? Quit with Q",
            validate: function(val) {
                return val > 0 || val.toLowerCase() === "q";
            }
        }
    ]).then(function(val){
        checkIfShouldExit(val.quantity);
        var quantity = parseInt(val.quantity);
        if (quantity > product.stock_quantity) {
            console.log("Inconcievable number");
            loadProducts();
        }
        else {
            makePurchase(product, quantity);
        }
    });
}

var makePurchase = function(product, quantity){
    connection.query("UPDATE products SET stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res){
        console.log("Puchased " + quantity + " " + product.product_name + "'s\n\n\n");
        loadProducts();
    }
    );
}

var checkInventory = function(choiceId, inventory){
    for (var x = 0; x < inventory.length; x++){
        if (inventory[x].item_id === choiceId){
            return inventory[x];
        }
    }
    return null;
}

var checkIfShouldExit = function(choice){
    if (choice.toLowerCase() === "q"){
        console.log("Peace");
        process.exit(0);
    }
}