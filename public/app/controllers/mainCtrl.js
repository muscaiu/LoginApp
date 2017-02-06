angular.module('mainController', ['authServices', 'userServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, $window, $interval, $route, User, AuthToken) { //Auth from authServices
    var app = this;

    app.loadme = false;

    app.checkSession = function() {
        if (Auth.isLoggedIn()) {
            app.checkingsession = true;
            var interval = $interval(function() {
                //console.log('testing if login token is expired every 10 sec');
                var token = $window.localStorage.getItem('token')
                if (token === null) {
                    $interval.cancel(interval) //cancel checking when the token is expired
                } else {
                    //converts the token time to timestamp so we can compare it to localtime
                    //so we can determine how much time is left on the token
                    self.parseJwt = function(token) {
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace('-', '+').replace('_', '/');
                        return JSON.parse($window.atob(base64));
                    }
                    var expireTime = self.parseJwt(token);
                    var timeStamp = Math.floor(Date.now() / 1000);
                    //console.log(expireTime.exp);
                    //console.log(timeStamp);
                    var timeCheck = expireTime.exp - timeStamp;
                    console.log('timecheck', timeCheck);
                    if (timeCheck <= 25) {
                        console.log('token has expired');
                        showModal(1) //option 1 
                        $interval.cancel(interval) //cancel checking when the token is expired
                    } else {
                        console.log('token not yet expired');
                    }
                }
                //console.log(token);
            }, 2000)
        }
    }

    app.checkSession();

    var showModal = function(option) {
        app.choiceMade = false;
        app.modalHeader = undefined;
        app.modalBody = undefined;
        app.hideButton = false;

        if (option === 1) {
            app.modalHeader = 'Timeout Warning'
            app.modalBody = 'Your session will expire in 5 minutes. Would you like to renew your session? You have 5 sec!'
            $('#myModal').modal({ backdrop: "static" }) //can't click on background

        } else if (option === 2) {
            //logout portion
            app.hideButton = true;
            app.modalHeader = 'Logging Out';
            $('#myModal').modal({ backdrop: "static" }) //can't click on background
            $timeout(function() {
                Auth.logout();
                $location.path('/');
                hideModal();
                $route.reload();
            }, 2000);
        }
        $timeout(function() {
            if (!app.choiceMade) {
                hideModal();
            }
        }, 5000)
    }

    app.renewSession = function() {

        app.choiceMade = true;

        User.renewSession(app.username).then(function(data) {
            if (data.data.success) {
                AuthToken.setToken(data.data.token); //reset the token
                app.checkSession()
            } else {
                app.modalBody = data.data.message;
            }
        });

        hideModal();
        console.log('session has been renewed');
    }

    app.endSession = function() {
        app.choiceMade = false;
        hideModal();
        console.log('session has been ened');
    }

    var hideModal = function() {
        $('#myModal').modal('hide');
    }

    //$rootScope.$on('$viewContentLoaded', function() {
    $rootScope.$on('$routeChangeStart', function() {

        if (!app.checkingsession) app.checkSession();

        //Auth in authservices
        if (Auth.isLoggedIn()) {
            console.log('success, User is logged in ');

            app.isLoggedIn = true;

            Auth.getUser().then(function(data) {
                //to accest username from the front-end
                app.username = data.data.username
                app.useremail = data.data.email
                app.loadme = true;
            })
        } else {
            //console.log('failure, User is NOT logged in ');
            app.isLoggedIn = false;
            app.username = '';
            app.loadme = true;
        }
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
                    app.checkSession();
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
        showModal(2)
    }
})