var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Kafka = require('no-kafka');
var debug = require('debug')
var dividaController = require('../domain/divida/divida.controller');
var cors = require('cors');
var bodyParser = require('body-parser');
var divida = require('../domain/divida/divida.routes');
var path = require('path');

app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/divida/', divida);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


io.on('connection', (socket) => {
  console.log('USER CONNECTED');
 
  socket.on('disconnect', function () {
    console.log('USER DISCONNECTED');
  });

});

http.listen(3000, () => {
  console.log('started on port 3000');
  var consumer = new Kafka.SimpleConsumer({
    clientId: 'no-kafka-client',
  });
  var dataHandler = function (messageSet, topic, partition) {
    messageSet.forEach(function (m) {
      if (topic == 'divida-criada-v1') {
        var dividaSalva = dividaController.salvarDivida(m.message.value.toString('utf8'));
        if(dividaSalva){
          io.emit('divida-criada-v1', {'dividaSalva': true})
        }else{
          console.log('Não foi possivel salvarDivida, verifique se o tópico está no padrão')
        }

      }
    });
  };
  return consumer.init().then(function () {
    return consumer.subscribe('divida-criada-v1', [0, 1], dataHandler);
  });
});
http.on('error', onError);
http.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = http.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;