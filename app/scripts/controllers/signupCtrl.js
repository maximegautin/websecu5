'use strict';

angular.module('polytubeApp')
       .controller('signupCtrl', function($scope, piloteUser, $location){


        var alertMessage = function(code){
                if(code === 400){
                        return '<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Erreur vérifiez bien les informations saisies !</span></div>';
                }
                        
                else if(code === 402){
                        return '<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Vous avez été bloqué, contactez l\'administrateur du site !</span></div>';
                }
                             

                else if(code === 401){
                        return '<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Ce mail est déjà associé à un compte !</span></div>';
                }
                else {
                        return '<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>ERREUR </span></div>';
                }
        }


            
        $scope.inscription = function(){

             piloteUser.inscription(JSON.stringify({nom:$scope.nom, prenom: $scope.prenom, email: $scope.email, password : $scope.password, confirm_password : $scope.confirm_password})).then(function(data){

                     localStorage.setItem('token', data.data.token);
                    
                     $location.path( "/" );
                    // window.location.reload();

     
     
                 }, function(data){
                        
                        $('#alertinscription').append(alertMessage(data.status));
        
                        setTimeout(function() { 
        
                        $("#alertdiv").remove();
        
                        }, 4000);


        });

};

});