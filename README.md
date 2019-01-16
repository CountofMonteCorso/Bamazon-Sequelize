# Bamazon-Sequelize
### Assignment #13 - Bamazon-Sequelize

"Bamazon" is a very poor man's Amazon storefront using Node.js, Sequelize and MySQL.  This app, deployed on Heroku, will display a list of available products and take customer orders.  Once the customer selects a product and quantity, the app will display total cost for the product(s) being ordered and then update the inventory. Product inventory is being stored in a MySQL database called `bamazon`.

Inside of the bamazon database there is a table called `products`, containing the following field definition...

     item_id INT NOT NULL AUTO_INCREMENT,
     product_name VARCHAR(50) NOT NULL,
     department_name VARCHAR(50) NOT NULL,
     price DECIMAL(6, 2) default 0,
     stock_quantity INT default 0,
     product_sales decimal(10,2) NOT NULL,
     PRIMARY KEY (item_id)

[Bamazon DB creation](Screen_caps/DBcreation.GIF)


### How to use Bamazon (as a Bamazon Customer):
Run Bamazon fro your browser:  https://bamazon-sequelize.herokuapp.com/

Click the Shop button to begin your shopping experience.  Select a product name from the dropdown product list, and the quantity you wish to order.  Then click submit.

   
   [Example: Product Selection](Screen_caps/select.GIF)


The app will process your order if there is enough product inventory, and provide you with a total order cost, as well as update the remaining inventory.
   
   [Example: Order Process with availalbe inventory](Screen_caps/addToCart.GIF)


 If there is insufficient product inventory, customer will be notified that the order cannot be processed.  
   
   [Example: Order Unable to Process. Insufficient inventory](Screen_caps/outOfStock.GIF)

_______________________________________________________________________________________________________


Updated Portfolio:
 [My Portfolio](https://smiotti.github.io/Bootstrap-Portfolio/)

