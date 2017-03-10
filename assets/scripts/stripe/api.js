'use strict';

const config = require('../config');

const createCharge = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/charges',
    method: 'POST',
    data,
  });
};

module.exports = {
  createCharge
};
