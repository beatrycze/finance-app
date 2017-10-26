import React from 'react';
import { Link } from 'react-router-dom';
import Select from '../components/Select';
import '../styles/Forms.css';

import {outcomesApi} from '../api/outcomesApi';

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
            categoryName: '',
            amount: '',
            createdDate: '',
            userId: '',
            userName: '',
            description: ''
        };
    }

    handleFieldChange(field, event) {
        const value = event.currentTarget.value;
        this.setState({
            [field]: value
            // TODO validation
        });
    }

    componentDidMount() {
        const id = this.state.itemId;

        outcomesApi.getItem(id)
        .then(item => {
            item.categoryName = this.state.categoriesMap[item.categoryId].name;
            item.userName = this.state.usersMap[item.createdBy].name;
            item.createdDate = item.createdAt.slice(0,10);
            return item;
        })
        .then( item => this.setState({
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            amount: item.amount,
            createdDate: item.createdDate,
            userId: item.createdBy,
            userName: item.userName,
            description: item.description
        }));
    }

    render() {
        if (!this.state.categoryName) {
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
                            <div className="form-group row hidden">
                                <label htmlFor="outcomeId" className="col-sm-2 col-lg-1 col-form-label">Id</label>
                                <div className="col-sm-3 col-md-2">
                                    <input type="text" className="form-control" id="outcomeId" placeholder="" defaultValue={this.state.itemId} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="amount" className="col-sm-2 col-lg-1 col-form-label">Kwota</label>
                                <div className="col-sm-3 col-md-2">
                                    <input type="text" className="form-control" id="amount" placeholder="Wpisz kwotę" value={this.state.amount} onChange={this.handleFieldChange.bind(this, 'amount')} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label={"category"}
                                    name={"Kategoria"}
                                    selectedValue={this.state.categoryId}
                                    options={this.state.categoriesList}
                                />
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label={"createdBy"}
                                    name={"Utworzył(a)"}
                                    selectedValue={this.state.userId}
                                    options={this.state.usersList}
                                />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="date" className="col-sm-2 col-lg-1 col-form-label">Data</label>
                                <div className="col-sm-3 col-md-2">
                                    <input type="text" className="form-control" id="date" placeholder="Wpisz datę" value={this.state.createdDate} onChange={this.handleFieldChange.bind(this, 'createdDate')} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-2 col-lg-1 col-form-label">Opis</label>
                                <div className="col-sm-6 col-md-4">
                                    <input type="text" className="form-control" id="description" placeholder="Dodaj opis" value={this.state.description} onChange={this.handleFieldChange.bind(this, 'description')} />
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

export default EditOutcome;
