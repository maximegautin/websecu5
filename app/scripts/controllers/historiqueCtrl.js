'use strict';


angular.module('polytubeApp')
       .controller('historiqueCtrl', function($scope,$rootScope, piloteUser, $location, authManager){


            if(!authManager.isAuthenticated()){
                $location.path('/login');
            }       

           piloteUser.findUser().then(function(data){
     

                $scope.currentUser = data.data;
                $scope.userHistorique = $scope.currentUser.historique;

            });

           $scope.relancerRecherche = async function(historique){

            $rootScope.recherchePrec = historique;
            var tmp =[];

            await piloteUser.rechercheVideosYoutube(historique).then(function(data){
                angular.forEach(data, function(value, key) {
                    tmp.push(value);
                });


           });

           piloteUser.rechercheVideosVimeo(historique).then(function(data){
            angular.forEach(data, function(value, key) {
               tmp.push(value);
            });
            
            });
            $rootScope.results = tmp;

            $location.path('/');


        };


})