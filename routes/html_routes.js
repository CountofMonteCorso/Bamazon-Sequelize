// *** Dependencies ***
// Including the path package to get the correct file path for our html

// requiring in the path package need for referening absolute paths used by the HTML files
const path = require('path');


// *** ROUTING ***
// A GET Route to /list which should display the Product List page to the ueser.
// A default, catch-all route that leads to index.html which displays the home page to the user.

module.exports = function(app) {
  

  // Setting up the route to serve up the product_list html file.
  app.get('/products', function(req, res) {
    res.sendFile(path.join(__dirname, '/../public/products_list.html'));
  });


  // If no matching route is found, goto homepage
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/../public/index.html'));
  });
};