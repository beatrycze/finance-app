import React from 'react';
import TableHead from './TableHead';

const Incomes = (props) => {
    const tableRows = props.incomes.map((item, index) => {

        const userName = props.users.map(user => {
            if(item.createdBy === user.id) {
                return `${user.firstName} ${user.lastName}`;
            }
            return null;
        });

        const categoryName = props.incomeCategories.map(category => {
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

    return(
        <div className="container-fluid">
            <div className="top-spacer">
                <h1>Lista przychodów</h1>
                <button type="button" className="btn btn-info">Dodaj nowy</button>
                <div className="table-responsive top-spacer">
                    <table className="table table-striped table-condensed">
                        <TableHead />
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Incomes;
