angular.module('userControllers', [])

.controller('regCtrl', function($http) {

    var myThis = this;

    this.regUser = function(regData) {
        console.log('form submitted');
        $http.post('/api/users', this.regData).then(function(data) {
            console.log(data.data.success, data.data.message);
            if (data.data.success) {
                //Create Success message
                myThis.successMsg = data.data.message
                    //Redirect To HomePage
            } else {
                myThis.errorMsg = data.data.message
                    //Create error message
            }
        })
    }
})