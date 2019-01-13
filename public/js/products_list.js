// Using jQuery function to retrieve and render the Product List page
$(function() {
  // jQuery used to "download" the data from our product table
  // then dynamically display this content 

  const render = function () {
    // Run Query
    runListQuery(); 
  }

  const renderList = function (outputElement, dataList) {
    // Loop through and display each of the products
      for (let i = 0; i < dataList.length; i++) {

        // Get a reference to the product list element and populate with product data
        const output = $(outputElement);

        // Then display the fields in HTML 
        const listItem = $("<tr>");
   

        listItem.append(
          $("<th scope='row'>").text(dataList[i].id),
          $("<td>").text(dataList[i].product_name),
          $("<td>").text(dataList[i].department_name),
          $("<td>").text("$" + dataList[i].price),
          $("<td>").text(dataList[i].stock_quantity)
       
        );

        output.append(listItem);
      }  
  }




  // tring to get the select dropdown populated (remove)
  // const renderSelect = function (outputElement, dataList) {
  //   // Loop through and display each of the product names in the dropdown box
  //     for (let i = 0; i < dataList.length; i++) {

  //       // Get a reference to the product list element and populate with product id and name
  //       const output = $(outputElement);

  //       // Then display the fields in HTML 
  //       const productItem = $("<option>");
   

  //       listItem.append(
  //         $("<option>").text(dataList[i].id),
  //         $("<option>").text(dataList[i].product_name),
       
  //       );

  //       output.append(productItem);
  //     }  
  // }





  
  const runListQuery = function () {

    // The AJAX function uses the URL of API to GET the associated data  
    $.ajax({ url: "/api/products", method: "GET" })
      .then(function(productList) {
        renderList('#productList', productList);
        // renderSelect('#inputProductName', inputProductName);
      });
  }


  // tring to get the select dropdown populated (remove)
  // const runListQuery = function () {

  //   // The AJAX function uses the URL of API to GET the associated data  
  //   $.ajax({ url: "/api/products", method: "GET" })
  //     .then(function(inputProductName) {
  //       renderSelect('#inputProductName', inputProductName);
  //     });
  // }




  // Render data to the page
  render();
});


// **********************************************************
// *** Need code for gathing user input from select boxes ***
// ************************************************************


// const getArticles = function(){
//   $.get('/api/articles')
//   .then(function (data){
//     console.log(data);
//     render(data);
//   })
// }



// const postArticle = function(event){
//   event.preventDefault();

//   // Save the input in an object called 'article'
//   const article = {
//     Product: $('#inputProductName').val().trim(),
//     Quantity: $('#inputProductName').val().trim(),

//   }

//   // POST the article object to /api/articles
//   $.post('/api/articles', article)
//     .then(function(data) {

//       // After receiving a response, call getArticles
//       getArticles();

//       // Blank our inputs after POST
//       $('#article-title').val('');
//       $('#article-body').val('');
//     });

// }

// $('#submit').on('click', postArticle);







// The app prompts users with two messages.
// The first asks for the ID of the product they would like to buy.
// The second message asks how many units of the product they would like to buy.

function promptUser(list) {
  // console.log(list);
  // inquirer promt docs - https://www.npmjs.com/package/inquirer

  inquirer
      .prompt([
          {
              name: "item_id",
              type: "list",
              message: "Select the product you like to purchase: ",
              choices: list,
          },
          {
              name: "quantity",
              type: "input",
              message: "Enter how many units you want to buy: ",
              validate: function(value) {
                  if (isNaN(value) === false) {
                      return true;
                  }
                  return false;
              },
              filter: Number
          }
      ])
      .then(function(answer) {
          checkInventory(answer);
      });
}




// *****************************************************************************************************
// *** Need code for processing order logic... total cost, update inventory, and then call rederlist ***
// *****************************************************************************************************



// *******************************************
// *** Need code for update user in modal  ***
// *******************************************



// // Once the customer has placed the order, application checks if there is enough of the product in inventory to meet the customer's request.
// // If not, the app notifies the customer, and then prevents the order from going through.
// // However, if store does have enough of the product, the customer's order is fulfilled.

// function checkInventory(order) {
//   var query = "SELECT * FROM products WHERE ?";
//   connection.query(query, { item_id: order.item_id }, function(err, res) {
//       //console.log(res);
//       if (err) throw err;
//       //
//       // Check if there is enough in stock and notify customer if there is insufficient inventory.
//       if (order.quantity > res[0].stock_quantity) {
//           console.log(`\n********************************************************************************\n`);
//           console.log(`  Sorry, your oder cannot be completed!  There are only ${res[0].stock_quantity} ${res[0].product_name}'s in stock.\n`);
//           console.log(`  Please update order within availalbe inventory or select another product.`);
//           console.log(`\n********************************************************************************\n`);
//           getInventory();

//       // If inventory exists, update the database with the new product quantity and show the customer the total cost of their purchase.
//       // Total Cost of Purchase = price of the procuct * quantity purchased.
//       } else {
//           console.log(`\n`);
//           console.log(`  Processing your order...`);
//           order.newStockQuantity = res[0].stock_quantity - order.quantity;
//           order.orderCost = res[0].price * order.quantity;
//           order.product_sales = res[0].product_sales + order.orderCost;
//           updateInventory(order);
//       }
//   });
// }

// // Update the inventory information after sales

// function updateInventory(product) {
//   var query = "UPDATE products SET ? WHERE ?";
//   connection.query(query,
//                   [{
//                       stock_quantity: product.newStockQuantity,
//                       product_sales: product.product_sales,
//                   },
//                   {
//                        item_id: product.item_id
//                   }],
//                   function(err, res) {
//                       if (err) throw err;
//                       //console.log(res.affectedRows);
//                       console.log(`\n**********************************************\n`);
//                       console.log(`  Order Processed: Your total cost is \$${product.orderCost}`);
//                       console.log(`  Transaction completed! Thank you.`);
//                       console.log(`\n**********************************************\n`);
      
//                       getInventory();
//                   });
// }
