-- Makes it so all of the following code will affect bamazon DB --
USE bamazon;


CREATE TABLE product(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(6, 2) default 0,
  stock_quantity INT default 0,
  product_sales decimal(10,2) NOT NULL,
  createdAt DATE,
  updatedAt DATE,
  PRIMARY KEY (item_id)
);



-- Creates demo product data
INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales, createdAt, updatedAt)
VALUES ("Razor", "Appliances", 135.45, 10, 0.00, NOW(), NOW());

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales, createdAt, updatedAt)
VALUES ("Mixer", "Appliances", 215.55, 25, 0.00, NOW(), NOW());


INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales, createdAt, updatedAt)
VALUES ("Dryer", "Appliances", 475.99, 25, 0.00, NOW(), NOW());


INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales, createdAt, updatedAt)
VALUES ("Drill", "Automotive", 109.99, 50, 0.00, NOW(), NOW());


INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales, createdAt, updatedAt)
VALUES ("Watch", "Electronics", 215.50, 25, 0.00, NOW(), NOW());


INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales, createdAt, updatedAt)
VALUES ("4K TV", "Electronics", 999.99, 12, 0.00, NOW(), NOW());

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales, createdAt, updatedAt)
VALUES ("Radio", "Electronics", 185.25, 10, 0.00, NOW(), NOW());


INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales, createdAt, updatedAt)
VALUES ("Phone", "Electronics", 150.50, 3, 0.00, NOW(), NOW());

INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales, createdAt, updatedAt)
VALUES ("Grill", "Home&Garden", 115.99, 15, 0.00, NOW(), NOW());


INSERT INTO product (product_name, department_name, price, stock_quantity, product_sales, createdAt, updatedAt)
VALUES ("Couch", "Home&Garden", 875.25, 32, 0.00, NOW(), NOW());


SELECT * FROM product;




-- Example data (delete when done)
-- INSERT INTO Authors (name, createdAt, updatedAt) VALUES ('George', NOW(), NOW());
-- INSERT INTO Authors (name, createdAt, updatedAt) VALUES ('Ming', NOW(), NOW());
-- INSERT INTO Authors (name, createdAt, updatedAt) VALUES ('Joanna', NOW(), NOW());
-- INSERT INTO Authors (name, createdAt, updatedAt) VALUES ('Alfred', NOW(), NOW());