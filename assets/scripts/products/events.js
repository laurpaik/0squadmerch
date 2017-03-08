'use strict';

// const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

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

const addHandlers = () => {
  $('#get-products').on('click', onGetProducts);
  $('.products-container').on('click', ".show-product", onShowProduct);
};

module.exports = {
  addHandlers,
};
