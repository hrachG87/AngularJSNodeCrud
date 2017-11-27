(function (angular) {

    var myApp = angular.module("employeecrud");


    myApp.component("employeesDetails", {
        templateUrl: "/Scripts/Templates/employeeDetails.html",
        bindings: {
            employee: "<",
            onCancel: "&",
            onSuccess: "&"
        },
        controller: ["$scope", "employeesService", function ($scope, employeesService) {

            var _this = $scope;
            _this.errorMessage = null;

            _this.save = function (form) {

                if (form.$valid) {
                    var employee = _this.$ctrl.employee;

                    employeesService.saveEmployee(employee).then(function (response) {

                        if (response.data != null) {
                            _this.$ctrl.onSuccess();
                        }
                        else {
                            _this.errorMessage = "Error Occured While Saving Employee";
                        }
                    });

                   // _this.$ctrl.onSuccess();
                }
            }

        }]
    });

})(window.angular);