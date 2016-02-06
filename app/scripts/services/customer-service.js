'use strict';

angular.module('invoiceASAPApp').factory('CustomerService', function ($filter, $http, $q) {

    var getCustomerUrl = 'data/GetCustomers.json',
        getCustomerStatsUrl = 'data/GetCustomerStats.json',
        getCustomerNotesUrl = 'data/GetCustomerNotes.json',
        getCustomerDocumentStatsUrl = 'data/GetCustomerDocumentStats.json';


    var customers, customerStats, customerNotes, customerGiud, customerDocumentStats;
    return  {
        init: function () {

        },


        loadCustomers: function () {
            return $http({
                method: 'GET',
                url: getCustomerUrl

            }).then(function (response) {
                //console.log(response.data['customers']);
                customers = response.data['customers'];
                return customers;
            });


        },

        //Customer stats
        loadCustomerStats: function (customerGuid) {

            return $http({
                method: 'GET',
                url: getCustomerStatsUrl

            }).success(function (data) {
                customerStats = data['customer_stats'];
                //console.dir("customerStats balance : " + customerStats.balance)
            }).error(function (data, status) {
                console.log('Customer loading error: ' + status);
                var errorMessage = "Sorry, an error occurred.";
                return {message: errorMessage};
            });
        },
        getCustomerStats: function () {
            return customerStats;
        },

        // Customer Notes
        loadCustomerNotes: function (customerGuid) {
            return $http({
                method: 'GET',
                url: getCustomerNotesUrl

            }).success(function (data, status, headers, config) {
                customerNotes = data['customer_notes'];
                console.dir("customerNotes : " + customerNotes[0].id)
            }).error(function (data, status, headers, config) {
                console.log('Customer loading error: ' + status);
                var errorMessage = "Sorry, an error occurred.";
                return {message: errorMessage};
            });

        },
        getCustomerNotes: function () {
            return customerNotes;
        },

        //customer Document Stats
        loadCustomerDocumentStats: function (customerGuid) {
            return $http({
                method: 'GET',
                url: getCustomerDocumentStatsUrl

            }).success(function (data, status, headers, config) {
                customerDocumentStats = data['customer_document_stats'];
                console.dir("sum_payments : " + customerDocumentStats.sum_payments)
            }).error(function (data, status, headers, config) {
                console.log('Customer loading error: ' + status);
                var errorMessage = "Sorry, an error occurred.";
                return {message: errorMessage};
            });

        },
        getCustomerDocumentStats: function () {
            return customerDocumentStats;
        },
        setCustomerGuid: function (guid) {
            customerGiud = guid;
        },
        getCurrentCustomerGuid: function () {
            return customerGiud;
        },

        getCustomer: function (guid) {
            var returnData = null;
            try {
                returnData = $filter('filter')(customers, {guid: guid})[0];


            } catch (e) {
                console.log("ERROR: Guid is not Present: " + guid);

            }
            return returnData;


        }
    };


});




