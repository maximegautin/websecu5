'use strict';


angular.module('polytubeApp')


    .controller('watchCtrl', function($scope, $routeParams, $sce, piloteUser, $location, authManager, jwtHelper){


        if(!authManager.isAuthenticated()){
            $location.path('/login');
        }
        
        
        

        piloteUser.findUser().then(function(data){

            $scope.currentUser = data.data;
        });
        
    
     var routeTest = $location.path().includes("/regarderVideo/youtube/");
    // console.log(routeTest);


     if(routeTest){
     
         $scope.currentSource = "youtube";


         $scope.getIframeSrc = function(){
             return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+$routeParams.video_ytbId);
         };

         piloteUser.getYoutubeSpecifiqVideo($routeParams.video_ytbId).then(function(data){

             $scope.currentVideo = data[0];


         });


         }


     else {
         $scope.currentSource = "vimeo";

        
             piloteUser.getVimeoSpecifiqVideo("/videos/"+$routeParams.video_vmId).then(function(data){


             $scope.vimeoIframe = function(){

                 return $sce.trustAsHtml(data.embed.html);
             };
             $scope.currentVideo = data;
             //console.log($scope.currentVideo);
             

 
         });

    }

     

      $scope.ajouterPlaylist = function(){
     
            var nomPlaylist = angular.element($('#barAjouterPlaylist')).val();

            if(nomPlaylist.trim() != ""){

            piloteUser.createPlaylist(nomPlaylist).then(function(response){
                    
                    $scope.currentUser = response.data;

            });   
            
        }
    
 
    };

    
    $scope.updateSelectedPlaylist = function(id){

        $scope.sPlaylist = id;
        if($scope.sPlaylist){
        }

    };
    $scope.videoToplaylist = function(){
        if($scope.sPlaylist){

        piloteUser.addVideoToPlaylist($scope.sPlaylist, $scope.currentVideo).then(function(response){

            if(response.status == 200){
                $('#alert_placeholder').append('<div id="alertdiv" class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span>Vidéo ajoutée dans votre Playlist !</span></div>')

                setTimeout(function() { 

                $("#alertdiv").remove();

                }, 5000);
                
            }



        });
        }

    };




    

 });