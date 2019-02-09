describe('setNameQuanityCostToDom', function() {
    it('should populate name, quantity and cost divs', function() {
        // do some dom triggering or whatever
        setNameQuanityCostToDom('radio', 3, 75.50)
        expect($('#product_name').text()).to.equal('Prodcut Name: radio');
    })

    it('Expect should not be empty populate Quantity div', function() {
        // do some dom triggering or whatever
        setNameQuanityCostToDom('radio', 1, 28250)
        expect($('#product_name').text()).to.be.a('string');
    })

    it('Order Quantity should equal 50', function() {
        // do some dom triggering or whatever
        setNameQuanityCostToDom('TV', 50, 825.00)
        expect($('#order_quantity').text()).to.equal('Order Quantity: 50');
    })
  
    it('Order Total Cost should not be empty', function() {
        // do some dom triggering or whatever
        setNameQuanityCostToDom('radio', 1, 28250)
        expect($('#order_cost').text()).to.not.be.empty;
    })

 
});

