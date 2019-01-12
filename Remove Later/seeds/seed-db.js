// Import Database Models
// =============================================================
const db = require('../models');

// Syncing our sequelize models 
// =============================================================
db.sequelize.sync().then(function() {
  db.product.bulkCreate([{
    product_name: 'Razor',
    department_name: 'Appliances',
    price: 135.45,
    stock_quantity: 10,
    product_sales: 0.00
  }, {
    product_name: '4K TV',
    department_name: 'Electronics',
    price: 1499.99,
    stock_quantity: 12,
    product_sales: 0.00
  }]).then(function(){
      console.log('Data successfully added!');
    }).catch(function(error) {
      console.log('Error', error)
    });
});







  //  //Import Database Models
  //  const db = require('../models');

  //  //Syncing our sequelize models
  // const items = [{
   
  //      product_name: "Monopoly",
  //      department_name: "Board Games",
  //      price: 25.50,
  //      stock_quantity: 45
  //  },
  //  {
  //      product_name: "Grand Theft Auto",
  //      department_name: "Video Games",
  //      price: 45.50,
  //      stock_quantity: 75
  //  },
  //  {
  //      product_name: "Fire TV Stick",
  //      department_name: "Technology",
  //      price: 39.99,
  //      stock_quantity: 145
  //  },
  //  {
  //      product_name: "Instant Pot",
  //      department_name: "Kitchen Appliances",
  //      price: 139.95,
  //      stock_quantity: 45
  //  },
  //  {
  //      product_name: "LifeStraw",
  //      department_name: "Ourdoors",
  //      price: 24.95,
  //      stock_quantity: 245
  //  },
  //  {
  //      product_name: "iRobot Roomba",
  //      department_name: "Home",
  //      price: 349.99,
  //      stock_quantity: 25
  //  },
  //  {
  //      product_name: "Echo Dot",
  //      department_name: "Home",
  //      price: 49.99,
  //      stock_quantity: 85
  //  },
  //  {
  //      product_name: "Noise-Canceling Headphones",
  //      department_name: "Technology",
  //      price: 198.50,
  //      stock_quantity: 45
  //  },
  //  {
  //      product_name: "External Batteries",
  //      department_name: "Technology",
  //      price: 29.50,
  //      stock_quantity: 245
  //  },
  //  {
  //      product_name: "Amazon Security Camera",
  //      department_name: "Technology",
  //      price: 125.50,
  //      stock_quantity: 45
  //  },
  //  {
  //      product_name: "Kindle",
  //      department_name: "Technology",
  //      price: 125.50,
  //      stock_quantity: 25
  //  },
  //  {
  //      product_name: "Electric Toothbrush",
  //      department_name: "Electronics",
  //      price: 25.50,
  //      stock_quantity: 45
  //  }
  //  ];
   
  //  db.sequelize.sync({force: true}).then(function () {
  //   db.Product.bulkCreate(items).then(function (data) {
  //      db.sequelize.close();
  //  }).catch(function (error) {
  //      db.sequelize.close();
  //  });
  //  });