import React from 'react';
import Table from './Table';

const IncomesList = (props) => {
    return(
        <div className="container-fluid">
            <div className="top-spacer">
                <h1>Lista przychodów</h1>
                <button type="button" className="btn btn-info">Dodaj nowy</button>
                <div className="table-responsive top-spacer">
                    <Table
                        items={props.items}
                        users={props.users}
                        categories={props.categories}
                    />
                </div>
            </div>
        </div>
    );
};

export default IncomesList;
