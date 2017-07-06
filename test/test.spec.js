"use strict";

require("jsdom-global")();
var expect = require("chai").expect;
var assert = require("chai").assert;
var styler = require("../lib/index").default;

describe("getter", function() {
    let container;

    before(function(){
        container = document.createElement('div');
        container.classList.add('test-element');
        document.body.appendChild(container);
        container.style.height = '50px';
        container.style.width = '50px';
    });


    after(function() {
        document.body.removeChild(container);
    });

    it("should expect let styles to be an object", function() {
        let styles = styler('.test-element').get(['height']);
        expect(styles).to.be.instanceof(Object);
    });

    it("should expect let styles to return an object with one key when just requesting height", function() {
        let styles = styler('.test-element').get(['height']);
        expect(Object.keys(styles).length).to.equal(1);
    });

    it("should expect let styles to return an object with one value when just requesting height", function() {
        let styles = styler('.test-element').get(['height']);
        expect(Object.values(styles).length).to.equal(1);
    });

    it("should expect let styles to return an object with two keys when requesting height and width", function() {
        let styles = styler('.test-element').get(['height', 'width']);
        expect(Object.keys(styles).length).to.equal(2);
    });

    it("should expect let styles to return an object with two values when requesting height and width", function() {
        let styles = styler('.test-element').get(['height', 'width']);
        expect(Object.values(styles).length).to.equal(2);
    });

    it("should expect height to equal 50px", function() {
        let styles = styler('.test-element').get(['height']);
        expect(styles["height"]).to.equal("50px");
    });

    it("should expect width to equal 50px", function() {
        let styles = styler('.test-element').get(['width']);
        expect(styles["width"]).to.equal("50px");
    });

    it("should expect object to match returned object after requesting height and width", function() {
        let styles = styler('.test-element').get(['height', 'width']);
        expect(styles).to.deep.equal({"height":"50px", "width":"50px"});
    });
});

describe("setter", function() {
    let container;

    before(function(){
        container = document.createElement('div');
        container.classList.add('test-element');
        document.body.appendChild(container);
    });


    after(function() {
        document.body.removeChild(container);
    });

    it("should expect .test-element to have a font-size property of 20px after setting it", function() {
        styler(".test-element").set({ "font-size": "20px" });
        let styles = document.querySelector(".test-element").style.fontSize;
        expect(styles).to.equal("20px");
    });

    it("should expect .test-element to have a height property of 100px after setting it", function() {
        styler(".test-element").set({ "height": "100px" });
        let styles = document.querySelector(".test-element").style.height;
        expect(styles).to.equal("100px");
    });

    it("should expect .test-element to have a height property of 100px and width of 200px after setting them both", function() {
        styler(".test-element").set({ "height": "100px", "width": "200px" });
        let styles = {
            height: document.querySelector(".test-element").style.height,
            width: document.querySelector(".test-element").style.width
        };
        expect(styles).to.deep.equal({"height": "100px", "width": "200px"});
    });
});