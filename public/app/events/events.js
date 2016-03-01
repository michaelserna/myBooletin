angular.module('booletin.events', [])

.controller('EventController', function($scope, Events, $state, $firebaseArray, $stateParams) {
  var dbConnection = new Firebase("https://glowing-torch-8522.firebaseio.com");
  //previous group's db connection
  //https://booletin.firebaseio.com/events

  if ($stateParams.search === "no") {
    $scope.events = $firebaseArray(dbConnection);
    Events.targetZipsString = "all";
  } else {
    $scope.events = Events.events;
  }
  //filter function to only display events that haven't happened
  $scope.newEventsOnly = function(event) {
    var today = new Date();
    return new Date(event.startDate) > today;
  };
  //determines whether future or past events are shown
  $scope.dateSort = $scope.newEventsOnly;
  //displays events that have already passed
  $scope.showEvents = function(timing) {
    if (timing === 'past') {
      $scope.dateSort = function(event) {
        return new Date(event.startDate) < new Date();
      };
    } else {
      $scope.dateSort = $scope.newEventsOnly;
    }
  };

  $scope.targetZipsString = Events.targetZipsString;
  if ($scope.targetZipsString === "") {
    Events.targetZipsString = "all";
  }
  $scope.targetZipsString = Events.targetZipsString;
  $scope.queryZip = {};

  $scope.validZip = false;

  $scope.user = {};

  $scope.getEvents = function() {
    //console.log(window.fbAsyncInit)
    Events.queryLocation($scope.queryZip)
      .then(function(response) {
        $scope.invalidZip = false;
        Events.targetZips = [];
        Events.targetZipsString = "";
        Events.lastLookup = $scope.queryZip.zipcode;
        for (var i = 0; i < response.data[0].zip_codes.length; i++) {
          Events.targetZips.push(response.data[0].zip_codes[i].zip_code);
          Events.targetZipsString += (response.data[0].zip_codes[i].zip_code + ", ");
        }
        Events.targetZipsString = Events.targetZipsString.slice(0, Events.targetZipsString.length - 2);
      })
      .then(function() {
        //query db for all zip codes
        $scope.loading = true;
        Events.events = [];

        for (var j = 0; j < Events.targetZips.length; j++) {
          dbConnection.orderByChild('zipCode').equalTo(Events.targetZips[j]).on('value', function(snap) {
            var dbRes = snap.val();

            if (dbRes !== null) {
              for (var key in dbRes) {

                Events.events.push(dbRes[key]);
              }
            }
          }, function(errObj) {

          });
        }

      })
      .then(function() {
        // navigate to events view
        setTimeout(function() {

          $state.go('events');
        }, 2000);
      })
      .catch(function(error) {
        $scope.invalidZip = true;
      });
  };
  $scope.initFB = function () {
    window.fbAsyncInit();
  };

  $scope.getDiretions = function(streetAddress) {
    var formattedStreetAddress = encodeURI(streetAddress);
    window.open('https://maps.google.com?daddr='+formattedStreetAddress);
  };

  $scope.addEventToGoogleCalendar = function(unformattedEventName, startDate, userInputtedTime, unformattedEventDescription, streetAddress) {

    var formatString = function(string) {
      var formattedString = encodeURI(string);
      return formattedString;
    };

    var formattedEventName = formatString(unformattedEventName);

    var formattedEventDescription = formatString(unformattedEventDescription);

    var formattedStreetAddress = formatString(streetAddress);

    var monthAsNumber;

    var formatDate = function(unformattedDate) {
      var d = new Date(unformattedDate);

      var month = '' + (d.getMonth() + 1);

      monthAsNumber = parseInt(month);

      var date = '' + d.getDate();
      var year = d.getFullYear();

      if(month.length < 2) {
        month = '0' + month;
      }

      if(date.length < 2) {
        date = '0' + date;
      }

      return year + month + date;
    };

    var formattedDate = formatDate(startDate);

    var formatDateAndTime = function(unformattedTime) {
      var onlyNumbersInTime = '';

      for(var i = 1; i < 6; i++) {
          if(i === 3) {
              continue;
          }
          onlyNumbersInTime += unformattedTime[i];
      }

      if(monthAsNumber > 2 && monthAsNumber < 11) {
        var timeAsGMTNumber = parseInt(onlyNumbersInTime) + 700;
      } else {
        var timeAsGMTNumber = parseInt(onlyNumbersInTime) + 800;
      }

      //add 1 hour for end time, so all events will pre-populate as only being an hour long
      var endGMT = timeAsGMTNumber + 100;

      formattedTime = 'T' + timeAsGMTNumber.toString() + '00Z/';
      formattedEndTime = 'T' + endGMT.toString() + '00Z';

      return formattedDate + formattedTime + formattedDate + formattedEndTime;
    };

    var formattedDateAndTime = formatDateAndTime(userInputtedTime);

    var href = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + formattedEventName + "&dates=" + formattedDateAndTime + "&details=" + formattedEventDescription + "&location=" + formattedStreetAddress + "&trp=true";

    window.open(href, '_blank');
  };
});
