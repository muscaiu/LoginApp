angular.module('userControllers', [])

.controller('regCtrl', function($http, $location, $timeout) {

    var app = this;

    this.regUser = function(regData) {
        app.successMsg = false;
        app.errorMsg = false;
        app.isLoading = true;

        $http.post('/api/users', this.regData).then(function(data) {
            console.log(data.data.success, data.data.message);
            if (data.data.success) {
                //Create Success message
                app.successMsg = data.data.message + '...Redirecting';
                $timeout(function() {
                    //Redirect To HomePage
                    $location.path('/')
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
})