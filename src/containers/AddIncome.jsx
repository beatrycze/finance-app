import React from 'react';
import { Link } from 'react-router-dom';
import Select from '../components/Select';
import '../styles/Forms.css';

import {incomesApi} from '../api/incomesApi';

class AddIncome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users.asList(),
            categories: props.categories.asList(),
            newItemId: '',
            newItemCategoryId: '',
            newItemAmount: '',
            newItemCreatedDate: '',
            newItemUserId: '',
            newItemDescription: '',
            newItemCategoryValue: '',
            newItemUserValue: ''
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
        if(value === NaN) {
            this.setState({
                // TEMPORARY To prevent receiving NaN for numeric attribute `value`
                [field]: ''
            });
        } else {
            this.setState({
                [field]: value
            });
        }
    }

    componentDidMount() {
        incomesApi.getCollection()
        .then(items => {
            let lastItemId = items[items.length-1].id;
            return lastItemId;
        })
        .then(lastItemId => this.setState({
            newItemId: ++lastItemId
        }))
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="panel panel-default top-spacer">
                    <div className="panel-heading">
                        <h1>Dodaj przychód</h1>
                    </div>
                    <div className="panel-body">
                        <form className="top-spacer">
                            <div className="form-group row hidden">
                                <label htmlFor="incomeId" className="col-sm-2 col-lg-1 col-form-label">Id</label>
                                <div className="col-sm-3 col-md-2">
                                    <input type="text" className="form-control" id="incomeId" placeholder="" value={this.state.newItemId} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="amount" className="col-sm-2 col-lg-1 col-form-label">Kwota</label>
                                <div className="col-sm-3 col-md-2">
                                    <input type="number" step="0.01" min="0" className="form-control" id="amount" placeholder="Wpisz kwotę" value={this.state.newItemAmount} onChange={this.handleCurrencyFieldChange.bind(this, 'newItemAmount')} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label="category"
                                    name="Kategoria"
                                    placeholder="Wybierz"
                                    selectedValue={this.state.newItemCategoryValue}
                                    options={this.state.categories}
                                    handleChange={this.handleNumericFieldChange.bind(this, "newItemCategoryValue")}
                                />
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label="createdBy"
                                    name="Utworzył(a)"
                                    placeholder="Wybierz"
                                    selectedValue={this.state.newItemUserValue}
                                    options={this.state.users}
                                    handleChange={this.handleNumericFieldChange.bind(this, "newItemUserValue")}
                                />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="date" className="col-sm-2 col-lg-1 col-form-label">Data</label>
                                <div className="col-sm-3 col-md-2">
                                    <input type="date" className="form-control" id="date" placeholder="Wpisz datę" value={this.state.newItemCreatedDate} onChange={this.handleTextualFieldChange.bind(this, 'newItemCreatedDate')} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="checkbox col-sm-3 col-sm-offset-2 col-lg-offset-1">
                                    <label>
                                    <input type="checkbox" /> Zapamiętaj datę
                                    </label>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-2 col-lg-1 col-form-label">Opis</label>
                                <div className="col-sm-6 col-md-4">
                                    <input type="text" className="form-control" id="description" placeholder="Dodaj opis" value={this.state.newItemDescription} onChange={this.handleTextualFieldChange.bind(this, 'newItemDescription')} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-1 col-sm-offset-2 col-lg-offset-1 top-spacer right-spacer">
                                    <button type="submit" className="btn btn-primary">Zapisz i dodaj</button>
                                </div>
                                <div className="col-sm-1 col-sm-offset-1 col-md-offset-0 col-lg-offset-0 top-spacer right-spacer">
                                    <button type="button" className="btn btn-info">Zapisz zmiany</button>
                                </div>
                                <div className="col-sm-1 col-sm-offset-1 col-md-offset-0 col-lg-offset-0 top-spacer">
                                    <Link to={'/incomes'}><button type="button" className="btn btn-default">Wróć do listy przychodów</button></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddIncome;
