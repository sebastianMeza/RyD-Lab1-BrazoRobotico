
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


function timeout(range, time, callback){
    var i = range[0];                
    callback(i);
    Loop();
    function Loop(){
        setTimeout(function(){
            i= i + 5;
            if (i<=range[1]){
                callback(i);
                Loop();
            }
        }, time*1000)
    } 
}

function timeout_pinza(range, time, callback){
    var i = range[0];                
    callback(i);
    Loop();
    function Loop(){
        setTimeout(function(){
            i= i + 10;
            if (i<=range[1]){
                callback(i);
                Loop();
            }
        }, time*500)
    } 
}





board.on("ready", function() {
  //Base
  var servo_base = new five.Servo({
    pin: 2,
    type: "continuous"
  });
  //Aticulacion 1
  var servo_1 = new five.Servo({
    pin: 3,
    type: "continuous"    
  });
  //Aticulacion 2
  var servo_2 = new five.Servo({
    pin: 4,
    type: "continuous"    
  });
  //Pinza
  var servo_pinza = new five.Servo({
    pin: 5,
    type: "continuous"    
  });
  //base inicial=90, 0 y 180
  //art1 inicial= ,atras=60, adelante=;
  //pinza inicial= 180, 90= cerrado, 180= abierto
	
  servo_base.to(85);
	servo_1.to(30);
	servo_2.to(145);
	servo_pinza.to(0);


  app.post('/valor_pinza', function(req, res) {
    var valor = req.body.estado;
    console.log("Valor pinza: "+valor);
    servo_pinza.to(valor);
    res.status(200).end();
  });

  app.post('/valor_base', function(req, res) {
    var valor = req.body.estado;
    console.log("Valor base: "+valor);
    servo_base.to(valor);
    res.status(200).end();
  });

  app.post('/valor_art1', function(req, res) {
    var valor = req.body.estado;
    console.log("Valor art1: "+valor);
    servo_1.to(valor);
    res.status(200).end();
  });

  app.post('/valor_art2', function(req, res) {
    var valor = req.body.estado;
    console.log("Valor art2: "+valor);
    servo_2.to(valor);
    res.status(200).end();
  });

    /*
    setTimeout(function() {
      servo_pinza.to(160);
    }, 3000);
  */
  app.post('/iniciar', function(req, res) {
    console.log("Iniciando rutina");
    //responder al html
    res.status(200).end();
  
    //VALORES INICIALES  
    servo_base.to(85);
    servo_1.to(30);
    servo_2.to(145);
    servo_pinza.to(0);

    setTimeout(function(){
      mover_pos1_piso3();
      console.log("mover pos1");
    }, 1000);
    setTimeout(function(){
      mover_volver();
      console.log("mover volver");
    }, 20*1000);

    setTimeout(function(){
      servo_base.to(90);
    }, 20*1000);


  });


function mover_pos1_piso3(){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    servo_pinza.to(90);
    servo_base.to(108);
  }, 1000);

  //con 'i' desde 30 a 115 en intervalos de 1 segundo
  timeout([30, 95], 1, function(i){
    servo_1.to(i);
    //console.log("servo_1: "+i);
  });
  timeout([115, 145], 1, function(i){
    servo_2.to(115+145-i);
    //console.log("servo_2: "+(115+145-i));
  });
  //pinza cerrar
  setTimeout(function(){
    timeout_pinza([0, 90], 1, function(i){
      servo_pinza.to(90-i);
      //console.log("pinza: "+(90-i));
    });
  }, 14*1000);
}

function mover_volver(){
  //RUTINA DEMORA 13 SEGUNDOS
  //con 'i' desde 30 a 115 en intervalos de 1 segundo
  console.log("entro en volver");
  timeout([30, 95], 1, function(i){
    servo_1.to(30+95-i);
    //console.log("servo_1: "+(30+90-i));
  });
  timeout([115, 145], 1, function(i){
    servo_2.to(i);
    //console.log("servo_2: "+(i));
  });
}


});

var server = http.createServer(app);
server.listen(port, function () {
  console.log('Servidor en puerto '+port);
});

/*
VALORES PARA SERVO:
INICIAL:
  servo_base.to(85);
  servo_1.to(30);
  servo_2.to(145);
  servo_pinza.to(0);

PUNTO 1 - PISO 3:
  servo_base.to(105);
  servo_1.to(95);
  servo_2.to(105);
  servo_pinza.to(0);






*/




