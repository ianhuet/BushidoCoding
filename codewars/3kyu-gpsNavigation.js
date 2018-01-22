'use strict'

function navigate(numberOfIntersections, roads, start, finish) {
    
    const lowestCostNode = (costs, processed) => {
        return costs.reduce((lowest, costVal, i) => {
            if (lowest === null || costs[i] < costs[lowest]) {
                if (! processed.includes(i)) {
                    lowest = i;
                }
            }
            return lowest;
        }, null);
    };
    const getPathOptions = (n) => roads.filter(path => path.from == n);

    let costs=[], parents=[], processed=[];
    let currentNode = start;
    parents[start] = 0;
    costs[start] = 0;

    while (currentNode != null && currentNode != finish) {
        let options = getPathOptions(currentNode);

        options.forEach(opt => {
            let newCost = costs[currentNode] + opt.drivingTime;

            if (! processed.includes(opt.to) && ! costs[opt.to]) {
                costs[opt.to] = newCost;
                parents[opt.to] = currentNode;
            }

            if (! processed.includes(opt.to) && costs[opt.to] > newCost) {
                costs[opt.to] = newCost;
                parents[opt.to] = currentNode;
            }
        });

        processed.push(currentNode);
        currentNode = lowestCostNode(costs, processed);
    }

    if(currentNode == null) {
        return currentNode;
    }
    else {
        let route=[], i=finish;
        while(i != start) {
            route.push(i);
            i = parents[i];
        }
        route.push(i); route.reverse();
        return route;    
    }
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
// var roads = [
//     { from: 0, to: 1, drivingTime: 7 },
//     { from: 0, to: 2, drivingTime: 9 },
//     { from: 0, to: 5, drivingTime: 14 },
//     { from: 2, to: 5, drivingTime: 2 },
//     { from: 2, to: 3, drivingTime: 11 },
//     { from: 5, to: 0, drivingTime: 14 },
//     { from: 5, to: 2, drivingTime: 2 },
//     { from: 5, to: 4, drivingTime: 9 },
//     { from: 4, to: 5, drivingTime: 9 },
//     { from: 4, to: 3, drivingTime: 6 },
//     { from: 3, to: 4, drivingTime: 6 },
//     { from: 3, to: 2, drivingTime: 11 },
//     { from: 3, to: 1, drivingTime: 15 },
//     { from: 1, to: 0, drivingTime: 7 },
//     { from: 1, to: 3, drivingTime: 15 },
//     { from: 1, to: 2, drivingTime: 10 },
//     { from: 2, to: 1, drivingTime: 10 },
//     { from: 2, to: 0, drivingTime: 9 }
// ];
console.log(navigate(6, roads, 0, 5));