const express = require('express');
const consign = require('consign');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid/v4');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());

// Set env
app.env = process.env.NODE_ENV.trim();

// Apply .env in process.env
dotenv.config();

// Moment config
const moment = require('moment');
require('moment/locale/pt-br');

// Modulo do body-parser
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(bodyParser.json({ limit: '20mb' }));

moment.locale('pt-BR');
app.moment = moment;

consign({ cwd: 'src' })
  .include('db.js')
  .then('repositories')
  .then('controllers')
  .then('routes')
  .into(app);

// Startup the server
server.listen(3000, () => {
  console.log('Serviço: API | Porta: 3000');
});

app.socket = {
  clients: [],
};

io.sockets.on('connection', (client) => {
  client.uuid = uuid();
  app.socket.clients.push(client);
  client.on('disconnect', () => {
    app.socket.clients = app.socket.clients.filter(c => c.uuid !== client.uuid);
  });
});

module.exports = app;
