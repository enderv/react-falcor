const React = require('react');

const model = new falcor.Model({
  cache: {
    recipes:[
      {
        name: "Cookies",
        instructions: "Mix and bake"
      },
      {
        name: "Brownies",
        instructions: "Also bake them"
      }
    ]
  }
});

//Only grab exactly what you need!!
//Built to grab small pieces!
model.get('recipes[0..1]["name","instructions"]')
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
