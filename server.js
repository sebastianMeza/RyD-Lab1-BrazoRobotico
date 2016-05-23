
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


/*    setTimeout(function(){
      mover_pos2_piso3();
      console.log("mover pos1");
    }, 1000);
*/

    setTimeout(function(){
      mover_pos1_piso3();
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
      mover_piso3_pos3();
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
      mover_pos1_piso2();
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
      mover_pos2_piso2();
      console.log("mover piso 2 pos 2");
   }, 32*1000);

   setTimeout(function(){
      mover_volver();
      console.log("mover volver 1");
    }, 40.5*1000);
    setTimeout(function(){ 
      mover_piso3_pos2();
      console.log("mover piso3 pos 2");
    }, 41.5*1000);
    setTimeout(function(){
      mover_volver();
      console.log("mover volver 2");
    }, 49.5*1000);
    setTimeout(function(){
          mover_pos2_piso3();
          console.log("mover pos 2 piso 3");
      }, 51*1000);

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


});


function mover_pos1_piso3(){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    servo_pinza.to(90);
    servo_base.to(108);
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

function mover_piso3_pos3(){
     setTimeout(function(){
      //servo_pinza.to(90);
      servo_base.to(60);
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



function mover_pos1_piso2(){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    servo_pinza.to(90);
    servo_base.to(108);
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

function mover_pos2_piso2(){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    //servo_pinza.to(90);
    servo_base.to(85);
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

function mover_piso3_pos2(){
     setTimeout(function(){
      servo_pinza.to(90);
      servo_base.to(60);
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
    function mover_pos2_piso3(){

      setTimeout(function(){
        //servo_pinza.to(90);
        servo_base.to(85);
      }, 200);

      //con 'i' desde 30 a 115 en intervalos de 1 segundo
      timeout([30, 95], 0.2, function(i){
        servo_1.to(i);
        //console.log("servo_1: "+i);
      });
      timeout([85, 85], 0.2, function(i){
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

    function mover_pos1_piso1(){
      //RUTINA DEMORA 28 SEGUNDOS
      setTimeout(function(){
        servo_pinza.to(90);
        servo_base.to(108);
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

    function mover_piso1_pos3(){
     setTimeout(function(){
      //servo_pinza.to(90);
      servo_base.to(60);
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

    function mover_pos2_piso33(){
  //RUTINA DEMORA 28 SEGUNDOS
    setTimeout(function(){
      servo_pinza.to(90);
      servo_base.to(85);
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

    function mover_pos1_piso1_dejar(){
    setTimeout(function(){
      servo_base.to(108);
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

function mover_pos2_piso1_tomar(){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    //servo_pinza.to(90);
    servo_base.to(85);
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



function mover_pos3_piso2_dejar(){
  //RUTINA DEMORA 28 SEGUNDOS
  setTimeout(function(){
    //servo_pinza.to(90);
    servo_base.to(60);
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


    function mover_pos1_piso1_tomar(){
    setTimeout(function(){
      servo_base.to(108);
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




