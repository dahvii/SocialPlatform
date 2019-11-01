const express = require('express');
const config = require('./src/config');
const app = express();
const {db} = require('./src/loaders');
const {router} = require('./src/api');
const session = require('express-session');
const MongoDBstore = require('connect-mongodb-session')(session);

const mongoDBstore = new MongoDBstore({
    uri: config.databaseURL,
    collection: 'mySessions'
});

app.use(session({
    secret: 'social-secret',
    resave: false,
    saveUninitialized: true,
    store: mongoDBstore,
    cookie: {
        maxAge: 1000*60*60,
        secure: false
    }
}))

app.use(express.json());
app.use(express.static('www'));
app.use('/', router);


async function startWebServer() {
    app.listen(config.port, () => console.log('Listening on port ' + config.port));     
}

db.once('open', () => {
    startWebServer();
})
