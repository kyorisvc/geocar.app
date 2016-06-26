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
        var frame = document.getElementById("mapFrame").contentWindow;
        function callGeolocation(success,error){
             var posOptions = {timeout: 5000, enableHighAccuracy: false };
             $cordovaGeolocation.getCurrentPosition(posOptions).then(success, function(){
                 var posOptions = {timeout: 10000, enableHighAccuracy: true};
                 $cordovaGeolocation.getCurrentPosition(posOptions).then(success,error );
             });
       }

        var msgListenFuncs={
            "carMove":function(data){
                callGeolocation(this.carMoveCallBack,this.errorCallBack);
            },
            "carMoveCallBack":function(data){
                var pos = [data.coords.longitude, data.coords.latitude];
                var param = {"msgKey":"carMove","data":pos};
                frame.postMessage(param, "*");
            },
            "initMap":function(data){
                callGeolocation(this.initMapCallBack,this.errorCallBack);
            }, "initMapCallBack":function(data){
                var pos = [data.coords.longitude, data.coords.latitude];
                var param = {"msgKey":"initMap","data":pos};
                frame.postMessage(param, "*");
            }, "errorCallBack":function(data){
                alert('code: ' + data.code + '\n' +
                'message: ' + data.message + '\n');
            }
        };



      $scope.$watch('$viewContentLoaded', function() {

          window.addEventListener('message', function (event) {
              if (event.source == window)
                  return;
              //确保发送消息的域名是已知的域名
              var msg = event.data["msgKey"];
              msgListenFuncs[msg](event.data);


          });





      });



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
