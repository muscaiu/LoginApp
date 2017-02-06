angular.module('interviewServices', [])

.factory('Interview', function($http) {
    addInterview = {};

    //Interview.create(newInterview)
    addInterview.create = function(newInterview) {
        return $http.post('/api/interview', newInterview) //newData from dataCtrl
    }

    return addInterview;
})