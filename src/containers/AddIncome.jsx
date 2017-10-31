import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { incomesApi } from '../api/incomesApi';

import '../styles/Forms.css';

import Select from '../components/Select';

class AddIncome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users.asList(),
            categories: props.categories.asList(),
            newItem: {
                amount: '',
                categoryId: 0,
                userId: 0,
                createdDate: '',
                description: '',
            },
            touched: {
                amount: false,
                categoryId: false,
                userId: false,
                createdDate: false,
            },
            valid: {
                amount: false,
                categoryId: false,
                userId: false,
                createdDate: false,
            },
            disabledSelectOption: false
        };
    }

    handleCurrencyFieldChange(field, event) {
        const value = parseFloat(event.currentTarget.value);
        if (isNaN(value)) {
            this.setState({
                newItem: { ...this.state.newItem, [field]: '' },
                valid: { ...this.state.valid, [field]: false }
            });
        } else {
            this.setState({
                newItem: { ...this.state.newItem, [field]: value },
                valid: { ...this.state.valid, [field]: value > 0 }
            });
        }
    }

    handleNumericFieldChange(field, event) {
        const value = parseInt(event.currentTarget.value, 10);
        this.setState({
            newItem: { ...this.state.newItem, [field]: value },
            valid: { ...this.state.valid, [field]: value > 0 }
        });
    }

    handleTextualFieldChange(field, event) {
        const value = event.currentTarget.value;
        this.setState({
            newItem: { ...this.state.newItem, [field]: value },
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
        const { newItem, valid } = this.state;

        let item = {
            'amount': newItem.amount,
            'categoryId': newItem.categoryId,
            'createdBy': newItem.userId,
            'createdAt': newItem.createdDate,
            'description': newItem.description
        }

        if(valid) {
            incomesApi.create(item)
            .then(response => response.json())
            .then((item) => alert(`Dodano nowy przychód o id: ${item.id}`))
            .then(() => this.setState({
                newItem: { ...newItem, amount: '', categoryId: 0, userId: 0, createdDate: '', description: '' }, //?
                valid: { ...valid, [valid]: false },
                disabledSelectOption: false
            }))
            .catch(() => alert('Operacja nie powiodła się. Spróbuj ponownie.'))
        }
    }

    markError = (fieldTouched, fieldValid) => {
        const shouldShowError = fieldTouched && !fieldValid;
        if(shouldShowError) {
            return "has-error";
        } else {
            return "";
        }
    }

    render() {
        const { users, categories, newItem, touched, valid, disabledSelectOption } = this.state;

        const isEnabled = Object.values(valid).reduce( (aggr, item) => {
	        return aggr && item;
        }, true);

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
                                    <div className={this.markError(touched.amount, valid.amount)}>
                                        <input type="number" step="0.01" min="0" className="form-control" id="amount" placeholder="Wpisz kwotę"
                                            value={newItem.amount}
                                            onChange={this.handleCurrencyFieldChange.bind(this, 'amount')}
                                            onBlur={this.handleCurrencyFieldBlur.bind(this, 'amount')} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label="category"
                                    name="Kategoria"
                                    placeholder="Wybierz"
                                    selectedValue={newItem.categoryId}
                                    options={categories}
                                    disabled={disabledSelectOption}
                                    handleChange={this.handleNumericFieldChange.bind(this, "categoryId")}
                                    touched={touched.categoryId}
                                    valid={valid.categoryId}
                                    handleBlur={this.handleNumericFieldBlur.bind(this, "categoryId")}
                                    markError={this.markError}
                                />
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label="createdBy"
                                    name="Utworzył(a)"
                                    placeholder="Wybierz"
                                    selectedValue={newItem.userId}
                                    options={users}
                                    handleChange={this.handleNumericFieldChange.bind(this, "userId")}
                                    touched={touched.userId}
                                    valid={valid.userId}
                                    handleBlur={this.handleNumericFieldBlur.bind(this, "userId")}
                                    markError={this.markError}
                                />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="date" className="col-sm-2 col-lg-1 col-form-label">Data</label>
                                <div className="col-sm-3 col-md-2">
                                    <div className={this.markError(touched.createdDate, valid.createdDate)}>
                                        <input type="date" className="form-control" id="date" placeholder="Wpisz datę"
                                            value={newItem.createdDate}
                                            onChange={this.handleTextualFieldChange.bind(this, 'createdDate')}
                                            onBlur={this.handleTextualFieldBlur.bind(this, 'createdDate')}
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
                                        value={newItem.description}
                                        onChange={this.handleTextualFieldChange.bind(this, 'description')} />
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

AddIncome.propTypes = {
    users: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
};

export default AddIncome;
