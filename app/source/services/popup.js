EventService.factory('PopUp', PopUpService);

function PopUpService($mdDialog, $window) {

  function PopUp() {
    var self = this;
    self._url =  "http://" + $window.location.host;
  }

  PopUp.prototype.Error = function(content, title, areaLabel) {
    var self = this;
    var content = content || 'Извините, произошла ошибка';
    var title = title || 'Ошибка';
    var areaLabel = areaLabel || 'Error';
    
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title(title)
        .textContent(content)
        .ariaLabel(areaLabel)
        .ok('OK')
    ).then(function(){
      $window.location.href = self._url + "/logout";
    });
  };

  return new PopUp();
}