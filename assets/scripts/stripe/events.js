'use strict';

const api = require('./api');
const orderAPI = require('../orders/api.js');
const cart = require('../cart');
const ordersUi = require('../orders/ui');
let orderComplete = require('../ordercomplete');

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
              items: cart.getItems(),
              complete: true
            }
          };
          orderAPI.updateOrder(order._id, data);
          ordersUi.clearCart();
          orderComplete.setId('');
          $('.alert-message').text( "Thanks for your order!");
          $('.alert-success').slideDown();
          $('.alert-success').delay(2000).slideUp();
        })
        .catch(() => {
          $('.danger-alert-message').text( "Error processing your order!");
          $('.alert-danger').slideDown();
          $('.alert-danger').delay(2000).slideUp();
        });
    }
  });
  handler.open({
    name: '0Squad Merch',
    description: 'Cart',
    amount: cart.getTotal() * 100,
  });
};

module.exports = {
  onCreateCharge,
};
