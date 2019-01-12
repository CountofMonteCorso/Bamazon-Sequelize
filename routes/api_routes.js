
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
  app.get('/api/products', function(req, res) {
    db.Products.findAll({}).then(function(rows) {
      // sending back to the paroduct data to the front end
      res.json(rows);
      console.log(req.method + " request");
      console.log(JSON.stringify(rows))
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  


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



// // Importing employee data for use in routes 
// const employees = require('../data/employees.js');

// // Exporting routes
// module.exports = function (app) {
  
//   // Handles routing for HTML employee list page of all eomployees
//   app.get('/api/list', function(req, res) {
//     res.json(employees);
//   });

//   // Display JSON for all employees.
//   app.get('/api/employees', function(req, res) {
//     res.json(employees);
//     // log a user response to the console for the method being called and the body data
//     console.log(req.method + " request");
//     console.log(req.body);
//   });


//   // Handles incoming survey results and adds to the employee data. 
//   // This route also used to handle the compatibility logic.
//   app.post('/api/employees', function (req, res) {
//     // sending req data to console during developement
//     console.log(req.method + " request");
//     console.log(req.body);
   

//     // Defining object that will be used to hold the closed matched employee, as the employee list is looped through. 
//     const closestMatch = {
//       name: '',
//       photo: '',
//       employeeDifference: Infinity
//     };

//     // Parse result of the user's survey POST request
//     const userData = req.body;
//     const userScores = userData.scores;
//     // console.log('userData' + userData);
//     console.log('*** userScore(s) before parseint ****' + req.body.scores);


//     // variables used to calculate the absolute difference between the user's scores and the scores of
//     // each employee in the data file.  
//     let absoluteDifference
//     let totalDifference

//     // Looping through each of the employee possibilities in the employees data.
//     for (let i = 0; i < employees.length; i++) {
//       const currentEmployee = employees[i];
//       absoluteDifference = 0;
//       totalDifference = 0;

//       // Looping through all the scores for each employee
//       for (let j = 0; j < currentEmployee.scores.length; j++) {
//         const currentEmployeeScore = parseInt(currentEmployee.scores[j]);
//         const currentUserScore = parseInt(userScores[j]);
    

//         // First calculate the absolute difference between the user and employee scores
//         // Then update the total (or sum) of the differences.  Logging calculations to console
//         absoluteDifference = Math.abs((currentUserScore) - (currentEmployeeScore));
//         totalDifference += absoluteDifference; 
//         // sending score calculations to the console for development...
//         console.log(`${userData.name} Score: ${currentUserScore}`);
//         console.log(`${currentEmployee.name} Score: ${currentEmployeeScore}`);
//         console.log(`Abs Difference = ${parseInt(currentUserScore)} - ${parseInt(currentEmployeeScore)} = ${absoluteDifference}`)
//         console.log(`${userData.name} Total Difference: ${totalDifference}`);
//       }

//       // If the sum of differences is less then the differences of the current 'closest match'
//       if (totalDifference <= closestMatch.employeeDifference) {
//         // Reset the closestMatch to be the new employee.
//         closestMatch.name = currentEmployee.name;
//         closestMatch.photo = currentEmployee.photo;
//         closestMatch.employeeDifference = totalDifference;
//       }
//     }


//     // Looping through the User's scores and converting to integers before witing out to Employee file
//     for (let i = 0; i < userData.scores.length; i++) {
//       userScores[i] = parseInt(userData.scores[i]);
//     }
//     // used for testing output...
//     // console.log(`*** updating user scores to integer ****  ${userScores}`);


//     // Save the user's data to the employees data file. 
//     employees.push(userData);
//     console.log(`${userData.name}'s closest match is ${closestMatch.name}, with a difference of ${totalDifference}.`);
//     console.log("*** Form submit successful! ***");

    
//     // Return JSON with the user's closestMatch. This will be used by the HTML in the next page
//     res.json(closestMatch);
//   });
// };

