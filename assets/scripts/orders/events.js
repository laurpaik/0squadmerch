'use strict';

const api = require('./api');
const ui = require('./ui');
const cart = require('../cart');
const stripe = require('../stripe/events');
let orderComplete = require('../ordercomplete');

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
      complete: false
    }
  };
  if (orderComplete.getId() === '') {
    api.createOrder(data)
      .then((data) => {
        orderComplete.setId(data.order._id);
        stripe.onCreateCharge(event, data.order);
      })
      .catch(console.error);
  } else {
    api.updateOrder(orderComplete.getId(), data)
      .then((data) => {
        return stripe.onCreateCharge(event, data.order);
      })
      .catch(console.error);
  }
};

const onDeleteOrder = function (event) {
  event.preventDefault();
  let id = event.target.dataset.id;
  api.destroyOrder(id)
    .then(ui.destroyOrderSuccess)
    .then(() => {
      onGetOrders(event);
    })
    .catch(console.error);
};

const addHandlers = () => {
  $('#get-orders').on('click', onGetOrders);
  $('.cart-btn').on('click', onShowOrder);
  $('#checkout-btn').on('click', onCreateOrder);
  $('.order-history').on('click', '.delete-order', onDeleteOrder);
};

module.exports = {
  addHandlers,
  onShowOrder,
};
