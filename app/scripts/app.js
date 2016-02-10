'use strict';

/**
 * @ngdoc overview
 * @name invoiceASAPApp
 * @description
 * # invoiceASAPApp
 *
 * Main module of the application.
 */
angular
    .module('invoiceASAPApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router'
    ])
    .config(function ($stateProvider) {

        //$stateProvider.decorator('views', function (state, parent) {
        //   var result = {};
        //   var views = parent(state);
        //
        //   views['header@'] = {
        //     templateUrl: 'html/components/header.html',
        //     controller: 'HeaderController'
        //   };
        //
        //   views['footer@'] = {
        //     templateUrl: 'html/components/footer.html',
        //     controller: 'FooterController'
        //   };
        //
        //   angular.forEach(views, function (config, name) {
        //     result[name] = config;
        //   });
        //
        //   return result;
        // });


        $stateProvider
            .state('index', {
                url: '/:customerguid',
                views: {
                    'content@': {
                        templateUrl: 'html/views/customers.html',
                        controller: 'CustomerController'
                    },
                    'customerRecords@index': {
                        templateUrl: 'html/partial/customer-records.html',
                        controller: 'CustomerController'
                    },
                    'customerStats@index': {
                        templateUrl: 'html/partial/customer-stats.html',
                        controller: 'CustomerController'
                    },
                    'customerContacts@index': {
                        templateUrl: 'html/partial/customer-contacts.html',
                        controller: 'CustomerController'
                    }
                }

            })


    })

    .run(function ($q, $timeout, $state, $anchorScroll, $location, $stateParams, $rootScope, CustomerService) {


        function launchApp() {
            console.log("INFO: Launching Customer section");
            $anchorScroll();
            //$state.reload();
        }


        function loadDependencies() {

            var dependencies = [
                CustomerService.loadCustomers()
            ];
            $q.all(dependencies).then(
                function success(data) {
                    console.log('INFO: resolved dependencies... ');

                    if (data.indexOf(undefined) == -1) {
                        launchApp();
                    } else {
                        loadDependenciesError();
                    }
                },
                function fail(error) {
                    loadDependenciesError();
                }
            );
        };


        function loadDependenciesError() {
            console.log('Sorry, there was an error on startup. Are you connected to the internet?');
        };

        // Booting up sequence
        loadDependencies();


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        });
    });






