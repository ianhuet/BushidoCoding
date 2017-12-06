'use strict';

const validator = require('is-my-json-valid');

const getRandomInt = ((min, max) => Math.floor(Math.random() * (max - min + 1)) + min);
function getTodaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}


let curOptions   = ['EUR', 'GBP', 'BTC', 'USD'];
let titleOptions = ['SOCTK', 'FDR', 'GPM', 'TASTAS.PLUS', 'FEW', 'XACS', 'LKG', 'EFWW', 'XXP', 'OTPS', 'DHKS'];


const roiData = {
    'lastUpdated': '01/01/1970',
    'currency': '',
    'roiItems': []
};
const roiItem = {
    'title': '',
    'cost': 0,
    'value': 0
};


module.exports = function (app, db) {

    app.get('/data', (req, res) => {
        
        // clone & configure data object structure
        // clone random number of roiItems
            // add roiItems to rData
        // return rData

        let i, d;
        d = Object.assign({}, roiData);
        d.lastUpdated = getTodaysDate();
        d.currency = curOptions[getRandomInt(0, 3)];
        d.roiItems = [];

        let itemNo = getRandomInt(1, 6);
        for(let x=0; x< itemNo; x++){
            i = Object.assign({}, roiItem);
            i.title = titleOptions[getRandomInt(0,10)];
            i.cost  = getRandomInt(10000, 2000000);
            i.value = getRandomInt(10000, 2000000);
            d.roiItems.push(i);
        }
        res.send(d);
    });

    app.post('/data', (req, res) => {

        // validate POST data
            // is valid JSON?
            // JSON schema matches
            // send appropriate response

        var jsonValidate = validator({
            required: true,
            type: 'object',

            properties: {
                lastUpdated: { type: 'string' },
                currency:    { type: 'string' },
                roiItems:    { type: 'array',
                    items: {
                        type: "object",
                        properties: {
                            title: { type: 'string'  },
                            cost:  { type: 'integer' },
                            value: { type: 'integer' }
                        },
                        required: ["title", "cost", "value"]
                    }
                }
            },
            required: ["lastUpdated", "currency", "roiItems"]
        });


        // console.log(req);
        let json = req.body;

        try {
            if (typeof json != 'object'){
                res.status(406).send('Invalid data - ' + JSON.stringify(json));
            }

            if(jsonValidate(json)) {
                res.status(200).send('JSON accepted');
            }
            else {
                res.status(406).send('Invalid data - ' + JSON.stringify(jsonValidate.errors));
            }
        } catch (e) {
            res.status(500).send('Server Crash - ' + JSON.stringify(json));
        }
    });
};