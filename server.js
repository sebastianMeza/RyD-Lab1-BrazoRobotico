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

    /*
    setTimeout(function() {
      servo_pinza.to(160);
    }, 3000);
*/
app.post('/iniciar', function(req, res) {
  console.log("Iniciando rutina 1 en el servidor");
    //responder al html
    res.status(200).end();

    piezo.play({
      song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
      beats: 1 / 4,
      tempo: 100
    });   


    //VALORES INICIALES  
    servo_base.to(85);
    servo_1.to(30);
    servo_2.to(145);
    servo_pinza.to(0);



    setTimeout(function(){
      mover_pos1_piso3(108);
      console.log("mover pos1");
    }, 1000);
    setTimeout(function(){
      mover_volver();
      console.log("mover volver");
    }, 8.5*1000);

    setTimeout(function(){
      servo_base.to(90);
    }, 9.5*1000);

    setTimeout(function(){
      mover_piso3_pos3(60);
      console.log("mover piso 3 pos 3");
    }, 12*1000);

    setTimeout(function(){
      mover_volver();
      console.log("mover volver");
    }, 16.5*1000);

    setTimeout(function(){
      servo_base.to(90);
    }, 21.5*1000);

   setTimeout(function(){ ///
    mover_pos1_piso2(108);
    console.log("mover pos 1 piso 2");
  }, 22*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver");
  }, 30.5*1000);

   setTimeout(function(){
    servo_base.to(90);
  }, 31.5*1000);

   setTimeout(function(){
    mover_pos2_piso2(85);
    console.log("mover piso 2 pos 2");
  }, 32*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 1");
  }, 40.5*1000);
   setTimeout(function(){ 
    mover_piso3_pos2(60);
    console.log("mover piso3 pos 2");
  }, 41.5*1000);
   setTimeout(function(){
    mover_volver();
    console.log("mover volver 2");
  }, 49.5*1000);
   setTimeout(function(){
    mover_pos2_piso3(85);
    console.log("mover pos 2 piso 3");
  }, 51*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 3");
  }, 59.5*1000);
   setTimeout(function(){
    mover_pos1_piso1(108);
    console.log("mover pos1 piso 1");
  }, 61.5*1000);
   setTimeout(function(){
    mover_volver();

    console.log("mover volver 4");
  }, 69*1000);
   setTimeout(function(){
    mover_piso1_pos3(60);
    console.log("mover pos1 piso 3");
  }, 72*1000);
   setTimeout(function(){
    mover_volver();
    console.log("mover volver 5");
  }, 81*1000);

   setTimeout(function(){
    mover_pos2_piso33(85);
    console.log("mover pos2 piso 33");
  }, 83*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 6");
  }, 91*1000);
   setTimeout(function(){
    mover_pos1_piso1_dejar(108);
    console.log("mover_pos1_piso1_dejar");
  }, 93*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 6");
  }, 99*1000);

   setTimeout(function(){
    mover_pos2_piso1_tomar(85);
    console.log("mover_pos2_piso1_tomar");
  }, 101*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 7");
  }, 109.5*1000);

   setTimeout(function(){
    mover_pos3_piso2_dejar(60);
    console.log("mover pos");
  }, 113*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 8");
  }, 119*1000);

   setTimeout(function(){
    mover_pos1_piso1_tomar(108);
    console.log("mover_pos1_piso1_tomar");
  }, 122*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 9");
  }, 129*1000);

   setTimeout(function(){
    mover_pos3_piso3(60);
    console.log("mover pos1");
  }, 132*1000);
   setTimeout(function(){
    mover_volver();
    console.log("mover volver 10");
  }, 140*1000);

   setTimeout(function(){
    mover_winner();
    console.log("mover winner");
  }, 143*1000);


 });

