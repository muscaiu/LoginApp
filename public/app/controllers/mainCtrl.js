angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location) { //Auth from authServices
    var app = this

    //Auth in authservices
    if (Auth.isLoggedIn()) {
        console.log('success, User is logged in ');
        Auth.getUser().then(function(data) {
            console.log(data.data.username);
            //to accest username from the front-end
            app.username = data.data.username
        })
    } else {
        console.log('failure, User is NOT logged in ');
    }

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