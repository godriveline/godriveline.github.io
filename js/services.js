angular.module('goDriveline', [])
.factory('mainInfo', function($http) {
  return $http.get('/services.json');
})
.controller('ServiceController', ['$scope','mainInfo', function($scope, mainInfo) {
  $scope.serviceData = null;
  $scope.todos = [];
  mainInfo.success(function(data){
    $scope.serviceData = data;
    console.log($scope.serviceData);
    var featuredCategory = null;
    var categories = $scope.serviceData.categories;
    for(i=0; i<categories.length;i++){
      if(categories[i]['name']=="Active Services"){
        var featuredCategory = i;
      }
    }
    featuredCategory = $scope.serviceData.categories[featuredCategory];
    $scope.featuredService = featuredCategory['services'];
  });
}]);
