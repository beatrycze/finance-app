import React from 'react';

const TableRows = (props) => {
    const tableRows = props.dataTypes.map((item, index) => {

        const user = props.users.find(user => item.createdBy === user.id);
        const userName = `${user.firstName} ${user.lastName}`;

        const category = props.dataTypesCategories.find(category => item.categoryId === category.id);
        const categoryName = category.name;

        return(
            <tr key={item.id}>
                <th scope="row">{index+1}</th>
                <td>{categoryName}</td>
                <td>{item.amount}</td>
                <td>{userName}</td>
                <td>{item.createdAt.slice(0,10)}</td>
                <td><a href="#">Edytuj</a> | <a href="#">Skasuj</a></td>
            </tr>
        );
    });

    return tableRows;
}

export default TableRows;
