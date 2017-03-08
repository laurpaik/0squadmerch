'use strict';

const config = require('../config');

const getOrders = function (){
  return $.ajax({
    url: config.apiOrigin + '/orders',
    method: 'GET',
  });
};

const showOrder = function (id){
  return $.ajax({
    url: config.apiOrigin + '/orders/' + id,
    method: 'GET'
  });
};

module.exports = {
  getOrders,
  showOrder
  // signIn,
  // changePassword,
  // signOut,
};
