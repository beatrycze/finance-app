import React from 'react';

const TableHead = () => {
    return(
        <thead>
            <tr>
                <th className="col-sm-1">Lp</th>
                <th className="col-sm-2">Kategoria</th>
                <th className="col-sm-2">Kwota</th>
                <th className="col-sm-2">Utworzył(a)</th>
                <th className="col-sm-2">Data</th>
                <th className="col-sm-2">Akcje</th>
            </tr>
        </thead>
    );
};

export default TableHead;
