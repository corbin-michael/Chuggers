// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('chuggers', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tabs.chuggers', {
            url: '/chuggers',
            views : {
                'chuggers-tab' : {
                    templateUrl: 'templates/chuggers.html',
                    controller: 'ChuggersCtrl'
                }
            }
        })
        .state('tabs.detail', {
            url: '/chuggers/:chuggerId',
            views : {
                'chuggers-tab' : {
                    templateUrl: 'templates/detail.html',
                    controller: 'ChuggersCtrl'
                }
            }
        })
        .state('tabs.profile', {
            url: '/profile',
            views : {
                'profile-tab' : {
                    templateUrl : 'templates/profile.html',
                    controller: 'ProfileCtrl'
                }
            }
        })
        .state('create-user', {
            url: '/create-user',
            templateUrl: 'templates/create-user.html',
            controller: 'CreateUserCtrl'
        })
        $urlRouterProvider.otherwise('/create-user');
})

.controller('ChuggersCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
        $scope.allUsers = data;
        $scope.whichChugger = $state.params.chuggerId;
    });
}])
.controller('ProfileCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('js/data.json').success(function(data) {
        $scope.allUsers = data;
    });
}])
.controller('CreateUserCtrl', ['$scope', '$firebaseArray', '$state', function($scope, $firebaseArray, $state) {
    $scope.checkError = false;

    $scope.createUser = function() {
        var $firstName = $scope.firstName;
        var $lastName = $scope.lastName;
        var $chuggerName = $scope.chuggerName;
        var $email = $scope.email;
        var $password = $scope.password;

        auth.createUserWithEmailAndPassword($email, $password).then(function(user) {
            // On Successful Creation
            database.ref('/users').child(user.uid).set({
                first_name      : $firstName,
                last_name       : $lastName,
                chugger_name    : $chuggerName,
                email           : $email
            });

        }).catch(function(error) {
            // Error With Creation
            $scope.checkError = true;
            $scope.errorCode = error.code;
            $scope.errorMessage = error.message;

        }); //auth.createUserWithEmailAndPassword

        // clear form value
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.chuggerName = "";
        $scope.email = "";
        $scope.password = "";

        // go to profile once logged in
        $state.go('tabs.profile');

    } // createUser();

}]);
