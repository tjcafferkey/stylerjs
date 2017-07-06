"use strict";

require('jsdom-global')();
var expect = require("chai").expect;
var assert = require("chai").assert;
var styler = require("../lib/index");

describe("getter", function() {
    let container;

    before(function(){
        container = document.createElement('div');
        container.classList.add('test-element');
        document.body.appendChild(container);
    });


    after(function() {
        document.body.removeChild(container);
    });

    it("should expect let styles to be an object", function() {

    });
});