import React from 'react';
import { Link } from 'react-router-dom';

import Table from '../components/Table';

class IncomesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items,
            users: props.users.asMap(),
            categories: props.categories.asMap()
        };
    }

    render() {
        return(
        <div className="container-fluid">
            <div className="top-spacer">
                <h1>Lista przychodów</h1>
                <Link to={'/add-income'}><button type="button" className="btn btn-info">Dodaj nowy</button></Link>
                <div className="table-responsive top-spacer">
                    <Table
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
