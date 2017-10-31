import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { outcomesApi } from '../api/outcomesApi';

import '../styles/Forms.css';

import Select from './Select';

class EditOutcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: props.users.asList(),
            usersMap: props.users.asMap(),
            categoriesList: props.categories.asList(),
            categoriesMap: props.categories.asMap(),
            itemId: parseInt(props.match.params.itemId, 10),
            categoryId: '',
            amount: '',
            createdDate: '',
            userId: '',
            description: ''
        };
    }

    handleTextualFieldChange(field, event) {
        const value = event.currentTarget.value;
        this.setState({
            [field]: value
            // TODO validation
        });
    }

    handleNumericFieldChange(field, event) {
        const value = parseInt(event.currentTarget.value, 10);
        this.setState({
            [field]: value
        });
    }

    handleCurrencyFieldChange(field, event) {
        const value = parseFloat(event.currentTarget.value);
        if (isNaN(value)) {
            this.setState({
                [field]: ''
            });
        } else {
            this.setState({
                [field]: value
            });
        }
    }

    componentDidMount() {
        const id = this.state.itemId;

        outcomesApi.getItem(id)
        .then(item => {
            item.createdDate = item.createdAt.slice(0,10);
            return item;
        })
        .then( item => this.setState({
            categoryId: item.categoryId,
            amount: item.amount,
            createdDate: item.createdDate,
            userId: item.createdBy,
            description: item.description
        }));
    }

    render() {
        if (!this.state.amount) {
            return(
                <div className="container-fluid">
                    <div>
                        <h2>Loading...</h2>
                    </div>
                </div>
            );
        }
        return(
            <div className="container-fluid">
                <div className="panel panel-default top-spacer">
                    <div className="panel-heading">
                        <h1>Edytuj wydatek</h1>
                    </div>
                    <div className="panel-body">
                        <form className="top-spacer">
                            <div className="form-group row">
                                <label htmlFor="amount" className="col-sm-2 col-lg-1 col-form-label">Kwota</label>
                                <div className="col-sm-3 col-md-2">
                                    <input type="number" step="0.01" min="0" className="form-control" id="amount" placeholder="Wpisz kwotę" value={this.state.amount} onChange={this.handleCurrencyFieldChange.bind(this, 'amount')} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label={"category"}
                                    name={"Kategoria"}
                                    selectedValue={this.state.categoryId}
                                    options={this.state.categoriesList}
                                    handleChange={this.handleNumericFieldChange.bind(this, "categoryId")}
                                />
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label={"createdBy"}
                                    name={"Utworzył(a)"}
                                    selectedValue={this.state.userId}
                                    options={this.state.usersList}
                                    handleChange={this.handleNumericFieldChange.bind(this, "userId")}
                                />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="date" className="col-sm-2 col-lg-1 col-form-label">Data</label>
                                <div className="col-sm-3 col-md-2">
                                    <input type="date" className="form-control" id="date" placeholder="Wpisz datę" value={this.state.createdDate} onChange={this.handleTextualFieldChange.bind(this, 'createdDate')} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-2 col-lg-1 col-form-label">Opis</label>
                                <div className="col-sm-6 col-md-4">
                                    <input type="text" className="form-control" id="description" placeholder="Dodaj opis" value={this.state.description} onChange={this.handleTextualFieldChange.bind(this, 'description')} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-1 col-sm-offset-2 col-lg-offset-1 top-spacer right-spacer">
                                    <button type="button" className="btn btn-info">Zapisz zmiany</button>
                                </div>
                                <div className="col-sm-1 col-sm-offset-1 col-md-offset-0 col-lg-offset-0 top-spacer">
                                    <Link to={'/outcomes'}><button type="button" className="btn btn-default">Wróć do listy wydatków</button></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

EditOutcome.propTypes = {
    users: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
};

export default EditOutcome;
