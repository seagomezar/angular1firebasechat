'use strict';
(function() {
  function DialogController($scope, $mdDialog, $localStorage) {
    $scope.answer1 = '';
    $scope.closeDialog = function() {
      $mdDialog.hide();
      $localStorage.name = $scope.answer1;
      $localStorage.color = '#F6CECE';
    };
  }
  function ChatController($scope, ngDialog, $firebaseArray, $mdDialog, $localStorage, $location, $anchorScroll) {
    if ($localStorage.name) {
      $scope.newMessage = {
        'author': $localStorage.name,
        'color': $localStorage.color
      };
      var ref = new Firebase('YOUR-FIREBASE-URL');
      var query = ref.orderByChild('time');
      $scope.chatMessages = $firebaseArray(query);
      $scope.addMessage = function() {
        if ($scope.chatMessages[0] && $scope.chatMessages[0].author !== $localStorage.name) {
          if ($scope.chatMessages[0].color === $localStorage.color) {
            $scope.newMessage.color = '#5DDECF';
            $localStorage.color = '#5DDECF';
          }
        }
        if ($scope.newMessage.text) {
          $scope.newMessage.userImage = 'http://www.hit4hit.org/img/login/user-icon-6.png';
          $scope.newMessage.timedate = new Date().getTime();
          $scope.chatMessages.$add($scope.newMessage);
          $scope.newMessage.text = '';
        }
      };
      ref.on('child_added', function(snap) {
        $location.hash('anchor' + snap.val().timedate);
      });
    } else {
      $scope.answer1 = '';
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/askNameDialog.html',
        clickOutsideToClose: false
      });
    }
  }

  angular.module('angular1FirebaseChat')
    .controller('ChatController', ChatController);
})();
