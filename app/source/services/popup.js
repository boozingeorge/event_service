EventService.factory('PopUp', PopUpService);

function PopUpService($mdDialog, $window) {

  function PopUp() {
    var self = this;
    self._url =  "http://" + $window.location.host;
  }

  PopUp.prototype.ConnectError = function() {
    var self = this;

    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Ошибка')
        .textContent('Извините, произошла ошибка')
        .ariaLabel('Connect Error')
        .ok('OK')
    ).then(function(){
        $window.location.href = self._url + "/logout";
      });
  };

  return new PopUp();
}
