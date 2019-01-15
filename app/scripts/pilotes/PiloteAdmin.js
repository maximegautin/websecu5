'use strict';

angular.module('polytubeApp')

    .service('piloteAdmin', function($http){

        var adminservice = {};
        var adresseServer = "https://localhost:3000";

        adminservice.getUsers = function(){
    
            return $http.get(adresseServer+"/users").then(function(response) {
                
                return response.data;
        
            });
        
        };


        adminservice.findUser = function(userId){
            return $http.get(adresseServer+"/users/findUser/"+userId).then(function(response) {
                
                return response.data;
        
            });


        };

        adminservice.removeUserHistorique = function(userId){
            

            return $http.post(adresseServer+"/users/admin/removeUserhistorique", JSON.stringify({user_id : userId})).then(function(response) {
                
                return response.data;
        
            });


        };

        adminservice.getLogs = function(userId){
            

            return $http.post(adresseServer+"/users/logs", JSON.stringify({user_id : userId})).then(function(response) {
                
                return response;
        
            });


        };

        adminservice.blocage = function(userId){
            

            return $http.post(adresseServer+"/users/blocage", JSON.stringify({user_id : userId})).then(function(response) {
                
                return response.data;
        
            });


        };

        adminservice.changerDroit = function(userId){
            

            return $http.post(adresseServer+"/users/changerDroit", JSON.stringify({user_id : userId})).then(function(response) {
                
                return response.data;
        
            });


        };





        return adminservice;
});