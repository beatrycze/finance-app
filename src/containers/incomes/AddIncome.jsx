import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { incomesApi } from '../../api/incomesApi';

import '../../styles/Forms.css';

import Select from '../../components/Select';

const setNewItem = () => ({
        amount: '',
        categoryId: 0,
        userId: 0,
        createdDate: '',
        description: ''
});

const setTouchedField = () => ({
        amount: false,
        categoryId: false,
        userId: false,
        createdDate: false
});

const setValidField = () => ({
        amount: false,
        categoryId: false,
        userId: false,
        createdDate: false
});

class AddIncome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users.asList(),
            categories: props.categories.asList(),
            newItem: setNewItem(),
            touched: setTouchedField(),
            valid: setValidField(),
            disabledSelectOption: false,
            rememberDate: false
        };
    }

    handleCurrencyFieldChange(event) {
        const value = parseFloat(event.currentTarget.value);
        const name = event.currentTarget.name;
        this.setState({
            newItem: isNaN(value) ? { ...this.state.newItem, [name]: '' } : { ...this.state.newItem, [name]: value },
            valid: { ...this.state.valid, [name]: value > 0 }
        });
    }

    handleNumericFieldChange(event) {
        const value = parseInt(event.currentTarget.value, 10);
        const name = event.currentTarget.name;
        this.setState({
            newItem: { ...this.state.newItem, [name]: value },
            valid: { ...this.state.valid, [name]: value > 0 }
        });
    }

    handleTextualFieldChange(event) {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        this.setState({
            newItem: { ...this.state.newItem, [name]: value },
            valid: { ...this.state.valid, [name]: value.length > 0 }
        });
    }

    handleCheckboxChange(event) {
        const value = event.currentTarget.checked;
        const name = event.currentTarget.name;
        this.setState({
            [name]: value
        });
    }

    handleCurrencyFieldBlur(event) {
        const isValueValid = parseFloat(event.currentTarget.value) > 0;
        const name = event.currentTarget.name;
        this.setState({
            touched: { ...this.state.touched, [name]: true },
            valid: { ...this.state.valid, [name]: isValueValid }
        });
    }

    handleNumericFieldBlur(event) {
        const isValueValid = parseInt(event.currentTarget.value, 10) > 0;
        const name = event.currentTarget.name;
        this.setState({
            touched: { ...this.state.touched, [name]: true },
            valid: { ...this.state.valid, [name]: isValueValid }
        });
    }

    handleTextualFieldBlur(event) {
        const isValueValid = event.currentTarget.value.length > 0;
        const name = event.currentTarget.name;
        this.setState({
            touched: { ...this.state.touched, [name]: true },
            valid: { ...this.state.valid, [name]: isValueValid }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { newItem, valid } = this.state;

        let item = {
            amount: newItem.amount,
            categoryId: newItem.categoryId,
            createdBy: newItem.userId,
            createdAt: newItem.createdDate,
            description: newItem.description
        }

        if(valid) {
            incomesApi.create(item)
            .then(response => response.json())
            .then((item) => alert(`Dodano nowy przychód o id: ${item.id}`))
            .then(() => {
                if(this.state.rememberDate) {
                    this.setState({
                        newItem: { ...setNewItem(), createdDate: item.createdAt },
                        touched: setTouchedField(),
                        valid: { ...setValidField(), createdDate: true },
                        disabledSelectOption: false
                    })
                } else {
                    this.setState({
                        newItem: setNewItem(),
                        touched: setTouchedField(),
                        valid: setValidField(),
                        disabledSelectOption: false
                    })
                }
            })
            .catch(() => alert('Operacja nie powiodła się. Spróbuj ponownie.'))
        }
    }

    markError = (fieldTouched, fieldValid) => {
        const shouldShowError = fieldTouched && !fieldValid;
        return shouldShowError ? "has-error" : "";
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
                                        <input className="form-control" type="number" name="amount" step="0.01" min="0" id="amount" placeholder="Wpisz kwotę"
                                            value={newItem.amount}
                                            onChange={this.handleCurrencyFieldChange.bind(this)}
                                            onBlur={this.handleCurrencyFieldBlur.bind(this)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label="category"
                                    labelDisplay="Kategoria"
                                    name="categoryId"
                                    placeholder="Wybierz"
                                    disabled={disabledSelectOption}
                                    selectedValue={newItem.categoryId}
                                    options={categories}
                                    touched={touched.categoryId}
                                    valid={valid.categoryId}
                                    handleChange={this.handleNumericFieldChange.bind(this)}
                                    handleBlur={this.handleNumericFieldBlur.bind(this)}
                                    markError={this.markError}
                                />
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label="createdBy"
                                    labelDisplay="Utworzył(a)"
                                    name="userId"
                                    placeholder="Wybierz"
                                    disabled={disabledSelectOption}
                                    selectedValue={newItem.userId}
                                    options={users}
                                    touched={touched.userId}
                                    valid={valid.userId}
                                    handleChange={this.handleNumericFieldChange.bind(this)}
                                    handleBlur={this.handleNumericFieldBlur.bind(this)}
                                    markError={this.markError}
                                />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="date" className="col-sm-2 col-lg-1 col-form-label">Data</label>
                                <div className="col-sm-3 col-md-2">
                                    <div className={this.markError(touched.createdDate, valid.createdDate)}>
                                        <input className="form-control" type="date" name="createdDate" id="date" placeholder="Wpisz datę"
                                            value={newItem.createdDate}
                                            onChange={this.handleTextualFieldChange.bind(this)}
                                            onBlur={this.handleTextualFieldBlur.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="checkbox col-sm-3 col-sm-offset-2 col-lg-offset-1">
                                    <label>
                                    <input type="checkbox" name="rememberDate"
                                        disabled={valid.createdDate ? "" : "disabled"}
                                        checked={this.state.rememberDate}
                                        onChange={this.handleCheckboxChange.bind(this)}
                                    /> Zapamiętaj datę
                                    </label>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-2 col-lg-1 col-form-label">Opis</label>
                                <div className="col-sm-6 col-md-4">
                                    <input className="form-control" type="text" name="description" id="description" placeholder="Dodaj opis"
                                        value={newItem.description}
                                        onChange={this.handleTextualFieldChange.bind(this)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-1 col-sm-offset-2 col-lg-offset-1 top-spacer right-spacer">
                                    <button type="submit" className="btn btn-info" disabled={isEnabled ? "" : "disabled"}>Zapisz i dodaj</button>
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
