var jshamcrest = require('jshamcrest');
var mockito = require('jsmockito');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
document = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
require("../../public/scripts/cover.js");

var assert = require('assert');
const { loadavg } = require("os");
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});