app.post('/iniciar2', function(req, res) {
  res.status(200).end();
  console.log("Iniciando rutina 2 en el servidor");

  //VALORES INICIALES  
    servo_base.to(85);
    servo_1.to(30);
    servo_2.to(145);
    servo_pinza.to(0);

  setTimeout(function(){
    mover_pos1_piso3(60);
    console.log("mover pos1");
  }, 1000);
  setTimeout(function(){
    mover_volver();
    console.log("mover volver");
  }, 8.5*1000);

  setTimeout(function(){
    servo_base.to(90);
  }, 9.5*1000);

  setTimeout(function(){
    mover_piso3_pos3(108);
    console.log("mover piso 3 pos 3");
  }, 12*1000);

  setTimeout(function(){
    mover_volver();
    console.log("mover volver");
  }, 16.5*1000);

  setTimeout(function(){
    servo_base.to(90);
  }, 21.5*1000);

  setTimeout(function(){
    mover_pos1_piso2(60);
    console.log("mover pos 1 piso 2");
  }, 22*1000);
  setTimeout(function(){
    mover_volver();
    console.log("mover volver");
  }, 30.5*1000);

  setTimeout(function(){
    servo_base.to(90);
  }, 31.5*1000);

  setTimeout(function(){
    mover_pos2_piso2(85);
    console.log("mover piso 2 pos 2");
  }, 32*1000);

  setTimeout(function(){
    mover_volver();
    console.log("mover volver 1");
  }, 40.5*1000);
  setTimeout(function(){ 
    mover_piso3_pos2(108);
    console.log("mover piso3 pos 2");
  }, 41.5*1000);
   setTimeout(function(){
    mover_volver();
    console.log("mover volver 2");
  }, 49.5*1000);
   setTimeout(function(){
    mover_pos2_piso3(85);
    console.log("mover pos 2 piso 3");
  }, 51*1000);
///////////////////////////////////////////////////// ACA SEBITA <3
   setTimeout(function(){
    mover_volver();
    console.log("mover volver 3");
  }, 59.5*1000);
   setTimeout(function(){
    mover_pos1_piso1();
    console.log("mover pos1 piso 1");
  }, 61.5*1000);
   setTimeout(function(){
    mover_volver();

    console.log("mover volver 4");
  }, 69*1000);
   setTimeout(function(){
    mover_piso1_pos3();
    console.log("mover pos1 piso 3");
  }, 72*1000);
   setTimeout(function(){
    mover_volver();
    console.log("mover volver 5");
  }, 81*1000);

   setTimeout(function(){
    mover_pos2_piso33();
    console.log("mover pos2 piso 33");
  }, 83*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 6");
  }, 91*1000);
   setTimeout(function(){
    mover_pos1_piso1_dejar();
    console.log("mover_pos1_piso1_dejar");
  }, 93*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 6");
  }, 99*1000);

   setTimeout(function(){
    mover_pos2_piso1_tomar();
    console.log("mover_pos2_piso1_tomar");
  }, 101*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 7");
  }, 109.5*1000);

   setTimeout(function(){
    mover_pos3_piso2_dejar();
    console.log("mover pos");
  }, 113*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 8");
  }, 119*1000);

   setTimeout(function(){
    mover_pos1_piso1_tomar();
    console.log("mover_pos1_piso1_tomar");
  }, 122*1000);

   setTimeout(function(){
    mover_volver();
    console.log("mover volver 9");
  }, 129*1000);

   setTimeout(function(){
    mover_pos3_piso3(60);
    console.log("mover pos1");
  }, 132*1000);
   setTimeout(function(){
    mover_volver();
    console.log("mover volver 10");
  }, 140*1000);

   setTimeout(function(){
    mover_winner();
    console.log("mover winner");
  }, 143*1000);



});




function mover_pos1_piso3(base){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    servo_pinza.to(90);
    servo_base.to(base);
  }, 1000);

  //con 'i' desde 30 a 115 en intervalos de 1 segundo
  timeout([30, 95], 0.1, function(i){
    servo_1.to(i);
    //console.log("servo_1: "+i);
  });
  timeout([117, 148], 0.1, function(i){
    servo_2.to(115+145-i);
    //console.log("servo_2: "+(115+145-i));
  });
  //pinza cerrar
  setTimeout(function(){
    timeout_pinza([0, 90], 1, function(i){
      servo_pinza.to(90-i);
      //console.log("pinza: "+(90-i));
    });
  }, 15*100);
}

function mover_piso3_pos3(base){
 setTimeout(function(){
      //servo_pinza.to(90);
      servo_base.to(base);
    }, 1000);

      //con 'i' desde 30 a 115 en intervalos de 1 segundo
      timeout([30, 105], 0.1, function(i){
        servo_1.to(i);
        //console.log("servo_1: "+i);
      });
      timeout([110, 105], 0.1, function(i){
        servo_2.to(115+105-i);
        //console.log("servo_2: "+(115+145-i));
      });
      //pinza cerrar
      setTimeout(function(){
        timeout_pinza([0, 90], 1, function(i){
          servo_pinza.to(i);
        });
      }, 15*100);
    }

    function mover_pos1_piso2(base){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    servo_pinza.to(90);
    servo_base.to(base);
  }, 1000);

  //con 'i' desde 30 a 115 en intervalos de 1 segundo
  timeout([30, 100], 0.1, function(i){
    servo_1.to(i);
    //console.log("servo_1: "+i);
  });
  timeout([110, 135], 0.1, function(i){
    servo_2.to(110+135-i);
    //console.log("servo_2: "+(115+145-i));
  });
  //pinza cerrar
  setTimeout(function(){
    timeout_pinza([0, 90], 1, function(i){
      servo_pinza.to(90-i);
      //console.log("pinza: "+(90-i));
    });
  }, 15*100);
}


