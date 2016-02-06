'use strict';

angular.module('invoiceASAPApp').directive('spinner', function($rootScope, $state) {

  var opts = {
    lines: 10, // The number of lines to draw
    length: 10, // The length of each line
    width: 3, // The line thickness
    radius: 5, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#333', // #rgb or #rrggbb or array of colors
    speed: 0.8, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '30%', // Top position relative to parent
    left: '50%' // Left position relative to parent
  };

  return {
    restrict: 'E',
    replace: true,

    template: '<div class="spinner-container"></div>',

    link: function (scope, element) {
      var srcElement = element[0];
      scope.spinner = new Spinner(opts).spin(srcElement);
    }
  };
});
