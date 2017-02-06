angular.module('dataController', ['dataServices'])

.controller('dataCtrl', function($http, AddData) {

    var app = this;

    this.submitData = function(newData) {
        console.log(app.newData);
        AddData.create(app.newData).then(function(data) {
            console.log(data.data.sucess);
        })
    }
})