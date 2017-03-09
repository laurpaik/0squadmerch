'use strict';
const hbs = require('../templates/products.handlebars');

const getProductsSuccess = (data) => {
  let productsTemplate = hbs({ products: data.products });
  $('.products-container').append(productsTemplate);
};

const getProductsFailure = (data) => {
  console.error(data);
};

const showProductSuccess = (data) => {
  console.log(data);
  $('.name').val(data.product.name);
  $('.price').val(data.product.price);
  $('.description').val(data.product.description);
  $('.img').val(data.product.img);
};

const showProductFailure = (data) => {
  console.error(data);
};


module.exports = {
  getProductsSuccess,
  getProductsFailure,
  showProductSuccess,
  showProductFailure
};
