const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "bamazon",
});

connection.connect((error) => {
    if(error){
        console.log("error: " + error.stack);
    }
    products();
});

const products = (error) => {
    connection.query("SELECT * FROM products", (req, res) => {
        console.log("\n")
        console.table(res);
    });
    setTimeout(promptItems, 500)
}

const promptItems = (inv) => {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Please enter the ID of the item you would like to purchase",
        }
    ]).then((item)=>{
        if(item){
            promptAmount();
        }
        else{
            console.log("If an item does not appear in our records, it does not exist");
        }
    });
}

const promptAmount = (item, amount) => {
    inquirer.prompt([
        {
            name: "amount",
            type: "input",
            message: "How many would you like to buy?",
        }
    ]).then(()=> {
        purchase(item, amount);
    });
}

const purchase = (item, amount) => {
    connection.query("UPDATE products SET stock_quantity - ? WHERE item_id = ?",
    [amount, item],
    (req, res) => {
        console.log("\n")
        console.log("Thank you for your purchase");
        products();
    }
    )//end connection.query
}