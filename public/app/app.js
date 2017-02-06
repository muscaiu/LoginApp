angular.module('userApp', [
    'appRoutes',
    'userControllers',
    'userServices',
    'ngAnimate',
    'mainController',
    'authServices',
    'dataController'
])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors')
})