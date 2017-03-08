'use strict';
const hbs = require('../templates/products.handlebars');

const getProductsSuccess = (data) => {
  let productsTemplate = hbs({ products: data.products });
  $('.product-container').append(productsTemplate);
};

const getProductsFailure = (data) => {
  console.error(data);
};


module.exports = {
  getProductsSuccess,
  getProductsFailure,
};
