angular.module('userControllers', [])

.controller('regCtrl', function($http, $location) {

    var app = this;

    this.regUser = function(regData) {
        app.successMsg = false;
        app.errorMsg = false;
        app.isLoading = false;

        $http.post('/api/users', this.regData).then(function(data) {
            console.log(data.data.success, data.data.message);
            if (data.data.success) {
                app.isLoading = false
                    //Create Success message
                app.successMsg = data.data.message;
                //Redirect To HomePage
                $location.path('/')
            } else {
                app.isLoading = false
                    //Create error message
                app.errorMsg = data.data.message;
            }
        })
    }
})