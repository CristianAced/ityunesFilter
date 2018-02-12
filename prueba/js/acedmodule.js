var acedmodule = angular.module('AcedApp', ['angular.filter']);

acedmodule.controller('ItunesController', function ($rootScope, $scope, $http, $compile, $q, $sce, $element) {

    $scope.model = {};
    $scope.categories = [];
	$scope.filtereddata = [];
	$scope.filtered = false;

    $scope.init = function () {        
        $http.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json').success(function (data) {
            $scope.model = angular.fromJson(data);
            $scope.model.feed.entry.forEach(function(ele) {
            	if ($scope.categories.indexOf(ele.category.attributes.label) == -1) {
            		$scope.categories.push(ele.category.attributes.label);
            	}
            });
            if (!$scope.filtered) {
            	$scope.filtereddata = $scope.model.feed.entry;
            }
        });
    }

	$scope.filtercategorysongs = function(cat) {
		//alert(cat)
		if (cat === null) {
			$scope.filtered = false;
			$scope.filtereddata = $scope.model.feed.entry;
			return;
		}
		$scope.filtereddata = [];
		$scope.model.feed.entry.forEach(function(ele) {
			if (ele.category.attributes.label === cat) {
				$scope.filtereddata.push(ele)
			}
		});		
		$scope.filtered = true;
		$scope.$apply($scope.filtereddata);
	}
});