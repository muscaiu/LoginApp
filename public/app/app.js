angular.module('userApp', [
    'appRoutes',
    'userControllers',
    'userServices',
    'ngAnimate',
    'mainController',
    'authServices',
    'interviewController',
    'interviewServices'
])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors')
})