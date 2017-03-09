var app = angular.module('Anil', ['ngRoute','ngCookies','ngTouch']);
app.config(['$routeProvider','$locationProvider','$provide','$sceDelegateProvider',function ($routeProvider,$locationProvider,$provide,$sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://drive.google.com/**',
        'https://www.youtube.com/**',
        'https://test.payu.in/**',
        'https://secure.payu.in/**'
    ]);
    $routeProvider
    .when('/home', {
        templateUrl: '/modules/Home/home.html',
        controller: 'HomeCtr'
    })
    .when('/about', {
        templateUrl: '/modules/About/about.html',
        controller: 'AboutCtr'
    })
    .when('/skills',{
        templateUrl: '/modules/Skills/skills.html',
        controller: 'SkillsCtr'
    })
    .when('/education',{
        templateUrl : '/modules/Education/education.html',
        controller : 'EducationCtr'
    })
    .when('/experience',{
        templateUrl:'/modules/Experiance/experiance.html',
        controller:'ExperianceCtr'
    })
    .when('/work',{
        templateUrl : '/modules/Work/work.html',
        controller : 'WorkCtr'
    })
    .when('/contact',{
        templateUrl : '/modules/Contact/contact.html',
        controller : 'ContactCtr'
    })
    .when('/vehicletracking',{
        templateUrl : '/modules/Work/vtsweb.html',
        controller : 'VehicleCtr'
    })
    .when('/app/vehicletracking',{
        templateUrl : '/modules/Work/vtsapp.html',
        controller : 'VehicleAppCtr'
    })
    .when('/hotel',{
        templateUrl : '/modules/Work/hotelweb.html',
        controller : 'HotelCtr'
    })
    .when('/app/hotel',{
        templateUrl : '/modules/Work/hotelapp.html',
        controller : 'HotelAppCtr'
    })
    .when('/elearner',{
        templateUrl : '/modules/Work/smsweb.html',
        controller : 'ElearnerCtr'
    })
    .when('/app/elearner',{
        templateUrl : '/modules/Work/smsapp.html',
        controller : 'ElearnerAppCtr'
    })
    .when('/fence',{
        templateUrl : '/modules/Work/fenceweb.html',
        controller : 'FenceCtr'
    })
    .when('/app/fence',{
        templateUrl : '/modules/Work/fenceapp.html',
        controller : 'FenceAppCtr'
    })
    .when('/lfs',{
        templateUrl : '/modules/Work/lfs.html',
        controller : 'LfsCtr'
    })
    .otherwise({
        redirectTo :  '/home'
    });
    $locationProvider.html5Mode(true);
}]);
app.factory('RootSer',['$http','$rootScope',function($http,$rootScope){
    var RootSers = {};
    return RootSers;
}]);
var hidePreloader = function(option,callback){
  	$('body').css('display','block');
  	$('body').css('justify-content','inherit');
  	$('body').css('align-items','inherit');
  	$('body .preloaderdiv').hide();
  	$("body .overlays-div,body #main").fadeIn(200,callback);
};
var showPreloader = function(){
	$('body').css('display','flex');
    $('body').css('justify-content','center');
    $('body').css('align-items','center');
    $("body .overlays-div,body #main").hide();
    $('body .preloaderdiv').show();
};
app.controller('AnilMain',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    var showPage = function(){
        $rootScope.detailsDone = true;
        $rootScope.$broadcast('DetailsDone');
    }
    var init = function(){
    	showPage();
        $scope.messageStatus = '';
        $scope.message = '';
        $scope.showMessageStatus= false;
        $scope.sendName = '';
        $scope.mailMessage = '';
        $scope.fromEmailId = '';
        $timeout(function(){
        	$('.tool-tip').tooltip();
			$('.main-nav').children().clone().appendTo('.responsive-nav');
			$('.panel-heading a').on('click', function() {
				$('.panel-heading').removeClass('active');
				$(this).parents('.panel-heading').addClass('active');
			});

        });
    };
    var validateEmail= function ($validate_email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if( !emailReg.test( $validate_email ) ) {
            return false;
        } else {
            return true;
        }
    } 

    $scope.inputFocused = function(){
        $('.errorName').hide();
    }
    
    $scope.sendMessage = function() {
        var valid = true;
        if(!$scope.sendName.replace(/\s/g, '').length){
            var html = 'Please enter your name';
            $('#SendName-error,.errorNameSendName').addClass('error');
            $('#SendName-error').text(html);
            $('.errorNameSendName').show();
            valid = false;
        }
        if(!$scope.mailMessage.replace(/\s/g, '').length){
            var html = 'Please enter your message.';
            $('#MailMessage-error,.errorNameMailMessage').addClass('error');
            $('#MailMessage-error').text(html);
            $('.errorNameMailMessage').show();
            valid = false;
        }
        if(!$scope.fromEmailId.replace(/\s/g, '').length){
            var html = 'Please enter your email id';
            $('#FromEmailId-error,.errorNameFromEmailId').addClass('error');
            $('#FromEmailId-error').text(html);
            $('.errorNameFromEmailId').show();
            valid = false;
        }else{
            if(!validateEmail($scope.fromEmailId)){
                var html = 'Please enter valid email id';
                $('#FromEmailId-error,.errorNameFromEmailId').addClass('error');
                $('#FromEmailId-error').text(html);
                $('.errorNameFromEmailId').show();
                valid = false;
            }
        }
        if(valid){

            $scope.message ="Mail Sending.";
            $scope.showMessageStatus = true;
            $scope.messageStatus = "INITIATED";
            var url='/api/sendmail';
            var d = {'sendName':$scope.sendName,'fromEmailId':$scope.fromEmailId,'mailMessage':$scope.mailMessage};
            $http({
                method: 'POST',
                url: url,
                data:d
            }).then(function successCallback(response) {
                $scope.sendName = '';
                $scope.mailMessage = '';
                $scope.fromEmailId = '';
                $scope.message ="Mail Received, Thank you.";
                $scope.showMessageStatus = true;
                $scope.messageStatus = "SUCCESS";
                $timeout(function(){
                    $scope.message = '';
                    $scope.showMessageStatus = false;
                    $scope.messageStatus="NOTSTART";
                },5000,true);
            },function errorCallback(response) {
                $scope.sendName = '';
                $scope.mailMessage = '';
                $scope.fromEmailId = '';
                $scope.message ="Sorry my bad, please try again.";
                $scope.showMessageStatus = true;
                $scope.messageStatus = "FAILED";
                $timeout(function(){
                    $scope.message = '';
                    $scope.showMessageStatus = false;
                    $scope.messageStatus="NOTSTART";
                },5000,true);
            });
        }
    };

    $scope.openResponsiveMenu = function(){
    	$('body').addClass('no-scroll');
		$('.responsive-menu').addClass('open');
    }

    $scope.closeResponsiveMenu = function(){
    	$('body').removeClass('no-scroll');
		$('.responsive-menu').removeClass('open');
    }

    $scope.sharePopup = function(){
		$('.popup').fadeToggle(250);
    };
    $scope.slideOutShare = function(){
    	$('.slide-out-popup').fadeToggle(250);
    };
    $scope.headerActionButton = function(){
		$('.slide-out-overlay').fadeIn(250);
		$('.slide-out').addClass('open');
    };
    $scope.slideOutClose = function(){
    	$('.slide-out-overlay').fadeOut(250);
		$('.slide-out').removeClass('open');
    };
    $scope.slideOutOverlay = function(){
    	$('.slide-out-overlay').fadeOut(250);
		$('.slide-out').removeClass('open');
    };
	
    init();
}]);
app.controller('HomeCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.home').addClass('active');
    var init = function(){
    	hidePreloader();
    };
    if($rootScope.detailsDone){
        $timeout(init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    $timeout(init,0,true);
                                });
    };
}]);
app.controller('AboutCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.about').addClass('active');
    var init = function(){
    	hidePreloader();
    };
    if($rootScope.detailsDone){
        $timeout(init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    $timeout(init,0,true);
                                });
    };
}]);
app.controller('SkillsCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.skills').addClass('active');
    var init = function(){
    	hidePreloader({},function(){
    		$('.progress-bar').on('inview', function (event, isInView) {
				if (isInView) {
					$(this).css('width',  function() {
						return ($(this).attr('aria-valuenow')+'%');
					});
				}
			});
			$('.dial').on('inview', function (event, isInView) {
				if (isInView) {
					var $this = $(this);
					var myVal = $this.attr("value");
					var color = $this.attr("data-color");
					$this.knob({
						readOnly: true,
						width: 200,
						rotation: 'anticlockwise',
						thickness: .05,
						inputColor: '#232323',
						fgColor: color,
						bgColor: '#e8e8e8',
						'draw' : function () { 
							$(this.i).val(this.cv + '%')
						}
					});
					$({
						value: 0
					}).animate({
						value: myVal
					}, {
						duration: 1000,
						easing: 'swing',
						step: function() {
							$this.val(Math.ceil(this.value)).trigger('change');
						}
					});
				}
			});
    	});
    };
    if($rootScope.detailsDone){
        $timeout(init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    $timeout(init,0,true);
                                });
    };
}]);
app.controller('EducationCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.edu').addClass('active');
    var init = function(){
    	hidePreloader();
    };
    if($rootScope.detailsDone){
        $timeout(init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    $timeout(init,0,true);
                                });
    };
}]);
app.controller('ExperianceCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.experience').addClass('active');
    var init = function(){
    	hidePreloader();
    };
    if($rootScope.detailsDone){
        $timeout(init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    $timeout(init,0,true);
                                });
    };
}]);
app.controller('WorkCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
	showPreloader();
	$('nav li ').removeClass('active');
    $('nav li.work').addClass('active');
	
    var init = function(){
    	hidePreloader({},function(){
    		$scope.$portfolioContainer = $('#portfolio').imagesLoaded(function() {
        		$scope.$portfolioContainer.isotope({
        			itemSelector: '.item',
        			layoutMode: 'masonry'
        		});
			});
			$('#portfolio-filters').on('click', 'button', function() {
				var filterValue = $(this).attr('data-filter');
				$scope.$portfolioContainer.isotope({filter: filterValue});
			});
	        $('.portfolio-slider').owlCarousel({
				items: 1,
				autoplay: true,
				loop: true,
				nav: true,
				navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
				dots: false
			});
    	});
    };
    if($rootScope.detailsDone){
        $timeout(init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    $timeout(init,0,true);
                                });
    };
}]);
app.controller('ContactCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
	showPreloader();
	$('nav li ').removeClass('active');
    $('nav li.contact').addClass('active');
	var validateEmail= function ($validate_email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if( !emailReg.test( $validate_email ) ) {
			return false;
		} else {
			return true;
		}
	} 

    $scope.inputFocused = function(){
        $('.errorName').hide();
    }
	
	$scope.sendMessage = function() {
		var valid = true;
        if(!$scope.sendName.replace(/\s/g, '').length){
            var html = 'Please enter your name';
            $('#SendName-error,.errorNameSendName').addClass('error');
            $('#SendName-error').text(html);
            $('.errorNameSendName').show();
            valid = false;
        }
        if(!$scope.mailMessage.replace(/\s/g, '').length){
            var html = 'Please enter your message.';
            $('#MailMessage-error,.errorNameMailMessage').addClass('error');
            $('#MailMessage-error').text(html);
            $('.errorNameMailMessage').show();
            valid = false;
        }
        if(!$scope.fromEmailId.replace(/\s/g, '').length){
            var html = 'Please enter your email id';
            $('#FromEmailId-error,.errorNameFromEmailId').addClass('error');
            $('#FromEmailId-error').text(html);
            $('.errorNameFromEmailId').show();
            valid = false;
        }else{
            if(!validateEmail($scope.fromEmailId)){
                var html = 'Please enter valid email id';
                $('#FromEmailId-error,.errorNameFromEmailId').addClass('error');
                $('#FromEmailId-error').text(html);
                $('.errorNameFromEmailId').show();
                valid = false;
            }
        }
        if(valid){
            $scope.message ="Mail Sending.";
            $scope.showMessageStatus = true;
            $scope.messageStatus = "INITIATED";
            var url='/api/sendmail';
            var d = {'sendName':$scope.sendName,'fromEmailId':$scope.fromEmailId,'mailMessage':$scope.mailMessage};
            $http({
                method: 'POST',
                url: url,
                data:d
            }).then(function successCallback(response) {
                $scope.sendName = '';
                $scope.mailMessage = '';
                $scope.fromEmailId = '';
                $scope.message ="Mail Received, Thank you.";
                $scope.showMessageStatus = true;
                $scope.messageStatus = "SUCCESS";
                $timeout(function(){
                    $scope.message = '';
                    $scope.showMessageStatus = false;
                    $scope.messageStatus="NOTSTART";
                },5000,true);
            },function errorCallback(response) {
                $scope.sendName = '';
                $scope.mailMessage = '';
                $scope.fromEmailId = '';
                $scope.message ="Sorry my bad, please try again.";
                $scope.showMessageStatus = true;
                $scope.messageStatus = "FAILED";
                $timeout(function(){
                    $scope.message = '';
                    $scope.showMessageStatus = false;
                    $scope.messageStatus="NOTSTART";
                },5000,true);
            });
        }
	};
	$scope.map = '';
	function initialize_map() {
		if ($('.map').length) {
			var myLatLng = new google.maps.LatLng(17.490431,78.401628);
			var mapOptions = {
				zoom: 15,
				center: myLatLng,
				scrollwheel: false,
				panControl: false,
				zoomControl: true,
				scaleControl: false,
				mapTypeControl: false,
				streetViewControl: false
			};
			map = new google.maps.Map(document.getElementById('map'), mapOptions);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: 'Anil Kusuma',
				icon: './images/marker.png'
			});
		} else {
			return false;
		}
	};
    var init = function(){
        $scope.messageStatus = '';
        $scope.message = '';
        $scope.showMessageStatus= false;
        $scope.sendName = '';
        $scope.mailMessage = '';
        $scope.fromEmailId = '';
        hidePreloader({},function(){
        	initialize_map();
        });
    };
    if($rootScope.detailsDone){
        $timeout(init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    $timeout(init,0,true);
                                });
    };
}]);