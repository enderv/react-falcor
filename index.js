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
    <div><RecipeList/ ></div>
  }
});

const RecipeList = React.createClass({
  render() {
    return (
      <div>
        {this.props.recipes.map( receipe => {
          return (
            <Recipe {...recipe} />
          );
        })}
      </div>
    )
  }
});

const Recipe = React.createClass({
  render(){
    return (
      <div>
        <Title title={this.props.title}/>
        <Instructions instructions={this.props.instructions}/>
        <Ingredients ingredients={this.props.ingredients}/>
      </div>
    )
  }
});

const Title = React.createClass({
  render() {
    return (
      <h1>{this.props.title}</h1>
    )
  }
});
const Instructions = React.createClass({
  render() {
    return (
      <h1>{this.props.instructions}</h1>
    )
  }
});
const Ingredients = React.createClass({
  render() {
    return (
      <h1>{JSON.stringify(this.props.ingredients)}</h1>
    )
  }
});
React.render(<App/>, window.document.getElementById('target'));
