var app = angular.module('nodeExpenses', [])

app.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.expensesData = {};
	$scope.selected = {};

    // Get all expenses
    $http.get('/api/v1/expenses')
        .success(function(data) {
            $scope.expensesData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
		
	// Delete an expense
	$scope.deleteExpense = function(expenseID) {
		$http.delete('/api/v1/expenses/' + expenseID)
			.success(function(data) {
				$scope.expensesData = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	// Create a new expense
	$scope.createExpense = function(expenseID) {
		$http.post('/api/v1/expenses', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.expensesData = data;
				console.log(data);
			})
			.error(function(error) {
				console.log('Error: ' + error);
			});
	};
	
	$scope.updateExpense = function(expenseID, values) {
		$http.put('/api/v1/expenses/' + expenseID, values)
			.success(function(data) {
				$scope.formData = {};
				$scope.expensesData = data;
				console.log(data);
			})
			.error(function(error) {
				console.log('Error: ' + error);
			});
	};
	
	// gets the template to ng-include for a table row / item
    $scope.getTemplate = function (expense) {
        if (expense.id === $scope.selected.id) return 'edit';
        else return 'display';
    };

    $scope.editExpense = function (expense) {
        $scope.selected = angular.copy(expense);
    };

    $scope.saveExpense = function (id) {
        //console.log("Saving expense: " + $scope.selected.amount);
        $scope.updateExpense($scope.selected.id, $scope.selected);
        $scope.reset();
    };

    $scope.reset = function () {
        $scope.selected = {};
    };
});