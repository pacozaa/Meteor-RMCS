angular.module('gs',[
  'angular-meteor',
  'ui.router',
  'uiGmapgoogle-maps',
  'ngMaterial'
]);

angular.module('gs').config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          libraries: 'geometry,visualization'
      });
    });

  function onReady() {
  angular.bootstrap(document, ['gs'], {
    strictDi: true
  });
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
