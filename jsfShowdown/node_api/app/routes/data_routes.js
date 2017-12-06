'use strict';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let curOptions   = ['EUR', 'GBP', 'BTC', 'USD'];
let titleOptions = ['SOCTK', 'FDR', 'GPM', 'TASTAS.PLUS', 'FEW', 'XACS', 'LKG', 'EFWW', 'XXP', 'OTPS', 'DHKS'];


module.exports = function (app, db) {

    app.get('/data', (req, res) => {
        
        // outline data object structure
        // create random number of roiItems
            // add roiItems to rData
        // return rData

        const rData = {
            'lastUpdated': '01/01/1970',
            'currency'   : '',
            'roiItems'   : []
        };
        const roiItem = {
            'title' : '', 
            'cost'  : 0,
            'value' : 0
        };

        rData.currency = curOptions[getRandomInt(0, 3)];

        let i, itemNo = getRandomInt(1, 6);
        for(let x=0; x< itemNo; x++){
            i = Object.assign({}, roiItem);
            i.title = titleOptions[getRandomInt(0,10)];
            i.cost  = getRandomInt(10000, 2000000);
            i.value = getRandomInt(10000, 2000000);
            rData.roiItems.push(i);
        }
        res.send(rData);
    });

    app.post('/data', (req, res) => {

        // validate POST data
            // send appropriate response

        res.send('Hello')
    });
};