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
  // let id = event.target.dataset.id;
  let id = "58c098f934704539902fd7f0";
  api.showOrder(id)
    .then(ui.showOrderSuccess)
    .catch(ui.showOrderFailure);
};


// this is a patch function that removes a selected item from the current cart
const onRemoveItem = function (event) {
  event.preventDefault();
  let itemId = event.target.dataset.id;
  let id = orderStore.order._id;
  let items = orderStore.order.items;
  // let updateItems = [];
  // let data = items.map((item) => {
  //   console.log(item);
  //   if (item._id !== itemId) {
  //     let obj = {
  //       _id: item._id,
  //       name: item.name,
  //       description: item.description,
  //       price: item.price,
  //       quantity: item.quantity
  //     };
  //     return obj;
  //   }
  // });
  let delObj = items.find((item) => {
    if(item._id === itemId) {
      return item;
    }
  });
  let delObjInd = items.indexOf(delObj);
  items.splice(delObjInd, 1);
  console.log(orderStore);
  console.log(items);
  orderStore.order.items = items;
  api.updateOrder(id, orderStore)
    .then(onShowOrder(event))
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
