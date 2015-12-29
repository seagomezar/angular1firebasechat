'use strict';
(function() {
  angular.module('angular1FirebaseChat', ['ngRoute', 'ngDialog', 'ngStorage', 'firebase', 'ngMaterial'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/chat.html',
          controller: 'ChatController'
        });
    }]);
})();
