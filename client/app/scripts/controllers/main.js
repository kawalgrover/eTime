'use strict';

/**
 * @ngdoc function
 * @name eTimeApp.controller:MainController
 * @description
 * # MainCtrl
 * Controller of the eTimeApp
 */
angular.module('eTimeApp')
  .controller('MainController', function ($scope, $window, $http) {

    var location;

    function getUnixTimeStampFromDateTime(){

        var timestamp = Date.now()/1000;
        //console.log('timestamp: ' + timestamp);
        return timestamp;
    }

    function getLocalTime(location){
        var API_KEY = 'AIzaSyAG2bZ4Kp_OShXEqjj0BT-Bx3lirkmg57Q';
        var googleTimeZoneURL = 'https://maps.googleapis.com/maps/api/timezone/json?location={{location}}&timestamp={{timestamp}}&key={{API_KEY}}';

        var formattedURL = googleTimeZoneURL.replace('{{location}}', location);
        formattedURL = formattedURL.replace('{{timestamp}}', getUnixTimeStampFromDateTime());
        formattedURL = formattedURL.replace('{{API_KEY}}', API_KEY);

        $http.get(formattedURL).success(function(response){
            console.log(formattedURL);
            console.log(response);
        });
    }

    if ($window.navigator.geolocation) {
        $window.navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;



            var earthTime = SunCalc.getTimes(new Date(), latitude, longitude);

            console.log(earthTime);

            location = $scope.latitude + ',' + $scope.longitude;

            console.log('sunrise time:' + earthTime.sunrise);

            console.log('Date now:' + new Date());
            var currentDate = new Date();

            var delta = Math.abs(currentDate - earthTime.sunrise)/1000;
            // calculate (and subtract) whole days
            var days = Math.floor(delta / 86400);
            delta -= days * 86400;

            // calculate (and subtract) whole hours
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;

            // calculate (and subtract) whole minutes
            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;

            // what's left is seconds
            var seconds = delta % 60;  // in theory the modulus is not required

             $scope.$apply(function(){
                $scope.latitude = latitude;
                $scope.longitude = longitude;

                $scope.hour = hours;
                $scope.minute = minutes;

            });


            //getUnixTimeStampFromDateTime();
            //getLocalTime(location);
        });
    }



  });
