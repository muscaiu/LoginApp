angular.module('authServices', [])

.factory('Auth', function($http, AuthToken) {
    authFactory = {};

    //User.create(regData)
    authFactory.login = function(loginData) {
        //loginData from mainCtrl
        return $http.post('/api/authenticate', loginData).then(function(data) {
            // console.log(data.data.token);
            AuthToken.setToken(data.data.token)
            return data; //get logiData from server
        })
    }

    //Auth.isLoggedIn()
    authFactory.isLoggedIn = function() {
        if (AuthToken.getToken()) {
            return true
        } else {
            return false
        }
    }

    //Auth.logout()
    authFactory.logout = function() {
        AuthToken.setToken()
    }

    return authFactory;
})

.factory('AuthToken', function($window) {
    var authTokenFactory = {}

    //AuthToken.setToken
    authTokenFactory.setToken = function(token) {
        if (token) {
            $window.localStorage.setItem('token', token)
        } else {
            $window.localStorage.removeItem('token')
        }
    }

    //AuthToken.getToken
    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token')
    }

    return authTokenFactory;
})