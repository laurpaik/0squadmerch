'use strict';

const cart = {
  items: [],
  getTotal: function() {
    let total = 0;
    for(let i = 0; i < this.items.length; i++) {
      total += (this.items[i].price * this.items[i].quantity);
    }
    return total;
  },
  getItems: function() {
    return this.items;
  }
};

module.exports = cart;
