'use strict';

/**
 * @ngdoc function
 * @name invoiceASAPApp.controller:Template
 * @description
 * # Templete
 * Controller of the invoiceASAPApp
 */

angular.module('invoiceASAPApp').controller('CustomerController', function ($state, $rootScope,$stateParams, $scope, CustomerService, $q) {


    $scope.customerguid = $stateParams.customerguid ? $stateParams.customerguid : "eb627abe-2735-11e4-ae4f-025ae7f06885";

    $scope.$on('$viewContentLoaded', function (event) {
        loadCustomerData($scope.customerguid);
    });

// TODO put th
// is in the resovle function for ui-manger in app
    function loadCustomerData(guid) {

        var dependencies = [
            $scope.customer = CustomerService.getCustomer(guid),
            CustomerService.loadCustomerStats(guid),
            CustomerService.loadCustomerNotes(guid),
            CustomerService.loadCustomerDocumentStats(guid)
        ];
        $q.all(dependencies).then(
            function success(data) {
                $scope.stats = CustomerService.getCustomerStats();
                $scope.notes = CustomerService.getCustomerNotes();
                $scope.docStats = CustomerService.getCustomerDocumentStats();
                //
                //console.log('INFO: resolved CUSTOMER DATA... ' + $scope.customer.companyname);
                //console.log('INFO: stats... ' + $scope.stats.balance);
                //console.log('INFO: notes... ' + $scope.notes[0].id);
                //console.log('INFO: doc stats... ' + $scope.docStats.sum_payments);

            },
            function fail(error) {
                console.log('INFO: error ');
            }
        );
    };


});
