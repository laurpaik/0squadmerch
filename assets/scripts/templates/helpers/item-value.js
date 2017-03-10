'use strict';

module.exports = function(value, selected) {
  return value === selected ? "selected" : " ";
};
