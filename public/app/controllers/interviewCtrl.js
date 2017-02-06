angular.module('interviewController', ['interviewServices'])

.controller('interviewCtrl', function($http, Interview) {

    var app = this;

    this.submitInterview = function(newInterview) {
        console.log(app.newInterview);
        Interview.create(app.newInterview).then(function(data) {
            console.log(data.data.sucess);
        })
    }
})