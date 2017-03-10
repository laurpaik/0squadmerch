'use strict';

const hbsCart = require('../templates/myCart.handlebars');
const cart = require('../cart');
const hbsStripe = require('../templates/stripe.handlebars');
const orderTemplate = require('../templates/order-history.handlebars');

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

const checkoutCart = (data) => {
  const checkout = hbsStripe({ amount: data.order.orderPrice * 100 });
  $('.cart-modal').append(checkout);
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
  checkoutCart,
};
