// Using jQuery function to retrieve and render the Product List page
$(function() {
  // jQuery used to "download" the data from our product table
  // then dynamically display this content 

  const render = function () {
    // Run Query
    runListQuery(); 
  }

  const renderList = function (outputElement, dataList) {
    // console.log(dataList);
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



  
  const runListQuery = function () {

    // The AJAX function uses the URL of API to GET the associated data  
    $.ajax({ url: "/api/products", method: "GET" })
      .then(function(productList) {
        renderList('#productList', productList);
        // renderSelect('#inputProductName', inputProductName);
      });
  }

  // Render data to the page
  render();
  
});



// const getById = function(Product) {
//   // get one from the database with the id.
//   $.ajax({
//     url: `/api/products/${Product}`,
//     method: "GET"
//   }).then(function(productCheck) {
//     console.log(productCheck);
//     console.log(productCheck[0].product_name);
//   })
// }


                                      //       const runListQuery = function () {

                                      //         // The AJAX function uses the URL of API to GET the associated data  
                                      //         $.ajax({ url: "/api/products", method: "GET" })
                                      //           .then(function(productList) {
                                      //             renderList('#productList', productList);
                                      //             // renderSelect('#inputProductName', inputProductName);
                                      //           });
                                      //       }
                                          
                                      //   }
                                      //       // Render data to the page
                                      //       checkInventory();
                                      // });
                                          
                                          


// Gathing user input from select boxes
const getData = function(event){
  event.preventDefault();

  // Save the user input for 'Product ID', 'Product Name' and 'Quantity' 
  let Product = $('#inputProductId').find(':selected').data('id');
  let ProductName = $('#inputProductId').val().trim();
  let Quantity = parseInt($('#inputQuantity').val().trim());

  //log collected user data
  console.log(`User selected Product Id: ${Product}`);
  console.log(`User selected Product Name: ${ProductName}`);
  console.log(`User selected Quantity: ${Quantity}`);
  // console.log(`Product: ${productList}`);
  
 
  // find user selected product by id get request
  // you will use the let product (is actual product id.)
  // then pull in the item data from database and set to value of a variable.
  // then use said variable to compare (for check inventory logic)


              //Can delete if this api call can stay outside of this function
              // const getById = function(Product) {
              //   // get one from the database with the id.
              //   $.ajax({
              //     url: `/api/products/${Product}`,
              //     method: "GET"
              //   }).then(function(productCheck) {
              //     console.log('Return from Product ID API call: ', productCheck);
              //     console.log(productCheck.department_name);
              //   })
              // }


  const getById = function(Product) {
    // get one from the database with the id.
    $.ajax({
      url: `/api/products/${Product}`,
      method: "GET"
    }).then(function(productCheck) {
      // const output = (productCheck[0].product_name);
      // // console.log(productCheck);
      // // console.log(productCheck[0].product_name);
      // console.log(output);
      checkInventory(productCheck);
    })
  }



  
// Validating user input field values.  A Product must be chosen, and a valid number greater than 0 is required.
  let isValid = true;
if (Quantity === parseInt(Quantity, 10) && Quantity > 0 && Product === parseInt(Product, 10))
  isValid = true;
else
  isValid = false;



// If data is valid process the order
if (isValid === true){  
  const displayModal = function(data) {
    
    // Grab the order results for Product Name and Quantity and display them.
    $('#product_name').text(`Prodcut Name: ${ProductName}`);
    $('#order_quantity').text(`Order Quantity: ${Quantity}`);
    $('#order_cost').text(`Order Total: ${totalCost}`);

    // Show the modal
    $('#modal_response').modal('toggle');
  }

  // clear user input form fields
  displayModal();
  $('#inputProductId').val('Choose...');
  $('#inputQuantity').val('');


  
  } else {
    // Display an error alert if the form is not valid, and a correct needs to be made.
    alert(`You have not chosen a Product or have entered an invalid Quantity!  Please correct and then click the "Add to Cart" button.`)
  }





  function checkInventory(order) {
    // Logging the product record returned from the getById request
     console.log(order);
   
   // Check available stock and notify customer if there is insufficient inventory.
   // order.quantity replaced with user unput order fielname.
     if (Quantity > order[0].stock_quantity) {
       console.log(`\n********************************************************************************\n`);
       console.log(`  Sorry, your oder cannot be completed!  There are only ${order[0].stock_quantity} ${order[0].product_name}'s in stock.\n`);
       console.log(`  Please update order within availalbe inventory or select another product.`);
       console.log(`\n********************************************************************************\n`);
 
     
   //           getInventory();
   
     // If inventory exists, update the database with the new product quantity and show the customer the total cost of their purchase.
     // Total Cost of Purchase = price of the procuct * quantity purchased.
     } else {
         console.log(`\n`);
         console.log(`  Processing your order...`);
         let totalCost = (Quantity * order[0].price);
         console.log(totalCost);
         
         // order.newStockQuantity = res[0].stock_quantity - order.quantity;
         // order.orderCost = res[0].price * order.quantity;
         // order.product_sales = res[0].product_sales + order.orderCost;
 
         // updateInventory(order);
     }
   //   });
   }
   
 
 
  getById(Product);
  console.log(Product);
  // console.log(`!!!!!!!!!!!`, Product.department_name);
  // const output = $(Product.department_name);
  // console.log(output);
  // returnedID = 



}



$('#submit').on('click', getData);
$('#order').on('click', updateInventory);



// *****************************************************************************************************
// *** Need code for processing order logic... valid inventory, total cost, update inventory, update Model and then call rederlist ***
// *****************************************************************************************************


// Once the customer has placed the order, application checks if there is enough of the product in inventory to meet the customer's request.
// If not, the app notifies the customer, and then prevents the order from going through.
// However, if store does have enough of the product, the customer's order is fulfilled.

// function checkInventory(order) {
//   var output = (order[0].stock_quantity);
//   console.log(output);
//   console.log(Quantity);

//   // Check if there is not enough in stock and notify customer if there is insufficient inventory.
//   // order.quantity replaced with user unput order fielname.
//   if (Quantity > order[0].stock_quantity) {
//     console.log(`\n********************************************************************************\n`);
//     console.log(`  Sorry, your oder cannot be completed!  There are only ${order[0].stock_quantity} ${order[0].product_name}'s in stock.\n`);
//     console.log(`  Please update order within availalbe inventory or select another product.`);
//     console.log(`\n********************************************************************************\n`);

//   }
// //           getInventory();

// //       // If inventory exists, update the database with the new product quantity and show the customer the total cost of their purchase.
// //       // Total Cost of Purchase = price of the procuct * quantity purchased.
// //       } else {
// //           console.log(`\n`);
// //           console.log(`  Processing your order...`);
// //           order.newStockQuantity = res[0].stock_quantity - order.quantity;
// //           order.orderCost = res[0].price * order.quantity;
// //           order.product_sales = res[0].product_sales + order.orderCost;

// //           // updateInventory(order);
// //       }
// //   });
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
      
//                       render();
//                   });
// }

// *******************************************
// *** Need code for finall update in modal  ***
// *******************************************

