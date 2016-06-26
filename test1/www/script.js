angular.module('ionicApp', ['ionic','ngCordova'] )

    .run(function ($rootScope,$ionicPlatform, $cordovaNetwork, $cordovaBatteryStatus, $cordovaLocalNotification, $cordovaPush) {

    })
    .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider ) {
      $ionicConfigProvider.platform.ios.tabs.style('standard');
      $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('bottom');
      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');
      $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');


      $stateProvider
          .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "tabs.html"
          })
          .state('tabs.myMsg', {
            url: "/myMsg",
            views: {
              'myMsg-tab': {
                templateUrl: "myMsg.html",
                controller: 'HomeTabCtrl'
              }
            }
          })
          .state('tabs.sendMsg', {
            url: "/sendMsg",
            views: {
              'sendMsg-tab': {
                templateUrl: "sendMsg.html",
                controller: 'HomeTabCtrl'
              }
            }
          })
          .state('tabs.myInfo', {
            url: "/myInfo",
            views: {
              'myInfo-tab': {
                templateUrl: "myInfo.html",
                controller: 'myinfoCtrl'

              }
            }
          });
      $urlRouterProvider.otherwise("/tab/myMsg");

    })

    .controller('HomeTabCtrl', function ($scope, $cordovaLocalNotification,$timeout,$cordovaGeolocation) {

      //$scope.$watch('$viewContentLoaded', function() {
      //  var posOptions = {timeout: 10000, enableHighAccuracy: false};
      //  $cordovaGeolocation
      //      .getCurrentPosition(posOptions)
      //      .then(function (position) {
      //        var lat  = position.coords.latitude
      //        var long = position.coords.longitude
      //        alert(lat);
      //      }, function(err) {
      //        alert('error'+err);
      //      });
      //});



})

.controller('myinfoCtrl', function ($scope, $cordovaLocalNotification,$timeout) {
      $scope.clientSideList = [
        {
          text: "正有麻烦",
          value: "trouble"
        },
        {
          text: "严重堵车",
          value: "block"
        }
      ];



      $scope.data = {
        clientSide: 'trouble'
      };

      $scope.serverSideChange = function (item) {
        console.log("Selected Serverside, text:", item.text, "value:", item.value);
      };

    });
