
module.exports = function (app, db) {

    app.get('/data', (req, res) => {
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

        // create random number of roiItems
            // add roiItems to rData

        // return rData
        res.send(rData);
    });

    app.post('/data', (req, res) => {

        // validate POST data
            // send appropriate response

        res.send('Hello')
    });
};