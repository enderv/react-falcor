const React = require('react');
//Using helper method to get ref syntax right
const $ref = falcor.Model.ref;

//Using reference even though that is normally done on server!!
const model = new falcor.Model({
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
        instructions: "Also bake them",
        ingredients:[
          $ref("ingredientsById[1]")
        ],
        authors : { $type:"atom", value:["Jim","Tom"]}
      }
    ]
  }
});

//Only grab exactly what you need!!
//Built to grab small pieces!
model.get('recipes[0..1].ingredients[0..10]["name","description"]', 'recipes[0..1]["name","instructions","authors"]')
  .then(data => {
    console.log(data);
  })
//this will also work!
//model.get(['recipes',0,['name','instructions']]);

const App = React.createClass({
  render() {
    return (<h1>hi lol</h1>);
  }
});

React.render(<App/>, window.document.getElementById('target'));
