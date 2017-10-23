import React from 'react';
import { Link } from 'react-router-dom';

const TableRow = ({item, onDeleteItem}) => {
    return(
        <tr>
            <th scope="row">{item.index}</th>
            <td>{item.category}</td>
            <td>{item.amount}</td>
            <td>{item.user}</td>
            <td>{item.createdAt.slice(0,10)}</td>
            <td><Link to={item.type === 'income' ? '/edit-income/' + item.id : '/edit-outcome/' + item.id}>Edytuj</Link> | <a className="action" onClick={() => onDeleteItem(item.id)}>Usuń</a></td>
        </tr>
    );
}

export default TableRow;
