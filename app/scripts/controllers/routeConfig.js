'use strict';

angular.module('polytubeApp')

    .config(function($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
              templateUrl: '/views/videos.html'
              
            
    
          })
          .when('/regarderVideo/youtube/:video_ytbId', {
            templateUrl: '/views/visuelVideo.html'
          
          })

          .when('/regarderVideo/vimeo/videos/:video_vmId', {

            templateUrl: '/views/visuelVideo.html',
            controller:'watchCtrl'
          })
          
          .when('/login', {

            templateUrl : '/views/login.html',
            controller : 'loginCtrl'
          })

          .when('/signup', {
            templateUrl : '/views/signup.html',
            controller : 'signupCtrl'
          })

          .when('/playlist', {
            templateUrl : '/views/playlist.html',
            controller : 'playlistCtrl'
          })

          .when('/historique', {
            templateUrl : '/views/historique.html',
            controller : 'historiqueCtrl'
          })

          .when('/profil', {
            templateUrl : '/views/profil.html',
            controller : 'profilCtrl'
          })

          .when('/admin', {
            templateUrl : '/views/admin.html',
            controller : 'adminCtrl'
          })

          .when('/user/:userId', {
            templateUrl : '/views/admin.uSelected.html',
            controller : 'uSelectedCtrl'
          })
          .otherwise({
            templateUrl: '/views/login',
            controller : 'loginCtrl'

        });

        $locationProvider.html5Mode(true);
          
      });
