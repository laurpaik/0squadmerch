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
    .catch(ui.failure);
};

const onShowOrder = function () {
  let total = cart.getTotal();
  ui.showOrderSuccess(cart.items, total);
};

const onCreateOrder = function (event) {
  event.preventDefault();
  let data = {
    order: {
      items: cart.getItems(),
      complete: false
    }
  };
  if (orderComplete.getId() === '') {
    api.createOrder(data)
      .then((data) => {
        orderComplete.setId(data.order._id);
        stripe.onCreateCharge(event, data.order);
      })
      .catch(ui.failure);
  } else {
    api.updateOrder(orderComplete.getId(), data)
      .then((data) => {
        onShowOrder();
        stripe.onCreateCharge(event, data.order);
      })
      .catch(ui.failure);
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
    .catch(ui.failure);
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
