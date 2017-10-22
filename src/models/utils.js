export function wrap(list){
    const map = list.reduce( (aggr, item) => {
        if( !(item.id in aggr) ) {
            aggr[item.id] = {};
        }
        aggr[item.id] = item;
        return aggr;
    }, {});

    return {
        asList: () => list,
        asMap: () => map
    }
}
