function ProfileController(RxSubject) {
  var ctrl = this;
}
EventService.component('profile', {
  templateUrl: 'templates/profile.html',
  bindings:{
    user: '<'
  },
  controller:ProfileController
});