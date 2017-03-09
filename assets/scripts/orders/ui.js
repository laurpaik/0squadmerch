'use strict';

const hbsCart = require('../templates/myCart.handlebars');
const cart = require('../cart');

const isCartEmpty = (data) => {
  if (data.order.items.length === 0) {
    return true;
  }
  return false;
};

const showOrderSuccess = (data, total) => {
  let cartTemplate = hbsCart({ items: cart, total: total });
  $('.cart-modal').html(cartTemplate);
};

const showOrderFailure = (data) => {
  console.error(data);
};

const removeItemSuccess = (data) => {
  if (isCartEmpty(data)) {
    delete cart.order;
  }
  return cart;
};


module.exports = {
  showOrderSuccess,
  showOrderFailure,
  removeItemSuccess,
};
