angular.module('interviewServices', [])

.factory('Interview', function($http) {
    interviewFactory = {};

    //Interview.create(newInterview)
    interviewFactory.create = function(newInterview) {
        return $http.post('/api/interview', newInterview) //newData from dataCtrl
    }

    return interviewFactory;
})