app.controller('configCtr',['$scope','$rootScope','$timeout','ConfigSer','Upload','$location',function($scope,$rootScope,$timeout,ConfigSer,Upload,$location){
    $rootScope.AndroidText = 'Configuration';
    $scope.getSchoolConfig = function(){
        ConfigSer.getSchoolConfig($rootScope.schooldetails.schoolId,function(status,data){
            if(status == "SUCCESS"){
                if(data[0].blogAutoApprove.students == 'Y'){
                    $scope.config.blogAutoApprove.students = true;
                }else{
                    $scope.config.blogAutoApprove.students = false;
                }
                if(data[0].blogAutoApprove.teachers == 'Y'){
                    $scope.config.blogAutoApprove.teachers = true;
                }else{
                    $scope.config.blogAutoApprove.teachers = false;
                }
                
                if(data[0].mailConfig.students.length > 0){
                    for(var i=0;i< data[0].mailConfig.students.length ;i++){
                        if(data[0].mailConfig.students[i] == 'Students'){
                            $scope.config.mailConfig.students.otherStudents = true;
                        }else if(data[0].mailConfig.students[i] == 'Teachers'){
                            $scope.config.mailConfig.students.teachers = true;
                        }else if(data[0].mailConfig.students[i] == 'Admin'){
                            $scope.config.mailConfig.students.admin = true;
                        }
                    }
                }
                if(data[0].mailConfig.parents.length > 0){
                    for(var i=0;i< data[0].mailConfig.parents.length ;i++){
                        if(data[0].mailConfig.parents[i] == 'Teachers'){
                            $scope.config.mailConfig.parents.teachers = true;
                        }else if(data[0].mailConfig.parents[i] == 'Admin'){
                            $scope.config.mailConfig.parents.admin = true;
                        }
                    }
                }
                if(data[0].mailConfig.teachers.length > 0){
                    for(var i=0;i< data[0].mailConfig.teachers.length ;i++){
                        if(data[0].mailConfig.teachers[i] == 'Students'){
                            $scope.config.mailConfig.teachers.students = true;
                        }else if(data[0].mailConfig.teachers[i] == 'Parents'){
                            $scope.config.mailConfig.teachers.parents = true;
                        }else if(data[0].mailConfig.teachers[i] == 'Teachers'){
                            $scope.config.mailConfig.teachers.teachers = true;
                        }else if(data[0].mailConfig.teachers[i] == 'Admin'){
                            $scope.config.mailConfig.teachers.admin = true;
                        }
                    }
                }

                if(data[0].payuconfig != undefined || data[0].payuconfig != null){
                    $scope.config.payuconfig.merchantId = data[0].payuconfig.merchantId;
                    $scope.config.payuconfig.merchantKey = data[0].payuconfig.merchantKey;
                    $scope.config.payuconfig.merchantSalt = data[0].payuconfig.merchantSalt;
                    $scope.MerchantId = data[0].payuconfig.merchantId;
                    $scope.MerchantKey = data[0].payuconfig.merchantKey;
                    $scope.MerchantSalt = data[0].payuconfig.merchantSalt;
                }else{
                    $scope.config.payuconfig.merchantId = null;
                    $scope.config.payuconfig.merchantKey = null;
                    $scope.config.payuconfig.merchantSalt = null;
                    $scope.MerchantId = '';
                    $scope.MerchantKey = '';
                    $scope.MerchantSalt = '';
                }
            }
            hidePreloader();
        });
    }; 

    $scope.savePayConfgClicked = function(){
        var Invalid = true;
        if(!$scope.MerchantKey.replace(/\s/g, '').length){
            var html = 'Merchant Key can not be empty';
            $('#MerchantKey-error').addClass('error');
            $('#MerchantKey-error,#password-error').text(html);
            $('.errorMerchantKey').show();
            Invalid = false;
        }
        if(!$scope.MerchantId.replace(/\s/g, '').length){
            var html = 'Merchant Id can not be empty';
            $('#MerchantId-error').addClass('error');
            $('#MerchantId-error,#password-error').text(html);
            $('.errorMerchantId').show();
            Invalid = false;
        }
        if(!$scope.MerchantSalt.replace(/\s/g, '').length){
            var html = 'Merchant Salt can not be empty';
            $('#MerchantSalt-error').addClass('error');
            $('#MerchantSalt-error,#password-error').text(html);
            $('.errorMerchantSalt').show();
            Invalid = false;
        }
        if($scope.MerchantId == $scope.config.payuconfig.merchantId && $scope.MerchantKey == $scope.config.payuconfig.merchantKey && $scope.MerchantSalt == $scope.config.payuconfig.merchantSalt){
            var html = 'Value not updated';
            $('#MerchantId-error,#MerchantSalt-error,#MerchantKey-error').addClass('error');
            $('#MerchantId-error,#MerchantSalt-error,#MerchantKey-error').text(html);
            $('.errorName').show();
            Invalid = false;
        }
        if(!Invalid){
            return;
        }else{
            $('#savePayUConfgModel').openModal({dismissible:false});
        }
    };
    $scope.inputFocused = function(){
        $('.errorName').hide();
    };
    $scope.confirmSave = function(){
        $scope.config.payuconfig.merchantId = $scope.MerchantId;
        $scope.config.payuconfig.merchantKey = $scope.MerchantKey;
        $scope.config.payuconfig.merchantSalt = $scope.MerchantSalt;
        $scope.checkboxConfigChanged();
        $('#savePayUConfgModel').closeModal();
    };

    $scope.cancelSave = function(){
        $scope.MerchantId = $scope.config.payuconfig.merchantId;
        $scope.MerchantKey = $scope.config.payuconfig.merchantKey;
        $scope.MerchantSalt = $scope.config.payuconfig.merchantSalt;
        $('#savePayUConfgModel').closeModal();
    }
    
    $scope.uploadLogo = function(){
        if($scope.logoImage){
            Upload.upload({
                url:'api/Schools/bUpdateSchoolLogo',
                data : {file:$scope.logoImage,schoolId:$rootScope.schooldetails.schoolId}
            }).then(function (resp) {
                $(".logo-image, .brand-logo img")
                    .on('load', function() {})
                    .on('error', function() { $(".profile-image").attr("src", './SchoolId-'+$rootScope.schooldetails.schoolId+'/schoollogo.jpg?r='+Math.random());})
                    .attr("src",'./SchoolId-'+$rootScope.schooldetails.schoolId+'/schoollogo.jpg?r='+Math.random());
            }, function (resp) {
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    }   
    
    $scope.checkboxConfigChanged = function(){
        $timeout.cancel($scope.configTimer);
        $scope.configTimer = $timeout(function(){
            var schoolConfig = {};
            schoolConfig.payuconfig = {};
            schoolConfig.payuconfig.merchantId = $scope.config.payuconfig.merchantId;
            schoolConfig.payuconfig.merchantKey = $scope.config.payuconfig.merchantKey;
            schoolConfig.payuconfig.merchantSalt = $scope.config.payuconfig.merchantSalt;
            schoolConfig.blogAutoApprove = {};
            schoolConfig.blogAutoApprove.students = '';
            schoolConfig.blogAutoApprove.teachers = '';
            schoolConfig.mailConfig = {};
            schoolConfig.mailConfig.students = [];
            schoolConfig.mailConfig.teachers = [];
            schoolConfig.mailConfig.parents = [];
            schoolConfig.schoolId = $rootScope.schooldetails.schoolId;
            if($scope.config.blogAutoApprove.students){
                schoolConfig.blogAutoApprove.students = 'Y';
            }else{
                schoolConfig.blogAutoApprove.students = 'N';
            }
            if($scope.config.blogAutoApprove.teachers){
                schoolConfig.blogAutoApprove.teachers = 'Y';
            }else{
                schoolConfig.blogAutoApprove.teachers = 'N';
            }

            if($scope.config.mailConfig.students.otherStudents){
                schoolConfig.mailConfig.students.push('Students');
            }
            if($scope.config.mailConfig.students.teachers){
                schoolConfig.mailConfig.students.push('Teachers');
            }
            if($scope.config.mailConfig.students.admin){
                schoolConfig.mailConfig.students.push('Admin');
            }

            if($scope.config.mailConfig.parents.teachers){
                schoolConfig.mailConfig.parents.push('Teachers');
            }
            if($scope.config.mailConfig.parents.admin){
                schoolConfig.mailConfig.parents.push('Admin');
            }

            if($scope.config.mailConfig.teachers.students){
                schoolConfig.mailConfig.teachers.push('Students');
            }
            if($scope.config.mailConfig.teachers.parents){
                schoolConfig.mailConfig.teachers.push('Parents');
            }
            if($scope.config.mailConfig.teachers.teachers){
                schoolConfig.mailConfig.teachers.push('Teachers');
            }
            if($scope.config.mailConfig.teachers.admin){
                schoolConfig.mailConfig.teachers.push('Admin');
            }
            console.log('schoolConfig is '+JSON.stringify(schoolConfig));
            ConfigSer.updateSchoolConfig(schoolConfig,function(status,data){
                if(status == "SUCCESS"){
                    Materialize.toast('Configuration saved successfully',3000);
                }
            }); 
        },1000,false);
    };
    $scope.updateSchoolDetails = function(){
        
        $timeout.cancel($scope.configTimer);
        $scope.configTimer = $timeout(function(){
            var schoolDetails = {};
            schoolDetails.schoolId = $rootScope.schooldetails.schoolId;
            schoolDetails.schoolName = $rootScope.schooldetails.name 
            schoolDetails.logoName =  $rootScope.schooldetails.logo;
            schoolDetails.footerText= $scope.FooterText;
            schoolDetails.titleText=  $scope.TitleText ;
            schoolDetails.footerColor= $rootScope.schooldetails.footerColor;
            schoolDetails.footerTextColor=$rootScope.schooldetails.footerTextColor;
            schoolDetails.toolbarColor=$rootScope.schooldetails.toolbarColor;
            schoolDetails.toolbarTextColor=$rootScope.schooldetails.toolbarTextColor;
            schoolDetails.address=$rootScope.schooldetails.address;
            schoolDetails.emailId=$rootScope.schooldetails.emailId ;
            schoolDetails.mobileNumber=$rootScope.schooldetails.phone;
            schoolDetails.website=$rootScope.schooldetails.website;
            
            ConfigSer.updateSchool(schoolDetails,function(status,data){
                if(status == 'SUCCESS'){
                    $rootScope.getSchoolDetails();
                    Materialize.toast('Details saved',1000);
                }else{
                    Materialize.toast('Error in saving',1000);
                }
            });
        },2000,false);
    };
                    
        
    
    $scope.init = function(){
        if($scope.DetailDoneEvent)
            $scope.DetailDoneEvent();
        $scope.config = {};
        $scope.config.payuconfig = {};
        $scope.config.blogAutoApprove = {};
        $scope.config.blogAutoApprove.students = false;
        $scope.config.blogAutoApprove.teachers = false;
        $scope.config.mailConfig = {};
        $scope.config.mailConfig.students = [];
        $scope.config.mailConfig.teachers = [];
        $scope.config.mailConfig.parents = [];
        $scope.MerchantKey = '';
        $scope.MerchantSalt= '';
        $scope.MerchantId = '';
        $scope.FooterText = $rootScope.schooldetails.footerText;
        $scope.TitleText = $rootScope.schooldetails.titleText;
        $timeout(function(){
            $('li.active a.active').trigger('click.collapse');
            $('li.nav-li').removeClass('active');
            $('.config-li').addClass('active');
        },0,false);
        $timeout(function(){
            $('select').material_select();
            $('.tooltipped').tooltip({delay: 50});
        },0,false);
        $scope.getSchoolConfig();
    };
    
    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        showPreloader();
        $timeout($scope.init,0,false);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    showPreloader();
                                    $timeout($scope.init,0,false);
                                });
    };
}]);
    
app.factory('ConfigSer',['$http','$rootScope',function($http,$rootScope){
    var ConfigSers = {};
    ConfigSers.resetMConfigVariables = function(){
    };
    ConfigSers.getSchoolConfig = function(schoolId,callback){
        var url=$rootScope.baseUrl+ '/api/SchoolConfigs/bGetSchoolConfig?schoolId='+schoolId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    ConfigSers.updateSchoolConfig = function(data,callback){
        var url=$rootScope.baseUrl+ '/api/SchoolConfigs/bUpdateSchoolConfig';
        $http({
            method: 'POST',
            url: url,
            data:data
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    ConfigSers.updateSchool = function(data,callback){
        var url=$rootScope.baseUrl+ '/api/Schools/bUpdateSchoolDetails';
        $http({
            method: 'POST',
            url: url,
            data:data
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    return ConfigSers;
}]);
        
