'use strict';

const hbsCart = require('../templates/myCart.handlebars');
const orderStore = require('../orderStore');

// const getOrdersSuccess = (data) => {
//   let productsTemplate = hbsCart({ products: data.orders });
//   $('.products-container').append(productsTemplate);
// };
//
// const getOrdersFailure = (data) => {
//   console.error(data);
// };

const showOrderSuccess = (data) => {
  orderStore.order = data.order;
  let cartTemplate = hbsCart({ order: data.order });
  $('.cart-modal').html(cartTemplate);
};

const showOrderFailure = (data) => {
  console.error(data);
};


module.exports = {
  // getOrdersSuccess,
  // getOrdersFailure,
  showOrderSuccess,
  showOrderFailure
};
