function setNameQuanityCostToDom(name, quantity, cost) {
    $('#product_name').text(`Prodcut Name: ${name}`);
    $('#order_quantity').text(`Order Quantity: ${quantity}`);
    $('#order_cost').text(`Order Total: $${cost}`);
}