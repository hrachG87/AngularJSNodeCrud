(function (angular) {

    var myApp = angular.module("employeecrud");


    myApp.factory("employeesService", ["$http", function ($http) {

        return {
            loadEmployees: function () {
                return $http.get("/api/LoadEmployees", {
                    cache: false
                });
            },

            saveEmployee: function (data) {
                return $http.post("/api/SaveEmployee", data);
            },

            deleteEmployee: function(id){
                return $http.post("/api/DeleteEmployee", {
                    id: id
                });
            }
        }


    }]);

})(window.angular);