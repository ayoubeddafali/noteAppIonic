
var app = angular.module('mynotes', ['ionic','mynotes.notestore']);


app.config(function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.navBar.alignTitle('left');
  $stateProvider.state('list',{ // we're creating a state == view with name list and params as object
    url : '/list',
    templateUrl :'templates/list.html'
  });
  $stateProvider.state('edit',{
    url : '/edit/:noteId',
    templateUrl : 'templates/edit.html',
    controller : 'editCtrl'
  });
  $stateProvider.state('add',{
    url : '/add',
    templateUrl :'templates/edit.html',
    controller : 'addCtrl'
  });
  $urlRouterProvider.otherwise('/list'); // to automatically redirect any other route to the list route
});

app.controller('listCtrl',function ($scope,noteStore) {
  $scope.reorderState = false;
  $scope.notes = noteStore.list();
  $scope.deleteNote = function (noteId) {
    // var index = noteStore.getIndex(noteId);
    noteStore.delete(noteStore.getIndex(noteId));

  }
  $scope.reorderNote = function (note, fromIndex , toIndex) {
    noteStore.reorder(note,fromIndex,toIndex);
  }
  $scope.reorderFlag = function () {
    $scope.reorderState = !$scope.reorderState;

    if(!$scope.reorderState){
      document.getElementById('status').innerHTML= "Reorder";
    }else {
      document.getElementById('status').innerHTML = "Finish Reorder";
    }
  }
  $scope.deleteAll =  function () {
    noteStore.deleteAll();
  }

});
app.controller('addCtrl',function ($scope, $state,noteStore) {

  $scope.Note = {id : '', title :'', description:''};
  $scope.save = function () {
    $scope.Note.id = new Date().getTime().toString();
    noteStore.create($scope.Note);
    $state.go('list');
  }
});
app.controller('editCtrl',function ($scope,$state,noteStore) {
  $scope.Note = angular.copy(noteStore.get($state.params.noteId));
  $scope.save = function () {
    noteStore.update($scope.Note);
    $state.go('list'); // automatically go to the 'list' state from the stateProvider

  }
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
