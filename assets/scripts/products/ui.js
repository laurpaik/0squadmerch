'use strict';
const hbs = require('../templates/products.handlebars');
const hbsProduct = require('../templates/showProduct.handlebars')

const getProductsSuccess = (data) => {
  let productsTemplate = hbs({ products: data.products });
  $('.products-container').html(productsTemplate);
};

const getProductsFailure = (data) => {
  console.error(data);
};

const showProductSuccess = (data) => {
  let productTemplate = hbsProduct({ product: data.product });
  $('.product-modal').html(productTemplate);

};

const showProductFailure = (data) => {
  console.error(data);
};

const addToCartSuccess = () => {
    $("#show-form")[0].reset();
    $("#myProductModal").modal("hide");
    $('.alert-message').text( "An item has been added to your cart!");
    $('.alert-success').slideDown();
    $('.alert-success').delay(3000).slideUp();
};
const maxItemSuccess = () => {
    $("#show-form")[0].reset();
    $("#myProductModal").modal("hide");
    $('.danger-alert-message').text( "An order cannot exceed 10 of the same items!");
    $('.alert-danger').slideDown();
    $('.alert-danger').delay(3000).slideUp();
};




module.exports = {
  getProductsSuccess,
  getProductsFailure,
  showProductSuccess,
  showProductFailure,
  addToCartSuccess,
  maxItemSuccess
};
