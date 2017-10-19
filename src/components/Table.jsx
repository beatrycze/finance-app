import React from 'react';
import TableHead from './TableHead';
import TableRow from './TableRow';

const Table = (props) => {
    const usersMap = props.users.reduce( (aggr, user) => {
        if( !(user.id in aggr) ) {
            aggr[user.id] = {};
        }
        aggr[user.id] = user;
        return aggr;
    }, {});
    
    const categoriesMap = props.categories.reduce( (aggr, category) => {
        if( !(category.id in aggr) ) {
            aggr[category.id] = {};
        }
        aggr[category.id] = category;
        return aggr;
    }, {});

    return(
        <table className="table table-striped table-condensed">
            <TableHead />
            <tbody>
                {props.items.map((item, index) => {
                    return(
                        <TableRow
                            index={index}
                            item={item}
                            user={usersMap[item.createdBy]}
                            category={categoriesMap[item.categoryId]}
                        />
                    )})
                }
            </tbody>
        </table>
    );
};

export default Table;
