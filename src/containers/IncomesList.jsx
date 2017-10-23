import React from 'react';
import { Link } from 'react-router-dom';

import { incomesApi } from '../api/incomesApi';
import Table from '../components/Table';

// TODO: https://eslint.org/docs/user-guide/configuring
/*eslint-disable*/
const confirmPromise = (msg) =>
    new Promise((res, rej) => {
        confirm(msg) ? res() : rej()
    });
/*eslint-enable*/

class IncomesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items,
            users: props.users.asMap(),
            categories: props.categories.asMap()
        };
    }

/*eslint-disable*/
    deleteIncome(id) {
        confirmPromise(`Czy na pewno chcesz wywalić inkom ${id}?`)
//        .catch(() => {}) // TODO o.O
        .then(() => incomesApi.delete(id))
        .then(() => alert('Usunięto'))
        .then(() => incomesApi.get())
        .then(items => {
            this.setState({items})
        })
    }
/*eslint-enable*/

    render() {
        return(
        <div className="container-fluid">
            <div className="top-spacer">
                <h1>Lista przychodów</h1>
                <Link to={'/add-income'}><button type="button" className="btn btn-info">Dodaj nowy</button></Link>
                <div className="table-responsive top-spacer">
                    <Table
                        onDeleteItem={this.deleteIncome.bind(this)}
                        itemType={this.props.itemType}
                        items={this.state.items}
                        users={this.state.users}
                        categories={this.state.categories}
                    />
                </div>
            </div>
        </div>
        );
    };
}

export default IncomesList;
