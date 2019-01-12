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




  // Render our data to the page
  render();
});




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