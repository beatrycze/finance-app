import React from 'react';
import { Link } from 'react-router-dom';
import Select from '../components/Select';
import '../styles/Forms.css';

class EditOutcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: props.users.asList(),
            usersMap: props.users.asMap(),
            categoriesList: props.categories.asList(),
            categoriesMap: props.categories.asMap(),
            items: props.items,
            item: {
                id: '',
                categoryId: '',
                amount: '',
                createdAt: '',
                createdBy: '',
                description: ''
            },
        };
    }

    componentDidMount() {
        const id = this.props.match.params.itemId;

        const item = this.state.items.find(item => item.id === parseInt(id, 10));
        const itemCategoryId = this.state.categoriesMap[item.categoryId].name;
        const user = this.state.usersMap[item.createdBy];
        const itemCreatedBy = `${user.firstName} ${user.lastName}`;

        this.setState({
            item: {
                id: item.id,
                categoryId: itemCategoryId,
                amount: item.amount,
                createdAt: item.createdAt.slice(0,10),
                createdBy: itemCreatedBy,
                description: item.description
            },
        });
    }

    render() {
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
                                    <input type="text" className="form-control" id="outcomeId" placeholder="" value={this.state.item.id} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="amount" className="col-sm-2 col-lg-1 col-form-label">Kwota</label>
                                <div className="col-sm-3 col-md-2">
                                    <input type="text" className="form-control" id="amount" placeholder="Wpisz kwotę" value={this.state.item.amount} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label={"category"}
                                    name={"Kategoria"}
                                    selectValue={this.state.item.categoryId}
                                    options={this.state.categoriesList}
                                />
                            </div>
                            <div className="form-group row">
                                <Select 
                                    label={"createdBy"}
                                    name={"Utworzył(a)"}
                                    selectValue={this.state.item.createdBy}
                                    options={this.state.usersList}
                                />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="date" className="col-sm-2 col-lg-1 col-form-label">Data</label>
                                <div className="col-sm-3 col-md-2">
                                    <input type="text" className="form-control" id="date" placeholder="Wpisz datę" value={this.state.item.createdAt}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-2 col-lg-1 col-form-label">Opis</label>
                                <div className="col-sm-6 col-md-4">
                                    <input type="text" className="form-control" id="description" placeholder="Dodaj opis" value={this.state.item.description}/>
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
