import React from 'react';

const TableRow = (props) => {

    const userName = `${props.user.firstName} ${props.user.lastName}`;
    const categoryName = props.category.name;

    return(
        <tr key={props.item.id}>
            <th scope="row">{props.index+1}</th>
            <td>{categoryName}</td>
            <td>{props.item.amount}</td>
            <td>{userName}</td>
            <td>{props.item.createdAt.slice(0,10)}</td>
            <td><a href="#">Edytuj</a> | <a href="#">Skasuj</a></td>
        </tr>
    );
}

export default TableRow;
