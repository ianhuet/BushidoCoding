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

module.exports = {
    navigate
}