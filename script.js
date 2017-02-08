/**
 * Created by nadeesha on 12/1/16.
 */
var app = angular.module('musicApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/item', {
            controller : 'listController',
            templateUrl : 'view-list.html',

        })
        .when('/item/add', {
            controller : 'addController',
            templateUrl : 'view-details.html',

        })
        .when('/item/:index', {
            controller : 'editController',
            templateUrl : 'view-details.html',
        })
        .otherwise(
            {redirectTo : '/item'}
        )

}]);

app.factory('musicService', function ($rootScope) {
    var svc = {};

    data = [
        {id : 0, artist : 'Ann', genre : 'Rock', rating : '3'},
        {id : 1, artist : 'John', genre : 'Alternative', rating : '5'},
        {id : 2, artist : 'Alex', genre : 'Rap', rating : '3'},
    ];

        svc.getArtist = function () {
            return data;
            
        };
        svc.addArtist = function (artist) {
            data.push(artist);

        };
        svc.editArtist = function (index, artist) {
            data[index] = artist;

        };

    return svc;
    
});


app.controller("listController", ['$scope', '$location', '$routeParams', 'musicService', function ($scope, $location, $routeParams, musicService) {

    $scope.data = musicService.getArtist();
    
    $scope.addSubject = function () {
        $location.path("/item/add");
    }

    $scope.editItem = function (x) {
        $location.path('/item/'+ x);
    }

}]);


app.controller('addController', function ($scope, $location, musicService) {

    $scope.saveItem = function () {
        musicService.addArtist({artist: $scope.item.artist, genre:$scope.item.genre, rating:$scope.item.rating});
        $location.path('/item');
    }
    $scope.cancel = function () {
        $location.path('/item');
    }
});

app.controller('editController', function ($scope, $location, $routeParams, musicService) {

    $scope.item = musicService.getArtist()[parseInt($routeParams.index)];

    $scope.saveItem = function () {
        musicService.addArtist([parseInt($routeParams.index)], {artist: $scope.item.artist, genre:$scope.item.genre, rating:$scope.item.rating});
        $location.path('/item');
    }
    $scope.cancel = function () {
        $location.path('/item');
    }

});