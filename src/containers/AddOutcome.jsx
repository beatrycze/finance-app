import React from 'react';
import { Link } from 'react-router-dom';
import Select from '../components/Select';
import '../styles/Forms.css';

import {outcomesApi} from '../api/outcomesApi';

class AddOutcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users.asList(),
            categories: props.categories.asList(),
            newItemAmount: '',
            newItemCategoryId: '',
            newItemUserId: '',
            newItemCreatedDate: '',
            newItemDescription: '',
            newItemAmountValid: false,
            newItemCategoryIdValid: false,
            newItemUserIdValid: false,
            newItemCreatedDateValid: false
        };
    }

    handleTextualFieldChange(field, event) {
        const value = event.currentTarget.value;
        this.setState({
            [field]: value,
            [field + 'Valid']: value.length > 0
        });
    }

    handleNumericFieldChange(field, event) {
        const value = parseInt(event.currentTarget.value, 10);
        this.setState({
            [field]: value,
            [field + 'Valid']: value > 0
        });
    }

    handleCurrencyFieldChange(field, event) {
        const value = parseFloat(event.currentTarget.value);
        if (isNaN(value)) {
            this.setState({
                [field]: '',
                [field + 'Valid']: false
            });
        } else {
            this.setState({
                [field]: value,
                [field + 'Valid']: value > 0
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const {
            newItemAmount,
            newItemCategoryId,
            newItemUserId,
            newItemCreatedDate,
            newItemDescription,
            newItemAmountValid,
            newItemCategoryIdValid,
            newItemUserIdValid,
            newItemCreatedDateValid
        } = this.state

        let item = {
            'amount': newItemAmount,
            'categoryId': newItemCategoryId,
            'createdBy': newItemUserId,
            'createdAt': newItemCreatedDate,
            'description': newItemDescription
        }

        if(newItemAmountValid && newItemCategoryIdValid && newItemUserIdValid && newItemCreatedDateValid) {
            outcomesApi.create(item)
            .then(response => response.json())
            .then((item) => alert(`Dodano nowy wydatek o id: ${item.id}`))
            .then(() => this.setState({
                newItemAmount: '',
                newItemCategoryId: '',
                newItemUserId: '',
                newItemCreatedDate: '',
                newItemDescription: '',
                newItemAmountValid: false,
                newItemCategoryIdValid: false,
                newItemUserIdValid: false,
                newItemCreatedDateValid: false
            }))
            .catch(() => alert('Operacja nie powiodła się. Spróbuj ponownie.'))
        }
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="panel panel-default top-spacer">
                    <div className="panel-heading">
                        <h1>Dodaj wydatek</h1>
                    </div>
                    <div className="panel-body">
                        <form className="top-spacer" onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group row">
                                <label htmlFor="amount" className="col-sm-2 col-lg-1 col-form-label">Kwota</label>
                                <div className="col-sm-3 col-md-2">
                                    <input type="number" step="0.01" min="0" className="form-control" id="amount" placeholder="Wpisz kwotę" value={this.state.newItemAmount} onChange={this.handleCurrencyFieldChange.bind(this, 'newItemAmount')} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label={"category"}
                                    name={"Kategoria"}
                                    placeholder="Wybierz"
                                    selectedValue={this.state.newItemCategoryId}
                                    options={this.state.categories}
                                    handleChange={this.handleNumericFieldChange.bind(this, "newItemCategoryId")}
                                />
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label={"createdBy"}
                                    name={"Utworzył(a)"}
                                    placeholder="Wybierz"
                                    required={true}
                                    selectedValue={this.state.newItemUserId}
                                    options={this.state.users}
                                    handleChange={this.handleNumericFieldChange.bind(this, "newItemUserId")}
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
                                    <Link to={'/outcomes'}><button type="button" className="btn btn-default">Wróć do listy wydatków</button></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddOutcome;
