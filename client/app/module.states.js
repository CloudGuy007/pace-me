(function(){
	angular
		.module('paceMeApp')
		.config(config)
		.run(stormpath)

	config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function config($stateProvider, $urlRouterProvider, $locationProvider){
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/html/home.html',
				controller: 'homeCtrl'
			})
			.state('login', {
				url: '/login',
				templateUrl: '/html/login.html',
				controller: 'loginCtrl'
			})
			.state('register', {
				abstract: true,
				url: '/register',
				templateUrl: '/html/register.html',
				controller: 'registerCtrl'
			})
			.state('register.initial', {
				url: '',
				templateUrl: '/html/register.initial.html'
				})
			.state('register.phone', {
				url: '',
				templateUrl: '/html/register.phone.html'
			})
			.state('register.person', {
				url: '',
				templateUrl: '/html/register.person.html'
			})
			.state('register.bio', {
				url:'',
				templateUrl: '/html/register.bio.html'
			})
			.state('register.run', {
				url: '',
				templateUrl: '/html/register.run.html'
			})
			.state('list', {
				url: '/buddies',
				templateUrl: '/html/list.html',
				controller: 'listCtrl'
			})
			.state(`profile`, {
				url: '/profile/{id}',
				templateUrl: '/html/profile.html',
				controller: 'profileCtrl',
				sp: {
	          		authenticate: true
	        	}
			})
			.state('admin', {
				url: '/admin',
				templateUrl: '/html/admin.html',
				controller: 'adminCtrl'
			})
		$urlRouterProvider.otherwise('/');
	}

	stormpath.$inject = ['$stormpath'];

	function stormpath($stormpath){
		$stormpath.uiRouter({
			loginState: 'login',
	    defaultPostLoginState: 'list'
	  });
	}
})();