import React from 'react';
import PropTypes from 'prop-types';

import TableHead from './TableHead';
import TableRow from './TableRow';

const Table = (props) => {
    return(
        <div className="table-responsive top-spacer">
            <table className="table table-striped table-condensed">
                <TableHead />
                <tbody>
                    {props.items
                        .map((item, index) => {
                            let user = props.users[item.createdBy];
                            let itemData = {
                                ...item,
                                type: props.itemType,
                                index: index + 1,
                                user: user.name,
                                category: props.categories[item.categoryId].name
                            };
                            return <TableRow key={item.id} item={itemData} onDeleteItem={props.onDeleteItem}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    itemType: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    onDeleteItem: PropTypes.func
};

export default Table;
