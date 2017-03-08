'use strict';
const hbs = require('../templates/products.handlebars');
const hbsShow = require('../templates/show-product.handlebars');

const getProductsSuccess = (data) => {
  let productsTemplate = hbs({ products: data.products });
  $('.products-container').append(productsTemplate);
};

const getProductsFailure = (data) => {
  console.error(data);
};

const showProductSuccess = (data) => {
  let productsTemplate = hbsShow({ product: data.product });
  $('.product-container').html(productsTemplate);
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
