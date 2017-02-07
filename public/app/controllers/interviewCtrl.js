angular.module('interviewController', ['interviewServices', 'authServices'])

.controller('interviewCtrl', function($scope, $http, $location, Interview, Auth) {

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
            //console.log(app.username);

    })

    //submit new Interview
    this.submitInterview = function(obj) {
        // console.log(app.newInterview);
        Interview.create({ newInterview: app.newInterview, username: app.username })
    }

    //highlight cliecked row using ng-class="{selected : item._id === idSelectedRow._id}"
    $scope.idSelectedRow = null;
    $scope.clickedItem = function(item) {
        $scope.idSelectedRow = item;
        //$location.path('/tabella/edit');
    }

    //sorting defaults
    $scope.sortType = 'nomecognome'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
})