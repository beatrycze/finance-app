import React, { Component } from 'react';
import {usersModel} from '../models/Users.model.js';
import {outcomesModel} from '../models/Outcomes.model.js';
import {outcomeCategoriesModel} from '../models/OutcomeCategories.model.js';
import '../index.css';
import Header from '../components/Header';
import Outcomes from '../components/Outcomes';
import AddOutcome from '../components/AddOutcome';
import Footer from '../components/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outcomes: [],
      incomes: [],
      outcomeCategories: [],
      incomeCategories: [],
      users: [],
      newOutcome: {
        id: '',
        categoryId: '',
        amount: '',
        description: '',
        createdAt: '',
        createdBy: ''
      }
    };
  }

  componentDidMount() {
    usersModel.get()
    /* TEMPORARY reducing collection size */
    .then(users => users.slice(0,15))
    .then(users => this.setState({
      users
    }));

    outcomeCategoriesModel.get()
    .then(outcomeCategories => this.setState({
      outcomeCategories
    }));

    outcomesModel.get()
    .then(outcomes => outcomes.slice(0,15))
    .then(outcomes => this.setState({
      outcomes
    }))
  }

  render() {
    return (
      <div>
        <Header />
        <Outcomes 
          outcomes={this.state.outcomes}
          outcomeCategories={this.state.outcomeCategories}
          users={this.state.users}
        />
        {/*Temporary TODO*/}
        <AddOutcome 
          users={this.state.users}
          outcomeCategories={this.state.outcomeCategories}
          newOutcome={this.state.newOutcome}
        />
        {/*<div><pre>{JSON.stringify(this.state.users, null, 2) }</pre></div>*/}
        <Footer />
      </div>
    );
  }
}

export default App;
