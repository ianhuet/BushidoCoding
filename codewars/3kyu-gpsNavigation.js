'use strict'

function navigate(numberOfIntersections, roads, start, finish) {

    let node=start, path=null;
    let options=[], route=[], processed=[];

    route.push(node);

    // find all paths starting with node
    while (node !== finish) {

        // find eligible paths
        options = roads.filter(p => p.from == node);

        // find lowest path time
        path = options.reduce((lowest, p) => {
            if(p.to === finish || lowest === null || p.drivingTime < lowest.drivingTime) {
                if (! processed.includes(node)) {
                    lowest = node;
                }
            }
            return lowest;
        }, null);

        // track node as processed
        processed.push(node);

        // add path to route
        console.log(node, path);

        node = path.to;
        route.push(node);
    }

    return route;
}

var roads = [
    {from: 0, to: 1, drivingTime: 5},
    {from: 0, to: 2, drivingTime: 10},
    {from: 1, to: 2, drivingTime: 10},
    {from: 1, to: 3, drivingTime: 2},
    {from: 2, to: 3, drivingTime: 2},
    {from: 2, to: 4, drivingTime: 5},
    {from: 3, to: 2, drivingTime: 2},
    {from: 3, to: 4, drivingTime: 10}
];
console.log(navigate(5, roads, 0, 4));
