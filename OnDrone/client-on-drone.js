var net = require('net');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var arduino = new SerialPort("COM4", {
  baudrate: 9600,
	parser: serialport.parsers.readline('\r\n')
});
var gps = new SerialPort("COM3", {
	baudrate: 9600,
	parser: serialport.parsers.readline("\n")
});
var YI = require('./yimsg.js');
var YITOKEN;
var yi = new net.Socket();
yi.connect(7878, '192.168.42.1', function() {
	console.log('connect yi');
	console.log('sent to yi : '+YI.gettoken());
	yi.write(YI.gettoken());
});

yi.on('data', function(data){
	console.log('Yi Return : '+data)
	var rtn = JSON.parse(data);
	if(rtn.rval == 0 && rtn.msg_id == 257){
		YITOKEN = rtn.param;
		console.log("Got TOKEN : "+YITOKEN);
	}
	if(rtn.msg_id == 7 && rtn.type == 'battery'){
		console.log("Battery Remain : "+rtn.param + "%");
	}
	if(rtn.msg_id == 7 && rtn.type == 'photo_taken'){

	}
});

yi.on('close', function (arguments) {
	console.log('yi close');
});

yi.on('error', function (arguments) {
	console.log('yi error');
});

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Socket Connected');
	client.write(JSON.stringify({socket : 1}));
});

client.on('data', function(data) {
	console.log('Client Received: ' + data);
	if(data == 'launch'){
		arduino.write("launch\n", function(err, results) {
	    console.log('launch err ' + err);
	    console.log('launch results ' + results);
	  });
	}
	if(data == 'stop'){
		arduino.write("stop\n", function(err, results) {
	    console.log('stop err ' + err);
	    console.log('stop results ' + results);
	  });
	}
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
	client.destroy();
});
client.on('error', function (error) {
	console.log('client error, trying again');
});




arduino.on("open", function () {
	console.log('Arduino Serial Open');
  client.write(JSON.stringify({board : 1}));
  arduino.on('data', function(data) {
    console.log('Arduino Serial Data: ' + data);
		if(data.indexOf('launch') >= 0){
			console.log('Fly');
			client.write(JSON.stringify({fly : 1}));
		}
		if(data.indexOf('stop') >= 0){
			console.log('land');
			client.write(JSON.stringify({fly : 0}));
		}

		if(data.indexOf('DI') >= 0){
			var direction = parseFloat(data.substring(2));
			client.write(JSON.stringify({compass : direction}));
		}

  });
  arduino.write("ls\n", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
});
arduino.on("close", function () {
  client.write(JSON.stringify({board : 0}));
	console.log('Arduino Serial Close');
});



gps.on("open", function(){
	console.log('GPS Serial Open');
	client.write(JSON.stringify({gps : 1}));
	gps.on('data', function(data){
		console.log('GPS Serial Data : '+ data);
    if(data.indexOf('GP') >= 0){
			var lat = data.split(',')[1];
			var long = data.split(',')[2];
			console.log('GPS PARSE lat '+lat+' long '+long);
			client.write(JSON.stringify({
				gps : 1,
				gpslat : lat,
				gpslong : long
			}));
		}
	});
	gps.write('ls\n', function(error, results){
		console.log('Arduino err '+err);
		console.log('Arduino results '+results)
	});
});
gps.on('close', function(){
	client.write(JSON.stringify({gsp : 0}));
});
