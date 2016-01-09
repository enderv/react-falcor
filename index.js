const React = require('react');
//Using helper method to get ref syntax right
const $ref = falcor.Model.ref

//lodash
const _ = require('lodash');

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
    return (
    //<div><RecipeList recipes={ [ { "name":"Brownies", "instructions": "Bake", "ingredients" : ["one","two"]} ]}/ ></div>
    <div><RecipeList /></div>
    );
  }
});

const RecipeList = React.createClass({
  getInitialState() {
    return {
      recipes: []
    };
  },
  componentWillMount() {
    model.get(['recipes', {from: 0, to: 9}, Recipe.queries.recipe()],
    ['recipes', { from: 0, to: 9 }, 'ingredients', {from: 0, to: 9}, Ingredients.queries.ingredients()]
    )
      .then(data => {
        this.setState({
          recipes: _.values(data.json.recipes)
        });
      });
  },
  render() {
    return (
      <div>
        {this.state.recipes.map( (recipe, index) => {
          return (
            <Recipe key={index} {...recipe} />
          );
        })}
      </div>
    )
  }
});

const Recipe = React.createClass({

  statics: {
    queries: {
      recipe() {
        //Set up statics to pull what the children need
        return _.union( Name.queries.recipe(), Instructions.queries.recipe() )
      },
      ingredients() {
        return Ingredients.queries.ingredients();
      }
    }
  },
  render(){
    return (
      <div>
        <Name name={this.props.name}/>
        <Instructions instructions={this.props.instructions}/>
        <Ingredients ingredients={this.props.ingredients}/>
      </div>
    )
  }
});

const Name = React.createClass({
  statics: {
    queries: {
      recipe() {
        return ["name"];
      }
    }
  },
  render() {
    return (
      <h1>{this.props.name}</h1>
    )
  }
});
const Instructions = React.createClass({
  statics: {
    queries: {
      recipe() {
        return ["instructions"];
      }
    }
  },
  render() {
    return (
      <h1>{this.props.instructions}</h1>
    )
  }
});
const Ingredients = React.createClass({
  statics: {
    queries: {
      ingredients() {
        return ["name", "description"];
      }
    }
  },
  render() {
    return (
      <ol>
      {_.values(this.props.ingredients).map( (ingredient) => {
        return(
          <li key={ingredient.name}>{ingredient.name} - {ingredient.description}</li>
        );
      })}
      </ol>
    )
  }
});
React.render(<App/>, window.document.getElementById('target'));
