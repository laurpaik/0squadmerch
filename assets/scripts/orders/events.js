'use strict';

// const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
// const store = require('../store');
const cart = require('../cart');

const onGetOrders = function (event) {
  event.preventDefault();
  api.getOrders()
    .then(ui.getOrdersSuccess)
    .catch(ui.getOrdersFailure);
};

const onShowOrder = function (event) {
  event.preventDefault();
  delete cart.order;
  let total = 0;
  for(let i = 0; i < cart.length; i++) {
    total += (cart[i].price * cart[i].quantity);
  }
  ui.showOrderSuccess(cart, total);
};

const onCreateOrder = function (event) {
  event.preventDefault();
  let order = {
    items: cart
  };
  console.log(order);
  api.createOrder(order)
    .then()
    .catch();
};


// this is a patch function that removes a selected item from the current cart
const onRemoveItem = function (event) {
  event.preventDefault();
  let itemId = event.target.dataset.id;
  let id = cart.order._id;
  // let items = cart.order.items;
  if (cart.order.items.length === 1) {
    cart.order.items.pop();
    console.log("order is", cart);
  }
  else {
    let delObj = cart.order.items.find((item) => {
      if(item._id === itemId) {
        return item;
      }
    });
    let delObjInd = cart.order.items.indexOf(delObj);
    cart.order.items.splice(delObjInd, 1);
  }
  console.log(cart);
  api.updateOrder(id, cart)
    .then((data) => {
      if (cart !== {}){
        onShowOrder(event);
      }
      else {
        ui.removeItemSuccess(data);
        console.log("order is", cart);
      }
    })
    .catch(ui.showOrderFailure);
};

const addHandlers = () => {
  $('#get-orders').on('click', onGetOrders);
  $('.cart-btn').on('click', onShowOrder);
  $('#myCartModal').on('click', '.item-delete', onRemoveItem);
  $('#checkout-btn').on('click', onCreateOrder);
};

module.exports = {
  addHandlers,
};
