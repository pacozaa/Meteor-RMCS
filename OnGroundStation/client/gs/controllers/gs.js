angular.module("gs").controller("GsCtrl", function ($scope, $stateParams, $meteor, uiGmapGoogleMapApi) {
  $scope.polylines = [];
  $scope.path = [];
  $scope.Status =$scope.$meteorObject(Status,{ref : 1});
  $scope.gpspath =   $scope.$meteorCollection(function(){
        return GpsPath.find({flightid: $scope.getCollectionReactively("Status").flightid});
      });
  var lightdream = [
    {"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},
    {"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},
    {"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},
    {"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},
    {"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},
    {"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}
  ];
  $scope.map = {
    center: {
      latitude: 13.8523514,
      longitude: 100.5652767
    },
    options: {
      styles: lightdream,
    },
    zoom: 15,
    events: {}
  };
  $scope.options = {scrollwheel: false};
  $scope.circles = [
      {
          id: 1,
          center: {
              latitude: 13.8523514,
              longitude: 100.5652767
          },
          radius: 500,
          stroke: {
              color: '#08B21F',
              weight: 2,
              opacity: 1
          },
          fill: {
              color: '#08B21F',
              opacity: 0.5
          },
          geodesic: true, // optional: defaults to false
          draggable: true, // optional: defaults to false
          clickable: true, // optional: defaults to true
          editable: true, // optional: defaults to false
          visible: true, // optional: defaults to true
          control: {},
          events : {
            click : function(circlemodel, eventName, args){
              console.log(circlemodel.getBounds());
              console.log(circlemodel.getCenter().lat());
            }
          }
      }
  ];
  $scope.$meteorAutorun(function(){
    $scope.path = [];
    $scope.getCollectionReactively("gpspath").forEach(function(path){
      $scope.path.push({latitude: path.lat, longitude: path.long});
    });
    uiGmapGoogleMapApi.then(function(){
      $scope.polylines = [
              {
                  id: 1,
                  path:$scope.path,
                  stroke: {
                      color: '#6060FB',
                      weight: 3
                  },
                  editable: false,
                  draggable: false,
                  geodesic: true,
                  visible: true,
                  icons: [{
                      icon: {
                          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                      },
                      offset: '25px',
                      repeat: '50px'
                  }]
              }
          ];
    });


  });


  $scope.launch = function(){
    $meteor.call('launch').then(function (data) {
      console.log('Drone Lanuch! : '+data);
    });
  }
  $scope.landing = function(){
    $meteor.call('landing').then(function (data) {
      console.log('Drone Landing! : '+data);
    })
  }

});
