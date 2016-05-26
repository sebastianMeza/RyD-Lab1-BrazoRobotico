/*#define NOTE_B0  31
#define NOTE_C1  33
#define NOTE_CS1 35
#define NOTE_D1  37
#define NOTE_DS1 39
#define NOTE_E1  41
#define NOTE_F1  44
#define NOTE_FS1 46
#define NOTE_G1  49
#define NOTE_GS1 52
#define NOTE_A1  55
#define NOTE_AS1 58
#define NOTE_B1  62
#define NOTE_C2  65
#define NOTE_CS2 69
#define NOTE_D2  73
#define NOTE_DS2 78
#define NOTE_E2  82
#define NOTE_F2  87
#define NOTE_FS2 93
#define NOTE_G2  98
#define NOTE_GS2 104
#define NOTE_A2  110
#define NOTE_AS2 117
#define NOTE_B2  123
#define NOTE_C3  131
#define NOTE_CS3 139
#define NOTE_D3  147
#define NOTE_DS3 156
#define NOTE_E3  165
#define NOTE_F3  175
#define NOTE_FS3 185
#define NOTE_G3  196
#define NOTE_GS3 208
#define NOTE_A3  220
#define NOTE_AS3 233
#define NOTE_B3  247
#define NOTE_C4  262
#define NOTE_CS4 277
#define NOTE_D4  294
#define NOTE_DS4 311
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_FS4 370
#define NOTE_G4  392
#define NOTE_GS4 415
#define NOTE_A4  440
#define NOTE_AS4 466
#define NOTE_B4  494
#define NOTE_C5  523
#define NOTE_CS5 554
#define NOTE_D5  587
#define NOTE_DS5 622
#define NOTE_E5  659
#define NOTE_F5  698
#define NOTE_FS5 740
#define NOTE_G5  784
#define NOTE_GS5 831
#define NOTE_A5  880
#define NOTE_AS5 932
#define NOTE_B5  988
#define NOTE_C6  1047
#define NOTE_CS6 1109
#define NOTE_D6  1175
#define NOTE_DS6 1245
#define NOTE_E6  1319
#define NOTE_F6  1397
#define NOTE_FS6 1480
#define NOTE_G6  1568
#define NOTE_GS6 1661
#define NOTE_A6  1760
#define NOTE_AS6 1865
#define NOTE_B6  1976
#define NOTE_C7  2093
#define NOTE_CS7 2217
#define NOTE_D7  2349
#define NOTE_DS7 2489
#define NOTE_E7  2637
#define NOTE_F7  2794
#define NOTE_FS7 2960
#define NOTE_G7  3136
#define NOTE_GS7 3322
#define NOTE_A7  3520
#define NOTE_AS7 3729
#define NOTE_B7  3951
#define NOTE_C8  4186
#define NOTE_CS8 4435
#define NOTE_D8  4699
#define NOTE_DS8 4978
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
  var piezo = new five.Piezo(10);
  //base inicial=90, 0 y 180
  //art1 inicial= ,atras=60, adelante=;
  //pinza inicial= 180, 90= cerrado, 180= abierto

  board.repl.inject({
    piezo: piezo
  });

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



app.post('/iniciar', function(req, res) {
  console.log("Iniciando rutina 1 en el servidor");
    //responder al html
    
    //mover_winner();

    rutina(108,85,60);
    //esperar 105 segundos
    res.status(200).end();

});

app.post('/iniciar2', function(req, res) {
  
  console.log("Iniciando rutina 2 en el servidor");

   
  rutina(60, 85, 108);
  //esperar 105 segundos
  res.status(200).end();

});



function rutina(base1,base2,base3){

    var base_1 = base1;
    var base_2 = base2;
    var base_3 = base3; 

    piezo.play({
      song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
      beats: 1 / 4,
      tempo: 100
    });   

    //VALORES INICIALES  
    servo_base.to(85);
    servo_1.to(30);
    servo_2.to(145);
    servo_pinza.to(90);


    /*
    * ATENCION
    * despues de VOLVER se suman 2 segundos
    * despues de MOVER A POSICION se suman 5 segundos
    */

    //tomar pieza pequeña de 1
    setTimeout(function(){
      mover_piso3(base_1);
      cerrar_pinza();
      console.log("mover-pos1->piso3");
    }, 1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 6*1000);

    //dejar pieza pequeña en 3
    setTimeout(function(){
      mover_piso1(base_3);
      abrir_pinza();
      console.log("mover-pos3->piso1");
    }, 8*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 13*1000);

    //tomar pieza mediana de 1
    setTimeout(function(){
      mover_piso2(base_1);
      cerrar_pinza();
      console.log("mover-pos1->piso2");
    }, 15*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 20*1000);

    //dejar pieza mediana en 2
    setTimeout(function(){
      mover_piso1(base_2);
      abrir_pinza();
      console.log("mover-pos2->piso1");
    }, 22*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 27*1000);

    //tomar pieza pequeña de 1
    setTimeout(function(){
      mover_piso1(base_3);
      cerrar_pinza();
      console.log("mover-pos3->piso1");
    }, 29*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 34*1000);

    //dejar pieza pequeña en 2
    setTimeout(function(){
      mover_piso2(base_2);
      abrir_pinza();
      console.log("mover-pos2->piso2");
    }, 36*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 41*1000);
