'use strict';
const hbs = require('../templates/products.handlebars');
const hbsProduct = require('../templates/showProduct.handlebars')

const getProductsSuccess = (data) => {
  let productsTemplate = hbs({ products: data.products });
  $('.products-container').append(productsTemplate);
};

const getProductsFailure = (data) => {
  console.error(data);
};

const showProductSuccess = (data) => {
  // $('.name').val(data.product.name);
  // $('.price').val(data.product.price);
  // $('.description').val(data.product.description);
  // $('.img').val(data.product.img);
  // $('.id').val(data.product._id);
  let productTemplate = hbsProduct({ product: data.product });
  $('.product-modal').html(productTemplate);

};

const showProductFailure = (data) => {
  console.error(data);
};

const addToCartSuccess = () => {
    $("#show-form")[0].reset();
    $("#myProductModal").modal("hide");
    $('.alert-message').text( "An item has been added to you cart!");
    $('.alert-success').slideDown();

    $('.alert-success').delay(3000).slideUp();
};




module.exports = {
  getProductsSuccess,
  getProductsFailure,
  showProductSuccess,
  showProductFailure,
  addToCartSuccess
};
