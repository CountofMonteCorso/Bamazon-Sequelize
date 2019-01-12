//  Using "Procuct instad of products from last assignment.  may need to find/replace on this.

// Product model field definition
module.exports = function(connection, Sequelize) {
    const Products = connection.define('Products', {

      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      department_name: {
        type: Sequelize.STRING,
        allowNull: false,
           validate: {
        notEmpty: true
      }
      },
      price: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
        defaultValue: '0.00'
      },
      stock_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true, 
        }
      },
      product_sales: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: '0.00'
      }
    });
  
    return Products;
  }

