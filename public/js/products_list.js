// Using jQuery function to retrieve and render the Product List page
$(function () {
  // jQuery used to "download" the data from our product table
  // then dynamically display this content 


  let Product = 0;
  let newStockQuantity = 0;
  // use this object to build the row of updated data being passed to the put function to update inventory
  let test = {};

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
      .then(function (productList) {
        renderList('#productList', productList);
        // renderSelect('#inputProductName', inputProductName);
      });
  }

  // Render data to the page
  render();






  // Gathing user input from select boxes
  const getData = function (event) {
    event.preventDefault();

    // Save the user input for 'Product ID', 'Product Name' and 'Quantity' 
    Product = $('#inputProductId').find(':selected').data('id');
    let ProductName = $('#inputProductId').val().trim();
    let Quantity = parseInt($('#inputQuantity').val().trim());

    //log collected user data to console
    console.log(`User selected Product Id: ${Product}`);
    console.log(`User selected Product Name: ${ProductName}`);
    console.log(`User selected Quantity: ${Quantity}`);




    // find user selected product by id get request
    // you will use the let product (is actual product id.)
    // then pull in the item data from database and set to value of a variable.
    const getById = function (Product) {
      // get one Product from the table with the id.
      $.ajax({
        url: `/api/products/${Product}`,
        method: "GET"
      }).then(function (productCheck) {

        // console.log(productCheck);
        // console.log(productCheck[0].product_name);
        // console.log(output);
        checkInventory(productCheck);
      })
    }





    // function updateInventory(i) {
    //   if (i >= 0) {

    //       $.ajax({
    //           method: 'PUT',
    //           url: `/api/products/${inCartItems[i].id}`,
    //           data: inCartItems[i]
    //       }).then(function (data) {
    //           index = index - 1;
    //           updateItem(index);
    //       });
    //   }

    //   render();
    // }





    // Validating user input field values.  A Product must be chosen, and a valid number greater than 0 is required.
    let isValid = true;
    if (Quantity === parseInt(Quantity, 10) && Quantity > 0 && Product === parseInt(Product, 10))
      isValid = true;
    else
      isValid = false;



    // If data is valid process the order
    if (isValid === true) {
      const displayModal = function (data) {
        // Grab the order results for Product Name and Quantity and display them.
        // $('#product_name').text(`Prodcut Name: ${ProductName}`);
        // $('#order_quantity').text(`Order Quantity: ${Quantity}`);

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
        console.log(`\n Order cannot be completed!  There are only ${order[0].stock_quantity} ${order[0].product_name}'s in stock.\n`);
        $('#product_name').text(`Sorry, your oder cannot be completed!  There are only ${order[0].stock_quantity} ${order[0].product_name}'s in stock.`);
        $('#order_quantity').text('');
        $('#order_cost').text('Please update your order and try again.');



        // If inventory exists, update the database with the new product quantity and show the customer the total cost of their purchase.
        // Total Cost of Purchase = price of the procuct * quantity purchased.
      } else {
        console.log(`\n  Processing order... \n`);
        let totalCost = parseFloat((Quantity * order[0].price)).toFixed(2);
        console.log(totalCost);
        console.log(ProductName);
        $('#product_name').text(`Prodcut Name: ${ProductName}`);
        $('#order_quantity').text(`Order Quantity: ${Quantity}`);
        $('#order_cost').text(`Order Total: $${totalCost}`);

        order.newStockQuantity = order[0].stock_quantity - Quantity;
        newStockQuantity = order[0].stock_quantity - Quantity;
        console.log(order.newStockQuantity);
        //  order.orderCost = res[0].price * order.quantity;
        order.product_sales = order[0].product_sales + totalCost;
        console.log(order.product_sales);
        // updateInventory(order);
      }

    }

    getById(Product);
    console.log(`Product ${Product}`);
    // console.log(`!!!!!!!!!!!`, Product.department_name);
    // const output = $(Product.department_name);
    // console.log(output);
    // returnedID = 

    return Product;
      
  }

  // taking the product ID (${Product}) and passing it to the update/PUT route in order to update
  // the (stock_quantity:) of the ordered product.
  const updateInventory = function () {
    // update Product quantity in the table using the id.
    console.log(Product);
    console.log(`inside of inventory function`);
    console.log(newStockQuantity);
    $.ajax({
      url: `/api/products/${Product}`,
      method: "PUT", 
      data: newStockQuantity
      // newStockQuantity should become "test" or whatever I call the new object containing updated row data
      // https://stackoverflow.com/questions/13056810/how-to-implement-a-put-call-with-json-data-using-ajax-and-jquery/13056984
    }).then(function(data) {
      console.log(`Update Inventory:, ${Product}`);
     
      // Render data to the page
       render();
       // Show the modal
      //  $('#modal_thanks').modal('toggle');
      
      
      // const output = (productCheck[0].product_name);
      // console.log(productCheck);
      // console.log(productCheck[0].product_name);
      // console.log(output);
      // checkInventory(productCheck);
    })
  }




  $('#submit').on('click', getData);
  $('#order').on('click', updateInventory);
});














 // PUT Request
  // Replaces the reservation at the referenced id with the one provided
  // Responds with success: true or false if successful
  // app.put('/api/products/:id', function(req, res) {
  //   db.Reservation.update(
  //     req.body,
  //     { where: { id: req.params.id } }
  //   ).then(function() {
  //     res.json({ success: true });
  //   }).catch(function(error) {
  //     res.json({ error: error });
  //   });
  // });

















// *****************************************************************************************************
// *** Need code for processing order logic...  update inventory, update Model and then call rederlist ***
// *****************************************************************************************************

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

