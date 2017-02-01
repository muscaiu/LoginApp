angular.module('authServices', [])

.factory('Auth', function($http) {
    authFactory = {};

    //User.create(regData)
    authFactory.login = function(regData) {
        return $http.post('/api/users', regData)
    }
    return authFactory;
})