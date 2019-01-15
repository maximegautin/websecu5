'use strict';

angular.module('polytubeApp')

        .config(function Config($httpProvider, jwtOptionsProvider) {
            jwtOptionsProvider.config({

            authHeader: 'Authorization',
            authPrefix: 'bearer ',
            unauthenticatedRedirectPath: '/login',
            whiteListedDomains: ['localhost'],
            tokenGetter :  function() {
                var token = localStorage.getItem('token');
                return token;
              },
            unauthenticatedRedirector: ['$location', function($location) {
               
                localStorage.removeItem('token');
                $location.path('/login');
              }]

            

           

            
            });
            $httpProvider.interceptors.push('jwtInterceptor');
            
        });


angular.module('polytubeApp').run(function( authManager, $rootScope) {

            authManager.checkAuthOnRefresh();

            authManager.redirectWhenUnauthenticated();

           
            $rootScope.$on('tokenHasExpired', function() {
                localStorage.removeItem('token');
                alert('Votre Session a expiré !');
                
               

              });
        
          });

         