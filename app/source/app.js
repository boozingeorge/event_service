var EventService = angular.module('EventService',['ngMaterial', 'ngMessages']);

var config = {
  endDateInterval: 1,
  maxDateInterval: 365,
  primaryColor: '#039BE5',
  basicURL: 'http://52.193.244.203:8080',
  location: {
    lat: 54.993437,
    long: 73.365768
  }
};
EventService.constant('Config', config);

EventService.config(function ($mdThemingProvider, Config) {
  var ESCTheme = $mdThemingProvider.extendPalette('blue', {
    '700': Config.primaryColor
  });
  $mdThemingProvider.definePalette('ESCTheme', ESCTheme);
  $mdThemingProvider.theme('default')
    .primaryPalette('ESCTheme', {
      default: '700'
    });
});
