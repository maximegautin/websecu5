'use strict';


angular.module('polytubeApp')
       .controller('playlistCtrl', function($scope, piloteUser, $location, $route, $sce, authManager){


            if(!authManager.isAuthenticated()){
                $location.path('/login');
            }

            $scope.playlistArray = [];

            piloteUser.findUser().then(function(data){
     

                $scope.currentUser = data.data;
                $scope.playlistArray = $scope.currentUser.playlist;
            });

            $scope.setCurrentPlaylist = function(id){

                if(id == 1){
                    $scope.currentPlaylist = {
                        name : ""
                    };

                    $scope.currentVideos = [];

                }
                else{
                    $scope.currentUser.playlist.forEach(function(element){

                        

                        if(element._id == id){
                            $scope.currentPlaylist = element;
                            $scope.currentVideos = element.videos;
                            //console.log($scope.currentVideos);
                        }
                    });

                }


            };

            $scope.ajouterPlaylist = function(){
     
                var nomPlaylist = angular.element($('#barnouvelleplaylist')).val();
    
                if(nomPlaylist.trim() != ""){
    
                piloteUser.createPlaylist(nomPlaylist).then(function(response){
                        
                        $scope.currentUser = response.data;
                        $scope.playlistArray = $scope.currentUser.playlist;
                     
                            
    
                });   
                
            }
        
     
        };


        $scope.modifierPlaylist = function(){

            var nomPlaylist = angular.element($('#barmodifierPlaylist')).val();

            if(nomPlaylist.trim() != ""){

                 piloteUser.modifierPlaylist($scope.currentPlaylist._id, nomPlaylist).then(function(response){

                    $scope.currentUser = response.data;

                    $scope.playlistArray = $scope.currentUser.playlist;
                    

                });  

            }

        };

        $scope.deletePlaylistVideo = function(videoId){

            

            piloteUser.deleteVideoFromPlaylist($scope.currentPlaylist._id, videoId).then(function(response){

                $scope.currentUser = response.data;

                $scope.currentUser.playlist.forEach(function(element){

                    if(element._id == $scope.currentPlaylist._id){
                        $scope.currentPlaylist = element;
                        $scope.currentVideos = element.videos;
                    }
                });




            });

        };

        $scope.setCurrentVideo = function(type, id){

            $scope.currentSource = type;
            if(type == "youtube"){
                
                piloteUser.getYoutubeSpecifiqVideo(id).then(function(response){

                    $scope.getYoutubeIframeSrc = function(){
                        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+id);
                    };

                    $scope.currentVideoPlay = response[0];

                });
            }

            if(type == "vimeo"){

                piloteUser.getVimeoSpecifiqVideo(id).then(function(response){

                    $scope.vimeoIframe = function(){

                        return $sce.trustAsHtml(response.embed.html);
                    };
                    $scope.currentVideoPlay = response;


                });
            }

        };

        $scope.closeModal = function(){

        $('#modalLectureVideo').on('hidden.bs.modal', function (e) {
            $('#modalLectureVideo iframe').attr("src", jQuery("#modalLectureVideo iframe").attr("src"));
          });

        };

        $scope.supprimerPlaylist = function(id){

            piloteUser.deletePlaylist(id).then(function(response){

                $route.reload();
                

            })


        }











           

























// CETTE PARTIE CORRESPOND AU SCROLLING DU MENU PLAYLISTS

            var SETTINGS = {
                navBarTravelling: false,
                navBarTravelDirection: "",
                 navBarTravelDistance: 150
            }
            
            var colours = {
                0: "#ffffff",
                1: "#ffffff",
                2: "#ffffff",
                3: "#ffffff",
                4: "#ffffff",
                5: "#ffffff",
                6: "#ffffff",
                7: "#ffffff",
                8: "#ffffff",
                9: "#ffffff",
                10: "#ffffff",
                11: "#ffffff",
                12: "#ffffff",
                13: "#ffffff",
                14: "#ffffff",
                15: "#ffffff",
                16: "#ffffff",
                17: "#ffffff",
                18: "#ffffff",
                19: "#ffffff",
            }
            
            document.documentElement.classList.remove("no-js");
            document.documentElement.classList.add("js");
            
            // Out advancer buttons
            var pnAdvancerLeft = document.getElementById("pnAdvancerLeft");
            var pnAdvancerRight = document.getElementById("pnAdvancerRight");
            // the indicator
            var pnIndicator = document.getElementById("pnIndicator");
            
            var pnProductNav = document.getElementById("pnProductNav");
            var pnProductNavContents = document.getElementById("pnProductNavContents");
            
            pnProductNav.setAttribute("data-overflowing", determineOverflow(pnProductNavContents, pnProductNav));
            
            // Set the indicator
            moveIndicator(pnProductNav.querySelector("[aria-selected=\"true\"]"), colours[0]);
            
            // Handle the scroll of the horizontal container
            var last_known_scroll_position = 0;
            var ticking = false;
            
            function doSomething(scroll_pos) {
                pnProductNav.setAttribute("data-overflowing", determineOverflow(pnProductNavContents, pnProductNav));
            }
            
            pnProductNav.addEventListener("scroll", function() {
                last_known_scroll_position = window.scrollY;
                if (!ticking) {
                    window.requestAnimationFrame(function() {
                        doSomething(last_known_scroll_position);
                        ticking = false;
                    });
                }
                ticking = true;
            });
            
            
            pnAdvancerLeft.addEventListener("click", function() {
                // If in the middle of a move return
                if (SETTINGS.navBarTravelling === true) {
                    return;
                }
                // If we have content overflowing both sides or on the left
                if (determineOverflow(pnProductNavContents, pnProductNav) === "left" || determineOverflow(pnProductNavContents, pnProductNav) === "both") {
                    // Find how far this panel has been scrolled
                    var availableScrollLeft = pnProductNav.scrollLeft;
                    // If the space available is less than two lots of our desired distance, just move the whole amount
                    // otherwise, move by the amount in the settings
                    if (availableScrollLeft < SETTINGS.navBarTravelDistance * 2) {
                        pnProductNavContents.style.transform = "translateX(" + availableScrollLeft + "px)";
                    } else {
                        pnProductNavContents.style.transform = "translateX(" + SETTINGS.navBarTravelDistance + "px)";
                    }
                    // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                    pnProductNavContents.classList.remove("pn-ProductNav_Contents-no-transition");
                    // Update our settings
                    SETTINGS.navBarTravelDirection = "left";
                    SETTINGS.navBarTravelling = true;
                }
                // Now update the attribute in the DOM
                pnProductNav.setAttribute("data-overflowing", determineOverflow(pnProductNavContents, pnProductNav));
            });
            
            pnAdvancerRight.addEventListener("click", function() {
                // If in the middle of a move return
                if (SETTINGS.navBarTravelling === true) {
                    return;
                }
                // If we have content overflowing both sides or on the right
                if (determineOverflow(pnProductNavContents, pnProductNav) === "right" || determineOverflow(pnProductNavContents, pnProductNav) === "both") {
                    // Get the right edge of the container and content
                    var navBarRightEdge = pnProductNavContents.getBoundingClientRect().right;
                    var navBarScrollerRightEdge = pnProductNav.getBoundingClientRect().right;
                    // Now we know how much space we have available to scroll
                    var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);
                    // If the space available is less than two lots of our desired distance, just move the whole amount
                    // otherwise, move by the amount in the settings
                    if (availableScrollRight < SETTINGS.navBarTravelDistance * 2) {
                        pnProductNavContents.style.transform = "translateX(-" + availableScrollRight + "px)";
                    } else {
                        pnProductNavContents.style.transform = "translateX(-" + SETTINGS.navBarTravelDistance + "px)";
                    }
                    // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
                    pnProductNavContents.classList.remove("pn-ProductNav_Contents-no-transition");
                    // Update our settings
                    SETTINGS.navBarTravelDirection = "right";
                    SETTINGS.navBarTravelling = true;
                }
                // Now update the attribute in the DOM
                pnProductNav.setAttribute("data-overflowing", determineOverflow(pnProductNavContents, pnProductNav));
            });
            
            pnProductNavContents.addEventListener(
                "transitionend",
                function() {
                    // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
                    var styleOfTransform = window.getComputedStyle(pnProductNavContents, null);
                    var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
                    // If there is no transition we want to default to 0 and not null
                    var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
                    pnProductNavContents.style.transform = "none";
                    pnProductNavContents.classList.add("pn-ProductNav_Contents-no-transition");
                    // Now lets set the scroll position
                    if (SETTINGS.navBarTravelDirection === "left") {
                        pnProductNav.scrollLeft = pnProductNav.scrollLeft - amount;
                    } else {
                        pnProductNav.scrollLeft = pnProductNav.scrollLeft + amount;
                    }
                    SETTINGS.navBarTravelling = false;
                },
                false
            );
            
            // Handle setting the currently active link
            pnProductNavContents.addEventListener("click", function(e) {
                var links = [].slice.call(document.querySelectorAll(".pn-ProductNav_Link"));
                links.forEach(function(item) {
                    item.setAttribute("aria-selected", "false");
                })
                e.target.setAttribute("aria-selected", "true");
                // Pass the clicked item and it's colour to the move indicator function
                moveIndicator(e.target, colours[links.indexOf(e.target)]);
            });
            
            // var count = 0;
            function moveIndicator(item, color) {
                var textPosition = item.getBoundingClientRect();
                var container = pnProductNavContents.getBoundingClientRect().left;
                var distance = textPosition.left - container;
                 var scroll = pnProductNavContents.scrollLeft;
                pnIndicator.style.transform = "translateX(" + (distance + scroll) + "px) scaleX(" + textPosition.width * 0.01 + ")";
                // count = count += 100;
                // pnIndicator.style.transform = "translateX(" + count + "px)";
                
                if (color) {
                    pnIndicator.style.backgroundColor = color;
                }
            }
            
            function determineOverflow(content, container) {
                var containerMetrics = container.getBoundingClientRect();
                var containerMetricsRight = Math.floor(containerMetrics.right);
                var containerMetricsLeft = Math.floor(containerMetrics.left);
                var contentMetrics = content.getBoundingClientRect();
                var contentMetricsRight = Math.floor(contentMetrics.right);
                var contentMetricsLeft = Math.floor(contentMetrics.left);
                 if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
                    return "both";
                } else if (contentMetricsLeft < containerMetricsLeft) {
                    return "left";
                } else if (contentMetricsRight > containerMetricsRight) {
                    return "right";
                } else {
                    return "none";
                }
            }
            
            /**
             * @fileoverview dragscroll - scroll area by dragging
             * @version 0.0.8
             * 
             * @license MIT, see https://github.com/asvd/dragscroll
             * @copyright 2015 asvd <heliosframework@gmail.com> 
             */
            
            
            (function (root, factory) {
                if (typeof define === 'function' && define.amd) {
                    define(['exports'], factory);
                } else if (typeof exports !== 'undefined') {
                    factory(exports);
                } else {
                    factory((root.dragscroll = {}));
                }
            }(this, function (exports) {
                var _window = window;
                var _document = document;
                var mousemove = 'mousemove';
                var mouseup = 'mouseup';
                var mousedown = 'mousedown';
                var EventListener = 'EventListener';
                var addEventListener = 'add'+EventListener;
                var removeEventListener = 'remove'+EventListener;
                var newScrollX, newScrollY;
            
                var dragged = [];
                var reset = function(i, el) {
                    for (i = 0; i < dragged.length;) {
                        el = dragged[i++];
                        el = el.container || el;
                        el[removeEventListener](mousedown, el.md, 0);
                        _window[removeEventListener](mouseup, el.mu, 0);
                        _window[removeEventListener](mousemove, el.mm, 0);
                    }
            
                    // cloning into array since HTMLCollection is updated dynamically
                    dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
                    for (i = 0; i < dragged.length;) {
                        (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                            (cont = el.container || el)[addEventListener](
                                mousedown,
                                cont.md = function(e) {
                                    if (!el.hasAttribute('nochilddrag') ||
                                        _document.elementFromPoint(
                                            e.pageX, e.pageY
                                        ) == cont
                                    ) {
                                        pushed = 1;
                                        lastClientX = e.clientX;
                                        lastClientY = e.clientY;
            
                                        e.preventDefault();
                                    }
                                }, 0
                            );
            
                            _window[addEventListener](
                                mouseup, cont.mu = function() {pushed = 0;}, 0
                            );
            
                            _window[addEventListener](
                                mousemove,
                                cont.mm = function(e) {
                                    if (pushed) {
                                        (scroller = el.scroller||el).scrollLeft -=
                                            newScrollX = (- lastClientX + (lastClientX=e.clientX));
                                        scroller.scrollTop -=
                                            newScrollY = (- lastClientY + (lastClientY=e.clientY));
                                        if (el == _document.body) {
                                            (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                            scroller.scrollTop -= newScrollY;
                                        }
                                    }
                                }, 0
                            );
                         })(dragged[i++]);
                    }
                }
            
                  
                if (_document.readyState == 'complete') {
                    reset();
                } else {
                    _window[addEventListener]('load', reset, 0);
                }
            
                exports.reset = reset;
            }));
            

            


});