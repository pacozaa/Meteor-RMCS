var net = Meteor.npmRequire('net');
var Socket;
var server = net.createServer(Meteor.bindEnvironment(function(socket) {
	Socket = socket;
	socket.write('Echo server\r\n');
  socket.on('data', Meteor.bindEnvironment(function (data) {

    console.log('Data : '+data);
    //socket.write('Paco Write : '+data);
    //Messages.insert({user: 'tcp', msg: data, ts: new Date(), room: 'tcp'});
		var dataObj = JSON.parse(data);

		if(dataObj.socket == 1){
			console.log('Socket Connected');
			Status.update({},{$set: {socket: 'status-on'}});
		}
		else if (dataObj.socket == 0) {
			Status.update({},{$set: {socket: 'status-off'}});
		}

		if(dataObj.board == 1){
			console.log('Board Connected');
			Status.update({},{$set: {board: 'status-on'}});
		}
		else if(dataObj == 0){
			console.log('Board Disconnected');
			Status.update({},{$set: {board: 'status-off'}});
		}

		if(dataObj.fly == 1){
			console.log('Launch');
			Status.update({},{$set: {fly: 1}});
			Status.update({},{$set: {flightid: Random.id()}});
		}
		else if(dataObj.fly == 0){
			console.log('Stop');
			Status.update({},{$set: {fly: 0}});
		}

		if(dataObj.gps == 1){
			console.log('GPS Connected');
			Status.update({},{$set: {gps: 'status-on'}});
		}
		else if (dataObj.gps == 0) {
			console.log('GPS Disconnected');
			Status.update({},{$set: {gps: 'status-off'}});
		}
		if(Status.findOne().gps == 'status-on' && typeof dataObj.gpslat !== 'undefined'){

			var gpslat = dataObj.gpslat;
			var gpslong = dataObj.gpslong;
			console.log('GPS Lat : '+gpslat+' Long : '+ gpslong);
			console.log('Flight Id : '+Status.findOne().flightid);
			GpsPath.insert({flightid : Status.findOne().flightid, lat : gpslat, long : gpslong, ts : new Date()});

		}

  }));
  socket.on('error', Meteor.bindEnvironment(function (error) {
    console.log('error, trying again');
		Status.update({},{$set: {socket: 'status-off'}});
  }));
}));

server.listen(1337, '127.0.0.1', Meteor.bindEnvironment(function(){
    console.log('server bound');
}));
Meteor.methods({
  launch : function(){
    Socket.write('launch');
  },
	landing : function(){
		Socket.write('landing');
	}
});
