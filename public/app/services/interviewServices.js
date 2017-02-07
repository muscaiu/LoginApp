angular.module('interviewServices', [])

.factory('Interview', function($http) {
    interviewFactory = {};

    //Interview.create(newInterview)
    interviewFactory.create = function(newInterview) {
        return $http.post('/api/interview', newInterview).then(function(data) {
            console.log(data.data.token);
        })
    }

    interviewFactory.getInterviews = function() {
        return $http.get('/api/getinterviews')
    }

    return interviewFactory;
})