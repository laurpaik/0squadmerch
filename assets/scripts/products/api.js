'use strict';

const config = require('../config');
const store = require('../store');

const getProducts = function (){
  return $.ajax({
    url: config.apiOrigin + '/products',
    method: 'GET',
  });
};

const showProduct = function (id){
  return $.ajax({
    url: config.apiOrigin + '/products/' + id,
    method: 'GET'
  });
};

module.exports = {
  getProducts,
  showProduct
};
