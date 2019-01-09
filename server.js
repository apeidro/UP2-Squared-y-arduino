
var express = require('express');
var app = express();
var fs = require('fs');
var readline = require('readline');
var server = require('http').createServer(app);
var io = require('socket.io')(server); 
var estractor = 0 ;
var datos = [];
var ratioDisparo = 0;
var myled1 = 0;

//establecimiento de rutas
app.use(express.static(__dirname + '/'));
app.use('/', express.static(__dirname + '/'));
app.get('/', function(req, res, next) {  
    res.sendFile(__dirname + '/index.html');
});

//Conexión con el port serie del arduino para enviar y recibir datos de sensores y pines
var SerialPort = require('serialport');
var serialPort = new SerialPort('/dev/ttyS5', {baudRate: 115200});//S5 = UART1 del UP2squared
var Readline = SerialPort.parsers.Readline;
var parser = new Readline();
serialPort.pipe(parser);
serialPort.on('open', function () {
console.log('Communication is on!');
});


//Socket para conmutar el led del arduino por petició cliente web
io.on('connection', function(client) { 
client.on('clicked', function() {
myled1 = ! myled1 ;
//enviar mensajes al stm32 y cliente web
if (myled1 == 1) { 
   serialPort.write('c');
   //console.log("c");
io.emit('buttonUpdate', "LED ACTIVADO"); 
}
if (myled1 == 0) { 
    serialPort.write('x');
   //console.log("x");
io.emit('buttonUpdate', "LED DESACTIVADO"); 
}
});	
});
//Fin Socket para conmutar el led por petició cliente

//socket para desactivar alarma
io.on('connection', function(client) { 
    client.on('clickedAlarm', function() {
        serialPort.write('d');//enviar a stmx.push(parseFloat(y[6]));
    });	
    });

//Socket para recibir un nuevo dato del formulario Ratio de disparo
io.sockets.on('connection', function (socket) {
socket.on('mensaje_cliente', function (mensaje) {	
ratioDisparo = mensaje;	
console.log (mensaje);
io.sockets.emit("mensaje_servidor", mensaje);//el mensaje se envia al cliente
});
}); 
//Final Socket para recibir nuevo dato de la Ratio de disparo

//Inicio leer estado estractor y enviar mensaje
function Mensajestractor() {
    return { 'stract': estractor };//devuelve el valor del estractor
    }
    io.on('connection', function(socket) {
    //enviar estado alarma en un intervalo de tiempo con JSON
    setInterval(function () {
    socket.emit('stract' , JSON.stringify(Mensajestractor())); 
    }, 1000);
    });
//fin leer estado estractor y enviar mensaje


//conexion con mando deslizante 
io.on('connection', function (socket) {
    socket.on('blinkInterval', function (data) {
    serialPort.write('y');//para identificar envio de slider al stm32
    serialPort.write(data);//para enviar el valor al stm32 
  });
  });
//fin conexion mando deslizante

//comienzo lectura datos port serie
parser.on('data', function (data) {	
    str = JSON.parse(data); // parse datos del port serie
 alarm = str.alar; // extraer alarma enviada por el arduino
 if (alarm == 1){
     io.emit('pulso' , JSON.stringify({'pulso': 1}));//activar alarma
     console.log("alarma activada:", alarm);
     }
  //en caso contrario seguir extrayendo los datos 
 else {
    tem = str.Temperatura;
    hum = str.Humedad; 
    ratio = str.Ratio;
    concentracion = str.Concentracion
    pre = str.Pressure/100; 
    //alt = str.Altitud;  
    gnh3 =str.NH3;//amoniaco
    gco = str.CO;//monoxido de carbono
    gno2 = str.NO2;//dioxido de nitrogeno
    gch4 =str.CH4/1000000;//metano
    gc4h10 =str.C4H10;//iso-butano
    gc3h8 =str.C3H8;//propano
    gh2 =str.H2;//hidrogeno
     } 

if (ratioDisparo == 0 ) {
    ratioDisparo = 20 ; //si no hay ratio iniciamos con el valor 20
    }
if (ratio > ratioDisparo){
    estractor = 1; //variable utilizada para enviar mensaje estraccion al cliente web
    serialPort.write('a');//para identificar activación estractor en el arduino
    }
else {
    estractor = 0; //variable utilizada para enviar mensaje estraccion al cliente web
    serialPort.write('b'); //para identificar desactivación estractor en el arduino
    }

//enviamos los datos al archivo datos.csv
fs.appendFile('datos.csv', Date.now() + ',' + ratio + ',' + concentracion + ',' + tem + ',' + hum + ',' + pre + ',' + gnh3 + ',' + gco + ',' + gno2 +','+ gch4 +',' + gc4h10 + ',' + gc3h8 +',' + gh2 +  '\r\n', function (err) {
if (err) throw err;
    console.log('Actualizado');
    });
    console.log('data received: '+ ratio + ',' + concentracion + ',' + tem + ',' + hum + ',' + pre + ',' + gnh3 + ',' + gco + ',' + gno2 +','+ gch4 +',' + gc4h10 + ',' + gc3h8 +',' + gh2);
    });
//final envio de datos al archivo datos.csv

//inicio estructura de los datos para las graficas
app.get('/datos', function(req, res,next) {
datos = [];
readline.createInterface({
input: fs.createReadStream('./datos.csv'), console: false
}).on('line', function(line)  
    {
var x = [];
var y = line.split(',');
x.push(parseFloat(y[0]));
x.push(parseFloat(y[1]));
x.push(parseFloat(y[2])); 
x.push(parseFloat(y[3]));
x.push(parseFloat(y[4]));
x.push(parseFloat(y[5]));
x.push(parseFloat(y[6]));
x.push(parseFloat(y[7]));
x.push(parseFloat(y[8]));
x.push(parseFloat(y[9]));
x.push(parseFloat(y[10]));
x.push(parseFloat(y[11]));
x.push(parseFloat(y[12]));
datos.push(x);
    }
).on('close', function() {
var salida = JSON.stringify(datos);
console.log('salida = ' + salida);
res.writeHead(200, {'Content-Type': 'text/plain'});
res.write(salida);
res.end();
});
});
// fin estructura datos graficas

//activando servidor para que escuche por el puerto tcp 9090
 server.listen(9090, function(){
	console.log('listening on *:9090');
}); 
