'use strict';

// const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
// const store = require('../store');
const orderStore = require('../orderStore');

const onGetOrders = function (event) {
  event.preventDefault();
  api.getOrders()
    .then(ui.getOrdersSuccess)
    .catch(ui.getOrdersFailure);
};

const onShowOrder = function (event) {
  event.preventDefault();
  delete orderStore.order;
  // let id = event.target.dataset.id;
  let id = "58c16b03d96d962fb8a3d20f";
  api.showOrder(id)
    .then(ui.showOrderSuccess)
    .catch(ui.showOrderFailure);
};


// this is a patch function that removes a selected item from the current cart
const onRemoveItem = function (event) {
  event.preventDefault();
  let itemId = event.target.dataset.id;
  let id = orderStore.order._id;
  // let items = orderStore.order.items;
  if (orderStore.order.items.length === 1) {
    orderStore.order.items.pop();
    console.log("order is", orderStore);
  }
  else {
    let delObj = orderStore.order.items.find((item) => {
      if(item._id === itemId) {
        return item;
      }
    });
    let delObjInd = orderStore.order.items.indexOf(delObj);
    orderStore.order.items.splice(delObjInd, 1);
  }
  console.log(orderStore);
  api.updateOrder(id, orderStore)
    .then((data) => {
      if (orderStore !== {}){
        onShowOrder(event);
      }
      else {
        ui.removeItemSuccess(data);
        console.log("order is", orderStore);
      }
    })
    .catch(ui.showOrderFailure);
};

const addHandlers = () => {
  $('#get-orders').on('click', onGetOrders);
  $('.cart-btn').on('click', onShowOrder);
  $('#myCartModal').on('click', '.item-delete', onRemoveItem);
};

module.exports = {
  addHandlers,
};
