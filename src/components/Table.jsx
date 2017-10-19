import React from 'react';
import TableHead from './TableHead';
import TableRows from './TableRows';

const Table = (props) => {
    return(
        <table className="table table-striped table-condensed">
            <TableHead />
            <tbody>
                <TableRows 
                    dataTypes={props.dataTypes}
                    users={props.users}
                    dataTypesCategories={props.dataTypesCategories}
                />
            </tbody>
        </table>
    );
};

export default Table;
