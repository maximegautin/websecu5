'use strict';

angular.module('polytubeApp')
       .controller('profilCtrl', function($scope, $routeParams, $sce, piloteUser, $location){



        piloteUser.findUser().then(function(response){

            $scope.currentUser = response.data;
        });


        $scope.modifierProfil = function(){

            piloteUser.modifierProfil(JSON.stringify({nom: $scope.currentUser.nom, prenom:$scope.currentUser.prenom, email:$scope.currentUser.email, password:$scope.password, confirm_password : $scope.confirm_password})).then(function(response){


                $scope.currentUser = response;

                    $('#alertprofil').append('<div id="alertdiv" class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span>Vos informations ont été modifiées avec succès !</span></div>');

                    setTimeout(function() { 

                    $("#alertdiv").remove();

                    }, 4000);

            }, function(err){

                if(err.status == 400){
                    $('#alertprofil').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Erreur vérifiez bien les informations saisies !</span></div>');

                    setTimeout(function() { 

                    $("#alertdiv").remove();

                    }, 4000);

                }

                else if(err.status == 402){

                    $('#alertprofil').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Modifiez au moins une information !</span></div>');

                    setTimeout(function() { 

                    $("#alertdiv").remove();

                    }, 4000);

                }

                else if(err.status == 403){

                    $('#alertprofil').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Mot de passe incorrect !</span></div>')

                    setTimeout(function() { 

                    $("#alertdiv").remove();

                    }, 4000);


                }



            });


        };

        $scope.supprimerCompte = function(){

            piloteUser.supprimerCompte().then(function(response){

                alert('Votre compte a bien été supprimé')

                localStorage.removeItem('token');
                $location.path( "/login" );


            });

        };

        $scope.modifiermdp = function(){

            piloteUser.changerMdp(JSON.stringify({old_password : $scope.old_password, new_password:$scope.new_password, confirm_new_password: $scope.confirm_new_password})).then(function(response){
                $scope.currentUser = response;
                $('#alertmdp').append('<div id="alertdiv" class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span>Mot de passe modifié avec succès !</span></div>')

                    setTimeout(function() { 

                    $("#alertdiv").remove();

                    }, 4000);




            }, function(err){

                if(err.status == 400){
                    $('#alertmdp').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Le mot de passe doit contenir au moins 8 caractères, une majuscule, une miniscule, un chiffre et un caractère spécial</span></div>')

                    setTimeout(function() { 

                    $("#alertdiv").remove();

                    }, 4000);


                }
                else if(err.status == 402){

                    $('#alertmdp').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Ancien mot de passe incorrect !</span></div>')

                    setTimeout(function() { 

                    $("#alertdiv").remove();

                    }, 4000);


                }
            });
        }





});