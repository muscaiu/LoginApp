angular.module('interviewController', ['interviewServices'])

.controller('interviewCtrl', function($http, Interview) {

    var app = this;

    //on load get data from db
    //app.Interview = function() {
    Interview.getInterviews().then(function(data) {
        app.interviewsList = data.data
        console.log(app.interviewsList);
    })

    //submit new Interview
    this.submitInterview = function(newInterview) {
        console.log(app.newInterview);
        Interview.create(app.newInterview).then(function(data) {
            console.log(data);
        })
    }
})