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
			})
			.when('/users/edit/:userId', {
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

usersAddController.$inject = ["$http", "$routeParams"];

function usersAddController($http, $routeParams) {
	var users = this;

	users.user = {};

	users.add = addUser;


	init();

	return users;
	///

	function init() {
		var id = $routeParams.userId || undefined;

		if(angular.isDefined(id)) {
			$http({
				method: 'GET',
				url: '/api/users/list/' + id
			}).then(function successCallback(response) {
				console.log(response);
				users.user = response.data.data;
				users.user.qr = response.data.qr;
			}, function errorCallback(response) {
				console.log(response);
				users.user = {};
			});
		}
	}

	function addUser() {
		var payload = {};

		payload.user = {};
		if(users.user.hasOwnProperty("_id")){
			payload.user["_id"] = users.user._id;
		}

		payload.user["name"] = users.user.name;
		payload.user["password"] = users.user._password;
		payload.user["auth"] = users.user.auth;
		payload.user["roles"] = users.user.roles;

		// Simple GET request example:
		$http({
			method: 'POST',
			url: '/api/users/add',
			data: payload
		}).then(function successCallback(response) {
			console.log(response);
			users.user = response.data.data;
			users.user.qr = response.data.qr;
			delete users.error;
		}, function errorCallback(response) {
			console.log(response);
			users.user = {};
			users.error = response.data.error;
		});
	}
}