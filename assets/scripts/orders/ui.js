'use strict';

const hbsCart = require('../templates/myCart.handlebars');
const cart = require('../cart');

// const getOrdersSuccess = (data) => {
//   let productsTemplate = hbsCart({ products: data.orders });
//   $('.products-container').append(productsTemplate);
// };
//
// const getOrdersFailure = (data) => {
//   console.error(data);
// };

const isCartEmpty = (data) => {
  if (data.order.items.length === 0) {
    return true;
  }
  return false;
};

const showOrderSuccess = (data) => {
  cart.order = data.order;
  let cartTemplate = hbsCart({ order: data.order });
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
  // getOrdersSuccess,
  // getOrdersFailure,
  showOrderSuccess,
  showOrderFailure,
  removeItemSuccess,
};
