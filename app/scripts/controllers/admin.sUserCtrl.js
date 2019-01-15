'use strict';


angular.module('polytubeApp')
       .controller('uSelectedCtrl', function($scope,$rootScope, piloteAdmin, $location, authManager, $routeParams){

            $scope.isAuthenticated = function(){
        
                return authManager.isAuthenticated();
            
            };
        

            if(!$scope.isAuthenticated()){
                $location.path('/login');
                
            }

           
              

            piloteAdmin.findUser($routeParams.userId).then(function(response){

                    $scope.uSelected = response;
                    $scope.sUserHistorique = $scope.uSelected.historique;


            }, function(err){

                alert("vous n\'etes pas autorisé !");
                $location.path('/');

            });

            

            $scope.userOption = 'views/admin.user.historique.html';

            $scope.setUserOption = function(i){

                if(i === 1){
                    $scope.userOption = 'views/admin.user.historique.html';
                }
                else if(i === 2){
                    $scope.userOption = 'views/admin.user.logs.html';
                    piloteAdmin.getLogs($scope.uSelected._id).then(function(response){
                        $scope.logs = response.data;
        
                    });
                }
                else if(i == 3){
                    $scope.userOption = 'views/admin.user.actions.html';
                }
            };

            $scope.viderHistorique = function(){

                piloteAdmin.removeUserHistorique($scope.uSelected._id).then(function(response){

                    $scope.uSelected = response;
                    $scope.sUserHistorique = $scope.uSelected.historique;

                });

            };

            $scope.blocage = function(){

                piloteAdmin.blocage($scope.uSelected._id).then(function(response){

                    $scope.uSelected = response;


                }, function(err){

                    $('#alertdroit').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Cet admin a un niveau de droits égal ou supérieur au votre ! Vous n\'avez pas les bases</span></div>');

                    setTimeout(function() { 

                    $("#alertdiv").remove();

                    }, 4000);


                });


            };

            $scope.changerDroit = function(){

                piloteAdmin.changerDroit($scope.uSelected._id).then(function(response){

                    $scope.uSelected = response;


                }, function(err){

                    $('#alertdroit').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Cet admin a un niveau de droits égal ou supérieur au votre ! Vous n\'avez pas les bases</span></div>');

                    setTimeout(function() { 

                    $("#alertdiv").remove();

                    }, 4000);
                });

            };

            


            
            



     

            

        




});