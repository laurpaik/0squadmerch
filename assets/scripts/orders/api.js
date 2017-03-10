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

const destroyOrder = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/orders/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};


module.exports = {
  getOrders,
  showOrder,
  updateOrder,
  createOrder,
  destroyOrder,
};
