angular.module('userApp', [
    'appRoutes',
    'userControllers',
    'userServices',
    'ngAnimate',
    'mainController',
    'authServices',
    'dataController',
    'dataServices'
])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors')
})