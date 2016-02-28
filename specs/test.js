describe('EventController', function(){

  var $scope;
  var $httpBackend;
  var $rootScope;
  var Events;
  var createController;
  var $state;
  var $firebaseArray;
  var $stateParams;


  beforeEach(module('booletin'));
  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Events = $injector.get('Events');
    $state = $injector.get('$state');
    $firebaseArray = $injector.get('$firebaseArray');
    $stateParams = $injector.get('$stateParams');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('EventController', {
        $scope: $scope,
        Events: Events,
        $state: $state,
        $firebaseArray: $firebaseArray,
        $stateParams: $stateParams,
      });
    };
  }));

  it('should have a getEvents function on the scope', function() {
    createController();
    expect(typeof $scope.getEvents).toBe('function');
  });


});













// var assert = require('chai').assert;
// // // var assert = chai.assert,
// // //   expect = chai.expect,
// // //   should = chai.should();

// describe('Array', function(){
//   describe('#indexOf()', function(){
//     it('should return -1 when the value is not present', function(){
//       assert.equal(-1, [1,2,3].indexOf(5));
//       assert.equal(-1, [1,2,3].indexOf(0));
//     })
//   })
// })
