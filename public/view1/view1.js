'use strict';

angular.module('myApp.view1', ['ngRoute']);

angular.module('myApp.view1')
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/view1', {
			templateUrl: 'view1/view1.html',
			controller: 'View1Ctrl',
			controllerAs: "v1",
			bindToController: true
		});
	}]);

angular.module('myApp.view1')
	.controller('View1Ctrl', view1Controller);

view1Controller.$inject = ["$scope"];

function view1Controller($scope) {
	var v1 = this;

	v1.test = {"param":"value"}
	
	console.log(v1);

	return v1;
}