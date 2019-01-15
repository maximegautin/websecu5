'use strict';


angular.module('polytubeApp')
       .controller('adminCtrl', function($scope,$rootScope, piloteAdmin, $location, authManager){

            $scope.isAuthenticated = function(){
        
                return authManager.isAuthenticated();
            
            };
        

            if(!$scope.isAuthenticated()){
                $location.path('/login');
                
            }

            piloteAdmin.getUsers().then(function(response){

                $scope.users = response;

            }, function(err){

                alert("vous n\'etes pas autorisé !");
                $location.path('/');
            });

            $scope.selectUser = function(id){

                $location.path('/user/'+id);

                
            };

            

        




});