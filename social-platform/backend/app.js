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

const allSockets = {}
const socketIdUserId = {}

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);
    socket.on('login', (data) => {
        allSockets[data.id] = socket;
        socketIdUserId[socket.id] = data.id
    })
    socket.on('testtest', function (data) {
        io.emit('testtest2', { message: data })
        // io.to('5dd3ae4eb57aaa4208800660').emit('testtest2', 'kooo')
        // io.to('5dd3ae4eb57aaa4208800660').emit('testtest2', "blabla");
        console.log(data)
    })
    socket.on('new-message', (data) => {
        console.log(data.newMessage.receiver)
        console.log(allSockets)
        // allSockets[data.newMessage.receiver].emit('update-messages', data.newMessage)
        // io.emit('update-messages', data)
    })
    socket.on('disconnect', () => {
        delete allSockets[socketIdUserId[socket.id]]
        console.log('User disconnected');
    });
});


async function startWebServer() {
    server.listen(config.port, () => console.log('Listening on port ' + config.port));
}

db.once('open', () => {
    startWebServer();
})
