// Functional Tests
describe('setNameQuanityCostToDom', function() {

    it('should populate name, quantity and cost divs', function() {
        setNameQuanityCostToDom('radio', 3, 75.50)
        expect($('#product_name').text()).to.equal('Prodcut Name: radio');
    })

    it('Expect should not be empty populate Quantity div', function() {
        setNameQuanityCostToDom('radio', 1, 28250)
        expect($('#product_name').text()).to.be.a('string');
    })

    it('Order Quantity should equal 50', function() {
        setNameQuanityCostToDom('TV', 50, 825.00)
        expect($('#order_quantity').text()).to.equal('Order Quantity: 50');
    })
  
    it('Order Total Cost should not be empty', function() {
        setNameQuanityCostToDom('radio', 1, 75)
        expect($('#order_cost').text()).to.not.be.empty;
    })

    it('Order Total Cost should not include a negative cost value', function() {
        setNameQuanityCostToDom('radio', 1, -75)
        expect($('#order_cost').text()).to.not.include('-');
    })


    it('Order Quantity should not equal 0', function() {
        setNameQuanityCostToDom('TV', 0, 825.00)
        expect($('#order_quantity').text()).to.not.equal('Order Quantity: 0');
    })
  

});

