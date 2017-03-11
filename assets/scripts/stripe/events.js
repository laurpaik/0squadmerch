'use strict';

const api = require('./api');
const orderAPI = require('../orders/api.js');
const cart = require('../cart');

let handler = StripeCheckout.configure({
  key: 'pk_test_0WJB4joLJNPPaX6ya7rnxh8c',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    let credentials = {
      stripeToken: token.id,
    };
    api.createCharge(credentials)
      .then()
      .catch();
  }
});

const onCreateCharge = function (event, order) {
  event.preventDefault();

  handler.open({
    name: '0Squad Merch',
    description: 'Cart',
    closed: function() {
      let data = {
        order: {
          items: cart,
          complete: true
        }
      };
      orderAPI.updateOrder(order._id, data);
    },
    amount: order.orderPrice * 100
  });
};


module.exports = {
  onCreateCharge,
};