function mover_pos2_piso2(base){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    //servo_pinza.to(90);
    servo_base.to(base);
  }, 200);

  //con 'i' desde 30 a 115 en intervalos de 1 segundo
  timeout([30, 100], 0.1, function(i){
    servo_1.to(i);
    //console.log("servo_1: "+i);
  });
  timeout([110, 85], 0.1, function(i){
    servo_2.to(110+85-i);
    //console.log("servo_2: "+(115+145-i));
  });
  //pinza cerrar
  setTimeout(function(){
    timeout_pinza([0, 90], 1, function(i){
      servo_pinza.to(i);
      //console.log("pinza: "+(90-i));
    });
  }, 15*100);
}

function mover_piso3_pos2(base){
 setTimeout(function(){
  servo_pinza.to(90);
  servo_base.to(base);
}, 200);

      //con 'i' desde 30 a 115 en intervalos de 1 segundo
      timeout([30, 105], 0.1, function(i){
        servo_1.to(i);
        //console.log("servo_1: "+i);
      });
      timeout([110, 105], 0.1, function(i){
        servo_2.to(115+105-i);
        //console.log("servo_2: "+(115+145-i));
      });
      //pinza cerrar
      setTimeout(function(){
        timeout_pinza([0, 90], 1, function(i){
          servo_pinza.to(90-i);
        });
      }, 15*100);
    }


  function mover_pos2_piso3(base){

      setTimeout(function(){
        //servo_pinza.to(90);
        servo_base.to(base);
      }, 200);

      //con 'i' desde 30 a 115 en intervalos de 1 segundo
      timeout([30, 95], 0.2, function(i){
        servo_1.to(i);
        //console.log("servo_1: "+i);
      });
      timeout([85, 95], 0.2, function(i){
        servo_2.to(i);
        console.log("servo_2 ***: "+(i));
      });
      //pinza cerrar
      setTimeout(function(){
        timeout_pinza([0, 90], 1, function(i){
          servo_pinza.to(i);
          //console.log("pinza: "+(90-i));
        });
      }, 2*16*100);
    }

    function mover_pos1_piso1(base){
      //RUTINA DEMORA 28 SEGUNDOS
      setTimeout(function(){
        servo_pinza.to(90);
        servo_base.to(base);
      }, 200);

      //con 'i' desde 30 a 115 en intervalos de 1 segundo
      timeout([30, 120], 0.1, function(i){
        servo_1.to(i);
        //console.log("servo_1: "+i);
      });
      timeout([90, 135], 0.1, function(i){
        servo_2.to(90+135-i);
        //console.log("servo_2: "+(115+145-i));
      });
      //pinza cerrar
      setTimeout(function(){
        timeout_pinza([0, 90], 1, function(i){
          servo_pinza.to(90-i);
          //console.log("pinza: "+(90-i));
        });
      }, 19*100);
    }

    function mover_piso1_pos3(base){
     setTimeout(function(){
      //servo_pinza.to(90);
      servo_base.to(base);
    }, 200);

      //con 'i' desde 30 a 115 en intervalos de 1 segundo
      timeout([30, 105], 0.1, function(i){
        servo_1.to(i);
        //console.log("servo_1: "+i);
      });
      timeout([105, 110], 0.1, function(i){
        servo_2.to(115+105-i);
        //console.log("servo_2: "+(115+145-i));
      });
      //pinza cerrar
      setTimeout(function(){
        timeout_pinza([0, 90], 1, function(i){
          servo_pinza.to(i);
        });
      }, 15*100);
    }

    function mover_pos2_piso33(base){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    servo_pinza.to(90);
    servo_base.to(base);
  }, 300);

    //con 'i' desde 30 a 115 en intervalos de 1 segundo
    timeout([30, 95], 0.1, function(i){
      servo_1.to(i);
      //console.log("servo_1: "+i);
    });
    timeout([85, 105], 0.1, function(i){
      servo_2.to(i);
      //console.log("servo_2: "+(115+145-i));
    });
    //pinza cerrar
    setTimeout(function(){
      timeout_pinza([0, 90], 1, function(i){
        servo_pinza.to(90-i);
        //console.log("pinza: "+(90-i));
      });
    }, 13*100);
  }

  function mover_pos1_piso1_dejar(base){
    setTimeout(function(){
      servo_base.to(base);
    }, 100);

    //con 'i' desde 30 a 115 en intervalos de 1 segundo
    timeout([30, 105], 0.1, function(i){
      servo_1.to(i);
      //console.log("servo_1: "+i);
    });
    timeout([100, 145], 0.1, function(i){
      servo_2.to(100+145-i);
      //console.log("servo_2: "+(115+145-i));
    });
    //pinza cerrar
    setTimeout(function(){
      timeout_pinza([0, 90], 1, function(i){
        servo_pinza.to(i);
        //console.log("pinza: "+(i));
      });
    }, 15*100);
  }

  function mover_pos2_piso1_tomar(base){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    //servo_pinza.to(90);
    servo_base.to(base);
  }, 200);

  //con 'i' desde 30 a 115 en intervalos de 1 segundo
  timeout([30, 100], 0.1, function(i){
    servo_1.to(i);
    //console.log("servo_1: "+i);
  });
  timeout([110, 85], 0.1, function(i){
    servo_2.to(110+85-i);
    //console.log("servo_2: "+(115+145-i));
  });
  //pinza cerrar
  setTimeout(function(){
    timeout_pinza([0, 90], 1, function(i){
      servo_pinza.to(90-i);
      //console.log("pinza: "+(90-i));
    });
  }, 15*100);
}



