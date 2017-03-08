'use strict';

// const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const onGetProducts = function (event) {
  event.preventDefault();
  api.getProducts()
    .then(ui.getProductsSuccess)
    .catch(ui.getProductsFailure);
};
//
// const onSignIn = function (event) {
//   $('.wrongCred').text('');
//   let data = getFormFields(event.target);
//   event.preventDefault();
//   api.signIn(data)
//     .then(ui.signInSuccess)
//     .catch(ui.signInFailure);
// };
//
// const onChangePassword = function (event) {
//   let data = getFormFields(event.target);
//   event.preventDefault();
//   api.changePassword(data)
//     .then(ui.passwordChangeSuccess)
//     .catch(ui.passwordChangeFailure);
// };
//
// const onSignOut = function (event) {
//   event.preventDefault();
//   api.signOut()
//     .then(ui.signOutSuccess)
//     .catch(ui.signOutFailure);
// };
//
//
const addHandlers = () => {
  $('#get-products').on('click', onGetProducts);
};

module.exports = {
  addHandlers,
};
