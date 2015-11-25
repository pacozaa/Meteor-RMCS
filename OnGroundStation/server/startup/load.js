Meteor.startup(function () {
  Status.remove({});
  Status.insert({
    board : 'status-off',
  	gps : 'status-off',
  	socket : 'status-off',
    fly : 0,
  	flightid : 0,
    ref : 1
  });  
  GpsPath.insert({
    flightid : Random.id(),
    lat : 13.8523514,
    long : 100.5652767,
    ts : new Date()
  });
});
