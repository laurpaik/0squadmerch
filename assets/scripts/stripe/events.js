'use strict';

const api = require('./api');
const orderAPI = require('../orders/api.js');
const cart = require('../cart');
const ordersUi = require('../orders/ui');

const onCreateCharge = function (event, order) {
  event.preventDefault();
  let handler = StripeCheckout.configure({
    key: 'pk_test_0WJB4joLJNPPaX6ya7rnxh8c',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
      let credentials = {
        stripeToken: token.id,
      };
      api.createCharge(credentials)
        .then(() => {
          let data = {
            order: {
              items: cart,
              complete: true
            }
          };
          orderAPI.updateOrder(order._id, data);
          ordersUi.clearCart();
        })
        .catch();
    }
  });
  handler.open({
    name: '0Squad Merch',
    description: 'Cart',
    amount: order.orderPrice * 100
  });
};


module.exports = {
  onCreateCharge,
};
