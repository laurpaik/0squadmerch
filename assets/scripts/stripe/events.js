'use strict';

const api = require('./api');

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

const onCreateCharge = function (event, total) {
  event.preventDefault();

  handler.open({
    name: '0Squad Merch',
    description: 'Cart',
    closed: function() {
      // api.patchOrder().then(ui.changePaidStatusSuccess).catch(ui.failure);
    },
    amount: total * 100
  });
};


module.exports = {
  onCreateCharge,
};
