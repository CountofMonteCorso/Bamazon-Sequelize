
// apiRoutes.js file contains 3 routes:
//
// A GET route with url /api/list.  This will be used to display an HTML page of all possible employees
//
// A GET route with the url /api/employees. This will be used to display a JSON of all possible employees.
//
// A POST route with url /api/employees. This will be used to handle incoming survey 
// results. This route will also be used to handle the compatibility logic.

// Import in our db models
const db = require('../models');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  // API Requests for /api/products
  // Below code controls what happens when a request is made to /api/products

  // GET Request
  // Responds with all the current product infromation
  app.get('/api/products', function (req, res) {
    db.Products.findAll({}).then(function (rows) {
      // sending back to the paroduct data to the front end
      res.json(rows);
      console.log(req.method + " request");
      console.log(JSON.stringify(rows))
    }).catch(function (error) {
      res.json({ error: error });
    });
  });

    // GET Request
    // Responds with all the current product infromation for a single Product, by id.
  app.get('/api/products/:id', function(req, res){
    console.log(req.params);
    db.Products.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbProduct){
      res.json(dbProduct);
    }).catch(function(error){
      res.json(error);
    })
  })



   // Post Request
   // Replaces the Product information
  app.post('/api/products', function(req, res) {
    db.Products.create(req.body)
    .then(function(rows) {
      res.json(rows);
    })
  })




  // PUT Request
  // Replaces the Product information at the referenced id with the one provided
  app.put('/api/products/:id', function(req, res){
    console.log(req.body);
    // console.log(req.params.body);
    db.Products
    .update(req.body, {
        where: {
          id: req.params.id
        }
    })
    .then(function(dbProduct){
        console.log(`dbProduct: ${dbProduct}`);
        console.log(req.params.id);
        res.json({data: dbProduct});
    })
    .catch(function(err){
        console.log(err);
        console.log('there was an error updating database');
    })
  })

  
  // Get route for retrieving a single Product
  // app.get('/api/products/:id', function (req, res) {
  //   // Here we add an 'include' property to our options in our findOne query
  //   db.Products.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (dbProduct) {
  //     res.json(dbProduct);
  //   }).catch(function (error) {
  //     res.json({ error: error });
  //   });
  // });

  //  Something similar to this is needed to update the Product list with the new Quantity

  //  // PUT route for updating Products
  //  app.put('/api/products/:id', function(req, res) {
  //   db.Products.update(
  //     req.body,
  //     {
  //       where: {
  //         id: req.params.id
  //       }
  //   }).then(function(dbArticle) {
  //     res.json(dbArticle);
  //   }).catch(function(error) {
  //     res.json({ error: error });
  //   });
  // });

  // ... or like below...


  //   app.put('/api/products/update', function(req, res) {
  //     db.Products.update(req.body.item_id, function(result) {
  //       // MySQL update log to console
  //       console.log(result);
  //       res.redirect('/');
  //   });
  // });



  // don't need a post.
  // POST Request
  // Adds a new row to our table
  // Responds with success: true or false if successful
  // app.post('/api/reservations', function(req, res) {
  //   db.Products.create(req.body).then(function(rows) {
  //     res.json({ success: true });
  //   }).catch(function(error) {
  //     res.json({ error: error })
  //   })
}

