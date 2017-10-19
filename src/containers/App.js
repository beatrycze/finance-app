import React, { Component } from 'react';
import {usersModel} from '../models/Users.model.js';
import {outcomesModel} from '../models/Outcomes.model.js';
import {incomesModel} from '../models/Incomes.model.js';
import {outcomeCategoriesModel} from '../models/OutcomeCategories.model.js';
import {incomeCategoriesModel} from '../models/IncomeCategories.model.js';
import '../index.css';
import Header from '../components/Header';
import OutcomesList from '../components/OutcomesList';
import IncomesList from '../components/IncomesList';
import AddOutcome from '../components/AddOutcome';
import AddIncome from '../components/AddIncome';
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
      },
      newIncome: {
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
    }));

    incomeCategoriesModel.get()
    .then(incomeCategories => this.setState({
      incomeCategories
    }));

    incomesModel.get()
    .then(incomes => incomes.slice(0,15))
    .then(incomes => this.setState({
      incomes
    }));
  }

  render() {
    return (
      <div>
        <Header />
        <IncomesList 
          items={this.state.incomes}
          categories={this.state.incomeCategories}
          users={this.state.users}
        />
        <OutcomesList
          items={this.state.outcomes}
          categories={this.state.outcomeCategories}
          users={this.state.users}
        />
        {/*Temporary TODO*/}
        <AddOutcome 
          users={this.state.users}
          outcomeCategories={this.state.outcomeCategories}
          newOutcome={this.state.newOutcome}
        />
        {/*Temporary TODO*/}
        <AddIncome 
          users={this.state.users}
          incomeCategories={this.state.incomeCategories}
          newIncome={this.state.newIncome}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
