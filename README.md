This is a simple JavaScript function which allows you to get and set CSS styles on DOM elements with ease.

# Step 1 #

### Install ###
`npm install --save-dev stylerjs`

# Step 2 #

### Import to your project (ES5) ###

`var styler = require('stylerjs');`

### Import to your project (ES6) ###

`import styler from 'stylerjs'`

# Step 3 #

### Get Styles ###
`var styles = styler('.class-name').get(['height', 'width']);`

### Set Styles ###
`styler('.class-name').set({ 'height': '50px', 'width': '50px' });`