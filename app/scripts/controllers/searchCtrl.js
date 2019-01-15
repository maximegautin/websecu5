'use strict';


angular.module('polytubeApp')

    .controller('searchCtrl', function( $scope, $rootScope, piloteUser, $location, authManager){




        $scope.isAuthenticated = function(){
      
            return authManager.isAuthenticated();
          
          };
      

        if(!$scope.isAuthenticated()){
            $location.path('/login');
            
        }

          $scope.deconnexion = function(){
      
            localStorage.removeItem('token');
            $location.path( "/login" );
          };



       // console.log(localStorage.getItem('token'));

       $scope.setResultArray = function(){

        $rootScope.results = [];
     
       };

        

        $scope.declencherRecherche = async function(){

        var contenuRecherche = angular.element($('#barRecherche')).val();
        $rootScope.recherchePrec = contenuRecherche;


        $rootScope.results = [];
        var tmp =[];
        
        
        if(contenuRecherche.trim() != ""){
           
            //console.log(contenuRecherche);

            await piloteUser.rechercheVideosYoutube(contenuRecherche).then(function(data){
                angular.forEach(data, function(value, key) {
                    tmp.push(value);
                });
               // $scope.results=data;
               // console.log($scope.results);
              //  $location.path('/');
            }
                //$scope.isAuthenticated = false;
            );


            piloteUser.rechercheVideosVimeo(contenuRecherche).then(function(data){
                angular.forEach(data, function(value, key) {
                   tmp.push(value);
                });
               // $scope.results=data;
                
            });

            $rootScope.results = tmp;


           // console.log($scope.results);

           
        $location.path('/');
        }
        
       };


       $scope.filtrerRechercheYoutube = function(){

        var contenuRecherche = angular.element($('#barRecherche')).val();
        $rootScope.recherchePrec = contenuRecherche;


        $rootScope.results = [];
        if(contenuRecherche.trim() != ""){
            //console.log(contenuRecherche);

            piloteUser.rechercheVideosYoutube(contenuRecherche).then(function(data){
                angular.forEach(data, function(value, key) {
                    $rootScope.results.push(value);
                });
               // $scope.results=data;
             //   console.log($scope.results);
              //  $location.path('/');
            });


         
        }}; 
        
        
        $scope.filtrerRechercheVimeo = function(){

            var contenuRecherche = angular.element($('#barRecherche')).val();
            $rootScope.recherchePrec = contenuRecherche;


            $rootScope.results = [];
            if(contenuRecherche.trim() != ""){
                //console.log(contenuRecherche);
    
                piloteUser.rechercheVideosVimeo(contenuRecherche).then(function(data){
                    angular.forEach(data, function(value, key) {
                        $rootScope.results.push(value);
                    });
                   // $scope.results=data;
                  //  $location.path('/');
                });
    
    
             
            }};
            
        
           

    });

    