
/*
//sensor 1: sensor de luz
//sensor 2: boton
//sensor 3: proximidad
//sensor 4: temperatura
//sensor 5: 

//actuador 1: led amarillo
//actuador 2: led verde
//actuador 3: sonido speaker timbre
//actuador 4: sonido speaker alarma
//actuador 5: motor ventilador
*/

var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var methodOverride = require("method-override");
var port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/public'));
var router = express.Router();



var five = require("johnny-five"),
  board;
board = new five.Board();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

board.on("ready", function() {
  //Base
  var servo_base = new five.Servo(2);
  //Aticulacion 1
  var servo_1 = new five.Servo(3);
  //Aticulacion 2
  var servo_2 = new five.Servo(4);
  //Pinza
  var servo_pinza = new five.Servo(5);

  servo_base.to(0);
  setTimeout(function() {
    servo_base.to(180);
  }, 3000);





});


var server = http.createServer(app);
server.listen(port, function () {
  console.log('Servidor en puerto '+port);
});
