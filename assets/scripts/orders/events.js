'use strict';

// const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const onGetOrders = function (event) {
  event.preventDefault();
  api.getOrders()
    .then(ui.getOrdersSuccess)
    .catch(ui.getOrdersFailure);
};

const onShowOrder = function (event) {
  event.preventDefault();
  // let id = event.target.dataset.id;
  let id = "58c06cc18dcedd28c34727f9";
  api.showOrder(id)
    .then(ui.showOrderSuccess)
    .catch(ui.showOrderFailure);
};

const addHandlers = () => {
  $('#get-orders').on('click', onGetOrders);
  $('.cart-btn').on('click', onShowOrder);
};

module.exports = {
  addHandlers,
};
