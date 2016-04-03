function ProfileController(APIClient, PopUp) {
  var ctrl = this;
  APIClient.getProfile().then(function(response){
    ctrl.firstName = response.firstName;
    ctrl.lastName = response.lastName;
    ctrl.avatar = response.avatar;
  }, function(response){
    PopUp.ConnectError();
  });
}
EventService.component('profile', {
  templateUrl: 'templates/profile.html',
  bindings:{
    events:'<'
  },
  controller:ProfileController
});