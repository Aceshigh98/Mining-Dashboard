var jshamcrest = require('jshamcrest');
var mockito = require('jsmockito');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
document = dom.window.document;
spyDocument = spy(document);
when(spyDocument).getElementById('submit').thenReturn(new Element('<a id="submit">Enter</a>'));

require("../../public/scripts/cover.js");
