'use strict';

angular.module('polytubeApp')

    .service('piloteUser', function($http){

    var userservice = {};
 
    var adresseServer = "https://localhost:3000";

    userservice.inscription =  function(data){

        return $http.post(adresseServer+"/signup", data).then(function(response) {
        
            return response;
    
        });
    };
    
    

  userservice.connexion = function(data){
       
       
    return $http.post(adresseServer+"/signin", data).then(function(response) {
        
        return response;

    });

   
};

 userservice.findUser = function(){
    
    return $http.get(adresseServer+"/users/currentUser").then(function(response) {
        
        return response;

    });

};



   userservice.rechercheVideosYoutube = function(data){
       
       
        return $http.post(adresseServer+"/videosY/search", JSON.stringify({recherche: data})).then(function(response) {
            
            return response.data;
        });

       
    };

   userservice.rechercheVideosVimeo = function(data){

       
        return $http.post(adresseServer+"/vimeo/api/search", JSON.stringify({query : data, page: 1, per_page: 20})).then(function(response) {
            
            return response.data;
        });

       
    };


    
    //paramètre = URI d'une video Vimeo. URI sous forme /videos/video_d

  userservice.getVimeoSpecifiqVideo = function(resourceUri){


        return $http.post(adresseServer+"/vimeo/api/search/vimeoSpecifiqVideo", JSON.stringify({uri : resourceUri})).then(function(response) {
                
            return response.data;
        });


    
  };

  userservice.getYoutubeSpecifiqVideo = function(videoId){


    return $http.get(adresseServer+"/videosY/search/"+videoId).then(function(response) {
            
        return response.data;
    });



};


userservice.createPlaylist = function(nomPlaylist){

    return $http.post(adresseServer+"/users/playlists/userPlaylist", JSON.stringify({name : nomPlaylist})).then(function(response) {
            
        return response;
    });

};


userservice.modifierPlaylist = function(playlistId, nomPlaylist){

    return $http.put(adresseServer+"/users/userPlaylistActions/"+playlistId, JSON.stringify({name : nomPlaylist})).then(function(response) {
            
        return response;
    });

};

userservice.deletePlaylist = function(playlistId){


    return $http.delete(adresseServer+"/users/userPlaylistActions/"+playlistId).then(function(response) {
            
        return response;
    });


};


userservice.addVideoToPlaylist = function(playlistId, video){

    return $http.post(adresseServer+"/users/playlists/userPlaylist/"+playlistId+"/videos", JSON.stringify(video)).then(function(response) {
            
        return response;
    });

};

userservice.deleteVideoFromPlaylist = function(playlistId, videoId){

    return $http.post(adresseServer+"/users/playlists/userPlaylist/"+playlistId+"/deleteVideos/", JSON.stringify({videoId : videoId})).then(function(response) {
        
        return response;
    });

};

userservice.modifierProfil = function(user){

    return $http.put(adresseServer+"/users/currentUser", user).then(function(response) {
        
        return response.data;
    });

};

userservice.supprimerCompte = function(){

    return $http.post(adresseServer+"/users/suppressionCompte").then(function(response) {
        
        return response;
    });


};

userservice.changerMdp = function(data){

    return $http.post(adresseServer+"/users/changementMdp", data).then(function(response) {
        
        return response.data;
    });


};







       
  



   return userservice;
});
  






