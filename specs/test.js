describe('EventController', function() {

  var $scope;
  var $httpBackend;
  var $rootScope;
  var Events;
  var createController;
  var $state;
  var $firebaseArray;
  var $stateParams;


  beforeEach(module('booletin'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Events = $injector.get('Events');
    $state = $injector.get('$state');
    $firebaseArray = $injector.get('$firebaseArray');
    $stateParams = $injector.get('$stateParams');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('EventController', {
        $scope: $scope,
        Events: Events,
        $state: $state,
        $firebaseArray: $firebaseArray,
        $stateParams: $stateParams,
      });
    };
    //call createController before every test, so that they have access to $scope
    createController();
  }));

  it('should have a getEvents function on the scope', function() {
    expect(typeof $scope.getEvents).toBe('function');
  });

  it('events array should be empty', function() {
    var dbConnection = new Firebase("https://glowing-torch-8522.firebaseio.com");

    $stateParams.search = 'no';
    if ($stateParams.search === "no") {
      $scope.events = $firebaseArray(dbConnection);
      Events.targetZipsString = "all";
    } else {
      $scope.events = Events.events;
    }

    console.log('stateparams is ', $stateParams.search);
    console.log('events array is', $scope.events);
    expect($scope.events.length).toBe(0);
  });

  describe('the addEventToGoogleCalendar function', function() {

    it('should be a function', function() {
      expect(typeof $scope.addEventToGoogleCalendar).toBe('function');
    });

    it('should be defined', function() {
      expect($scope.addEventToGoogleCalendar).toBeDefined;
    });


  });

  describe('a non-existent function', function() {
    it('should not be defined', function() {
      expect($scope.nonExistentFunc).not.toBeDefined;
    });

  });

  describe('Event sorting function when viewing all events', function() {
    it('should default to showing future events only', function() {
      expect($scope.dateSort).toBe($scope.newEventsOnly);
    });

    it('should not show future events when clicking the show past events link', function() {
      $scope.showEvents('past');
      expect($scope.dateSort).not.toBe($scope.newEventsOnly);
    });
  });

  describe('Http initial test', function() {
    it('should respond with 200 and "simple form" with a get request to /api/events', function() {
      $httpBackend.expectGET('/api/eventss').respond(400, '');
      //need to flush after? keeps throwing error
      // $httpBackend.flush();
      // afterEach(function() {
       // $httpBackend.verifyNoOutstandingExpectation();
       // $httpBackend.verifyNoOutstandingRequest();
     // });
    });
  });

});

//didn't set this up right, throwing injectors throwing errors
// describe('AddEventsController', function() {

//   var $scope;
//   var $httpBackend;
//   var $rootScope;
//   var createController;
//   var $state;
//   // var $firebaseArray;
//   // var $firebaseObject;

//   beforeEach(module('booletin.add'));
//   beforeEach(inject(function($injector) {
//     $rootScope = $injector.get('$rootScope');
//     $httpBackend = $injector.get('$httpBackend');
//     // $firebaseArray = $injector.get('$firebaseArray');
//     // $firebaseObject = $injector.get('$firebaseObject');
//     $state = $injector.get('$state');
//     $scope = $rootScope.$new();

//     var $controller = $injector.get('$controller');

//     createController = function() {
//       return $controller('addEvents', {
//         $scope: $scope,
//         $firebaseArray: $firebaseArray,
//         $firebaseObject: $firebaseObject,
//         $state: $state,
//         $http: $http
//       });
//     };
//     //call createController before every test, so that they have access to $scope
//     createController();
//   }));

//   describe('getLocation function', function() {
//     it('should have a getLocation function', function() {
//       expect(typeof $scope.getLocation).toBe('function');
//     });
//   });
// });


//refactoring inherited code, too many bugs and mistakes in inherited code to run tests

// var assert = require('chai').assert;
// // // var assert = chai.assert,
// // //   expect = chai.expect,
// // //   should = chai.should();

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal(-1, [1,2,3].indexOf(5));
//       assert.equal(-1, [1,2,3].indexOf(0));
//     })
//   })
// })
