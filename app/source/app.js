var EventService = angular.module('EventService',['ngMaterial']);

EventService.constant('primaryColor','#039BE5');
EventService.constant('basicURL','http://52.193.244.203:8080');

EventService.config(function ($mdThemingProvider, primaryColor) {
  var ESCTheme = $mdThemingProvider.extendPalette('blue', {
    '700': primaryColor
  });
  $mdThemingProvider.definePalette('ESCTheme', ESCTheme);
  $mdThemingProvider.theme('default')
    .primaryPalette('ESCTheme', {
      default: '700'
    });
});