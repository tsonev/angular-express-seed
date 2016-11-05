'use strict';

angular.module('myApp.users', ['ngRoute']);

angular.module('myApp.users')
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/users', {
				templateUrl: 'users/users.html',
				controller: 'UsersCtrl',
				controllerAs: "users",
				bindToController: true
			})
			.when('/users/list', {
				templateUrl: 'users/list.html',
				controller: 'UsersListCtrl',
				controllerAs: "users",
				bindToController: true
			})
			.when('/users/add', {
				templateUrl: 'users/add.html',
				controller: 'UsersAddCtrl',
				controllerAs: "users",
				bindToController: true
			});
	}]);

angular.module('myApp.users')
	.controller('UsersCtrl', usersController);

usersController.$inject = ["$scope"];

function usersController($scope) {
	var users = this;

	users.test = {"param": "value"};

	console.log(users);

	return users;
}


angular.module('myApp.users')
	.controller('UsersListCtrl', usersListController);

usersListController.$inject = ["$http"];

function usersListController($http) {
	var users = this;

	users.list = [];

	init();

	return users;
	///


	function init() {
		// Simple GET request example:
		$http({
			method: 'GET',
			url: '/api/users/list'
		}).then(function successCallback(response) {
			console.log(response);
			users.list = response.data.data;
		}, function errorCallback(response) {
			console.log(response);
			users.list = [];
		});
	}
}

angular.module('myApp.users')
	.controller('UsersAddCtrl', usersAddController);

usersAddController.$inject = ["$http"];

function usersAddController($http) {
	var users = this;

	users.user = {};

	users.add = addUser;

	return users;
	///


	function addUser() {
		var payload = {};

		payload.user = {};
		payload.user["name"] = users.user.name;
		payload.user["password"] = users.user.password;

		// Simple GET request example:
		$http({
			method: 'POST',
			url: '/api/users/add',
			data: payload
		}).then(function successCallback(response) {
			console.log(response);
			users.user = response.data.data;
			delete users.error;
		}, function errorCallback(response) {
			console.log(response);
			users.user = {};
			users.error = response.data.error;
		});
	}
}