function mover_pos3_piso2_dejar(base){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    //servo_pinza.to(90);
    servo_base.to(base);
  }, 200);

  //con 'i' desde 30 a 115 en intervalos de 1 segundo
  timeout([30, 100], 0.1, function(i){
    servo_1.to(i);
    //console.log("servo_1: "+i);
  });
  timeout([115, 145], 0.1, function(i){
    servo_2.to(115+145-i);
    //console.log("servo_2: "+(115+145-i));
  });
  //pinza abrir
  setTimeout(function(){
    timeout_pinza([0, 90], 1, function(i){
      servo_pinza.to(i);
      //console.log("pinza: "+(90-i));
    });
  }, 2000);
}


function mover_pos1_piso1_tomar(base){
  setTimeout(function(){
    servo_base.to(base);
  }, 100);

    //con 'i' desde 30 a 115 en intervalos de 1 segundo
    timeout([30, 105], 0.1, function(i){
      servo_1.to(i);
      //console.log("servo_1: "+i);
    });
    timeout([100, 145], 0.1, function(i){
      servo_2.to(100+145-i);
      //console.log("servo_2: "+(115+145-i));
    });
    //pinza cerrar
    setTimeout(function(){
      timeout_pinza([0, 90], 1, function(i){
        servo_pinza.to(90-i);
        //console.log("pinza: "+(i));
      });
    }, 15*100);
  }

  function mover_pos3_piso3(base){
    setTimeout(function(){
    //servo_pinza.to(90);
    servo_base.to(base);
  }, 1000);

  //con 'i' desde 30 a 115 en intervalos de 1 segundo
  timeout([30, 95], 0.1, function(i){
    servo_1.to(i);
    //console.log("servo_1: "+i);
  });
  timeout([120, 145], 0.1, function(i){
    servo_2.to(120+145-i);
    //console.log("servo_2: "+(115+145-i));
  });
  //pinza cerrar
  setTimeout(function(){
    timeout_pinza([0, 90], 1, function(i){
      servo_pinza.to(i);
      //console.log("pinza: "+(90-i));
    });
  }, 15*100);
}

function mover_volver(){
  //RUTINA DEMORA 13 SEGUNDOS
  //con 'i' desde 30 a 115 en intervalos de 1 segundo
  console.log("entro en volver");
  timeout([115, 145], 0.1, function(i){
    servo_2.to(i);
    //console.log("servo_2: "+(i));
  });
  timeout([30, 60], 0.1, function(i){
    servo_1.to(30+60-i);
    //console.log("servo_1: "+(30+90-i));
  });
  setTimeout(function(){
    servo_base.to(90);
  }, 600);
  
}

function mover_winner(){
  setTimeout(function(){
    servo_pinza.to(0);
  }, 500);

  setTimeout(function(){
    servo_pinza.to(90);
  }, 2*500);

  setTimeout(function(){
    servo_pinza.to(0);
  }, 3*500);

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




