const express = require('express');
const config = require('./src/config');
const app = express();
const {db} = require('./src/loaders');
const {router} = require('./src/api');
const session = require('express-session');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json({limit:'50mb'}));
// app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(express.static('www'));
app.use('/', router);


async function startWebServer() {
    app.listen(config.port, () => console.log('Listening on port ' + config.port));     
}

db.once('open', () => {
    startWebServer();
})
