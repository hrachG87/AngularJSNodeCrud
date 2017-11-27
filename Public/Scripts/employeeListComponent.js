(function (angular) {

    var myApp = angular.module("employeecrud");


    myApp.component("employeesList", {
        templateUrl: "/Scripts/Templates/employeeList.html",
        bindings: {

        },
        controller: ["$scope", "employeesService", function ($scope, employeesService) {

            var _this = $scope;

            _this.employees = [];
            _this.employee = new EmployeeModel();
            _this.IsEditMode = false;

            _this.loadEmployees = function () {
                employeesService.loadEmployees().then(function (response) {
                    _this.employees = response.data;
                });
            }

            _this.addEmployee = function () {
                _this.employee = new EmployeeModel();
                _this.IsEditMode = true;
            }

            _this.onEditCancel = function () {
                _this.IsEditMode = false;
            }

            _this.onEditSuccess = function () {
                _this.IsEditMode = false;
                _this.loadEmployees();
            }

            _this.Edit = function(empl)
            {
                _this.employee = empl;
                _this.IsEditMode = true;
            }

            _this.Delete = function(empl){

                if(confirm("Are you sure you want to delete this employee?")) {
                    employeesService.deleteEmployee(empl._id).then(function (response) {
                        if (response.data) {
                            _this.loadEmployees();
                        }
                    });
                }
            }

            _this.loadEmployees();
        }]
    });
})(window.angular);