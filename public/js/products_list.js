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
      });
  }



  // Render our data to the page
  render();
});
