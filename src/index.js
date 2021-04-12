require('dotenv').config();
const express = require("express");
const path = require('path');
const cors = require("cors");
const routes = require('./Routes');
const morgan = require('morgan');

const app = express();
const server = require("http").createServer(app);
const functions = require('./Functions');
const Databases = require('./Databases/');
var io = require('socket.io')(server);

//Configurações iniciais (Conectar ao BD, saudar e etc...)
(async() => {
    console.clear();
    functions.InitialMessage();
    await Databases.MongoDB.Connect(process.env.MONGO);
})();

//Proteção de DDOS
app.use(functions.Limiter);

//UrlEnconded
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

//Cors
app.use(cors({
    origin: "*",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    methods: "POST, GET, PUT, DELETE",
}));

//Logs
app.use(morgan('short'));

//Rotas
app.use('/webhook', routes.webhooks);
app.use('/api', routes.api);

app.get('/*', routes.main);

app.use(routes.listeners.notFound);
app.use(routes.listeners.error);

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

// Listenners
server.listen(port, host, ()=>{
    console.log(` - Working at: http://${host}:${port}`);
})

io.on("connection", (socket) => {
    console.log(`Connected socket ${socket.id}`);
});

process.on('SIGINT', async()=>{
    console.clear();
    await Databases.MongoDB.Disconnect();
    console.log(' - Exiting...');
});

//Exportando o método io.emit
exports.emit = function (event, data) {
    return io.emit(event, data);
};

