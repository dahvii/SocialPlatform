const express = require('express');
const config = require('./src/config');
const app = express();
const {db} = require('./src/loaders');
const {router} = require('./src/api');

app.use(express.json());
app.use(express.static('www'));
app.use('/', router);

async function startWebServer() {
    app.listen(config.port, () => console.log('Listening on port ' + config.port));     
}

db.once('open', () => {
    startWebServer();
})
