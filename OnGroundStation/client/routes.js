angular.module('gs').config(function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('gs', {
    url: '/gs',
    templateUrl: 'client/gs/views/gs.html',
    controller: 'GsCtrl'
  });

  $urlRouterProvider.otherwise("/gs");
});
