angular.module('goDriveline', [])
.factory('mainInfo', function($http) {
  return $http.get('/services.json');
})
.controller('ServiceController', ['$rootScope','$scope','mainInfo', function($rootScope, $scope, mainInfo) {
  $scope.serviceData = null;
  $scope.todos = [];
  mainInfo.success(function(data){
    $scope.serviceData = data;
    console.log($scope.serviceData);
    var featuredCategory = null;
    var categories = $scope.serviceData.categories;
    for(i=0; i<categories.length;i++){
      if(categories[i]['name']=="Available Services"){
        var featuredCategory = i;
      }
    }
    featuredCategory = $scope.serviceData.categories[featuredCategory];
    $scope.featuredService =[];
    for(i=0;i<featuredCategory['services'].length;i++){
      featuredCategory['services'][i].fullview = false;
      $scope.featuredService.push(featuredCategory['services'][i]);
    }
  });

  $scope.clicked = function(service){
    var ser = service;
    $rootScope.presentService = ser;
    $rootScope.screenFixed = true;
  }
  $scope.expand = function(service) {
     service.fullview = !service.fullview;
  }
  $rootScope.toggle = function () {
    $rootScope.screenFixed = !$rootScope.screenFixed;
  };
}])
