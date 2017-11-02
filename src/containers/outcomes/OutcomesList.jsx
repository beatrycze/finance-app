import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { outcomesApi } from '../../api/outcomesApi';

import Table from '../../components/Table';
import Loader from '../../components/Loader';

class OutcomesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            users: props.users.asMap(),
            categories: props.categories.asMap()
        };
    }

    componentDidMount() {
        outcomesApi.getCollection()
        /* TEMPORARY reducing collection size */
        // TODO pagination
        .then(items => items.slice(0,25))
        .then( items => this.setState({items}) );
    }

    render() {
        const { items } = this.state;
        return(
        <div className="container-fluid">
            <div className="top-spacer">
                <h1>Lista przychodów</h1>
                <Link to={'/add-outcome'}><button type="button" className="btn btn-info">Dodaj nowy</button></Link>
                {
                    !items.length > 0 ? <Loader /> :
                        <Table
                            itemType="outcome"
                            items={this.state.items}
                            users={this.state.users}
                            categories={this.state.categories}
                        />
                }
            </div>
        </div>
        );
    };
}

OutcomesList.propTypes = {
    users: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
};

export default OutcomesList;
