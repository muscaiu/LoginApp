angular.module('dataServices', [])

.factory('AddData', function($http) {
    addDataFactory = {};

    //addData.insertData(regData)
    addDataFactory.create = function(newData) {
        return $http.post('/api/insertData', newData) //newData from dataCtrl
    }

    //User.renewSession(username)
    // addDataFactory.renewSession = function(username) {
    //     return $http.get('/api/renewToken/' + username)
    // }

    return addDataFactory;
})