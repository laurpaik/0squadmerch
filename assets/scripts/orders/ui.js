'use strict';

const hbsCart = require('../templates/myCart.handlebars');
const cart = require('../cart');
const orderTemplate = require('../templates/order-history.handlebars');

const clearCart = function () {
  for (let i = 0; i < cart.length; i++) {
    cart.pop();
  }
  showOrderSuccess([], 0);
};

const isCartEmpty = (data) => {
  if (data.order.items.length === 0) {
    return true;
  }
  return false;
};

const showOrderSuccess = (data, total) => {
  if (cart.length > 0) {
    $('#checkout-btn').show();
    let cartTemplate = hbsCart({ items: cart, total: total });
    $('.cart-modal').html(cartTemplate);
  } else {
    $('.order-table').detach();
    $('.cart-modal').html('Empty cart!');
    $('#checkout-btn').hide();
  }
};

const showOrderFailure = (data) => {
  console.error(data);
};

const removeItemSuccess = (data) => {
  if (isCartEmpty(data)) {
    delete cart.order;
  }
  showOrderSuccess(cart);
};

const getOrdersSuccess = (data) => {
  let orderHBS = orderTemplate({ orders: data.orders });
  $('.order-history').html(orderHBS);
};



module.exports = {
  showOrderSuccess,
  showOrderFailure,
  removeItemSuccess,
  getOrdersSuccess,
  clearCart,
};
