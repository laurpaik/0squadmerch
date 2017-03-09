'use strict';

const api = require('./api');
const ui = require('./ui');
const cart = require('../cart');

const onGetOrders = function (event) {
  event.preventDefault();
  api.getOrders()
    .then(ui.getOrdersSuccess)
    .catch(ui.getOrdersFailure);
};

const onShowOrder = function (event) {
  event.preventDefault();
  let total = 0;
  for(let i = 0; i < cart.length; i++) {
    total += (cart[i].price * cart[i].quantity);
  }
  ui.showOrderSuccess(cart, total);
};

const onCreateOrder = function (event) {
  event.preventDefault();
  let data = {
    order: {
      items: cart,
      complete: true
    }
  };
  api.createOrder(data)
    .then((data) => {
      ui.checkoutCart(data);
    })
    .catch(console.error);
};

const addHandlers = () => {
  $('#get-orders').on('click', onGetOrders);
  $('.cart-btn').on('click', onShowOrder);
  $('#checkout-btn').on('click', onCreateOrder);
};

module.exports = {
  addHandlers,
  onShowOrder,
};
