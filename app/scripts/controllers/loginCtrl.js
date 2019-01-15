'use strict';

angular.module('polytubeApp')
       .controller('loginCtrl', function($scope, piloteUser, $location){


            $scope.connexion = function(){

                piloteUser.connexion(JSON.stringify({email: $scope.email, password : $scope.password})).then(function(data){

                        
                         localStorage.setItem('token', data.data.token);
                        
                         $location.path( "/" );

         
         
                     }, function(data){

                        $('#alertconnexion').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Erreur vérifiez bien vos identifiants !</span></div>')

                        setTimeout(function() { 
    
                        $("#alertdiv").remove();
    
                        }, 4000);
                        });                
            };
            
            
            

});
