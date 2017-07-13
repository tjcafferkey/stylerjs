This is a simple JavaScript function which allows you to get and set CSS properties on DOM elements with ease.

``` bash
npm install stylerjs
```

# Usage

``` javascript
var styler = require('stylerjs')
```

Now that stylerjs has been imported in to your project you're able to start getting and setting CSS properties to your DOM elements.

## Get Styles ##
``` javascript
var styles = styler('.class-name').get(['height', 'width']);
```

or you can pass it a node

``` javascript
var element = document.querySelector('.class-name');
var styles = styler(element).get(['height', 'width']);
```

## Set Styles ##

You can set styles to multiple DOM elements by passing it a class. This will apply all of your specified styles to those elements.

``` javascript
styler('.class-name').set({ 'height': '50px', 'width': '50px' });
```

or you can pass the styler a single node if you wish to do just one.

```javascript
var element = document.querySelector('.class-name');
styler(element).set({ 'height': '50px', 'width': '50px' });
```