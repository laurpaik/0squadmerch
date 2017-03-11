'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
const authEvents = require('./auth/events');
const productEvents = require('./products/events');
const orderEvents = require('./orders/events');

$(() => {
  setAPIOrigin(location, config);
  authEvents.addHandlers();
  productEvents.addHandlers();
  orderEvents.addHandlers();
  productEvents.onPageLoad();
});
