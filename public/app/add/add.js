angular.module('booletin.add',[])

.controller('addEvents',function ($scope, $firebaseArray, $firebaseObject, $state, $http){
  var dbConnection = new Firebase("https://glowing-torch-8522.firebaseio.com"); //https://booletin.firebaseio.com/events
  $scope.events = $firebaseArray(dbConnection);
  $scope.newEvent = {};
  $scope.image = {};
  $scope.change = function(){
    $scope.getLocation($scope.newEvent.streetAddress);
  };
  $scope.zip = '';
  var today = new Date();
  $scope.today = today.toISOString();

  //async fn to convert img to base64 for storage in db
  $scope.getImage = function(cb){
    if (!($scope.image.flow.files.length)) {
      return cb('');
    }
    var files = $scope.image.flow.files;
    var file = files[0].file;
    var reader = new FileReader();
    reader.onloadend = function(){
      cb(reader.result);
    };
    if (file) {
      //converts img to long data string
      reader.readAsDataURL(file);
    }
  };

  $scope.addEvent = function(){
    $scope.getImage(function(img) {
      $scope.events.$add({
        zipCode : $scope.newEvent.zipCode,
        eventName : $scope.newEvent.eventName,
        streetAddress : $scope.newEvent.streetAddress,
        eventDescription : $scope.newEvent.eventDescription,
        startDate : $scope.newEvent.startDate.toString().slice(0, 15),
        //time.toString() === 'Thu Jan 01 1970 05:10:00 GMT-0800 (PST)'
        time : $scope.newEvent.time.toString().slice(15, 21) + ' ' + $scope.newEvent.time.toString().slice(35, 38),
        photo : img,
        tags : $scope.newEvent.tag || ''
      });
    });
    $state.go('events', {search:"no"});
  };

  $scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
      if (response.data.results[0]) {
        var wholeAddressArr = response.data.results[0].address_components;
        for(var i = 0 ; i < wholeAddressArr.length ; i++){
          if(wholeAddressArr[i].types[0] === 'postal_code'){
            $scope.newEvent.zipCode = wholeAddressArr[i].long_name;
          }
        }
      }
      return response.data.results.map(function(item){
        return item.formatted_address;
      });
    });
  };
  $scope.initFB = function (){
    window.fbAsyncInit();
  };
});
