angular.module('interviewController', ['interviewServices', 'authServices'])

.controller('interviewCtrl', function($scope, $http, Interview, Auth) {

    var app = this;

    //on load get data from db
    Interview.getinterviews().then(function(response) {
            app.interviewsList = response.data
                //console.log(app.interviewsList);
        })
        //on load get logged username
    Auth.getUser().then(function(data) {
        //to accest username from the front-end
        app.username = data.data.username
        console.log(app.username);

    })

    //submit new Interview
    this.submitInterview = function(obj) {
        // console.log(app.newInterview);
        Interview.create({ newInterview: app.newInterview, username: app.username })
    }

    $scope.clickedItem = function(item) {
        console.log(item._id);
    }

})