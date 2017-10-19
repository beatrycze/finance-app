import React from 'react';
import Table from './Table';

const OutcomesList = (props) => {
    return(
        <div className="container-fluid">
            <div className="top-spacer">
                <h1>Lista wydatków</h1>
                <button type="button" className="btn btn-info">Dodaj nowy</button>
                <div className="table-responsive top-spacer">
                    <Table
                        dataTypes={props.dataTypes}
                        users={props.users}
                        dataTypesCategories={props.dataTypesCategories}
                    />
                </div>
            </div>
        </div>
    );
};

export default OutcomesList;
