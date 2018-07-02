CREATE DATABASE IF NOT EXISTS bamazon;
USE bamazon;
CREATE TABLE  IF NOT EXISTS products (
	item_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (item_id),
    product_name VARCHAR (30) NOT NULL,
	department_name VARCHAR (30) NOT NULL,
    price DOUBLE NOT NULL,
    stock_quantity INT(9) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Toothbrush', 'Hygiene', 2.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Keyboard', 'Electronics', 15.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Video Game', 'Electronics', 79.99, 10000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('iPhone', 'Electronics', 999.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Milk', 'Food', 3.99, 1000000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Captain Crunch', 'Food', 3.49, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Trading Cards', 'Entertainment', 1.99, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Home Decorations', 'Decor', 102.37, 999);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('College Education', 'Shit you dont need', 50000, 999999);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Imperial Cutter', 'Shit you definitely need', 208969451, 999999);

SELECT * FROM products;