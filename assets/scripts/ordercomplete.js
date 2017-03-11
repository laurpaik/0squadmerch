'use strict';

const orderStatus = {
  id: '',
  setId: function(num) {
    this.id = num;
  },
  getId: function() {
    return this.id;
  }
};

module.exports = orderStatus;
