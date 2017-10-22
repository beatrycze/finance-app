import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {usersModel} from '../models/Users.model.js';
import {outcomesModel} from '../models/Outcomes.model.js';
import {incomesModel} from '../models/Incomes.model.js';
import {outcomesCategoriesModel} from '../models/OutcomesCategories.model.js';
import {incomesCategoriesModel} from '../models/IncomesCategories.model.js';
import { wrap } from '../models/utils';

import '../index.css';
import Home from '../components/Home';
import Header from '../components/Header';
import OutcomesList from '../components/OutcomesList';
import IncomesList from '../components/IncomesList';
import AddOutcome from '../components/AddOutcome';
import AddIncome from '../components/AddIncome';
import Footer from '../components/Footer';
import NotFound from '../components/not-found/NotFound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outcomes: [],
      incomes: [],
      outcomesCategories: wrap([]),
      incomesCategories: wrap([]),
      users: wrap([])
    };
  }

  componentDidMount() {
    usersModel.get()
    /* TEMPORARY reducing collection size */
    .then(users => users.slice(0,25))
    .then(users => wrap(users))
    .then(users => {
      this.setState({users})
    });

    outcomesCategoriesModel.get()
    .then(outcomesCategories => wrap(outcomesCategories))
    .then(outcomesCategories => {
      this.setState({outcomesCategories})
    });

    outcomesModel.get()
    /* TEMPORARY reducing collection size */
    .then(outcomes => outcomes.slice(0,25))
    .then( outcomes => this.setState({outcomes}) );

    incomesCategoriesModel.get()
    .then(incomesCategories => wrap(incomesCategories))
    .then(incomesCategories => {
      this.setState({incomesCategories})
    });

    incomesModel.get()
    /* TEMPORARY reducing collection size */
    .then(incomes => incomes.slice(0,25))
    .then( incomes => this.setState({incomes}) );
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/add-outcome" render={ (props) => (<AddOutcome users={this.state.users} outcomesCategories={this.state.outcomesCategories} {...props}/>) } />
              <Route path="/add-income" render={ (props) => (<AddIncome users={this.state.users} incomesCategories={this.state.incomesCategories} {...props}/>) } />
              <Route exact path="/outcomes" render={ (props) => (<OutcomesList users={this.state.users} outcomesCategories={this.state.outcomesCategories} items={this.state.outcomes} {...props}/>) } />
              <Route exact path="/incomes" render={ (props) => (<IncomesList users={this.state.users} incomesCategories={this.state.incomesCategories} items={this.state.incomes} {...props}/>) } />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
