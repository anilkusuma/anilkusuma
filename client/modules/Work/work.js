app.controller('VehicleCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.work').addClass('active');
    
    var init = function(){
        hidePreloader({},function(){
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

app.controller('VehicleAppCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.work').addClass('active');
    
    var init = function(){
        hidePreloader({},function(){
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

app.controller('HotelCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.work').addClass('active');
    
    var init = function(){
        hidePreloader({},function(){
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

app.controller('ElearnerCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.work').addClass('active');
    
    var init = function(){
        hidePreloader({},function(){
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

app.controller('ElearnerAppCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.work').addClass('active');
    
    var init = function(){
        hidePreloader({},function(){
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

app.controller('FenceCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.work').addClass('active');
    
    var init = function(){
        hidePreloader({},function(){
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

app.controller('FenceAppCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.work').addClass('active');
    
    var init = function(){
        hidePreloader({},function(){
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

app.controller('LfsCtr',['$scope','$rootScope','$http','$location','$window','$cookies','$timeout','RootSer','$route',function($scope,$rootScope,$http,$window,$location,$cookies,$timeout,RootSer,$route){
    showPreloader();
    $('nav li ').removeClass('active');
    $('nav li.work').addClass('active');
    
    var init = function(){
        hidePreloader({},function(){
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