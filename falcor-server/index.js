var falcorExpress = require('falcor-express');
var Router = require('falcor-router');
var falcor = require('falcor');
var express = require('express');
var path = require('path');
var app = express();
var $ref = falcor.Model.ref;
var model = new falcor.Model({
    cache: {
      ingredientsById: {
        1:{
          name:"Flour",
          description:"White and Powdery"
        },
        2:{
          name:"Chocolate Chips",
          description: "Delicious"
        },
      },
      recipes:[
        {
          name: "Cookies",
          instructions: "Mix and bake",
          ingredients:[
            $ref("ingredientsById[1]"),
            $ref("ingredientsById[2]")
          ],
          authors :{ $type:"atom", value:["Bob","Chris","Other Guy"]}
        },
        {
          name: "Brownies",
          instructions: "Also bake them forver!!!!!",
          ingredients:[
            $ref("ingredientsById[1]")
          ],
          authors : { $type:"atom", value:["Jim","Tom"]}
        }
      ]
    }
});

// serve static files from current directory

app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  // create a Virtual JSON resource with single key ("greeting")
  return model.asDataSource();
}));
console.log(path.normalize(__dirname+'/../react-client'));
app.use(express.static(path.normalize(__dirname+'/../react-client')));


var server = app.listen(3000);
