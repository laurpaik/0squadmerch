'use strict';

const config = require('../config');
const store = require('../store');

const createCharge = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/charges',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};

module.exports = {
  createCharge
};
