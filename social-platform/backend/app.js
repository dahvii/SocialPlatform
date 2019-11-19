const express = require('express');
const config = require('./src/config');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { db } = require('./src/loaders');
const { router } = require('./src/api');
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
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false
    }
}))
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(express.static('www'));
app.use('/', router);

io.on('connection', function (socket) {
    console.log('User connected');
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
    socket.on('save-message', function (data) {
        console.log(data);
        io.emit('new-message', { message: data });
    });
    socket.on('login', function (data) {
        console.log(data)
    })
});


async function startWebServer() {
    server.listen(config.port, () => console.log('Listening on port ' + config.port));
}

db.once('open', () => {
    startWebServer();
})
