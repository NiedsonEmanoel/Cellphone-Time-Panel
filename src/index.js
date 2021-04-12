require('dotenv').config();

//Imports
const express = require("express");
const path = require('path');
const cors = require("cors");
const morgan = require('morgan');

//Indexadores
const Functions = require('./Functions');
const Databases = require('./Databases/');
const Routes = require('./Routes');

//Servidor
const App = express();
const Server = require("http").createServer(App);
const Io = require('socket.io')(Server);
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

//Configurações iniciais (Conectar ao BD, saudar e etc...)
(async() => {
    console.clear();
    Functions.InitialMessage();
    await Databases.MongoDB.Connect(process.env.MONGO);
})();

//Proteção de DDOS
App.use(Functions.Limiter);

//UrlEnconded
App.use(express.json({ limit: '20mb' }));
App.use(express.urlencoded({ extended: false, limit: '20mb' }));

//Cors
App.use(cors({
    origin: "*",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    methods: "POST, GET, PUT, DELETE",
}));

//Logs
App.use(morgan('short'));

//Rotas
App.use('/webhook', Routes.webhooks);
App.use('/api', Routes.api);
App.get('/*', Routes.main);

//Listenners
App.use(Routes.listeners.notFound);
App.use(Routes.listeners.error);

Server.listen(port, host, ()=>{
    console.log(` - Working at: http://${host}:${port}`);
})

Io.on("connection", (socket) => {
    console.log(`Connected socket ${socket.id}`);
});

process.on('SIGINT', async()=>{
    console.clear();
    await Databases.MongoDB.Disconnect();
    console.log(' - Exiting...');
});

//Exportando o método Io.emit
exports.emit = function (event, data) {
    return Io.emit(event, data);
};

