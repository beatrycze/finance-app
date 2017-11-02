import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { incomesApi } from '../../api/incomesApi';

import Table from '../../components/Table';
import Loader from '../../components/Loader';

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
            items: [],
            users: props.users.asMap(),
            categories: props.categories.asMap()
        };
    }

    componentDidMount() {
        incomesApi.getCollection()
        /* TEMPORARY reducing collection size */
        // TODO pagination
        .then(items => items.slice(0,25))
        .then( items => this.setState({items}) );
    }

/*eslint-disable*/
    deleteIncome(id) {
        confirmPromise(`Czy na pewno chcesz usunąć przychód o id ${id}?`)
//        .catch(() => {}) // TODO
        .then(() => incomesApi.delete(id))
        .then(() => alert('Usunięto'))
        .then(() => incomesApi.getCollection())
        /* TEMPORARY reducing collection size */
        // TODO pagination
        .then(items => items.slice(0,25))
        .then(items => {
            this.setState({items})
        })
    }
/*eslint-enable*/

    render() {
        const { items } = this.state;
        return(
        <div className="container-fluid">
            <div className="top-spacer">
                <h1>Lista przychodów</h1>
                <Link to={'/add-income'}><button type="button" className="btn btn-info">Dodaj nowy</button></Link>
                {
                    !items.length > 0 ? <Loader /> :
                        <Table
                            itemType="income"
                            items={this.state.items}
                            users={this.state.users}
                            categories={this.state.categories}
                            onDeleteItem={this.deleteIncome.bind(this)}
                        />
                }
            </div>
        </div>
        );
    };
}

IncomesList.propTypes = {
    users: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
};

export default IncomesList;
