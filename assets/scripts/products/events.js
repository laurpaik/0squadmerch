'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const cart = require('../cart');

const onGetProducts = function (event) {
  event.preventDefault();
  api.getProducts()
    .then(ui.getProductsSuccess)
    .catch(ui.getProductsFailure);
};

const onShowProduct = function (event) {
  event.preventDefault();
  let id = event.target.dataset.id;
  api.showProduct(id)
    .then(ui.showProductSuccess)
    .catch(ui.showProductFailure);
};

const addToCart = function (event){
  event.preventDefault();
  let i = getFormFields(event.target);
    let currentProduct = cart.find(function(item) {
      if(item._id === i.item._id) {
        return item;
      }
    });
    if (currentProduct !== undefined) {
      let currProdIndex = cart.indexOf(currentProduct);
      cart[currProdIndex].quantity += parseInt(i.item.quantity);
    } else {
      i.item.quantity = parseInt(i.item.quantity);
      cart.push(i.item);
    }
};

const addHandlers = () => {
  $('#get-products').on('click', onGetProducts);
  $('.products-container').on('click', ".show-product", onShowProduct);
  $("#show-form").on('submit', addToCart);
};

module.exports = {
  addHandlers,
};
