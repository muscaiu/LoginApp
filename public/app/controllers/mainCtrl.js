angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope) { //Auth from authServices
    var app = this;

    app.loadme = false;

    //$rootScope.$on('$viewContentLoaded', function() {
    $rootScope.$on('$routeChangeStart', function() {
        //Auth in authservices
        if (Auth.isLoggedIn()) {
            console.log('success, User is logged in ');

            app.isLoggedIn = true;

            Auth.getUser().then(function(data) {
                console.log(data.data.username);
                //to accest username from the front-end
                app.username = data.data.username
                app.useremail = data.data.email
                app.loadme = true;
            })
        } else {
            console.log('failure, User is NOT logged in ');
            app.isLoggedIn = false;
            app.username = '';
            app.loadme = true;
        }
        console.log('new route');
    })

    this.doLogin = function(loginData) {
        app.successMsg = false;
        app.errorMsg = false;
        app.isLoading = true;

        Auth.login(app.loginData).then(function(data) {
            console.log(data.data.success, data.data.message);
            if (data.data.success) {
                //Create Success message
                app.successMsg = data.data.message + '...Redirecting';
                $timeout(function() {
                    //Redirect To HomePage
                    $location.path('/about')
                    app.isLoading = false
                    app.loginData = '';
                    app.successMsg = false;
                }, 2000)

            } else {
                //Create error message
                app.errorMsg = data.data.message;
                $timeout(function() {
                    app.isLoading = false
                }, 2000)
            }
        })
    }

    this.logout = function() {
        Auth.logout()
        $location.path('/logout')
        $timeout(function() {
            //Redirect To logout
            $location.path('/logout')
            app.isLoading = false
        }, 2000)
    }
})