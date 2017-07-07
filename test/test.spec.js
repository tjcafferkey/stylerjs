"use strict";

require("jsdom-global")();
var expect = require("chai").expect;
var assert = require("chai").assert;
var styler = require("../lib/index").default;

describe("get method for a string", function() {
    let container;

    before(function(){
        container = document.createElement('div');
        container.classList.add('test-element');
        container.style.height = '50px';
        container.style.width = '50px';
        document.body.appendChild(container);
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
        let values = Object.keys(styles).map(function(key) {
            return styles[key];
        });
        expect(values.length).to.equal(1);
    });

    it("should expect let styles to return an object with two keys when requesting height and width", function() {
        let styles = styler('.test-element').get(['height', 'width']);
        expect(Object.keys(styles).length).to.equal(2);
    });

    it("should expect let styles to return an object with two values when requesting height and width", function() {
        let styles = styler('.test-element').get(['height', 'width']);
        let values = Object.keys(styles).map(function(key) {
            return styles[key];
        });
        expect(values.length).to.equal(2);
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

describe("get method for a HTML node", function() {
    let container, innerContainer;

    before(function(){
        container = document.createElement('div');
        container.classList.add('test-element');
        container.style.height = '50px';
        container.style.width = '50px';
        document.body.appendChild(container);

        innerContainer = document.createElement('div');
        innerContainer.classList.add('test-inner-element');
        innerContainer.style.fontSize = '16px';
        innerContainer.style.color = 'blue';
        container.appendChild(innerContainer);
    });


    after(function() {
        document.body.removeChild(container);
    });

    it("should expect let styles to be an object", function() {
        let styles = styler(innerContainer).get(['height']);
        expect(styles).to.be.instanceof(Object);
    });

    it("should expect let styles to return an object with one key when just requesting height", function() {
        let styles = styler(innerContainer).get(['height']);
        expect(Object.keys(styles).length).to.equal(1);
    });

    it("should expect let styles to return an object with one value when just requesting height", function() {
        let styles = styler(innerContainer).get(['height']);
        let values = Object.keys(styles).map(function(key) {
            return styles[key];
        });
        expect(values.length).to.equal(1);
    });

    it("should expect let styles to return an object with two keys when requesting height and width", function() {
        let styles = styler(innerContainer).get(['height', 'width']);
        expect(Object.keys(styles).length).to.equal(2);
    });

    it("should expect let styles to return an object with two values when requesting height and width", function() {
        let styles = styler(innerContainer).get(['height', 'width']);
        let values = Object.keys(styles).map(function(key) {
            return styles[key];
        });
        expect(values.length).to.equal(2);
    });

    it("should expect color to equal blue", function() {
        let styles = styler(innerContainer).get(['color']);
        expect(styles["color"]).to.equal("blue");
    });

    it("should expect font-size to equal 16px", function() {
        let styles = styler(innerContainer).get(['font-size']);
        expect(styles["font-size"]).to.equal("16px");
    });

    it("should expect object to match returned object after passing in an instanceof HTMLElement", function() {
        let styles = styler(innerContainer).get(['font-size', 'color']);
        expect(styles).to.deep.equal({"font-size":"16px", "color":"blue"});
    });

});

describe("passing get method an invalid parameters", function() {
    let container, list;

    before(function(){
        container = document.createElement('div');
        container.classList.add('test-element');
        document.body.appendChild(container);
    });


    after(function() {
        document.body.removeChild(container);
    });

    it("should return false when given a number instead of a class name or node", function() {
        let styles = styler(1).get(["height"]);
        expect(styles).to.equal(false);
    });

    it("should return false when given a class name that doesn't exist on the DOM", function() {
        let styles = styler(".does-not-exist").get(["height"]);
        expect(styles).to.equal(false);
    });

});

describe("set method for a single element", function() {
    let container, innerContainer;

    before(function(){
        container = document.createElement('div');
        container.classList.add('test-element');
        document.body.appendChild(container);

        innerContainer = document.createElement('div');
        innerContainer.classList.add('test-inner-element');
        container.appendChild(innerContainer);
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

describe("set method for multiple elements", function() {
    let container, list;

    before(function(){
        container = document.createElement('div');
        container.classList.add('test-element');
        document.body.appendChild(container);

        list = document.createElement('ul');
        list.classList.add('list');
        container.appendChild(list);
        
        let limit = 5;

        for (let i = 0; limit > i; i++) {
            let listItem = document.createElement('li');
            list.appendChild(listItem);
        }
    });


    after(function() {
        document.body.removeChild(container);
    });

    it("should set a color of red to all list items (ul.list > li)", function() {
        styler("ul.list > li").set({"color": "red"});

        let items = [].slice.call(document.querySelectorAll("ul.list > li"));
        let test = items.map(function(item) {
            if (item.style.color !== "red") {
                return false;
            } else {
                return true;
            }
        });

        expect(test.indexOf(false)).to.equal(-1);
    });

    it("should set every list item with a height of 100px and a width of 200px (ul.list > li)", function() {
        styler("ul.list > li").set({"height": "100px", "width": "200px"});

        let items = [].slice.call(document.querySelectorAll("ul.list > li"));
        let test = items.map(function(item) {
            if (item.style.height !== "100px" || item.style.width !== "200px") {
                return false;
            } else {
                return true;
            }
        });

        expect(test.indexOf(false)).to.equal(-1);
    });
});

describe("passing set method an invalid parameters", function() {
    let container, list;

    before(function(){
        container = document.createElement('div');
        container.classList.add('test-element');
        document.body.appendChild(container);
    });


    after(function() {
        document.body.removeChild(container);
    });

    it("should return false when given a number instead of a class name or node", function() {
        let styles = styler(1).set({"height": "100px"});
        expect(styles).to.equal(false);
    });

    it("should return false when given a class name that doesn't exist on the DOM", function() {
        let styles = styler(".does-not-exist").set({"height": "100px"});
        expect(styles).to.equal(false);
    });

});