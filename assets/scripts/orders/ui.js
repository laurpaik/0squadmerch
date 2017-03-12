'use strict';

const hbsCart = require('../templates/myCart.handlebars');
const cart = require('../cart');
const orderTemplate = require('../templates/orderhistory.handlebars');

const clearCart = function () {
  for (let i = 0; i < cart.items.length; i++) {
    cart.items.pop();
  }
  cart.items.pop();
  $('.order-table').detach();
  $('#myCartModal').modal('hide');
};

const showOrderSuccess = (data, total) => {
  if (cart.items.length > 0) {
    $('#checkout-btn').show();
    let cartTemplate = hbsCart({ items: cart.items, total: total });
    $('.cart-modal').html(cartTemplate);
  } else {
    $('.cart-modal').html('Empty cart!');
    $('#checkout-btn').hide();
  }
};

const getOrdersSuccess = (data) => {
  let orderHBS = orderTemplate({ orders: data.orders });
  $('.order-history').html(orderHBS);
};

module.exports = {
  showOrderSuccess,
  getOrdersSuccess,
  clearCart,
};
