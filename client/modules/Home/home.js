app.factory('AdminFeeService',['$http','$rootScope',function($http,$rootScope){
    var AdminFeeServices = {};
    AdminFeeServices.getFeeTransactions = function(feeId,callback){
        var url = '/api/FeeTransactions/GetFeeTransactions?feeId='+feeId;
        $http({
            method: 'get',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    AdminFeeServices.getFeeDetails = function(feeId,callback){
        var url = '/api/FeeDetails/GetAdminFees?feeId='+feeId;
        $http({
            method: 'get',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    AdminFeeServices.getClasses = function(qs,callback){
        var url=$rootScope.baseUrl+ '/api/Classes/bQueryClasses?queryString='+qs+'&schoolId='+$rootScope.schooldetails.schoolId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    }; 
    AdminFeeServices.saveFees = function(fees,callback){
        var url=$rootScope.baseUrl+ '/api/FeeDetails/SaveFees';
        $http({
            method: 'POST',
            url: url,
            data:fees
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    }; 
    AdminFeeServices.saveDiscount = function(discount,callback){
        var url=$rootScope.baseUrl+ '/api/StudentFeesDiscounts/SaveDiscount';
        $http({
            method: 'POST',
            url: url,
            data:discount
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    AdminFeeServices.deleteDiscount = function(discountId,feeId,studentId,callback){
        var url=$rootScope.baseUrl+ '/api/StudentFeesDiscounts/DeleteDiscount?discountId='+discountId+'&feeId='+feeId+'&studentId='+studentId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };  
    AdminFeeServices.refreshDiscount = function(feeId,callback){
        var url=$rootScope.baseUrl+ '/api/StudentFeesDiscounts/GetAllDiscounts?feeId='+feeId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    }; 
    AdminFeeServices.activateFees = function(feeId,callback){
        var url = '/api/FeeDetails/ActivateFees?feeId='+feeId;
        $http({
            method: 'get',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    AdminFeeServices.inActivateFees = function(feeId,callback){
        var url = '/api/FeeDetails/InActivateFees?feeId='+feeId;
        $http({
            method: 'get',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };

    AdminFeeServices.saveFeeTemplate = function(fees,callback){
        var url=$rootScope.baseUrl+ '/api/FeeSavedTemplates/SaveAsTemplate';
        $http({
            method: 'POST',
            url: url,
            data:fees
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    }; 

    AdminFeeServices.saveBankPayment = function(payment,callback){
        var url=$rootScope.baseUrl+ '/api/FeeTransactions/SaveBankPayment';
        $http({
            method: 'POST',
            url: url,
            data:payment
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    }; 
    AdminFeeServices.updateTemplate = function(fees,callback){
        var url=$rootScope.baseUrl+ '/api/FeeSavedTemplates/UpdateTemplate';
        $http({
            method: 'POST',
            url: url,
            data:fees
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    AdminFeeServices.deleteTemplate = function(templateId,callback){
        var url=$rootScope.baseUrl+ '/api/FeeSavedTemplates/DeleteTemplate?templateId='+templateId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    AdminFeeServices.getSavedTemplate = function(templateId,callback){
        var url=$rootScope.baseUrl+ '/api/FeeSavedTemplates/GetTemplate?templateId='+templateId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    AdminFeeServices.getAllTemplates = function(callback){
        var url=$rootScope.baseUrl+ '/api/FeeSavedTemplates/GetAll';
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    AdminFeeServices.getAllFees = function(callback){
        var url=$rootScope.baseUrl+ '/api/FeeDetails/GetAll';
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    AdminFeeServices.getStudents = function(qs,classId,callback){
        var url=$rootScope.baseUrl+ '/api/Students/bQueryClassStudents?queryString='+qs+'&schoolId='+$rootScope.schooldetails.schoolId+'&classId='+classId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    return AdminFeeServices;
}]);
app.controller('aCreateFeeCtr', ['$http','$rootScope','AdminFeeService','$scope','$location','$timeout','deviceDetector',function ($http,$rootScope,AdminFeeService,$scope,$location,$timeout,deviceDetector) {
    showPreloader();
    $rootScope.AndroidText = 'Create Fees';
    $timeout(function(){
        $('li.active a.active').trigger('click.collapse');
        $('li.nav-li').removeClass('active');
        $('#createA').trigger("click.collapse");
        $('.admin-fees-li').addClass('active');
    },0,false);
    $scope.init = function(){
        $scope.newFee = {};
        $scope.newFee.hideDropDown=true;
        $scope.newFee.selected=[];
        $scope.newFee.responseData = [];
        $scope.newFee.index = 0;
        $scope.newFee.toClass='';
        $scope.newFee.feeName = '';
        $scope.newFee.feeAmount = 10;
        $scope.newFee.allowPartialPayment = true;
        $scope.newFee.optionalFees = false;
        $scope.newFee.unFormattedFeeDueDate = new Date();
        $scope.newFee.feeDueDate = moment($scope.newFee.unFormattedFeeDueDate).format('D/MM/YYYY');
        $scope.newFee.description ='';
        $scope.newFee.terms = [];
        $scope.newFee.showDivideTerms = true;
        $scope.newFee.enableEditFeeDueDate = true;
        $scope.newFee.discounts = [];
        $timeout(function(){
            $('.feeAmountLabel').addClass('active');
            $('.tooltipped').tooltip();
            $('.material-tooltip').hide();
        },0,false);
        hidePreloader();
    };

    $scope.divideIntoTerms = function(){
        $scope.newFee.showDivideTerms = false;
        $scope.newFee.enableEditFeeDueDate = false;
        $timeout(function(){
            $('#FeeAmount').attr('disabled','disabled');
        },0,true);

        var term1 = {};
        term1.termName = '';
        term1.termAmount = 10;
        term1.termDueDate = '';
        term1.unFormattedTermDueDate = new Date();
        term1.categories = [];
        term1.showDivideCat = true;

        var term2 = {};
        term2.termName = '';
        term2.termAmount = 10;
        term2.termDueDate = '';
        term2.unFormattedTermDueDate = new Date();
        term2.categories = [];
        term2.showDivideCat = true;

        $scope.newFee.terms.push(term1);
        $scope.newFee.terms.push(term2);
    };
    $scope.deleteAllTerms = function(){
        $scope.newFee.showDivideTerms = true;
        $scope.newFee.enableEditFeeDueDate = true;
        $timeout(function(){
            $('#FeeAmount').removeAttr('disabled');
        },0,true);
        $scope.newFee.terms = [];
        return;
    }
    $scope.createTerm = function(){
        var term = {};
        term.termName = '';
        term.termDueDate = '';
        term.unFormattedTermDueDate = new Date();
        term.termAmount = 10;
        term.categories = [];
        term.showDivideCat = true;
        $scope.newFee.terms.push(term);
    };
    $scope.createCat = function(index){
        var cat = {};
        cat.categoryAmount = 10;
        cat.categoryName='';
        $scope.newFee.terms[index].categories.push(cat);
    };
    $scope.categorize = function(index){
        $timeout(function(){
            $('#TermAmount'+index).attr('disabled','disabled');
        },0,true);
        var cat1 = {};
        cat1.categoryAmount = 10;
        cat1.categoryName='';
        $scope.newFee.terms[index].categories.push(cat1);

        var cat2 = {};
        cat2.categoryAmount = 10;
        cat2.categoryName='';
        $scope.newFee.terms[index].categories.push(cat2);
        $scope.newFee.terms[index].showDivideCat = false;
    }
    $scope.removeTerm = function(index){
        if($scope.newFee.terms.length == 2){
            $scope.newFee.terms = [];
            $scope.newFee.showDivideTerms = true;
            $scope.newFee.enableEditFeeDueDate = true;
            $timeout(function(){
                $('#FeeAmount').removeAttr('disabled');
            },0,true);
        }
        else{
            $scope.newFee.terms.splice(index,1);
        }
    };
    $scope.removeCat = function(parentIndex,index){
        if($scope.newFee.terms[parentIndex].categories.length == 2){
            $scope.newFee.terms[parentIndex].categories = [];
            $scope.newFee.terms[parentIndex].showDivideCat = true;
            $timeout(function(){
                $('#TermAmount'+parentIndex).removeAttr('disabled');
            },0,true);
        }
        else{
            $scope.newFee.terms[parentIndex].categories.splice(index,1);
        }
    };
    $scope.termDueDateChanged = function($index){
        if($scope.newFee.terms.length != 0){
            if($index == ($scope.newFee.terms.length-1)){
                $scope.newFee.unFormattedFeeDueDate = $scope.newFee.terms[$index].unFormattedTermDueDate;
                $scope.newFee.feeDueDate = moment($scope.newFee.unFormattedFeeDueDate).format('D/MM/YYYY');
            }
        }
    }
    $scope.termAmountChanged = function(){
        if($scope.newFee.terms.length != 0){
            $scope.newFee.feeAmount = parseFloat(0);
            for(var i=0;i<$scope.newFee.terms.length;i++){
                if(!isNaN(parseFloat($scope.newFee.terms[i].termAmount)))
                    $scope.newFee.feeAmount = parseFloat($scope.newFee.feeAmount)+parseFloat($scope.newFee.terms[i].termAmount);
            }
        }
        $timeout(function(){
            $('.feeAmountLabel').addClass('active');
        },0,false);
    };
    $scope.catAmountChanged = function($parentIndex){
        if($scope.newFee.terms[$parentIndex].categories.length != 0){
            $scope.newFee.terms[$parentIndex].termAmount = parseFloat(0);
            for(var i=0;i<$scope.newFee.terms[$parentIndex].categories.length;i++){
                if(!isNaN(parseFloat($scope.newFee.terms[$parentIndex].categories[i].categoryAmount)))
                    $scope.newFee.terms[$parentIndex].termAmount = parseFloat($scope.newFee.terms[$parentIndex].termAmount)+parseFloat($scope.newFee.terms[$parentIndex].categories[i].categoryAmount);
            }
        }
        if($scope.newFee.terms.length != 0){
            $scope.newFee.feeAmount = parseFloat(0);
            for(var i=0;i<$scope.newFee.terms.length;i++){
                if(!isNaN(parseFloat($scope.newFee.terms[i].termAmount)))
                    $scope.newFee.feeAmount = parseFloat($scope.newFee.feeAmount)+parseFloat($scope.newFee.terms[i].termAmount);
            }
        }
        $timeout(function(){
            $('.feeAmountLabel').addClass('active');
        },0,false);
    };
    $scope.saveFees = function(){
        var valid = true;
        if(!$scope.newFee.feeName.replace(/\s/g, '').length){
            var html = 'Fee name is mandatory';
            $('#FeeName-error,.errorNameFeeName').addClass('error');
            $('#FeeName-error').text(html);
            $('.errorNameFeeName').show();
            valid = false;
        }
        if($scope.newFee.terms.length == 0){
            var dueDate = $('#feeDueDate').val();
            var dueDateMoment = moment(dueDate,'D/MM/YYYY');
            if(moment().isAfter(dueDateMoment)){
                valid = false;
                var html = 'Due date cannotbe less or equal to current time.';
                $('#feeDueDate-error,.errorFeeDueDate').addClass('error');
                $('#feeDueDate-error').text(html);
                $('.errorNameFeeDueDate').show();
            }
            if($scope.newFee.feeAmount == undefined || $scope.newFee.feeAmount == null){
                valid = false;
                var html = 'Enter a valid fee amount.';
                $('#FeeAmount-error,.errorFeeAmount').addClass('error');
                $('#FeeAmount-error').text(html);
                $('.errorNameFeeAmount').show();
            }else if($scope.newFee.feeAmount < 10){
                valid = false;
                var html = 'Amount should be greater then or equal to 10.';
                $('#FeeAmount-error,.errorFeeAmount').addClass('error');
                $('#FeeAmount-error').text(html);
                $('.errorNameFeeAmount').show();
            }
        }
        if($scope.newFee.selected.length == 0){
            valid = false;
            var html = 'Select a class to save fees.';
            $('#ToClass-error,.errorNameToClass').addClass('error');
            $('#ToClass-error').text(html);
            $('.errorNameToClass').show();
        }
        if($scope.newFee.terms.length != 0){
            for(var i=0;i<$scope.newFee.terms.length;i++){
                if(!$scope.newFee.terms[i].termName.replace(/\s/g, '').length){
                    var html = 'Term name is mandatory';
                    $('#TermName'+i+'-error,.errorNameTermName'+i).addClass('error');
                    $('#TermName'+i+'-error').text(html);
                    $('.errorNameTermName'+i).show();
                    valid = false;
                }
                var termDueDate = $('#termDueDate'+i).val();
                var termDueDateMoment = moment(termDueDate,'D/MM/YYYY');
                if(moment().isAfter(termDueDateMoment)){
                    valid = false;
                    var html = 'Due date cannotbe less or equal to current time.';
                    $('#TermDueDate'+i+'-error,.errorNameTermDueDate'+i).addClass('error');
                    $('#TermDueDate'+i+'-error').text(html);
                    $('.errorNameTermDueDate'+i).show();
                }
                if($scope.newFee.terms[i].categories.length == 0){
                    if($scope.newFee.terms[i].termAmount == undefined || $scope.newFee.terms[i].termAmount == null){
                        valid = false;
                        var html = 'Enter a valid term amount.';
                        $('#TermAmount'+i+'-error,.errorNameTermAmount'+i).addClass('error');
                        $('#TermAmount'+i+'-error').text(html);
                        $('.errorNameTermAmount'+i).show();
                    }else if($scope.newFee.terms[i].termAmount < 10){
                        valid = false;
                        var html = 'Amount should be greater then or equal to 10.';
                        $('#TermAmount'+i+'-error,.errorNameTermAmount'+i).addClass('error');
                        $('#TermAmount'+i+'-error').text(html);
                        $('.errorNameTermAmount'+i).show();
                    }
                }
                if($scope.newFee.terms[i].categories.length != 0){
                    for(var j=0;j<$scope.newFee.terms[i].categories.length;j++){
                        if(!$scope.newFee.terms[i].categories[j].categoryName.replace(/\s/g, '').length){
                            var html = 'Category name is mandatory';
                            $('#CatName'+i+''+j+'-error,.errorNameCatName'+i+''+j).addClass('error');
                            $('#CatName'+i+''+j+'-error').text(html);
                            $('.errorNameCatName'+i+''+j).show();
                            valid = false;
                        }
                        if($scope.newFee.terms[i].categories[j].categoryAmount == undefined || $scope.newFee.terms[i].categories[j].categoryAmount == null){
                            valid = false;
                            var html = 'Enter a valid amount.';
                            $('#CatAmount'+i+''+j+'-error,.errorNameCatAmount'+i+''+j).addClass('error');
                            $('#CatAmount'+i+''+j+'-error').text(html);
                            $('.errorNameCatAmount'+i+''+j).show();
                        }else if($scope.newFee.terms[i].categories[j].categoryAmount < 10){
                            valid = false;
                            var html = 'Amount should be greater then or equal to 10.';
                            $('#CatAmount'+i+''+j+'-error,.errorNameCatAmount'+i+''+j).addClass('error');
                            $('#CatAmount'+i+''+j+'-error').text(html);
                            $('.errorNameCatAmount'+i+''+j).show();
                        }
                    }
                }
            }
        }
        if(valid){
            showPreloader();
            AdminFeeService.saveFees($scope.newFee,function(status){
                if(status == "SUCCESS"){
                    Materialize.toast('Fee Saved.',1000);
                }else if(status == "ERROR"){
                    hidePreloader();
                    Materialize.toast('Error saving fee, Try again.',1000);
                }else if(status == "FAILED"){
                    $rootScope.logout();
                }
            });
        }
    };

    $scope.saveAsTemplate = function(){
        AdminFeeService.saveFeeTemplate($scope.newFee,function(status,templateId){
            if(status == "SUCCESS"){
                hidePreloader();
                $location.path('/edittemplate/'+templateId);
                Materialize.toast('Saved as template.',1000);
            }else if(status == "ERROR"){
                hidePreloader();
                Materialize.toast('Error in saving template, try again later',1000);
            }else if(status == "FAILED"){
                $rootScope.logout();
            }
        });
    };

    $scope.classInputFocused = function(){
        $('.errorName').hide();
        if(!$scope.newFee.toClass.replace(/\s/g, '').length){
            $scope.newFee.hideDropDown = true;
            $scope.newFee.responseData = [];
            return false;
        }else{
            $scope.autoSuggestPopulate();
        }
    }

    $scope.autoSuggestPopulate = function(){
        var queryString = $scope.newFee.toClass;    
        $scope.timer = $timeout(function(){
            if($scope.newFee.selected.length>0){
                if(($scope.newFee.selected[0].id == -1) || ($scope.newFee.selected[0].id == "ALL")){
                    Materialize.toast('All classes are already added.',3000);
                    return false;
                }
            }
            AdminFeeService.getClasses(queryString,function(status,data){
                if(status=="SUCCESS"){
                    $scope.newFee.responseData=[];

                    if(queryString.toUpperCase() == 'ALL' || queryString.toUpperCase() == 'A' || queryString.toUpperCase() == 'AL'){
                        var responseObject = {};
                        responseObject.id=$scope.newFee.responseData.length;
                        responseObject.name = 'ALL';
                        responseObject.classId = -1;
                        responseObject.section = '';
                        responseObject.selected = false;
                        $scope.newFee.responseData.push(responseObject);
                        $scope.newFee.hideDropDown = false;
                    }
                    
                    
                    for(var i=0;i<data.length;i++){
                        var responseObject = {};
                        responseObject.id=$scope.newFee.responseData.length;
                        responseObject.name=data[i].className;
                        responseObject.classId = data[i].classId;
                        responseObject.section = '';
                        responseObject.type = "CLASS";
                        responseObject.selected = false;
                        $scope.newFee.responseData.push(responseObject);
                    }
                    $scope.newFee.hideDropDown = false;
                }else{
                    if(queryString.toUpperCase() == 'ALL' || queryString.toUpperCase() == 'A' || queryString.toUpperCase() == 'AL'){
                        $scope.newFee.responseData=[];
                        var responseObject = {};
                        responseObject.id=$scope.newFee.responseData.length;
                        responseObject.name = 'ALL';
                        responseObject.classId = -1;
                        responseObject.section = '';
                        responseObject.selected = false;
                        $scope.newFee.responseData.push(responseObject);
                        $scope.newFee.hideDropDown = false;
                    }else
                        return false;
                }
            });
        },200);
    };
    $scope.autoSuggestClicked = function(id){
        if($scope.newFee.responseData[id].selected)
            $scope.newFee.responseData[id].selected = false;
        else
            $scope.newFee.responseData[id].selected = true;
    };
    
    $scope.inputBlurred = function(){
        $scope.newFee.hideDropDown = true;
        $scope.newFee.responseData = [];
    };
    
    $scope.inputChanged = function($event){
        
        var keyCode = $event.keyCode;
        if (keyCode == '8' && $scope.newFee.toClass=='') {
            if ($scope.newFee.selected.length) {
                $scope.newFee.selected.pop();
            }
        }
        if(!$scope.newFee.toClass.replace(/\s/g, '').length){
            $scope.newFee.hideDropDown = true;
            $scope.newFee.responseData = [];
        }else{
            $scope.autoSuggestPopulate();
        }
        
    };
    
    $scope.autoSuggestSelected = function(){
        $timeout(function(){
            $('#to_class').focus();
        });
        $scope.newFee.hideDropDown = true;
        for(var mainLoop=0;mainLoop<$scope.newFee.responseData.length;mainLoop++){
            if($scope.newFee.responseData[mainLoop].selected){
                var id = mainLoop;
                var valid = true;
                if($scope.newFee.responseData[id].classId == -1){
                    $scope.newFee.selected  = [];
                    var selected = {};
                    selected.id = -1;
                    selected.name = 'ALL';
                    $scope.newFee.selected.push(selected);
                    $scope.newFee.toClass='';
                    $scope.newFee.responseData = [];
                    return false;
                }else{
                    for(var i=0;i<$scope.newFee.selected.length;i++){
                        if($scope.newFee.responseData[id].classId == $scope.newFee.selected[i].classId){
                            Materialize.toast($scope.newFee.responseData[id].name+' already added.',3000);
                            var valid = false;
                            break;
                        }
                    }
                    if(valid)
                        $scope.newFee.selected.push($scope.newFee.responseData[id]);
                }
            }
        }
        $scope.newFee.toClass='';
        $scope.newFee.responseData = [];
    };
    
    $scope.chipClosed = function($index){
        $scope.newFee.selected.splice($index,1);
    };

    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        showPreloader();
        $timeout($scope.init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    showPreloader();
                                    $timeout($scope.init,0,true);
                                });
    };
}]);

app.controller('aEditFeeCtr', ['$http','$rootScope','AdminFeeService','$scope','$location','$timeout','deviceDetector',function ($http,$rootScope,AdminFeeService,$scope,$location,$timeout,deviceDetector) {
    showPreloader();
    $rootScope.AndroidText = 'Create Fees';
    $timeout(function(){
        $('li.active a.active').trigger('click.collapse');
        $('li.nav-li').removeClass('active');
        $('#createA').trigger("click.collapse");
        $('.admin-fees-li').addClass('active');
    },0,false);
    $scope.init = function(){
        $scope.newFee = {};
        $scope.newFee.hideDropDown=true;
        $scope.newFee.selected=[];
        $scope.newFee.responseData = [];
        $scope.newFee.index = 0;
        $scope.newFee.toClass='';
        $scope.newFee.feeName = '';
        $scope.newFee.feeAmount = 10;
        $scope.newFee.allowPartialPayment = true;
        $scope.newFee.optionalFees = false;
        $scope.newFee.unFormattedFeeDueDate = new Date();
        $scope.newFee.feeDueDate = moment($scope.newFee.unFormattedFeeDueDate).format('D/MM/YYYY');
        $scope.newFee.description ='';
        $scope.newFee.terms = [];
        $scope.newFee.showDivideTerms = true;
        $scope.newFee.enableEditFeeDueDate = true;
        $scope.newFee.discounts = [];
        $timeout(function(){
            $('.feeAmountLabel').addClass('active');
            $('.tooltipped').tooltip();
            $('.material-tooltip').hide();
        },0,false);
        hidePreloader();
    };

    $scope.divideIntoTerms = function(){
        $scope.newFee.showDivideTerms = false;
        $scope.newFee.enableEditFeeDueDate = false;
        $timeout(function(){
            $('#FeeAmount').attr('disabled','disabled');
        },0,true);

        var term1 = {};
        term1.termName = '';
        term1.termAmount = 10;
        term1.termDueDate = '';
        term1.unFormattedTermDueDate = new Date();
        term1.categories = [];
        term1.showDivideCat = true;

        var term2 = {};
        term2.termName = '';
        term2.termAmount = 10;
        term2.termDueDate = '';
        term2.unFormattedTermDueDate = new Date();
        term2.categories = [];
        term2.showDivideCat = true;

        $scope.newFee.terms.push(term1);
        $scope.newFee.terms.push(term2);
    };
    $scope.deleteAllTerms = function(){
        $scope.newFee.showDivideTerms = true;
        $scope.newFee.enableEditFeeDueDate = true;
        $timeout(function(){
            $('#FeeAmount').removeAttr('disabled');
        },0,true);
        $scope.newFee.terms = [];
        return;
    }
    $scope.createTerm = function(){
        var term = {};
        term.termName = '';
        term.termDueDate = '';
        term.unFormattedTermDueDate = new Date();
        term.termAmount = 10;
        term.categories = [];
        term.showDivideCat = true;
        $scope.newFee.terms.push(term);
    };
    $scope.createCat = function(index){
        var cat = {};
        cat.categoryAmount = 10;
        cat.categoryName='';
        $scope.newFee.terms[index].categories.push(cat);
    };
    $scope.categorize = function(index){
        $timeout(function(){
            $('#TermAmount'+index).attr('disabled','disabled');
        },0,true);
        var cat1 = {};
        cat1.categoryAmount = 10;
        cat1.categoryName='';
        $scope.newFee.terms[index].categories.push(cat1);

        var cat2 = {};
        cat2.categoryAmount = 10;
        cat2.categoryName='';
        $scope.newFee.terms[index].categories.push(cat2);
        $scope.newFee.terms[index].showDivideCat = false;
    }
    $scope.removeTerm = function(index){
        if($scope.newFee.terms.length == 2){
            $scope.newFee.terms = [];
            $scope.newFee.showDivideTerms = true;
            $scope.newFee.enableEditFeeDueDate = true;
            $timeout(function(){
                $('#FeeAmount').removeAttr('disabled');
            },0,true);
        }
        else{
            $scope.newFee.terms.splice(index,1);
        }
    };
    $scope.removeCat = function(parentIndex,index){
        if($scope.newFee.terms[parentIndex].categories.length == 2){
            $scope.newFee.terms[parentIndex].categories = [];
            $scope.newFee.terms[parentIndex].showDivideCat = true;
            $timeout(function(){
                $('#TermAmount'+parentIndex).removeAttr('disabled');
            },0,true);
        }
        else{
            $scope.newFee.terms[parentIndex].categories.splice(index,1);
        }
    };
    $scope.termDueDateChanged = function($index){
        if($scope.newFee.terms.length != 0){
            if($index == ($scope.newFee.terms.length-1)){
                $scope.newFee.unFormattedFeeDueDate = $scope.newFee.terms[$index].unFormattedTermDueDate;
                $scope.newFee.feeDueDate = moment($scope.newFee.unFormattedFeeDueDate).format('D/MM/YYYY');
            }
        }
    }
    $scope.termAmountChanged = function(){
        if($scope.newFee.terms.length != 0){
            $scope.newFee.feeAmount = parseFloat(0);
            for(var i=0;i<$scope.newFee.terms.length;i++){
                if(!isNaN(parseFloat($scope.newFee.terms[i].termAmount)))
                    $scope.newFee.feeAmount = parseFloat($scope.newFee.feeAmount)+parseFloat($scope.newFee.terms[i].termAmount);
            }
        }
        $timeout(function(){
            $('.feeAmountLabel').addClass('active');
        },0,false);
    };
    $scope.catAmountChanged = function($parentIndex){
        if($scope.newFee.terms[$parentIndex].categories.length != 0){
            $scope.newFee.terms[$parentIndex].termAmount = parseFloat(0);
            for(var i=0;i<$scope.newFee.terms[$parentIndex].categories.length;i++){
                if(!isNaN(parseFloat($scope.newFee.terms[$parentIndex].categories[i].categoryAmount)))
                    $scope.newFee.terms[$parentIndex].termAmount = parseFloat($scope.newFee.terms[$parentIndex].termAmount)+parseFloat($scope.newFee.terms[$parentIndex].categories[i].categoryAmount);
            }
        }
        if($scope.newFee.terms.length != 0){
            $scope.newFee.feeAmount = parseFloat(0);
            for(var i=0;i<$scope.newFee.terms.length;i++){
                if(!isNaN(parseFloat($scope.newFee.terms[i].termAmount)))
                    $scope.newFee.feeAmount = parseFloat($scope.newFee.feeAmount)+parseFloat($scope.newFee.terms[i].termAmount);
            }
        }
        $timeout(function(){
            $('.feeAmountLabel').addClass('active');
        },0,false);
    };
    $scope.saveFees = function(){
        var valid = true;
        if(!$scope.newFee.feeName.replace(/\s/g, '').length){
            var html = 'Fee name is mandatory';
            $('#FeeName-error,.errorNameFeeName').addClass('error');
            $('#FeeName-error').text(html);
            $('.errorNameFeeName').show();
            valid = false;
        }
        if($scope.newFee.terms.length == 0){
            var dueDate = $('#feeDueDate').val();
            var dueDateMoment = moment(dueDate,'D/MM/YYYY');
            if(moment().isAfter(dueDateMoment)){
                valid = false;
                var html = 'Due date cannotbe less or equal to current time.';
                $('#feeDueDate-error,.errorFeeDueDate').addClass('error');
                $('#feeDueDate-error').text(html);
                $('.errorNameFeeDueDate').show();
            }
            if($scope.newFee.feeAmount == undefined || $scope.newFee.feeAmount == null){
                valid = false;
                var html = 'Enter a valid fee amount.';
                $('#FeeAmount-error,.errorFeeAmount').addClass('error');
                $('#FeeAmount-error').text(html);
                $('.errorNameFeeAmount').show();
            }else if($scope.newFee.feeAmount < 10){
                valid = false;
                var html = 'Amount should be greater then or equal to 10.';
                $('#FeeAmount-error,.errorFeeAmount').addClass('error');
                $('#FeeAmount-error').text(html);
                $('.errorNameFeeAmount').show();
            }
        }
        if($scope.newFee.selected.length == 0){
            valid = false;
            var html = 'Select a class to save fees.';
            $('#ToClass-error,.errorNameToClass').addClass('error');
            $('#ToClass-error').text(html);
            $('.errorNameToClass').show();
        }
        if($scope.newFee.terms.length != 0){
            for(var i=0;i<$scope.newFee.terms.length;i++){
                if(!$scope.newFee.terms[i].termName.replace(/\s/g, '').length){
                    var html = 'Term name is mandatory';
                    $('#TermName'+i+'-error,.errorNameTermName'+i).addClass('error');
                    $('#TermName'+i+'-error').text(html);
                    $('.errorNameTermName'+i).show();
                    valid = false;
                }
                var termDueDate = $('#termDueDate'+i).val();
                var termDueDateMoment = moment(termDueDate,'D/MM/YYYY');
                if(moment().isAfter(termDueDateMoment)){
                    valid = false;
                    var html = 'Due date cannotbe less or equal to current time.';
                    $('#TermDueDate'+i+'-error,.errorNameTermDueDate'+i).addClass('error');
                    $('#TermDueDate'+i+'-error').text(html);
                    $('.errorNameTermDueDate'+i).show();
                }
                if($scope.newFee.terms[i].categories.length == 0){
                    if($scope.newFee.terms[i].termAmount == undefined || $scope.newFee.terms[i].termAmount == null){
                        valid = false;
                        var html = 'Enter a valid term amount.';
                        $('#TermAmount'+i+'-error,.errorNameTermAmount'+i).addClass('error');
                        $('#TermAmount'+i+'-error').text(html);
                        $('.errorNameTermAmount'+i).show();
                    }else if($scope.newFee.terms[i].termAmount < 10){
                        valid = false;
                        var html = 'Amount should be greater then or equal to 10.';
                        $('#TermAmount'+i+'-error,.errorNameTermAmount'+i).addClass('error');
                        $('#TermAmount'+i+'-error').text(html);
                        $('.errorNameTermAmount'+i).show();
                    }
                }
                if($scope.newFee.terms[i].categories.length != 0){
                    for(var j=0;j<$scope.newFee.terms[i].categories.length;j++){
                        if(!$scope.newFee.terms[i].categories[j].categoryName.replace(/\s/g, '').length){
                            var html = 'Category name is mandatory';
                            $('#CatName'+i+''+j+'-error,.errorNameCatName'+i+''+j).addClass('error');
                            $('#CatName'+i+''+j+'-error').text(html);
                            $('.errorNameCatName'+i+''+j).show();
                            valid = false;
                        }
                        if($scope.newFee.terms[i].categories[j].categoryAmount == undefined || $scope.newFee.terms[i].categories[j].categoryAmount == null){
                            valid = false;
                            var html = 'Enter a valid amount.';
                            $('#CatAmount'+i+''+j+'-error,.errorNameCatAmount'+i+''+j).addClass('error');
                            $('#CatAmount'+i+''+j+'-error').text(html);
                            $('.errorNameCatAmount'+i+''+j).show();
                        }else if($scope.newFee.terms[i].categories[j].categoryAmount < 10){
                            valid = false;
                            var html = 'Amount should be greater then or equal to 10.';
                            $('#CatAmount'+i+''+j+'-error,.errorNameCatAmount'+i+''+j).addClass('error');
                            $('#CatAmount'+i+''+j+'-error').text(html);
                            $('.errorNameCatAmount'+i+''+j).show();
                        }
                    }
                }
            }
        }
        if(valid){
            showPreloader();
            AdminFeeService.saveFees($scope.newFee,function(status){
                if(status == "SUCCESS"){
                    Materialize.toast('Fee Saved.',1000);
                }else if(status == "ERROR"){
                    hidePreloader();
                    Materialize.toast('Error saving fee, Try again.',1000);
                }else if(status == "FAILED"){
                    $rootScope.logout();
                }
            });
        }
    };

    $scope.saveAsTemplate = function(){
        AdminFeeService.saveFeeTemplate($scope.newFee,function(status,templateId){
            if(status == "SUCCESS"){
                hidePreloader();
                $location.path('/edittemplate/'+templateId);
                Materialize.toast('Saved as template.',1000);
            }else if(status == "ERROR"){
                hidePreloader();
                Materialize.toast('Error in saving template, try again later',1000);
            }else if(status == "FAILED"){
                $rootScope.logout();
            }
        });
    };

    $scope.classInputFocused = function(){
        $('.errorName').hide();
        if(!$scope.newFee.toClass.replace(/\s/g, '').length){
            $scope.newFee.hideDropDown = true;
            $scope.newFee.responseData = [];
            return false;
        }else{
            $scope.autoSuggestPopulate();
        }
    }

    $scope.autoSuggestPopulate = function(){
        var queryString = $scope.newFee.toClass;    
        $scope.timer = $timeout(function(){
            if($scope.newFee.selected.length>0){
                if(($scope.newFee.selected[0].id == -1) || ($scope.newFee.selected[0].id == "ALL")){
                    Materialize.toast('All classes are already added.',3000);
                    return false;
                }
            }
            AdminFeeService.getClasses(queryString,function(status,data){
                if(status=="SUCCESS"){
                    $scope.newFee.responseData=[];

                    if(queryString.toUpperCase() == 'ALL' || queryString.toUpperCase() == 'A' || queryString.toUpperCase() == 'AL'){
                        var responseObject = {};
                        responseObject.id=$scope.newFee.responseData.length;
                        responseObject.name = 'ALL';
                        responseObject.classId = -1;
                        responseObject.section = '';
                        responseObject.selected = false;
                        $scope.newFee.responseData.push(responseObject);
                        $scope.newFee.hideDropDown = false;
                    }
                    
                    
                    for(var i=0;i<data.length;i++){
                        var responseObject = {};
                        responseObject.id=$scope.newFee.responseData.length;
                        responseObject.name=data[i].className;
                        responseObject.classId = data[i].classId;
                        responseObject.section = '';
                        responseObject.type = "CLASS";
                        responseObject.selected = false;
                        $scope.newFee.responseData.push(responseObject);
                    }
                    $scope.newFee.hideDropDown = false;
                }else{
                    if(queryString.toUpperCase() == 'ALL' || queryString.toUpperCase() == 'A' || queryString.toUpperCase() == 'AL'){
                        $scope.newFee.responseData=[];
                        var responseObject = {};
                        responseObject.id=$scope.newFee.responseData.length;
                        responseObject.name = 'ALL';
                        responseObject.classId = -1;
                        responseObject.section = '';
                        responseObject.selected = false;
                        $scope.newFee.responseData.push(responseObject);
                        $scope.newFee.hideDropDown = false;
                    }else
                        return false;
                }
            });
        },200);
    };
    $scope.autoSuggestClicked = function(id){
        if($scope.newFee.responseData[id].selected)
            $scope.newFee.responseData[id].selected = false;
        else
            $scope.newFee.responseData[id].selected = true;
    };
    
    $scope.inputBlurred = function(){
        $scope.newFee.hideDropDown = true;
        $scope.newFee.responseData = [];
    };
    
    $scope.inputChanged = function($event){
        
        var keyCode = $event.keyCode;
        if (keyCode == '8' && $scope.newFee.toClass=='') {
            if ($scope.newFee.selected.length) {
                $scope.newFee.selected.pop();
            }
        }
        if(!$scope.newFee.toClass.replace(/\s/g, '').length){
            $scope.newFee.hideDropDown = true;
            $scope.newFee.responseData = [];
        }else{
            $scope.autoSuggestPopulate();
        }
        
    };
    
    $scope.autoSuggestSelected = function(){
        $timeout(function(){
            $('#to_class').focus();
        });
        $scope.newFee.hideDropDown = true;
        for(var mainLoop=0;mainLoop<$scope.newFee.responseData.length;mainLoop++){
            if($scope.newFee.responseData[mainLoop].selected){
                var id = mainLoop;
                var valid = true;
                if($scope.newFee.responseData[id].classId == -1){
                    $scope.newFee.selected  = [];
                    var selected = {};
                    selected.id = -1;
                    selected.name = 'ALL';
                    $scope.newFee.selected.push(selected);
                    $scope.newFee.toClass='';
                    $scope.newFee.responseData = [];
                    return false;
                }else{
                    for(var i=0;i<$scope.newFee.selected.length;i++){
                        if($scope.newFee.responseData[id].classId == $scope.newFee.selected[i].classId){
                            Materialize.toast($scope.newFee.responseData[id].name+' already added.',3000);
                            var valid = false;
                            break;
                        }
                    }
                    if(valid)
                        $scope.newFee.selected.push($scope.newFee.responseData[id]);
                }
            }
        }
        $scope.newFee.toClass='';
        $scope.newFee.responseData = [];
    };
    
    $scope.chipClosed = function($index){
        $scope.newFee.selected.splice($index,1);
    };

    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        showPreloader();
        $timeout($scope.init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    showPreloader();
                                    $timeout($scope.init,0,true);
                                });
    };
}]);

app.controller('aFeesCtr', ['$http','$rootScope','AdminFeeService','$scope','$location','$timeout','deviceDetector','$routeParams',function ($http,$rootScope,AdminFeeService,$scope,$location,$timeout,deviceDetector,$routeParams) {
    showPreloader();
    $rootScope.AndroidText = 'Fees';
    $timeout(function(){
        $('li.active a.active').trigger('click.collapse');
        $('li.nav-li').removeClass('active');
        $('#createA').trigger("click.collapse");
        $('.admin-fees-li').addClass('active');
    },0,false);
    $scope.init = function(){
        AdminFeeService.getAllFees(function(status,fees){
            if(status == "SUCCESS"){
                for(var i=0;i<fees.length;i++){
                    fees[i].feeFormatedDueDate = moment(fees[i].feeDueDate,'ddd MMM DD YYYY HH:mm:ss').format('MMM DD YYYY');
                }
                $scope.fees = fees;
                $timeout(function(){
                    $('.tooltipped').tooltip();
                    $('.material-tooltip').hide();
                },0,false);
                hidePreloader();    
            }else if(status == "ERROR"){
                Materialize.toast('Error in fetching fees, try again later.',1000);
                hidePreloader();
            }else if(status == "EMPTY"){
                Materialize.toast('No fee added. Add a fees.',1000);
                hidePreloader();
            }else if(status == "FAILED"){
                $rootScope.logout();
            }
        });
    };
    $scope.feeClicked = function(feeId){
        $location.path('/feedetails/'+feeId);
    }
    $scope.showTemplates = function(){
        $location.path('/savedtemplates');
    }
    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        showPreloader();
        $timeout($scope.init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    showPreloader();
                                    $timeout($scope.init,0,true);
                                });
    };
}]);

app.controller('aViewFeesCtr', ['$http','$rootScope','AdminFeeService','$scope','$location','$timeout','deviceDetector','$routeParams',function ($http,$rootScope,AdminFeeService,$scope,$location,$timeout,deviceDetector,$routeParams) {
    showPreloader();
    $rootScope.AndroidText = 'Fees';
    $timeout(function(){
        $('li.active a.active').trigger('click.collapse');
        $('li.nav-li').removeClass('active');
        $('#createA').trigger("click.collapse");
        $('.admin-fees-li').addClass('active');
    },0,false);




    $scope.init = function(){
        $scope.openedFee = {};
        $scope.timer = '';
        $scope.openedFee.filterText = '';
        $scope.openedFee.feeTrans = [];
        $scope.openedFee.rootTrans=[];
        $scope.showTransactions = false;

        $scope.newPayment = {};
        $scope.newPayment.toStudent ='';
        $scope.newPayment.hideDropDown = true;
        $scope.newPayment.responseData = [];
        $scope.newPayment.selected = '';
        $scope.newPayment.chalanNumber ='';
        $scope.newPayment.paymentAmount = '';
        
        AdminFeeService.getFeeDetails($routeParams.feeId,function(status,fees){
            if(status == "SUCCESS"){
                fees[0].feeFormatedDueDate = moment(fees[0].feeDueDate,'ddd MMM DD YYYY HH:mm:ss').format('MMM DD YYYY');
                for(var i=0;i<fees[0].term.length;i++){
                    fees[0].term[i].termFormatedDueDate = moment(fees[0].term[i].termDueDate,'ddd MMM DD YYYY HH:mm:ss').format('MMM DD YYYY');
                }
                $scope.openedFee = fees[0];
                AdminFeeService.getFeeTransactions($scope.openedFee.feeId,function(status,transactions){
                    if(status == "SUCCESS"){
                        $scope.openedFee.rootTrans = transactions;
                        $scope.openedFee.feeTrans = transactions;
                        $scope.showTransactions = true;
                    }else if(status == "FAILED"){
                        Materialize.toast('Session expired',2000);
                        $rootScope.logout();
                    }else{
                        $scope.showTransactions =false;
                    }
                });
                console.log(JSON.stringify(fees[0]));
                $timeout(function(){
                    $('.tooltipped').tooltip();
                    $('.material-tooltip').hide();
                },0,false);
                hidePreloader();    
            }else if(status == "ERROR"){
                Materialize.toast('Error in fetching fees, try again later.',1000);
                hidePreloader();
            }else if(status == "EMPTY"){
                Materialize.toast('No fee added. Add a fees.',1000);
                hidePreloader();
            }else if(status == "FAILED"){
                $rootScope.logout();
            }
        });
    };






    $scope.openDiscountModel = function(){
        $scope.newDiscount = {};
        $scope.newDiscount.toStudent ='';
        $scope.newDiscount.hideDropDown = true;
        $scope.newDiscount.responseData = [];
        $scope.newDiscount.selected = '';

        
        $('#DiscountModel').openModal({dismissible:false},1);
    }
    $scope.studentInputChanged = function($event){
        var keyCode = $event.keyCode;
        if(!$scope.newDiscount.toStudent.replace(/\s/g, '').length){
            $scope.newDiscount.hideDropDown = true;
            $scope.newDiscount.responseData = [];
        }else{
            $scope.studentAutoSuggestPopulate();
        }
    }
    $scope.studentInputBlurred = function(){
        $scope.newDiscount.hideDropDown = true;
        $scope.newDiscount.responseData = [];
    };
    $scope.studentInputFocused = function(){
        $('.errorName').hide();
        if(!$scope.newDiscount.toStudent.replace(/\s/g, '').length){
            $scope.newDiscount.hideDropDown = true;
            $scope.newDiscount.responseData = [];
            return false;
        }else{
            $scope.newDiscount.studentAutoSuggestPopulate();
        }
    }
    $scope.studentAutoSuggestPopulate = function(){
        var queryString = $scope.newPayment.toStudent;    
        $scope.timer = $timeout(function(){
            AdminFeeService.getStudents(queryString,$scope.openedFee.class.classId,function(status,students){
                if(status=="SUCCESS"){
                    $scope.newDiscount.responseData=[];                    
                    
                    for(var i=0;i<students.length;i++){
                        var responseObject = {};
                        responseObject.id=$scope.newDiscount.responseData.length;
                        responseObject.name=students[i].first_name+' '+students[i].last_name;
                        responseObject.firstName = students[i].first_name;
                        responseObject.lastName = students[i].last_name;
                        responseObject.userId = students[i].student_id;
                        responseObject.userType='STUDENT';
                        responseObject.userName = students[i].user_name;
                        responseObject.emailId = students[i].student_email_id;
                        responseObject.studentId = students[i].student_id;
                        responseObject.class = students[i].class_name;
                        responseObject.section = students[i].section_name;
                        responseObject.phoneNumber = students[i].phone_number;
                        responseObject.sectionId = students[i].section_id;
                        responseObject.classId = students[i].class_id;
                        responseObject.type = "STUDENT";
                        $scope.newDiscount.responseData.push(responseObject);
                    }
                    $scope.newDiscount.hideDropDown = false;
                }else{
                    return false;
                }
            });
        },200);
    };
    $scope.studentAutoSuggestSelected = function($index){
        $scope.newDiscount.selected = $scope.newDiscount.responseData[$index];
        $scope.newDiscount.toStudent='';
        $scope.newDiscount.responseData = [];
    };
    $scope.studentAutoSuggestLeft = function(){
        $scope.newDiscount.responseData = [];
        $scope.newDiscount.hideDropDown = true;
    }
    $scope.studentChipClosed = function(){
        $scope.newDiscount.selected = '';
    }












    $scope.PaymentInputChanged = function($event){
        var keyCode = $event.keyCode;
        if(!$scope.newPayment.toStudent.replace(/\s/g, '').length){
            $scope.newPayment.hideDropDown = true;
            $scope.newPayment.responseData = [];
        }else{
            $scope.PaymentAutoSuggestPopulate();
        }
    }
    $scope.PaymentInputBlurred = function(){
        $scope.newPayment.hideDropDown = true;
        $scope.newPayment.responseData = [];
    };
    $scope.PaymentInputFocused = function(){
        $('.errorName').hide();
        if(!$scope.newPayment.toStudent.replace(/\s/g, '').length){
            $scope.newPayment.hideDropDown = true;
            $scope.newPayment.responseData = [];
            return false;
        }else{
            $scope.newPayment.PaymentAutoSuggestPopulate();
        }
    }
    $scope.PaymentAutoSuggestPopulate = function(){
        var queryString = $scope.newPayment.toStudent;    
        $scope.timer = $timeout(function(){
            AdminFeeService.getStudents(queryString,$scope.openedFee.class.classId,function(status,students){
                if(status=="SUCCESS"){
                    $scope.newPayment.responseData=[];                    
                    
                    for(var i=0;i<students.length;i++){
                        var responseObject = {};
                        responseObject.id=$scope.newPayment.responseData.length;
                        responseObject.name=students[i].first_name+' '+students[i].last_name;
                        responseObject.firstName = students[i].first_name;
                        responseObject.lastName = students[i].last_name;
                        responseObject.userId = students[i].student_id;
                        responseObject.userType='STUDENT';
                        responseObject.userName = students[i].user_name;
                        responseObject.emailId = students[i].student_email_id;
                        responseObject.studentId = students[i].student_id;
                        responseObject.class = students[i].class_name;
                        responseObject.section = students[i].section_name;
                        responseObject.phoneNumber = students[i].phone_number;
                        responseObject.sectionId = students[i].section_id;
                        responseObject.classId = students[i].class_id;
                        responseObject.type = "STUDENT";
                        $scope.newPayment.responseData.push(responseObject);
                    }
                    $scope.newPayment.hideDropDown = false;
                }else{
                    return false;
                }
            });
        },200);
    };
    $scope.PaymentAutoSuggestSelected = function($index){
        $scope.newPayment.selected = $scope.newPayment.responseData[$index];
        $scope.newPayment.toStudent='';
        $scope.newPayment.responseData = [];
    };
    $scope.PaymentAutoSuggestLeft = function(){
        $scope.newPayment.responseData = [];
        $scope.newPayment.hideDropDown = true;
    }
    $scope.PaymentChipClosed = function(){
        $scope.newPayment.selected = '';
    }


    $scope.saveBankPayment = function(){
        var valid = true;
        if($scope.newPayment.paymentAmount == undefined || $scope.newPayment.paymentAmount == null){
            valid = false;
            var html = 'Enter a valid payment amount.';
            $('#PaymentAmount-error,.errorNamePaymentAmount').addClass('error');
            $('#PaymentAmount-error').text(html);
            $('.errorNamePaymentAmount').show();
        }else if($scope.newPayment.paymentAmount < 1){
            valid = false;
            var html = 'Amount should be greater then or equal to 1.';
            $('#PaymentAmount-error,.errorNamePaymentAmount').addClass('error');
            $('#PaymentAmount-error').text(html);
            $('.errorNamePaymentAmount').show();
        }
        if($scope.newPayment.selected.length == ''){
            valid = false;
            var html = 'Select a valid student from drop down to save fees.';
            $('#ToPaymentStudent-error,.errorNameToPaymentStudent').addClass('error');
            $('#ToPaymentStudentToPaymentStudent-error').text(html);
            $('.errorNameToPaymentStudent').show();
        }
        if(!$scope.newPayment.chalanNumber.replace(/\s/g, '').length){
            valid = false;
            var html = 'Please enter chalan number';
            $('#ChalanNumber-error,.errorNameChalanNumber').addClass('error');
            $('#ChalanNumber-error').text(html);
            $('.errorNameChalanNumber').show();
        }
        if(valid){
            var payment = {};
            payment.studentId = $scope.newPayment.selected.userId;
            payment.feeId = $scope.openedFee.feeId;
            payment.chalanNumber = $scope.newPayment.chalanNumber;
            payment.paymentAmount = $scope.newPayment.paymentAmount;
            payment.emailId = $scope.newPayment.selected.emailId;
            payment.mobileNumber = $scope.newPayment.selected.phoneNumber;
            payment.productinfo = $scope.openedFee.feeName;
            payment.firstName = $scope.newPayment.selected.firstName;
            payment.lastName = $scope.newPayment.selected.lastName;

            AdminFeeService.saveBankPayment(payment,function(status){
                if(status == "SUCCESS"){
                    $scope.newPayment = {};
                    $scope.newPayment.toStudent ='';
                    $scope.newPayment.hideDropDown = true;
                    $scope.newPayment.responseData = [];
                    $scope.newPayment.selected = '';
                    $scope.newPayment.chalanNumber ='';
                    $scope.newPayment.paymentAmount = '';

                    $scope.refreshTransactions();
                    Materialize.toast('Payment Saved.',1000);
                }else if(status == "ERROR"){
                    $scope.closeDiscountModal();
                    Materialize.toast('Error saving payments, Try later.',1000);
                }else if(status == "FAILED"){
                    $rootScope.logout();
                }
            });
        }
    };






    $scope.refreshTransactions = function(){
        AdminFeeService.getFeeTransactions($scope.openedFee.feeId,function(status,transactions){
            if(status == "SUCCESS"){
                $scope.openedFee.rootTrans = transactions;
                $scope.openedFee.feeTrans = transactions;
                $scope.showTransactions = true;
            }else if(status == "FAILED"){
                Materialize.toast('Session expired',2000);
                $rootScope.logout();
            }else{
                $scope.openedFee.rootTrans = [];
                $scope.openedFee.feeTrans = [];
                $scope.showTransactions =false;
            }
        });
    }


    $scope.deleteDiscountRow = function($index){
        $scope.openedFee.discounts.splice($index,1);
    }
    $scope.saveDiscount = function(){
        var valid = true;
        if($scope.newDiscount.discountAmount == undefined || $scope.newDiscount.discountAmount == null){
            valid = false;
            var html = 'Enter a valid fee amount.';
            $('#DiscountAmount-error,.errorNameDiscountAmount').addClass('error');
            $('#DiscountAmount-error').text(html);
            $('.errorNameDiscountAmount').show();
        }else if($scope.newDiscount.discountAmount < 1){
            valid = false;
            var html = 'Amount should be greater then or equal to 1.';
            $('#DiscountAmount-error,.errorNameDiscountAmount').addClass('error');
            $('#DiscountAmount-error').text(html);
            $('.errorNameDiscountAmount').show();
        }else if($scope.newDiscount.discountAmount > $scope.openedFee.totalAmount){
            valid = false;
            var html = 'Discount should be less then or equal to total fee amount.';
            $('#DiscountAmount-error,.errorNameDiscountAmount').addClass('error');
            $('#DiscountAmount-error').text(html);
            $('.errorNameDiscountAmount').show();
        }
        if($scope.newDiscount.selected.length == ''){
            valid = false;
            var html = 'Select a valid student from drop down to save fees.';
            $('#ToStudent-error,.errorNameToStudent').addClass('error');
            $('#ToStudent-error').text(html);
            $('.errorNameToStudent').show();
        }
        if(valid){
            var discount = {};
            discount.studentId = $scope.newDiscount.selected.userId;
            discount.sectionId = $scope.newDiscount.selected.sectionId;
            discount.classId = $scope.newDiscount.selected.classId;
            discount.feeId = $scope.openedFee.feeId;
            discount.discountAmount = $scope.newDiscount.discountAmount;
            AdminFeeService.saveDiscount(discount,function(status){
                if(status == "SUCCESS"){
                    $scope.newDiscount = {};
                    $scope.newDiscount.toStudent ='';
                    $scope.newDiscount.hideDropDown = true;
                    $scope.newDiscount.responseData = [];
                    $scope.newDiscount.selected = '';
                    $scope.refreshDiscounts();
                    Materialize.toast('Discount Saved.',1000);
                }else if(status == "ERROR"){
                    $scope.closeDiscountModal();
                    Materialize.toast('Error saving discounts, Try later.',1000);
                }else if(status == "FAILED"){
                    $rootScope.logout();
                }
            });
        }
    };
    $scope.closeDiscountModal = function(){
        $('#DiscountModel').closeModal();
    }
    $scope.deleteDiscount = function($index){
        var discountId = $scope.openedFee.discounts[$index].discountId;
        var studentId = $scope.openedFee.discounts[$index].studentId;
        var feeId = $scope.openedFee.discounts[$index].feeId;
        AdminFeeService.deleteDiscount(discountId,feeId,studentId,function(status){
            if(status == "SUCCESS"){
                $scope.refreshDiscounts();
                Materialize.toast('Discount removed.',1000);
            }else if(status == "ERROR"){
                $scope.closeDiscountModal();
                Materialize.toast('Error removing discount, Try later.',1000);
            }else if(status == "FAILED"){
                $rootScope.logout();
            }
        });
    };
    $scope.refreshDiscounts = function(){
        AdminFeeService.refreshDiscount($scope.openedFee.feeId,function(status,discounts){
            if(status == "SUCCESS"){
                $scope.openedFee.discounts = discounts;
            }else if(status == "ERROR"){
                $scope.closeDiscountModal();
                Materialize.toast('Error in refreshing discounts, Try later.',1000);
            }else if(status == "EMPTY"){
                $scope.openedFee.discounts = [];
            }else if(status == "FAILED"){
                $rootScope.logout();
            }
        });
    };
    $scope.filterSearchChanged = function(){
        if(!$scope.openedFee.filterText.replace(/\s/g, '').length){
            $scope.openedFee.feeTrans = $scope.openedFee.rootTrans;
            return;
        }
        $scope.queryString = $scope.openedFee.filterText;
        $timeout.cancel($scope.timer);
        $scope.trans = $scope.openedFee.rootTrans;
        $scope.timer = $timeout(function(){
            $scope.openedFee.feeTrans = [];
            for(var j=0;j<$scope.trans.length;j++){
                if($scope.trans[j].studentDetails.first_name != undefined || $scope.trans[j].studentDetails.first_name != null){
                    if($scope.trans[j].studentDetails.first_name.toLowerCase().indexOf($scope.queryString.toLowerCase()) > -1){
                        $scope.openedFee.feeTrans.push($scope.trans[j]);
                        continue;
                    }
                }if($scope.trans[j].studentDetails.last_name != undefined || $scope.trans[j].studentDetails.last_name != null){
                    if($scope.trans[j].studentDetails.last_name.toLowerCase().indexOf($scope.queryString.toLowerCase()) > -1){
                        $scope.openedFee.feeTrans.push($scope.trans[j]);
                        continue;
                    }
                }if($scope.trans[j].studentDetails.section_name != undefined || $scope.trans[j].studentDetails.section_name != null){
                    if($scope.trans[j].studentDetails.section_name.toLowerCase().indexOf($scope.queryString.toLowerCase()) > -1){
                        $scope.openedFee.feeTrans.push($scope.trans[j]);
                        continue;
                    }
                }if($scope.trans[j].userDetails.firstName != undefined || $scope.trans[j].userDetails.firstName != null){
                    if($scope.trans[j].userDetails.firstName.toLowerCase().indexOf($scope.queryString.toLowerCase()) > -1){
                        $scope.openedFee.feeTrans.push($scope.trans[j]);
                        continue;
                    }
                }if($scope.trans[j].userDetails.lastName != undefined || $scope.trans[j].userDetails.lastName != null){
                    if($scope.trans[j].userDetails.lastName.toLowerCase().indexOf($scope.queryString.toLowerCase()) > -1){
                        $scope.openedFee.feeTrans.push($scope.trans[j]);
                        continue;
                    }
                }if($scope.trans[j].transactionId != undefined || $scope.trans[j].transactionId != null){
                    if($scope.trans[j].transactionId.toLowerCase().indexOf($scope.queryString.toLowerCase()) > -1){
                        $scope.openedFee.feeTrans.push($scope.trans[j]);
                        continue;
                    }
                }if($scope.trans[j].mihpayid != undefined || $scope.trans[j].mihpayid != null){
                    if($scope.trans[j].mihpayid.toLowerCase().indexOf($scope.queryString.toLowerCase()) > -1){
                        $scope.openedFee.feeTrans.push($scope.trans[j]);
                        continue;
                    }
                }if($scope.trans[j].bank_ref_num != undefined || $scope.trans[j].bank_ref_num != null){
                    if($scope.trans[j].bank_ref_num.toLowerCase().indexOf($scope.queryString.toLowerCase()) > -1){
                        $scope.openedFee.feeTrans.push($scope.trans[j]);
                        continue;
                    }
                }if($scope.trans[j].amount != undefined || $scope.trans[j].amount != null){
                    if($scope.trans[j].amount.toString().toLowerCase().indexOf($scope.queryString.toLowerCase()) > -1){
                        $scope.openedFee.feeTrans.push($scope.trans[j]);
                        continue;
                    }
                }if($scope.trans[j].payuStatus != undefined || $scope.trans[j].payuStatus != null){
                    if($scope.trans[j].payuStatus.toLowerCase().indexOf($scope.queryString.toLowerCase()) > -1){
                        $scope.openedFee.feeTrans.push($scope.trans[j]);
                        continue;
                    }
                }
            }
        },300,true);
    };
    $scope.feeStatusChanged = function(){
        if($scope.openedFee.feeStatus == "ACTIVE"){
            $('#ActivateConfirmationModel').openModal({'dismissible':false},1);
        }else if($scope.openedFee.feeStatus == "INACTIVE"){
            $('#DeactivateConfirmationModel').openModal({'dismissible':false},1);
        }
    };
    $scope.deactivateFees = function(){
        $('#DeactivateConfirmationModel').closeModal();
        AdminFeeService.inActivateFees($scope.openedFee.feeId,function(status){
            if(status == "SUCCESS"){
                Materialize.toast('Fee deactivated',2000);
            }else if(status == "FAILED"){
                Materialize.toast('Session expired',2000);
                $rootScope.logout();
            }else{
                Materialize.toast('Trouble in deactivating fees, try again',2000);
            }
        });
    }
    $scope.deactivateCancel = function(){
        $('#DeactivateConfirmationModel').closeModal();
        $scope.openedFee.feeStatus = "ACTIVE";
    }
    $scope.activateFees = function(){
        $('#ActivateConfirmationModel').closeModal();
        AdminFeeService.activateFees($scope.openedFee.feeId,function(status){
            if(status == "SUCCESS"){
                Materialize.toast('Fee activated',2000);
            }else if(status == "FAILED"){
                Materialize.toast('Session expired',2000);
                $rootScope.logout();
            }else{
                Materialize.toast('Trouble in activating fees, try again',2000);
            }
        });
    }
    $scope.activateCancel = function(){
        $('#ActivateConfirmationModel').closeModal();
        $scope.openedFee.feeStatus = "INACTIVE";
    }

    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        showPreloader();
        $timeout($scope.init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    showPreloader();
                                    $timeout($scope.init,0,true);
                                });
    };
}]);

app.controller('aEditTemplateCtr', ['$http','$rootScope','AdminFeeService','$scope','$location','$timeout','deviceDetector','$routeParams',function ($http,$rootScope,AdminFeeService,$scope,$location,$timeout,deviceDetector,$routeParams) {
    showPreloader();
    $rootScope.AndroidText = 'Edit Template';
    $timeout(function(){
        $('li.active a.active').trigger('click.collapse');
        $('li.nav-li').removeClass('active');
        $('#createA').trigger("click.collapse");
        $('.admin-fees-li').addClass('active');
    },0,false);
    $scope.init = function(){
        $scope.newFee = {};
        AdminFeeService.getSavedTemplate($routeParams.templateId,function(status,template){
            if(status == "SUCCESS"){
                template[0].unFormattedFeeDueDate = new Date(template[0].unFormattedFeeDueDate);
                for(var i=0;i<template[0].terms.length;i++){
                    template[0].terms[i].unFormattedTermDueDate = new Date(template[0].terms[i].unFormattedTermDueDate);
                }
                $scope.newFee = template[0];
                $timeout(function(){
                    $('#EditTemplate label').addClass('active');
                    $('.tooltipped').tooltip();
                    $('.material-tooltip').hide();
                },0,false);
                hidePreloader();    
            }else if(status == "ERROR"){
                Materialize.toast('Error in fetching template, try again later.',1000);
                hidePreloader();
            }else if(status == "EMPTY"){
                Materialize.toast('Error in fetching template, try again later.',1000);
                hidePreloader();
            }else if(status == "FAILED"){
                $rootScope.logout();
            }
        });
    };
    $scope.divideIntoTerms = function(){
        $scope.showDivideTerms = false;
        $scope.enableEditFeeDueDate = false;
        $timeout(function(){
            $('#FeeAmount').attr('disabled','disabled');
        },0,true);

        var term1 = {};
        term1.termName = '';
        term1.termAmount = 10;
        term1.termDueDate = '';
        term1.unFormattedTermDueDate = new Date();
        term1.categories = [];
        term1.showDivideCat = true;

        var term2 = {};
        term2.termName = '';
        term2.termAmount = 10;
        term2.termDueDate = '';
        term2.unFormattedTermDueDate = new Date();
        term2.categories = [];
        term2.showDivideCat = true;

        $scope.newFee.terms.push(term1);
        $scope.newFee.terms.push(term2);
    };
    $scope.deleteAllTerms = function(){
        $scope.showDivideTerms = true;
        $scope.enableEditFeeDueDate = true;
        $timeout(function(){
            $('#FeeAmount').removeAttr('disabled');
        },0,true);
        $scope.newFee.terms = [];
        return;
    }
    $scope.createTerm = function(){
        var term = {};
        term.termName = '';
        term.termDueDate = '';
        term.unFormattedTermDueDate = new Date();
        term.termAmount = 10;
        term.categories = [];
        term.showDivideCat = true;
        $scope.newFee.terms.push(term);
    };
    $scope.createCat = function(index){
        var cat = {};
        cat.categoryAmount = 10;
        cat.categoryName='';
        $scope.newFee.terms[index].categories.push(cat);
    };
    $scope.categorize = function(index){
        $timeout(function(){
            $('#TermAmount'+index).attr('disabled','disabled');
        },0,true);
        var cat1 = {};
        cat1.categoryAmount = 10;
        cat1.categoryName='';
        $scope.newFee.terms[index].categories.push(cat1);

        var cat2 = {};
        cat2.categoryAmount = 10;
        cat2.categoryName='';
        $scope.newFee.terms[index].categories.push(cat2);
        $scope.newFee.terms[index].showDivideCat = false;
    }
    $scope.removeTerm = function(index){
        if($scope.newFee.terms.length == 2){
            $scope.newFee.terms = [];
            $scope.showDivideTerms = true;
            $scope.enableEditFeeDueDate = true;
            $timeout(function(){
                $('#FeeAmount').removeAttr('disabled');
            },0,true);
        }
        else{
            $scope.newFee.terms.splice(index,1);
        }
    };
    $scope.removeCat = function(parentIndex,index){
        if($scope.newFee.terms[parentIndex].categories.length == 2){
            $scope.newFee.terms[parentIndex].categories = [];
            $scope.newFee.terms[parentIndex].showDivideCat = true;
            $timeout(function(){
                $('#TermAmount'+parentIndex).removeAttr('disabled');
            },0,true);
        }
        else{
            $scope.newFee.terms[parentIndex].categories.splice(index,1);
        }
    };
    $scope.termDueDateChanged = function($index){
        if($scope.newFee.terms.length != 0){
            if($index == ($scope.newFee.terms.length-1)){
                $scope.newFee.unFormattedFeeDueDate = $scope.newFee.terms[$index].unFormattedTermDueDate;
                $scope.newFee.feeDueDate = moment($scope.newFee.unFormattedFeeDueDate).format('D/MM/YYYY');
            }
        }
    }
    $scope.termAmountChanged = function(){
        if($scope.newFee.terms.length != 0){
            $scope.newFee.feeAmount = parseFloat(0);
            for(var i=0;i<$scope.newFee.terms.length;i++){
                if(!isNaN(parseFloat($scope.newFee.terms[i].termAmount)))
                    $scope.newFee.feeAmount = parseFloat($scope.newFee.feeAmount)+parseFloat($scope.newFee.terms[i].termAmount);
            }
        }
    };
    $scope.catAmountChanged = function($parentIndex){
        if($scope.newFee.terms[$parentIndex].categories.length != 0){
            $scope.newFee.terms[$parentIndex].termAmount = parseFloat(0);
            for(var i=0;i<$scope.newFee.terms[$parentIndex].categories.length;i++){
                if(!isNaN(parseFloat($scope.newFee.terms[$parentIndex].categories[i].categoryAmount)))
                    $scope.newFee.terms[$parentIndex].termAmount = parseFloat($scope.newFee.terms[$parentIndex].termAmount)+parseFloat($scope.newFee.terms[$parentIndex].categories[i].categoryAmount);
            }
        }
        if($scope.newFee.terms.length != 0){
            $scope.newFee.feeAmount = parseFloat(0);
            for(var i=0;i<$scope.newFee.terms.length;i++){
                if(!isNaN(parseFloat($scope.newFee.terms[i].termAmount)))
                    $scope.newFee.feeAmount = parseFloat($scope.newFee.feeAmount)+parseFloat($scope.newFee.terms[i].termAmount);
            }
        }
    };
    $scope.saveFees = function(){
        var valid = true;
        if(!$scope.newFee.feeName.replace(/\s/g, '').length){
            var html = 'Fee name is mandatory';
            $('#FeeName-error,.errorNameFeeName').addClass('error');
            $('#FeeName-error').text(html);
            $('.errorNameFeeName').show();
            valid = false;
        }
        if($scope.newFee.terms.length == 0){
            var dueDate = $('#feeDueDate').val();
            var dueDateMoment = moment(dueDate,'D/MM/YYYY');
            if(moment().isAfter(dueDateMoment)){
                valid = false;
                var html = 'Due date cannotbe less or equal to current time.';
                $('#feeDueDate-error,.errorFeeDueDate').addClass('error');
                $('#feeDueDate-error').text(html);
                $('.errorNameFeeDueDate').show();
            }
            if($scope.newFee.feeAmount == undefined || $scope.newFee.feeAmount == null){
                valid = false;
                var html = 'Enter a valid fee amount.';
                $('#FeeAmount-error,.errorFeeAmount').addClass('error');
                $('#FeeAmount-error').text(html);
                $('.errorNameFeeAmount').show();
            }else if($scope.newFee.feeAmount < 10){
                valid = false;
                var html = 'Amount should be greater then or equal to 10.';
                $('#FeeAmount-error,.errorFeeAmount').addClass('error');
                $('#FeeAmount-error').text(html);
                $('.errorNameFeeAmount').show();
            }
        }
        if($scope.newFee.selected.length == 0){
            valid = false;
            var html = 'Select a class to save fees.';
            $('#ToClass-error,.errorNameToClass').addClass('error');
            $('#ToClass-error').text(html);
            $('.errorNameToClass').show();
        }
        if($scope.newFee.terms.length != 0){
            for(var i=0;i<$scope.newFee.terms.length;i++){
                if(!$scope.newFee.terms[i].termName.replace(/\s/g, '').length){
                    var html = 'Term name is mandatory';
                    $('#TermName'+i+'-error,.errorNameTermName'+i).addClass('error');
                    $('#TermName'+i+'-error').text(html);
                    $('.errorNameTermName'+i).show();
                    valid = false;
                }
                var termDueDate = $('#termDueDate'+i).val();
                var termDueDateMoment = moment(termDueDate,'D/MM/YYYY');
                if(moment().isAfter(termDueDateMoment)){
                    valid = false;
                    var html = 'Due date cannotbe less or equal to current time.';
                    $('#TermDueDate'+i+'-error,.errorNameTermDueDate'+i).addClass('error');
                    $('#TermDueDate'+i+'-error').text(html);
                    $('.errorNameTermDueDate'+i).show();
                }
                if($scope.newFee.terms[i].categories.length == 0){
                    if($scope.newFee.terms[i].termAmount == undefined || $scope.newFee.terms[i].termAmount == null){
                        valid = false;
                        var html = 'Enter a valid term amount.';
                        $('#TermAmount'+i+'-error,.errorNameTermAmount'+i).addClass('error');
                        $('#TermAmount'+i+'-error').text(html);
                        $('.errorNameTermAmount'+i).show();
                    }else if($scope.newFee.terms[i].termAmount < 10){
                        valid = false;
                        var html = 'Amount should be greater then or equal to 10.';
                        $('#TermAmount'+i+'-error,.errorNameTermAmount'+i).addClass('error');
                        $('#TermAmount'+i+'-error').text(html);
                        $('.errorNameTermAmount'+i).show();
                    }
                }
                if($scope.newFee.terms[i].categories.length != 0){
                    for(var j=0;j<$scope.newFee.terms[i].categories.length;j++){
                        if(!$scope.newFee.terms[i].categories[j].categoryName.replace(/\s/g, '').length){
                            var html = 'Category name is mandatory';
                            $('#CatName'+i+''+j+'-error,.errorNameCatName'+i+''+j).addClass('error');
                            $('#CatName'+i+''+j+'-error').text(html);
                            $('.errorNameCatName'+i+''+j).show();
                            valid = false;
                        }
                        if($scope.newFee.terms[i].categories[j].categoryAmount == undefined || $scope.newFee.terms[i].categories[j].categoryAmount == null){
                            valid = false;
                            var html = 'Enter a valid amount.';
                            $('#CatAmount'+i+''+j+'-error,.errorNameCatAmount'+i+''+j).addClass('error');
                            $('#CatAmount'+i+''+j+'-error').text(html);
                            $('.errorNameCatAmount'+i+''+j).show();
                        }else if($scope.newFee.terms[i].categories[j].categoryAmount < 10){
                            valid = false;
                            var html = 'Amount should be greater then or equal to 10.';
                            $('#CatAmount'+i+''+j+'-error,.errorNameCatAmount'+i+''+j).addClass('error');
                            $('#CatAmount'+i+''+j+'-error').text(html);
                            $('.errorNameCatAmount'+i+''+j).show();
                        }
                    }
                }
            }
        }
        if(valid){
            showPreloader();
            AdminFeeService.saveFees($scope.newFee,function(status){
                if(status == "SUCCESS"){
                    hidePreloader();
                    Materialize.toast('Fee Saved.',1000);
                }else if(status == "ERROR"){
                    hidePreloader();
                    Materialize.toast('Error saving fee, Try again.',1000);
                }else if(status == "FAILED"){
                    $rootScope.logout();
                }
            });
        }
    };

    $scope.saveAsTemplate = function(){
        AdminFeeService.saveFeeTemplate($scope.newFee,function(status,templateId){
            if(status == "SUCCESS"){
                $location.path('/edittemplate/'+templateId);
                Materialize.toast('Saved as template.',1000);
                hidePreloader();
            }else if(status == "ERROR"){
                hidePreloader();
                Materialize.toast('Error in saving template, try again later',1000);
            }else if(status == "FAILED"){
                $rootScope.logout();
            }
        });
    };

    $scope.updateTemplate = function(){
        AdminFeeService.updateTemplate($scope.newFee,function(status){
            if(status == "SUCCESS"){
                Materialize.toast('Template updated.',1000);
            }else if(status == "ERROR"){
                Materialize.toast('Error in updating template, try again later',1000);
            }else if(status == "FAILED"){
                $rootScope.logout();
            }
        });
    };

    $scope.classInputFocused = function(){
        $('.errorName').hide();
        if(!$scope.newFee.toClass.replace(/\s/g, '').length){
            $scope.newFee.hideDropDown = true;
            $scope.newFee.responseData = [];
            return false;
        }else{
            $scope.autoSuggestPopulate();
        }
    }

    $scope.autoSuggestPopulate = function(){
        var queryString = $scope.newFee.toClass;    
        $scope.timer = $timeout(function(){
            if($scope.newFee.selected.length>0){
                if(($scope.newFee.selected[0].id == -1) || ($scope.newFee.selected[0].id == "ALL")){
                    Materialize.toast('All classes are already added.',3000);
                    return false;
                }
            }
            AdminFeeService.getClasses(queryString,function(status,data){
                if(status=="SUCCESS"){
                    $scope.newFee.responseData=[];

                    if(queryString.toUpperCase() == 'ALL' || queryString.toUpperCase() == 'A' || queryString.toUpperCase() == 'AL'){
                        var responseObject = {};
                        responseObject.id=$scope.newFee.responseData.length;
                        responseObject.name = 'ALL';
                        responseObject.classId = -1;
                        responseObject.section = '';
                        responseObject.selected = false;
                        $scope.newFee.responseData.push(responseObject);
                        $scope.newFee.hideDropDown = false;
                    }
                    
                    
                    for(var i=0;i<data.length;i++){
                        var responseObject = {};
                        responseObject.id=$scope.newFee.responseData.length;
                        responseObject.name=data[i].className;
                        responseObject.classId = data[i].classId;
                        responseObject.section = '';
                        responseObject.type = "CLASS";
                        responseObject.selected = false;
                        $scope.newFee.responseData.push(responseObject);
                    }
                    $scope.newFee.hideDropDown = false;
                }else{
                    if(queryString.toUpperCase() == 'ALL' || queryString.toUpperCase() == 'A' || queryString.toUpperCase() == 'AL'){
                        $scope.newFee.responseData=[];
                        var responseObject = {};
                        responseObject.id=$scope.newFee.responseData.length;
                        responseObject.name = 'ALL';
                        responseObject.classId = -1;
                        responseObject.section = '';
                        responseObject.selected = false;
                        $scope.newFee.responseData.push(responseObject);
                        $scope.newFee.hideDropDown = false;
                    }else
                        return false;
                }
            });
        },200);
    };
    $scope.autoSuggestClicked = function(id){
        if($scope.newFee.responseData[id].selected)
            $scope.newFee.responseData[id].selected = false;
        else
            $scope.newFee.responseData[id].selected = true;
    };
    
    $scope.inputBlurred = function(){
        $scope.newFee.hideDropDown = true;
        $scope.newFee.responseData = [];
    };
    
    $scope.inputChanged = function($event){
        
        var keyCode = $event.keyCode;
        if (keyCode == '8' && $scope.newFee.toClass=='') {
            if ($scope.newFee.selected.length) {
                $scope.newFee.selected.pop();
            }
        }
        if(!$scope.newFee.toClass.replace(/\s/g, '').length){
            $scope.newFee.hideDropDown = true;
            $scope.newFee.responseData = [];
        }else{
            $scope.autoSuggestPopulate();
        }
        
    };
    
    $scope.autoSuggestSelected = function(){
        $timeout(function(){
            $('#to_class').focus();
        });
        $scope.newFee.hideDropDown = true;
        for(var mainLoop=0;mainLoop<$scope.newFee.responseData.length;mainLoop++){
            if($scope.newFee.responseData[mainLoop].selected){
                var id = mainLoop;
                var valid = true;
                if($scope.newFee.responseData[id].classId == -1){
                    $scope.newFee.selected  = [];
                    var selected = {};
                    selected.id = -1;
                    selected.name = 'ALL';
                    $scope.newFee.selected.push(selected);
                    $scope.newFee.toClass='';
                    $scope.newFee.responseData = [];
                    return false;
                }else{
                    for(var i=0;i<$scope.newFee.selected.length;i++){
                        if($scope.newFee.responseData[id].classId == $scope.newFee.selected[i].classId){
                            Materialize.toast($scope.newFee.responseData[id].name+' already added.',3000);
                            var valid = false;
                            break;
                        }
                    }
                    if(valid)
                        $scope.newFee.selected.push($scope.newFee.responseData[id]);
                }
            }
        }
        $scope.newFee.toClass='';
        $scope.newFee.responseData = [];
    };
    
    $scope.chipClosed = function($index){
        $scope.newFee.selected.splice($index,1);
    };

    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        showPreloader();
        $timeout($scope.init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    showPreloader();
                                    $timeout($scope.init,0,true);
                                });
    };
}]);

app.controller('aTemplateCtr', ['$http','$rootScope','AdminFeeService','$scope','$location','$timeout','deviceDetector','$routeParams',function ($http,$rootScope,AdminFeeService,$scope,$location,$timeout,deviceDetector,$routeParams) {
    showPreloader();
    $rootScope.AndroidText = 'Fee Template';
    $timeout(function(){
        $('li.active a.active').trigger('click.collapse');
        $('li.nav-li').removeClass('active');
        $('#createA').trigger("click.collapse");
        $('.admin-fees-li').addClass('active');
    },0,false);
    $scope.init = function(){
        AdminFeeService.getAllTemplates(function(status,templates){
            if(status == "SUCCESS"){
                for(var i=0;i<templates.length;i++){
                    if(templates[i].feeName == ''){
                        templates[i].templateName = 'Template '+i;
                    }else{
                        templates[i].templateName = templates[i].feeName;
                    }
                }
                $scope.templates = templates;
                $timeout(function(){
                    $('.tooltipped').tooltip();
                    $('.material-tooltip').hide();
                },0,false);
                hidePreloader();    
            }else if(status == "ERROR"){
                Materialize.toast('Error in fetching templates, try again later.',1000);
                hidePreloader();
            }else if(status == "EMPTY"){
                Materialize.toast('No templates saved.',1000);
                hidePreloader();
            }else if(status == "FAILED"){
                $rootScope.logout();
            }
        });
    };
    $scope.deleteTemplateClicked = function(templateId,$index){
        AdminFeeService.deleteTemplate(templateId,function(status){
            if(status == "SUCCESS"){
                $scope.templates.splice($index,1);
                Materialize.toast('Template deleted successfully.',1000);
            }else if(status == "ERROR"){
                Materialize.toast('Error in deleting template.',1000);
            }else if(status == "FAILED"){
                $rootScope.logout();
            }
        });
    }
    $scope.templateClicked = function(templateId){
        $location.path('/edittemplate/'+templateId);
    }

    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        showPreloader();
        $timeout($scope.init,0,true);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    showPreloader();
                                    $timeout($scope.init,0,true);
                                });
    };
}]);