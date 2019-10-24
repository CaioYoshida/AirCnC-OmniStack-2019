const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

//With this commands we can make connections with http and websocket protocols
const app = express();
const server = http.Server(app);
const io = socketio(server);

//Conexao com o MongoDB Atlas
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-2qe63.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB ok'))
  .catch(err => console.log(`Error: ${err}`));

//We create an object to storage all the connectedUsers and their connections' socket_id's in object's attributes
const connectedUsers = {};

//With this command the app will discover wich users are connected to app at certainly moment
// "io.on('connection', socket => {" is the command to make a websocket connectio
io.on('connection', socket => {
  //The user_id sent by frontend is storaged in the variable "user_id" by "socket.handshake.query" wich access query parameters
  const {user_id} = socket.handshake.query;
  //This line below makes a relationship between the user_id's number and the socket.id's connection number
  connectedUsers[user_id] = socket.id;
});

//This middleware makes some Global Variables wich will be available for the whole application
app.use((req, res, next) => {
  //Global variable created
  req.io = io;
  //Another global variable created
  req.connectedUsers = connectedUsers;

  return next();
})

//GET, POST, PUT, DELETE

// req.query = acessar query params (para filtros)
// req.params = acessar route params (para edição e delete)
// req.body = acessar corpo da requisição (para criação e edição)

app.use(cors());

app.use(express.json())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads' )));

//app.use(routes) deve vir depois de app.use(express.json())
app.use(routes)

server.listen(3333);