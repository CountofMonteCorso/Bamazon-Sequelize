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



// Gathing user input from select boxes
const getData = function(event){
  event.preventDefault();

  // Save the user input for 'Product ID', 'Product Name' and 'Quantity' 
  let Product = $('#inputProductId').find(':selected').data('id');
  let ProductName = $('#inputProductId').val().trim();
  let Quantity = parseInt($('#inputQuantity').val().trim());

  //log collected uer data
  console.log(`Product Id: ${Product}`);
  console.log(`Product Name: ${ProductName}`);
  console.log(`Quantity: ${Quantity}`);

// Validating user input field values
  let isValid = true;
if (Quantity === parseInt(Quantity, 10) && Quantity > 0 && Product === parseInt(Product, 10))
  isValid = true;
else
  isValid = false;


if (isValid === true){  
  // temprority call Model to show user data captured
  const displayModal = function(data) {
    
    // Grab the result from the AJAX post so that the best match's name and photo are displayed.
    $('#product_name').text(`Prodcut Name: ${ProductName}`);
    $('#order_quantity').text(`Order Quantity: ${Quantity}`);

    // Show the modal with the best match
    $('#modal_response').modal('toggle');
  }

  displayModal();

  } else {
    // Display an error alert if the form is not valid, and a correct needs to be made.
    alert(`You have not chosen a Product or have entered an invalid Quantity!  Please correct and then click the "Add to Cart" button.`)

  }
}


$('#submit').on('click', getData);




// *****************************************************************************************************
// *** Need code for processing order logic... total cost, update inventory, and then call rederlist ***
// *****************************************************************************************************


// // Once the customer has placed the order, application checks if there is enough of the product in inventory to meet the customer's request.
// // If not, the app notifies the customer, and then prevents the order from going through.
// // However, if store does have enough of the product, the customer's order is fulfilled.

// function checkInventory(order) {
//   var query = "SELECT * FROM products WHERE ?";
//   connection.query(query, { item_id: order.item_id }, function(err, res) {
//       console.log(res);
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


// *******************************************
// *** Need code for finall update in modal  ***
// *******************************************

