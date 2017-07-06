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

## Set Styles ##
``` javascript
styler('.class-name').set({ 'height': '50px', 'width': '50px' });