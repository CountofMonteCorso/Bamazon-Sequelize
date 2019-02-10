const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const db = require('./models');
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

// Setting up variable to make http requests
let request;

describe('GET /api/products', function () {
  // Before each test begins, create a new request server for testing
  // & delete all products from the db
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should find all products', function (done) {
    // Add some products to the db to test with
    db.Products.bulkCreate([
      { product_name: 'Radio', department_name: 'Electronics', price: '99.99', stock_quantity: 5 },
      { product_name: 'Battery', department_name: 'Automotive', price: '150.00', stock_quantity: 20 },
      { product_name: 'Grill', department_name: 'Home', price: '575.00', stock_quantity: 3 },
      { product_name: 'T-shirt', department_name: 'Clothing', price: '19.99', stock_quantity: 15 }

    ]).then(function () {
      // Request the route that returns all examples
      request.get('/api/products').end(function (err, res) {
        let responseStatus = res.status;
        let responseBody = res.body;

        // Run assertions on the response
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody).to.not.be.null;

        expect(responseBody)
          .to.be.an('array')
          .that.has.lengthOf(4);

        expect(responseBody[0])
          .to.be.an('object')
          .that.includes({ product_name: 'Radio', department_name: 'Electronics', price: '99.99', stock_quantity: 5 });

        expect(responseBody[1])
          .to.be.an('object')
          .that.includes({ product_name: 'Battery', department_name: 'Automotive', price: '150.00', stock_quantity: 20 });

        for (let i = 0; i < responseBody.length; i++) {
          expect(responseBody[i])
          .to.be.an('object')
          .that.does.not.includes({ product_name: 'TV', department_name: 'Electronics', price: '650.00', stock_quantity: 0 });
        }  
       
        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});




describe('POST /api/products', function () {
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should save a new product', function (done) {
    var reqBody = {
      product_name: "Couch",
      department_name: "Furniture",
      price: 1899.00,
      stock_quantity : 16,
      product_sales: 0.00
    };
    console.log(reqBody);

    // POST the request body to the server
    request
      .post('/api/products')
      .send(reqBody)
      .end(function (err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;
        console.log(`Response Status: ${responseStatus}`);
        
        // Run assertions on the response
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseStatus).to.not.equal(400);

        expect(responseBody).to.not.be.null;
        
        expect(responseBody)
          .to.be.an('object')
          .that.includes(reqBody);

        expect(responseBody).to.be.instanceof(Object);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});