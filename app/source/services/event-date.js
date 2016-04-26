EventService.factory('EventDatetime', function($mdDialog, $window) {
  function EventDatetime(date, minDate, maxDate) {
    var self = this;
    self.date = date;
    self.minutes = date.getMinutes();
    self.hours = self.date.getHours();
    self.minDate = minDate;
    self.maxDate = maxDate;
  }
  
  EventDatetime.prototype.getDatetime = function() {
    return new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.hours,
      this.minutes
    );
  }
  
  return EventDatetime;
});


 