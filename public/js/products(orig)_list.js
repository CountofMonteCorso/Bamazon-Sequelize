// Using jQuery function to retrieve and render the Product List page
$(function() {
  // jQuery used to "download" the data from our product table
  // then dynamically display this content 

  const render = function () {
    // Run Query
    runListQuery(); 
  }

  const renderList = function (outputElement, dataList) {
    // Loop through and display each of the employees
      for (let i = 0; i < dataList.length; i++) {

        // Get a reference to the employee list element and populate with employee data
        const output = $(outputElement);

        // Then display the fields in the HTML (Section Name, Photo Link, Scores)
        const listItem = $("<li class='list-group-item mt-4'>");

        listItem.append(
          $("<h4 class=text-success>").text("Product Name: " + dataList[i].product_name),
          $("<hr>"),
          $("<h5>").text("Department: " + dataList[i].department_name),
          $("<h5>").text("Price: $" + dataList[i].price),
          $("<h5>").text("Quantity: " + dataList[i].stock_quantity)
       
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
