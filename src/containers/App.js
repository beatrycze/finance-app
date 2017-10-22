import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {usersApi} from '../api/usersApi';
import {outcomesApi} from '../api/outcomesApi';
import {incomesApi} from '../api/incomesApi';
import {outcomesCategoriesApi} from '../api/outcomesCategoriesApi';
import {incomesCategoriesApi} from '../api/incomesCategoriesApi';
import { wrap } from '../utils/wrapper';

import '../index.css';
import Home from '../components/Home';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NotFound from '../components/NotFound';
import OutcomesList from './OutcomesList';
import IncomesList from './IncomesList';
import AddOutcome from './AddOutcome';
import AddIncome from './AddIncome';

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
    usersApi.get()
    /* TEMPORARY reducing collection size */
    .then(users => users.slice(0,25))
    .then(users => wrap(users))
    .then(users => {
      this.setState({users})
    });

    outcomesCategoriesApi.get()
    .then(outcomesCategories => wrap(outcomesCategories))
    .then(outcomesCategories => {
      this.setState({outcomesCategories})
    });

    outcomesApi.get()
    /* TEMPORARY reducing collection size */
    .then(outcomes => outcomes.slice(0,25))
    .then( outcomes => this.setState({outcomes}) );

    incomesCategoriesApi.get()
    .then(incomesCategories => wrap(incomesCategories))
    .then(incomesCategories => {
      this.setState({incomesCategories})
    });

    incomesApi.get()
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
