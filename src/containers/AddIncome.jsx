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
            newItemAmount: '',
            newItemCategoryId: '',
            newItemUserId: '',
            newItemCreatedDate: '',
            newItemDescription: '',
            touched: {
                newItemAmount: false,
                newItemCategoryId: false,
                newItemUserId: false,
                newItemCreatedDate: false,
            },
            valid: {
                newItemAmount: false,
                newItemCategoryId: false,
                newItemUserId: false,
                newItemCreatedDate: false,
            },
            disabledSelectOption: false
        };
    }

    handleCurrencyFieldChange(field, event) {
        const value = parseFloat(event.currentTarget.value);
        if (isNaN(value)) {
            this.setState({
                [field]: '',
                valid: { ...this.state.valid, [field]: false }
            });
        } else {
            this.setState({
                [field]: value,
                valid: { ...this.state.valid, [field]: value > 0 }
            });
        }
    }

    handleNumericFieldChange(field, event) {
        const value = parseInt(event.currentTarget.value, 10);
        this.setState({
            [field]: value,
            valid: { ...this.state.valid, [field]: value > 0 }
        });
    }

    handleTextualFieldChange(field, event) {
        const value = event.currentTarget.value;
        this.setState({
            [field]: value,
            valid: { ...this.state.valid, [field]: value.length > 0 }
        });
    }

    handleCurrencyFieldBlur(field, event) {
        const isValueValid = parseFloat(event.currentTarget.value) > 0;
        this.setState({
            touched: { ...this.state.touched, [field]: true },
            valid: { ...this.state.valid, [field]: isValueValid }
        });
    }

    handleNumericFieldBlur(field, event) {
        const isValueValid = parseInt(event.currentTarget.value, 10) > 0;
        this.setState({
            touched: { ...this.state.touched, [field]: true },
            valid: { ...this.state.valid, [field]: isValueValid }
        });
    }

    handleTextualFieldBlur(field, event) {
        const isValueValid = event.currentTarget.value.length > 0;
        this.setState({
            touched: { ...this.state.touched, [field]: true },
            valid: { ...this.state.valid, [field]: isValueValid }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const {
            newItemAmount,
            newItemCategoryId,
            newItemUserId,
            newItemCreatedDate,
            newItemDescription
        } = this.state

        const { ...valid } = this.state.valid;

        let item = {
            'amount': newItemAmount,
            'categoryId': newItemCategoryId,
            'createdBy': newItemUserId,
            'createdAt': newItemCreatedDate,
            'description': newItemDescription
        }

        if(valid) {
            incomesApi.create(item)
            .then(response => response.json())
            .then((item) => alert(`Dodano nowy przychód o id: ${item.id}`))
            .then(() => this.setState({
                newItemAmount: '',
                newItemCategoryId: '',
                newItemUserId: '',
                newItemCreatedDate: '',
                newItemDescription: '',
                valid: { ...this.state.valid, [valid]: false },
                disabledSelectOption: false
            }))
            .catch(() => alert('Operacja nie powiodła się. Spróbuj ponownie.'))
        }
    }

    render() {
        const isEnabled = Object.values(this.state.valid).reduce( (aggr, item) => {
	        return aggr && item;
        }, true);

        // TODO function for marking fields errors
        // const shouldShowError = this.state.touched.newItemAmount && (!this.state.valid.newItemAmount);
        // ...

        return(
            <div className="container-fluid">
                <div className="panel panel-default top-spacer">
                    <div className="panel-heading">
                        <h1>Dodaj przychód</h1>
                    </div>
                    <div className="panel-body">
                        <form className="top-spacer" onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group row">
                                <label htmlFor="amount" className="col-sm-2 col-lg-1 col-form-label">Kwota</label>
                                <div className="col-sm-3 col-md-2">
                                    <div className={this.state.touched.newItemAmount && (!this.state.valid.newItemAmount) ? "has-error" : ""}>
                                        <input type="number" step="0.01" min="0" className="form-control" id="amount" placeholder="Wpisz kwotę"
                                            value={this.state.newItemAmount}
                                            onChange={this.handleCurrencyFieldChange.bind(this, 'newItemAmount')}
                                            onBlur={this.handleCurrencyFieldBlur.bind(this, 'newItemAmount')} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label="category"
                                    name="Kategoria"
                                    placeholder="Wybierz"
                                    selectedValue={this.state.newItemCategoryId}
                                    options={this.state.categories}
                                    disabled={this.state.disabledSelectOption}
                                    handleChange={this.handleNumericFieldChange.bind(this, "newItemCategoryId")}
                                    touched={this.state.touched.newItemCategoryId}
                                    valid={this.state.valid.newItemCategoryId}
                                    handleBlur={this.handleNumericFieldBlur.bind(this, "newItemCategoryId")}
                                />
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label="createdBy"
                                    name="Utworzył(a)"
                                    placeholder="Wybierz"
                                    selectedValue={this.state.newItemUserId}
                                    options={this.state.users}
                                    handleChange={this.handleNumericFieldChange.bind(this, "newItemUserId")}
                                    touched={this.state.touched.newItemUserId}
                                    valid={this.state.valid.newItemUserId}
                                    handleBlur={this.handleNumericFieldBlur.bind(this, "newItemUserId")}
                                />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="date" className="col-sm-2 col-lg-1 col-form-label">Data</label>
                                <div className="col-sm-3 col-md-2">
                                    <div className={this.state.touched.newItemCreatedDate && (!this.state.valid.newItemCreatedDate) ? "has-error" : ""}>
                                        <input type="date" className="form-control" id="date" placeholder="Wpisz datę"
                                            value={this.state.newItemCreatedDate}
                                            onChange={this.handleTextualFieldChange.bind(this, 'newItemCreatedDate')}
                                            onBlur={this.handleTextualFieldBlur.bind(this, 'newItemCreatedDate')}
                                        />
                                    </div>
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
                                    <input type="text" className="form-control" id="description" placeholder="Dodaj opis"
                                        value={this.state.newItemDescription}
                                        onChange={this.handleTextualFieldChange.bind(this, 'newItemDescription')} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-1 col-sm-offset-2 col-lg-offset-1 top-spacer right-spacer">
                                    <button type="submit" className="btn btn-info" disabled={isEnabled? '' : "disabled"}>Zapisz i dodaj</button>
                                </div>
                                <div className="col-sm-1 col-sm-offset-1 col-md-offset-0 col-lg-offset-0 top-spacer">
                                    <Link to={'/incomes'}>
                                        <button type="button" className="btn btn-default">Wróć do listy przychodów</button>
                                    </Link>
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
