EventService.factory('PopUp', PopUpService);

function PopUpService($mdDialog, $window) {

  function PopUp() {
    var self = this;
    self._url =  "http://" + $window.location.host;
  }

  PopUp.prototype.Error = function(content, title, areaLabel) {
    var self = this;
    content = content || 'Извините, произошла ошибка';
    title = title || 'Ошибка';
    areaLabel = areaLabel || 'Error';
    
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