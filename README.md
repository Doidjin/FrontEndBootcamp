# Introduction to Express.js

## First Class
* Shows the Express Framework!


## Our First App
* Shows how to use the get method in Express, like :
* App is the require of express
* First parameter is the route of your site

```js
var express = require('express');
var app = express();

app.get('/', function(req, res){
    app.send('Teste');
});
```

## The package JSON
* A file that contains all the meta data about this particular application and all the dependencies
* The --save option instructs NPM to include the package inside of the dependencies section of your package.json automatically, this saving you an additional step.


## Route Params
* Order of routes matters
* The * route accepts any route write on console page
* The : makes a pattern for all r/:Id route

```js

app.get('/r/:id', function(req, res){
   //Callback function 
});
```

* the Request object contain all the information about the incomming request
* Request params -> Contains all of the route parameters and theis corresponding values
* You can acess the object parameter of Request