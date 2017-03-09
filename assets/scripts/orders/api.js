'use strict';

const config = require('../config');
const store = require('../store');

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

const updateOrder = function (id, data){
  return $.ajax({
    url: config.apiOrigin + '/orders/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};

const createOrder = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/orders',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};


module.exports = {
  getOrders,
  showOrder,
  updateOrder,
  createOrder
};
