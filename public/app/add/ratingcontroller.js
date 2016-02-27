
angular.module('booletin.rating',[])
.controller('RatingDemoCtrl', function ($scope, $http, $firebaseArray, $firebaseObject, Events) {
  var dbConnection = new Firebase("https://glowing-torch-8522.firebaseio.com"); 
  $scope.rating = $firebaseArray(dbConnection);
  $scope.max = 10;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
  // $scope.saveRating = function (){
  //   // var rate;
  //   var rate = $scope.rate;
  //   //rate.toString()
  //   console.log(rate);
    
  //   $http.post("/submit", {
  //     data: {
  //       rate: rate
  //     },
  //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},  
  //   })
  //   .then(function(data){ 
  //     console.log('successfully sent rating of ', data)
  //   }).catch(function(err){
  //     console.log("The error ",err)
  //   })  
  // };

  $scope.saveRatingToFireBase = function(){
    console.log('hit saveRatingToFireBase')
    
    console.log(Events)
    var rate  = $scope.rate;  
    console.log(rate)
    $scope.rating.$add({
      eventRating: rate, 
    })
  }

});