////////////////////////////////

    //tomar pieza grande de 1
    setTimeout(function(){
      mover_piso1(base_1);
      cerrar_pinza();
      console.log("mover-pos1->piso1");
    }, 43*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 48*1000);

    //dejar pieza grande en 3
    setTimeout(function(){
      mover_piso1(base_3);
      abrir_pinza();
      console.log("mover-pos3->piso1");
    }, 50*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 55*1000);

////////////////////////////////////

    //tomar pieza pequeña de 2
    setTimeout(function(){
      mover_piso2(base_2);
      cerrar_pinza();
      console.log("mover-pos2->piso2");
    }, 57*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 62*1000);

    //dejar pieza pequeña en 1
    setTimeout(function(){
      mover_piso1(base_1);
      abrir_pinza();
      console.log("mover-pos1->piso1");
    }, 64*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 69*1000);

////////////////////////////////////

    //tomar pieza mediana de 2
    setTimeout(function(){
      mover_piso1(base_2);
      cerrar_pinza();
      console.log("mover-pos2->piso1");
    }, 71*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 76*1000);

    //dejar pieza mediana en 3
    setTimeout(function(){
      mover_piso2(base_3);
      abrir_pinza();
      console.log("mover-pos3->piso2");
    }, 78*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 83*1000);

////////////////////////////////////

    //tomar pieza pequeña de 1
    setTimeout(function(){
      mover_piso1(base_1);
      cerrar_pinza();
      console.log("mover-pos1->piso1");
    }, 85*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 90*1000);

    //dejar pieza pequeña en 3
    setTimeout(function(){
      mover_piso3(base_3);
      abrir_pinza();
      console.log("mover-pos3->piso3");
    }, 92*1000);
    
    setTimeout(function(){
      mover_volver();
      console.log("mover:volver");
    }, 97*1000);

    setTimeout(function(){
      mover_winner();
      console.log("mover:winner");
    }, 100*1000);

}


function mover_piso3(base){
  setTimeout(function(){
    servo_base.to(base);
  }, 200);

  timeout([30, 95], 0.1, function(i){
    servo_1.to(i);
  });

  timeout([115, 145], 0.1, function(i){
    servo_2.to(115+145-i);
  });
}

function mover_piso2(base){
  setTimeout(function(){
    servo_base.to(base);
  }, 200);

  timeout([30, 100], 0.1, function(i){
    servo_1.to(i);
  });

  timeout([110, 135], 0.1, function(i){
    servo_2.to(110+135-i);
  });
}

function mover_piso1(base){
  setTimeout(function(){
    servo_base.to(base);
  }, 200);

  timeout([30, 105], 0.1, function(i){
    servo_1.to(i);
  });
  timeout([105, 145], 0.1, function(i){
    servo_2.to(105+145-i);
  });
}

function cerrar_pinza(){
  setTimeout(function(){
    timeout_pinza([0, 90], 1, function(i){
      servo_pinza.to(90-i);
    });
  }, 5*100);
}
function abrir_pinza(){
  setTimeout(function(){
    timeout_pinza([0, 90], 1, function(i){
      servo_pinza.to(i);
    });
  }, 5*100);
}

function mover_volver(){
  timeout([30, 60], 0.1, function(i){
    servo_1.to(30+60-i);
  });
  timeout([115, 145], 0.1, function(i){
    servo_2.to(i);
  });
  setTimeout(function(){
    servo_base.to(85);
  }, 800);
  
}

function mover_winner(){
  setTimeout(function(){
    servo_pinza.to(0);
    servo_1.to(45);
    servo_2.to(160);
  }, 500);

  setTimeout(function(){
    servo_pinza.to(90);
    servo_1.to(75);
  }, 2*500);

  setTimeout(function(){
    servo_pinza.to(0);
   servo_1.to(45);
  }, 3*500);

  setTimeout(function(){
    servo_pinza.to(90);
    servo_1.to(75);
  }, 4*500);

  setTimeout(function(){
    servo_pinza.to(0);
   servo_1.to(45);
   }, 5*500);

  setTimeout(function(){
    servo_pinza.to(90);
    servo_1.to(75);

  }, 6*500);

  setTimeout(function(){
    servo_pinza.to(0);
  }, 7*500);


}

});

var server = http.createServer(app);
server.listen(port, function () {
  console.log('Servidor en puerto '+port);
});





