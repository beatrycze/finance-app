import React from 'react';
import TableHead from './TableHead';
import TableRow from './TableRow';

const Table = (props) => {
    return(
        <table className="table table-striped table-condensed">
            <TableHead />
            <tbody>
                {props.items
                    .map((item, index) => {
                        let user = props.users[item.createdBy];
                        let itemData = Object.assign({}, item, {
                            type: props.itemType,
                            index: index + 1,
                            user: user ? `${user.firstName} ${user.lastName}` : 'o.O',
                            category: props.categories ? props.categories[item.categoryId].name : 'o.O'
                        });
                        return <TableRow key={item.id} item={itemData} onDeleteItem={props.onDeleteItem}/>
                    })
                }
            </tbody>
        </table>
    );
};

export default Table;
