import React from 'react';

const TableRow = ({item}) => {
    return(
        <tr key={item.id}>
            <th scope="row">{item.index}</th>
            <td>{item.category}</td>
            <td>{item.amount}</td>
            <td>{item.user}</td>
            <td>{item.createdAt.slice(0,10)}</td>
            <td><a href="#">Edytuj</a> | <a href="#">Skasuj</a></td>
        </tr>
    );
}

export default TableRow;
