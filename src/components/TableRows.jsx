import React from 'react';

const TableRows = (props) => {
    const tableRows = props.dataTypes.map((item, index) => {

        const userName = props.users.map(user => {
            if(item.createdBy === user.id) {
                return `${user.firstName} ${user.lastName}`;
            }
            return null;
        });

        const categoryName = props.dataTypesCategories.map(category => {
            if(item.categoryId === category.id) {
                return category.name;
            }
            return null;
        });

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
