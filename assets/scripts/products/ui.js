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
  $('.name').val(data.product.name);
  $('.price').val(data.product.price);
  $('.description').val(data.product.description);
  $('.img').val(data.product.img);
  $('.id').val(data.product._id);

};

const showProductFailure = (data) => {
  console.error(data);
};

const addToCartSuccess = () => {
    $("#show-form")[0].reset();
    $('.alert-message').text( "An item has been added to you cart!");
    $('.alert-success').slideDown();

    $('.alert-success').delay(2000).slideUp();
}




module.exports = {
  getProductsSuccess,
  getProductsFailure,
  showProductSuccess,
  showProductFailure,
  addToCartSuccess
};
