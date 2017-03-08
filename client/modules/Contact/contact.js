app.factory('InboxAjaxService',['$http','$rootScope',function($http,$rootScope){
    var InboxAjaxServices = {};
    InboxAjaxServices.resetMailVariables = function(){

    };
    InboxAjaxServices.getInboxMails = function(callback){
        var url=$rootScope.baseUrl+ '/api/UserEmails/bUserEmails?schoolId='+$rootScope.schooldetails.schoolId+'&studentId='+$rootScope.userDetails.student.loginId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    InboxAjaxServices.createMail = function(data,callback){
        var url=$rootScope.baseUrl+ '/api/Emails/CreateEmail';
        var d = {};
        d.requestData = data;
        $http({
            method: 'POST',
            url: url,
            data:d
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    InboxAjaxServices.createReplay = function(data,callback){
        var url=$rootScope.baseUrl+ '/api/Emails/CreateReplay';
        var d = {};
        d.requestData = data;
        $http({
            method: 'POST',
            url: url,
            data:d
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    InboxAjaxServices.saveAsDraft = function(data,callback){
        var url=$rootScope.baseUrl+ '/api/Emails/SaveDraft';
        var d = {};
        d.requestData = JSON.stringify(d);
        $http({
            method: 'POST',
            url: url,
            data:d
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    InboxAjaxServices.getDraftMails = function(callback){
        var url=$rootScope.baseUrl+ '/api/UserEmails/bUserDrafts?schoolId='+$rootScope.schooldetails.schoolId+'&studentId='+$rootScope.userDetails.student.loginId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    InboxAjaxServices.getSentMails = function(callback){
        var url=$rootScope.baseUrl+ '/api/UserEmails/bUserSentItems?schoolId='+$rootScope.schooldetails.schoolId+'&studentId='+$rootScope.userDetails.student.loginId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    InboxAjaxServices.getClasses = function(qs,callback){
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
    InboxAjaxServices.getSections = function(qs,callback){
        var url=$rootScope.baseUrl+ '/api/Sections/bQuerySections?queryString='+qs+'&schoolId='+$rootScope.schooldetails.schoolId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    }; 
    InboxAjaxServices.getTeachers = function(qs,callback){
        var url=$rootScope.baseUrl+ '/api/Teachers/bQueryTeachers?queryString='+qs+'&schoolId='+$rootScope.schooldetails.schoolId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    }; 
    InboxAjaxServices.getStudents = function(qs,callback){
        var url=$rootScope.baseUrl+ '/api/Students/bQueryStudents?queryString='+qs+'&schoolId='+$rootScope.schooldetails.schoolId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var status = response.data.returnStatus;
            var students = response.data.responseData;
            var responseData = {};
            responseData.classes = [];
            responseData.sections = [];
            responseData.students = [];
            if(status == "SUCCESS"){ 
                responseData.students = students;
            }
            InboxAjaxServices.getClasses(qs,function(classStatus,clas){
                if(classStatus == "SUCCESS"){
                    responseData.classes = clas;
                    status = classStatus;
                }
                InboxAjaxServices.getSections(qs,function(sectionStatus,sections){
                    if(sectionStatus == "SUCCESS"){
                        responseData.sections = sections;
                        status = sectionStatus;
                    }
                    callback(status,responseData);
                });
            });
        },function errorCallback(response) {
            callback("ERROR");  
        });
    }; 

    InboxAjaxServices.getAdmins = function(qs,callback){
        var url=$rootScope.baseUrl+ '/api/Admins/bQueryAdmins?queryString='+qs+'&schoolId='+$rootScope.schooldetails.schoolId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    InboxAjaxServices.updateReadStatus = function(mailId,callback){
        var url=$rootScope.baseUrl+ '/api/UserEMails/bMarkAsRead?schoolId='+$rootScope.schooldetails.schoolId+'&studentId='+$rootScope.userDetails.student.loginId+'&mailId='+mailId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    InboxAjaxServices.getSchoolConfig = function(callback){
        var url=$rootScope.baseUrl+ '/api/SchoolConfigs/bGetSchoolConfig?schoolId='+$rootScope.schooldetails.schoolId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
        
    return InboxAjaxServices;
}]);

app.controller('createMailController',['$rootScope','$scope','InboxAjaxService','$timeout','Upload',function($rootScope,$scope,InboxAjaxService,$timeout,Upload){
    $scope.closeMail = function(){
        $('#createMailModel').closeModal();
        $scope.$emit('refreshMail');
    };
    $scope.options = {
        toolbar: [
                ['edit',['undo','redo']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['alignment', ['ul', 'ol']],
            ],
        placeholder: 'Write Message,Drag and Drop Images or attach files.. ',
        toolbarContainer : '.delimage'
    };
    
    
    $scope.draftMail= function(){
        $('#createMailModel').closeModal();
        $scope.$emit('refreshMail');
    };
    
    $scope.stripHtml = function(html)
    {
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       return tmp.textContent || tmp.innerText || "";
    }
    
    $scope.sendMail = function(){
        var text_content = $scope.stripHtml($scope.emailContentModel);
        var userSelected = false;
        for(var j=0;j<$scope.toEmails.length;j++){
            if($scope.toEmails[j].selected.length != 0){
                userSelected=true;
                break;
            }
        }
        if(!userSelected){
            Materialize.toast('Please select a user to send notification',2000);
            return false;
        }
        if(!$scope.emailSubject.replace(/\s/g, '').length){
            Materialize.toast('Email Subject can not be empty',2000);
            return false;
        }
        var data = {
                        
                        'email_text_content':text_content,
                        'to_user_name' : $scope.toEmails,
                        'email_subject' : $scope.emailSubject,
                        'email_content' : $scope.emailContentModel,
                        'from_first_name' : $rootScope.userDetails.firstName,
                        'from_last_name' : $rootScope.userDetails.lastName,
                        'email_attachments':$scope.files,
                        'studentId':$rootScope.userDetails.student.loginId,
                        'schoolId':$rootScope.schooldetails.schoolId
        }
        $('#createMailModel').closeModal();
        $rootScope.displayPreloaderToast('Mail Sending..',true);
        var url=$rootScope.baseUrl+ '/api/Emails/uploadAttachment';
        Upload.upload({
            url: url,
            arrayKey:'',
            data:{file:$scope.uploadFiles}
        }).then(function(response) {
            if(response.data.returnStatus == 'SUCCESS'){
                data.emailId = response.data.emailId;
                InboxAjaxService.createMail(data,function(status){
                    if(status == "SUCCESS"){
                        $rootScope.displayPreloaderToast('Mail Sent',false,3000);
                    }else{
                        $rootScope.displayPreloaderToast('Mail Not Sent',false,3000);
                    }
                    $scope.$emit('refreshMail');
                });
            }else{
                $rootScope.displayPreloaderToast('Mail Not Sent',false,3000);
                $scope.$emit('refreshMail');
            }
        }, function(response) {
                $rootScope.displayPreloaderToast('Mail Not Sent',false,3000);
                $scope.$emit('refreshMail');
        });
    };
    
    $scope.$on('composeMail',function(event,args){
        $scope.emailSubject='';
        $('#createMailModel').openModal({dismissible: false},1);
        $timeout(function(){
            $('#composeMail').summernote('reset');
        },0,true);
        $scope.init();
    });
    $scope.init = function(){
        $scope.toEmails = [];
        $scope.queryString = '';
        var toEmail = {};
        $scope.files=[];
        $scope.uploadFiles=[];
        InboxAjaxService.getSchoolConfig(function(status,data){
            if(status=="SUCCESS"){
                if($rootScope.userDetails.userType == "STUDENT"){
                    toEmail.options = data[0].mailConfig.students;
                }else if($rootScope.userDetails.userType == "TEACHER"){
                    toEmail.options = data[0].mailConfig.teachers;
                }else if($rootScope.userDetails.userType == "ADMIN"){
                    toEmail.options = ['Students','Parents','Teachers'];
                }else if($rootScope.userDetails.userType == "PARENT"){
                    toEmail.options = data[0].mailConfig.parents;
                } 
            }else{ 
                if($rootScope.userDetails.userType == "STUDENT"){
                    toEmail.options = ['Teachers','Admin'];
                }else if($rootScope.userDetails.userType == "TEACHER"){
                    toEmail.options = ['Students','Parents'];
                }else if($rootScope.userDetails.userType == "ADMIN"){
                    toEmail.options = ['Students','Parents','Teachers'];
                }else if($rootScope.userDetails.userType == "Others"){
                    toEmail.options = ['Students','Parents','Teachers'];
                }else if($rootScope.userDetails.userType == "PARENT"){
                    toEmail.options = ['Admin','Teachers'];
                }
            }
            toEmail.showAddEmailButton = true;
            toEmail.showDeleteEmailButton= false;
            toEmail.hideDropDown=true;
            toEmail.selected=[];
            toEmail.responseData = [];
            toEmail.index = 0;
            toEmail.toUsers='';
            toEmail.userType = toEmail.options[0];
            $scope.toEmails.push(toEmail);
            $timeout(function () { 
              $('select').material_select();
            }, 0, false);
        });
    }; 
    $scope.selectChanged = function($index){
        $scope.toEmails[$index].hideDropDown = true;
        $scope.toEmails[$index].responseData = [];
        $scope.toEmails[$index].selected=[];
    };
    $scope.inputFocused = function($index){
        if(!$scope.toEmails[$index].toUsers.replace(/\s/g, '').length){
            $scope.toEmails[$index].hideDropDown = true;
            $scope.toEmails[$index].responseData = [];
            return false;
        }else{
            $scope.autoSuggestPopulate($index);
        }
    };
    $scope.inputBlurred = function($index){
        console.log('input blurred '+$index);
        $scope.toEmails[$index].hideDropDown = true;
        $scope.toEmails[$index].responseData = [];
    };
    $scope.inputChanged = function($event,$index){
        var keyCode = $event.keyCode;
        if(!$scope.toEmails[$index].toUsers.replace(/\s/g, '').length){
            $scope.toEmails[$index].hideDropDown = true;
            $scope.toEmails[$index].responseData = [];
            return;
        }
        //BACKSPACE KEY
        if (keyCode == '8' && $scope.toEmails[$index].toUsers=='') {
            if (!$scope.toEmails[$index].selected.length) {
                return true;
            }
            $scope.toEmails[$index].selected.pop();
            return false;
        }
        $scope.autoSuggestPopulate($index);
    };

    $scope.autoSuggestPopulate = function($index){

        $scope.queryString = $scope.toEmails[$index].toUsers;
        $timeout.cancel($scope.timer);
        $scope.timer = $timeout(function(){
            if($scope.toEmails[$index].userType == "Students"){
                        
                for(var i=0;i<$scope.toEmails.length;i++){
                    if($scope.toEmails[i].userType == "Students"){
                        if($scope.toEmails[i].selected.length>0){
                            if(($scope.toEmails[i].selected[0].id == -1) || ($scope.toEmails[i].selected[0].name == "ALL")){
                                Materialize.toast('All students are already added.',3000);
                                return false;
                            }
                        }
                    }
                }
                        
                InboxAjaxService.getStudents($scope.queryString,function(status,data){
                    if(status=="SUCCESS"){
                        $scope.toEmails[$index].responseData=[];

                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.studentId = -1;
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                            $scope.toEmails[$index].hideDropDown = false;
                        }

                        for(var j=0;j<data.classes.length;j++){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name=data.classes[j].className;
                            responseObject.classId = data.classes[j].classId;
                            responseObject.type = "CLASS"
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                        }

                        for(var k=0;k<data.sections.length;k++){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name=data.sections[k].sectionName;
                            responseObject.type = "SECTION"
                            responseObject.sectionId = data.sections[k].sectionId;
                            responseObject.classId = data.sections[k].classId;
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                        }
                        
                        for(var i=0;i<data.students.length;i++){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name=data.students[i].first_name+' '+data.students[i].last_name;
                            responseObject.firstName = data.students[i].first_name;
                            responseObject.lastName = data.students[i].last_name;
                            responseObject.userId = data.students[i].student_id;
                            responseObject.userType='STUDENT';
                            responseObject.userName = data.students[i].user_name;
                            responseObject.emailId = data.students[i].student_email_id;
                            responseObject.studentId = data.students[i].student_id;
                            responseObject.class = data.students[i].class_name;
                            responseObject.section = data.students[i].section_name;
                            responseObject.phoneNumber = data.students[i].phone_number;
                            responseObject.sectionId = data.students[i].section_id;
                            responseObject.classId = data.students[i].class_id;
                            responseObject.type = "STUDENT";
                            responseObject.selected = false;
                            //responseObject.dataObject = data[i];
                            $scope.toEmails[$index].responseData.push(responseObject);
                        }


                        $scope.toEmails[$index].hideDropDown = false;
                    }else{
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            $scope.toEmails[$index].responseData=[];
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.studentId = -1;
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                            $scope.toEmails[$index].hideDropDown = false;
                        }else
                            return false;
                    }
                });
            }else if($scope.toEmails[$index].userType == "Parents"){
                        
                for(var i=0;i<$scope.toEmails.length;i++){
                    if($scope.toEmails[i].userType == "Parents"){
                        if($scope.toEmails[i].selected.length>0){
                            if(($scope.toEmails[i].selected[0].id == -1) || ($scope.toEmails[i].selected[0].id == "ALL")){
                                Materialize.toast('Parents of all students are already added.',3000);
                                return false;
                            }
                        }
                    }
                }


                        
                InboxAjaxService.getStudents($scope.queryString,function(status,data){
                    if(status=="SUCCESS"){
                        $scope.toEmails[$index].responseData=[];
                                
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.studentId = -1;
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                            $scope.toEmails[$index].hideDropDown = false;
                        }
                    
                        for(var j=0;j<data.classes.length;j++){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name=data.classes[j].className;
                            responseObject.classId = data.classes[j].classId;
                            responseObject.type = "CLASS"
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                        }

                        for(var k=0;k<data.sections.length;k++){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name=data.sections[k].sectionName;
                            responseObject.type = "SECTION"
                            responseObject.sectionId = data.sections[k].sectionId;
                            responseObject.classId = data.sections[k].classId;
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                        }
                        
                        for(var i=0;i<data.students.length;i++){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name=data.students[i].first_name+' '+data.students[i].last_name;
                            responseObject.firstName = data.students[i].first_name;
                            responseObject.lastName = data.students[i].last_name;
                            responseObject.userId = data.students[i].student_id;
                            responseObject.userType='STUDENT';
                            responseObject.userName = data.students[i].user_name;
                            responseObject.emailId = data.students[i].student_email_id;
                            responseObject.studentId = data.students[i].student_id;
                            responseObject.class = data.students[i].class_name;
                            responseObject.section = data.students[i].section_name;
                            responseObject.phoneNumber = data.students[i].phone_number;
                            responseObject.sectionId = data.students[i].section_id;
                            responseObject.classId = data.students[i].class_id;
                            responseObject.type = "STUDENT";
                            responseObject.selected = false;
                            //responseObject.dataObject = data[i];
                            $scope.toEmails[$index].responseData.push(responseObject);
                        }

                        $scope.toEmails[$index].hideDropDown = false;
                    }else{
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            $scope.toEmails[$index].responseData=[];
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.parentId = -1;
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                            $scope.toEmails[$index].hideDropDown = false;
                        }else
                            return false;
                    }
                });
            }else if($scope.toEmails[$index].userType == "Teachers"){
                        
                for(var i=0;i<$scope.toEmails.length;i++){
                    if($scope.toEmails[i].userType == "Teachers"){
                        if($scope.toEmails[i].selected.length>0){
                            if(($scope.toEmails[i].selected[0].id == -1) || ($scope.toEmails[i].selected[0].id == "ALL")){
                                Materialize.toast('All teachers are already added.',3000);
                                return false;
                            }
                        }
                    }
                }
                        
                InboxAjaxService.getTeachers($scope.queryString,function(status,data){
                    if(status=="SUCCESS"){
                        $scope.toEmails[$index].responseData=[];
                                
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.teacherId = -1;
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                            $scope.toEmails[$index].hideDropDown = false;
                        }    
                                
                        for(var i=0;i<data.length;i++){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name=data[i].first_name+' '+data[i].last_name;
                            responseObject.firstName = data[i].first_name;
                            responseObject.lastName = data[i].last_name;
                            responseObject.teacherId = data[i].teacher_id;
                            responseObject.userId = data[i].teacher_id;
                            responseObject.userType='TEACHER';
                            responseObject.userName = data[i].user_name;
                            responseObject.emailId = data[i].email_id;
                            responseObject.section = '';
                            responseObject.phone = data[i].phone;
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                        }
                        $scope.toEmails[$index].hideDropDown = false;
                    }else{
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            $scope.toEmails[$index].responseData=[];
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.teacherId = -1;
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                            $scope.toEmails[$index].hideDropDown = false;
                        }else
                            return false;
                    }
                });
            }else if($scope.toEmails[$index].userType == "Admin"){
                        
                for(var i=0;i<$scope.toEmails.length;i++){
                    if($scope.toEmails[i].userType == "Admin"){
                        if($scope.toEmails[i].selected.length>0){
                            if(($scope.toEmails[i].selected[0].id == -1) || ($scope.toEmails[i].selected[0].id == "ALL")){
                                Materialize.toast('All teachers are already added.',3000);
                                return false;
                            }
                        }
                    }
                }
                
                InboxAjaxService.getAdmins($scope.queryString,function(status,data){
                    if(status=="SUCCESS"){
                        $scope.toEmails[$index].responseData=[];
                                
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.studentId = -1;
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                            $scope.toEmails[$index].hideDropDown = false;
                        }
                                
                        for(var i=0;i<data.length;i++){
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name=data[i].first_name+' '+data[i].last_name;
                            responseObject.firstName = data[i].first_name;
                            responseObject.lastName = data[i].last_name;
                            responseObject.adminId = data[i].admin_id;
                            responseObject.userId = data[i].admin_id;
                            responseObject.userType='ADMIN';
                            responseObject.userName = data[i].user_name;
                            responseObject.emailId = data[i].email_id;
                            responseObject.section = '';
                            responseObject.selected = false;
                            responseObject.phone = data[i].phone;
                            $scope.toEmails[$index].responseData.push(responseObject);
                        }
                        $scope.toEmails[$index].hideDropDown = false;
                    }else{
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            $scope.toEmails[$index].responseData=[];
                            var responseObject = {};
                            responseObject.id=$scope.toEmails[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.adminId = -1;
                            responseObject.section = '';
                            responseObject.selected = false;
                            $scope.toEmails[$index].responseData.push(responseObject);
                            $scope.toEmails[$index].hideDropDown = false;
                        }else
                            return false;
                    }
                });
            }else if($scope.toEmails[$index].userType == "Others"){
            }       
        },200);
    };


    $scope.autoSuggestSelected = function($index){
        //console.log('input blurred '+$index);
        $timeout(function(){
            $('#to_email').focus();
        });
        $scope.toEmails[$index].hideDropDown = true;
        for(var mainLoop=0;mainLoop<$scope.toEmails[$index].responseData.length;mainLoop++){
            if($scope.toEmails[$index].responseData[mainLoop].selected){
                var id = mainLoop;
                var valid = true;
                if($scope.toEmails[$index].userType == "Students"){
                    if($scope.toEmails[$index].responseData[id].studentId == -1){
                        var spliceVariales = [];
                        $scope.toEmails[$index].selected = [];
                        for(var j=($scope.toEmails.length-1);j>=0;j--){
                            if($scope.toEmails[j].userType == "Students"){
                                $scope.toEmails[j].selected  = [];
                                //$scope.toEmails.splice(j,1);
                            }
                        }
                        $scope.toEmails[$index].selected  = [];
                        var selected = {};
                        selected.id = -1;
                        selected.name = 'ALL';
                        $scope.toEmails[$index].selected.push(selected);
                        $scope.toEmails[$index].toUsers='';
                        $scope.toEmails[$index].responseData = [];
                        return false;
                    }else{
                        if($scope.toEmails[$index].responseData[id].type == "STUDENT"){
                            for(var j=0;j<$scope.toEmails.length;j++){
                                if($scope.toEmails[j].userType == "Students"){
                                    for(var i=0;i<$scope.toEmails[j].selected.length;i++){
                                        if($scope.toEmails[j].selected[i].type == "CLASS"){
                                            if($scope.toEmails[j].selected[i].classId == $scope.toEmails[$index].responseData[id].classId){
                                                Materialize.toast($scope.toEmails[j].selected[i].name+' already added.',3000);
                                                valid = false;
                                                break;
                                                //return false;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "SECTION"){
                                            if($scope.toEmails[j].selected[i].sectionId == $scope.toEmails[$index].responseData[id].sectionId){
                                                Materialize.toast($scope.toEmails[j].selected[i].name+' already added.',3000);
                                                valid = false;
                                                break;
                                                //return false;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "STUDENT"){
                                            if($scope.toEmails[j].selected[i].studentId == $scope.toEmails[$index].responseData[id].studentId){
                                                Materialize.toast($scope.toEmails[j].selected[i].name+' already added.',3000);
                                                valid = false;
                                                break;
                                                //return false;
                                            }
                                        }
                                    }
                                    if(!valid)
                                        break;
                                }
                            }
                        }else if($scope.toEmails[$index].responseData[id].type == "SECTION"){
                            for(var j=0;j<$scope.toEmails.length;j++){
                                if($scope.toEmails[j].userType == "Students"){
                                    for(var i=($scope.toEmails[j].selected.length - 1);i>=0;i--){
                                        if($scope.toEmails[j].selected[i].type == "CLASS"){
                                            if($scope.toEmails[j].selected[i].classId == $scope.toEmails[$index].responseData[id].classId){
                                                Materialize.toast($scope.toEmails[j].selected[i].name+' already added.',3000);
                                                valid = false;
                                                break;
                                                //return false;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "SECTION"){
                                            if($scope.toEmails[j].selected[i].sectionId == $scope.toEmails[$index].responseData[id].sectionId){
                                                Materialize.toast($scope.toEmails[j].selected[i].name+' already added.',3000);
                                                valid = false;
                                                break;
                                                //return false;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "STUDENT"){
                                            if($scope.toEmails[j].selected[i].sectionId == $scope.toEmails[$index].responseData[id].sectionId){
                                                var temp = $scope.toEmails[j].selected;
                                                temp.splice(i,1);
                                                $scope.toEmails[j].selected = temp;
                                            }
                                        }
                                    }
                                    if(!valid)
                                        break;
                                }
                            }
                        }else if($scope.toEmails[$index].responseData[id].type == "CLASS"){
                            for(var j=0;j<$scope.toEmails.length;j++){
                                if($scope.toEmails[j].userType == "Students"){
                                    for(var i=($scope.toEmails[j].selected.length - 1);i>=0;i--){
                                        if($scope.toEmails[j].selected[i].type == "CLASS"){
                                            if($scope.toEmails[j].selected[i].classId == $scope.toEmails[$index].responseData[id].classId){
                                                Materialize.toast($scope.toEmails[$index].responseData[id].name+' already added.',3000);
                                                valid = false;
                                                break;
                                                //return false;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "SECTION"){
                                            if($scope.toEmails[j].selected[i].classId == $scope.toEmails[$index].responseData[id].classId){
                                                var temp = $scope.toEmails[j].selected;
                                                temp.splice(i,1);
                                                $scope.toEmails[j].selected = temp;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "STUDENT"){
                                            if($scope.toEmails[j].selected[i].classId == $scope.toEmails[$index].responseData[id].classId){
                                                var temp = $scope.toEmails[j].selected;
                                                temp.splice(i,1);
                                                $scope.toEmails[j].selected = temp;   
                                            }
                                        }
                                    }
                                    if(!valid)
                                        break;
                                }
                            }
                        }
                    }
                }

                else if($scope.toEmails[$index].userType == "Parents"){
                    if($scope.toEmails[$index].responseData[id].studentId == -1){
                        var spliceVariales = [];
                        for(var j=($scope.toEmails.length-1);j>=0;j--){
                            if($scope.toEmails[j].userType == "Parents"){
                                $scope.toEmails[j].selected  = [];
                                // var temp = $scope.toEmails;
                                // temp = temp.splice(j,1);
                                // $scope.toEmails = temp;
                            }
                        }
                        $scope.toEmails[$index].selected  = [];
                        var selected = {};
                        selected.id = -1;
                        selected.name = 'ALL';
                        $scope.toEmails[$index].selected.push(selected);
                        $scope.toEmails[$index].toUsers='';
                        $scope.toEmails[$index].responseData = [];
                        return false;
                    }else{
                        if($scope.toEmails[$index].responseData[id].type == "STUDENT"){
                            for(var j=0;j<$scope.toEmails.length;j++){
                                if($scope.toEmails[j].userType == "Parents"){
                                    for(var i=0;i<$scope.toEmails[j].selected.length;i++){
                                        if($scope.toEmails[j].selected[i].type == "CLASS"){
                                            if($scope.toEmails[j].selected[i].classId == $scope.toEmails[$index].responseData[id].classId){
                                                Materialize.toast($scope.toEmails[j].selected[i].name+' already added.',3000);
                                                valid = false;
                                                break;
                                                //return false;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "SECTION"){
                                            if($scope.toEmails[j].selected[i].sectionId == $scope.toEmails[$index].responseData[id].sectionId){
                                                Materialize.toast($scope.toEmails[j].selected[i].name+' already added.',3000);
                                                valid = false;
                                                break
                                                //return false;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "STUDENT"){
                                            if($scope.toEmails[j].selected[i].studentId == $scope.toEmails[$index].responseData[id].studentId){
                                                Materialize.toast($scope.toEmails[j].selected[i].name+' already added.',3000);
                                                valid = false;
                                                break;
                                                //return false;
                                            }
                                        }
                                    }
                                    if(!valid)
                                        break;
                                }
                            }
                        }else if($scope.toEmails[$index].responseData[id].type == "SECTION"){
                            for(var j=0;j<$scope.toEmails.length;j++){
                                if($scope.toEmails[j].userType == "Parents"){
                                    for(var i=($scope.toEmails[j].selected.length - 1);i>=0;i--){
                                        if($scope.toEmails[j].selected[i].type == "CLASS"){
                                            if($scope.toEmails[j].selected[i].classId == $scope.toEmails[$index].responseData[id].classId){
                                                Materialize.toast($scope.toEmails[j].selected[i].name+' already added.',3000);
                                                valid = false;
                                                break;
                                                //return false;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "SECTION"){
                                            if($scope.toEmails[j].selected[i].sectionId == $scope.toEmails[$index].responseData[id].sectionId){
                                                Materialize.toast($scope.toEmails[j].selected[i].name+' already added.',3000);
                                                valid = false;
                                                break;
                                                //return false;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "STUDENT"){
                                            if($scope.toEmails[j].selected[i].sectionId == $scope.toEmails[$index].responseData[id].sectionId){
                                                var temp = $scope.toEmails[j].selected;
                                                temp.splice(i,1);
                                                $scope.toEmails[j].selected = temp;
                                            }
                                        }
                                    }
                                    if(!valid)
                                        break;
                                }
                            }
                        }else if($scope.toEmails[$index].responseData[id].type == "CLASS"){
                            for(var j=0;j<$scope.toEmails.length;j++){
                                if($scope.toEmails[j].userType == "Parents"){
                                    for(var i=($scope.toEmails[j].selected.length - 1);i>=0;i--){
                                        if($scope.toEmails[j].selected[i].type == "CLASS"){
                                            if($scope.toEmails[j].selected[i].classId == $scope.toEmails[$index].responseData[id].classId){
                                                Materialize.toast($scope.toEmails[$index].responseData[id].name+' already added.',3000);
                                                valid = false;
                                                break;
                                                //return false;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "SECTION"){
                                            if($scope.toEmails[j].selected[i].classId == $scope.toEmails[$index].responseData[id].classId){
                                                var temp = $scope.toEmails[j].selected;
                                                temp.splice(i,1);
                                                $scope.toEmails[j].selected = temp;
                                            }
                                        }else if($scope.toEmails[j].selected[i].type == "STUDENT"){
                                            if($scope.toEmails[j].selected[i].classId == $scope.toEmails[$index].responseData[id].classId){
                                                var temp = $scope.toEmails[j].selected;
                                                temp.splice(i,1);
                                                $scope.toEmails[j].selected = temp;   
                                            }
                                        }
                                    }
                                    if(!valid)
                                        break;
                                }
                            }
                        }
                    }
                }

 
                else if($scope.toEmails[$index].userType == "Teachers"){
                    if($scope.toEmails[$index].responseData[id].teacherId == -1){
                        var spliceVariales = [];
                        for(var j=($scope.toEmails.length-1);j>=0;j--){
                            if($scope.toEmails[j].userType == "Teachers"){
                                $scope.toEmails[j].selected  = [];
                            }
                        }
                        $scope.toEmails[$index].selected  = [];
                        var selected = {};
                        selected.id = -1;
                        selected.name = 'ALL';
                        $scope.toEmails[$index].selected.push(selected);
                        $scope.toEmails[$index].toUsers='';
                        $scope.toEmails[$index].responseData = [];
                        return false;
                    }else{
                        for(var j=0;j<$scope.toEmails.length;j++){
                            if($scope.toEmails[j].userType == "Teachers"){
                                for(var i=0;i<$scope.toEmails[j].selected.length;i++){
                                    if($scope.toEmails[$index].responseData[id].teacherId == $scope.toEmails[j].selected[i].teacherId){
                                        Materialize.toast($scope.toEmails[$index].responseData[id].name+' already added.',3000);
                                        valid = false;
                                        break;
                                        //return false;
                                    }
                                }
                                if(!valid)
                                    break;
                            }
                        }
                    }
                }
                
                
                else if($scope.toEmails[$index].userType == "Admin"){
                    if($scope.toEmails[$index].responseData[id].adminId == -1){
                        var spliceVariales = [];
                        for(var j=($scope.toEmails.length-1);j>=0;j--){
                            if($scope.toEmails[j].userType == "Admin"){
                                $scope.toEmails[j].selected  = [];
                            }
                        }
                        $scope.toEmails[$index].selected  = [];
                        var selected = {};
                        selected.id = -1;
                        selected.name = 'ALL';
                        $scope.toEmails[$index].selected.push(selected);
                        $scope.toEmails[$index].toUsers='';
                        $scope.toEmails[$index].responseData = [];
                        return false;
                    }else{
                        for(var j=0;j<$scope.toEmails.length;j++){
                            if($scope.toEmails[j].userType == "Admin"){
                                for(var i=0;i<$scope.toEmails[j].selected.length;i++){
                                    if($scope.toEmails[$index].responseData[id].adminId == $scope.toEmails[j].selected[i].adminId){
                                        Materialize.toast($scope.toEmails[$index].responseData[id].name+' already added.',3000);
                                        valid = false;
                                        break;
                                        //return false;
                                    }
                                }
                                if(!valid)
                                    break;
                            }   
                        }
                    }
                }
                
                
                else if($scope.toEmails[$index].userType == "Others"){
                }

                if(valid){
                    $scope.toEmails[$index].selected.push($scope.toEmails[$index].responseData[id]);
                }
            }
        }
        $scope.toEmails[$index].toUsers='';
        $scope.toEmails[$index].responseData = [];
    };
    $scope.autoSuggestClicked = function(id,$index){
        if($scope.toEmails[$index].responseData[id].selected)
            $scope.toEmails[$index].responseData[id].selected = false;
        else
            $scope.toEmails[$index].responseData[id].selected = true;
    };
    
    
    $scope.chipClosed = function($parentIndex,$index){
        $scope.toEmails[$parentIndex].selected.splice($index,1);
    };

    $scope.removeToEmail = function($index){
        $scope.toEmails.splice($index,1);
    }
        
    $scope.addToEmail = function($index){
        var toEmail = {};
        $scope.toEmails[$index].showAddEmailButton = false;
        $scope.toEmails[$index].showDeleteEmailButton = true;
        InboxAjaxService.getSchoolConfig(function(status,data){
            if(status=="SUCCESS"){
                if($rootScope.userDetails.userType == "STUDENT"){
                    toEmail.options = data[0].mailConfig.students;
                }else if($rootScope.userDetails.userType == "TEACHER"){
                    toEmail.options = data[0].mailConfig.teachers;
                }else if($rootScope.userDetails.userType == "ADMIN"){
                    toEmail.options = ['Students','Parents','Teachers'];
                }else if($rootScope.userDetails.userType == "PARENT"){
                    toEmail.options = data[0].mailConfig.parents;
                } 
            }else{ 
                if($rootScope.userDetails.userType == "STUDENT"){
                    toEmail.options = ['Teachers','Admin'];
                }else if($rootScope.userDetails.userType == "TEACHER"){
                    toEmail.options = ['Students','Parents'];
                }else if($rootScope.userDetails.userType == "ADMIN"){
                    toEmail.options = ['Students','Parents','Teachers'];
                }else if($rootScope.userDetails.userType == "PARENT"){
                    toEmail.options = ['Teachers','Admin'];
                } 
            }
            toEmail.index = $scope.toEmails.length;
            toEmail.hideDropDown=true;
            toEmail.selected=[];
            toEmail.responseData = [];
            toEmail.userType = toEmail.options[0];
            toEmail.toUsers = '';
            toEmail.showAddEmailButton = true;
            toEmail.showDeleteEmailButton= false;
            $scope.toEmails.push(toEmail);
            $timeout(function () { 
              $('select').material_select();
            }, 0, false);
        });
    };  
    
    var fileTypes = {
        'spreadsheet':'icon_1_excel_x16.png',
        'pdf':'icon_3_pdf_x16.png',
        'word':'icon_1_word_x16.png',
        'presentation':'icon_1_powerpoint_x16.png',
        'image':'icon_1_image_x16.png',
    }
    var re = /(?:\.([^.]+))?$/;
    $scope.files=[];
    $scope.uploadFiles=[];
    $scope.inputFileChanged = function(){
        if($scope.inputFiles.length + $scope.files.length > 10){
            Materialize.toast('Only 10 files are allowed in a mail',2000);
        }else{
            for(var i=0;i<$scope.inputFiles.length;i++){
                var fileType=re.exec($scope.inputFiles[i].name)[1];
                if(fileType=='pdf'){
                    var file={};
                    file.fileTypeText = 'PDF';
                    file.fileTypeImage=fileTypes.pdf;
                    file.filename=$scope.inputFiles[i].name;
                    $scope.files.push(file);
                    $scope.uploadFiles.push($scope.inputFiles[i]);
                }else if(fileType=='xls' || fileType=='xlsx'){
                    var file={};
                    file.fileTypeText = 'Spreadsheet';
                    file.fileTypeImage=fileTypes.spreadsheet;
                    file.filename=$scope.inputFiles[i].name;
                    $scope.files.push(file);
                    $scope.uploadFiles.push($scope.inputFiles[i]);
                }else if(fileType=='doc' || fileType=='docx' || fileType=='dox'){
                    var file={};
                    file.fileTypeText = 'Doc';
                    file.fileTypeImage=fileTypes.word;
                    file.filename=$scope.inputFiles[i].name;
                    $scope.files.push(file);
                    $scope.uploadFiles.push($scope.inputFiles[i]);
                }else if(fileType=='ppt' || fileType=='pptx'){
                    var file={};
                    file.fileTypeText = 'Presentation';
                    file.fileTypeImage=fileTypes.presentation;
                    file.filename=$scope.inputFiles[i].name;
                    $scope.files.push(file);
                    $scope.uploadFiles.push($scope.inputFiles[i]);
                }else if(fileType=='jpeg' || fileType=='png' || fileType=='jpg'){
                    var file={};
                    file.fileTypeText = 'Image';
                    file.fileTypeImage=fileTypes.image;
                    file.filename=$scope.inputFiles[i].name;
                    $scope.files.push(file);
                    $scope.uploadFiles.push($scope.inputFiles[i]);
                }else{
                    Materialize.toast('Invalid File'+$scope.inputFiles[i].name,2000);
                }
            }
        }
    };
    
    $scope.cancelAttachment = function($index){
        var temp = $scope.files;
        temp.splice($index,1);
        $scope.files=temp;
        var anotherTemp = $scope.uploadFiles;
        anotherTemp.splice($index,1);
        $scope.uploadFiles=anotherTemp;
    };
}]);

app.controller('inboxCtr', ['$http','$rootScope','InboxAjaxService','$scope','$timeout','deviceDetector',function ($http,$rootScope,InboxAjaxService,$scope,$timeout,deviceDetector) {
    $rootScope.AndroidText = 'Receivied';
    $timeout(function(){
        $('li.active a.active').trigger('click.collapse');
        $('li.nav-li').removeClass('active');
        $('#mail').trigger("click.collapse");
        $('.inbox-li').addClass('active');
    },0,false);

    $scope.viewMailOptions = {
        toolbar: [],
        toolbarContainer : '.delimage'
    };
    $scope.showInIframe = function(mail,file){
        var filePath = 'https://drive.google.com/viewerng/viewer?url=http://crownelearner.com/SchoolId-'+$rootScope.schooldetails.schoolId+'/EmailAttachments/41_3-s2.0-B9780128021897000186-main.pdf?pid=explorer&efh=false&a=v&chrome=false&embedded=true';
        $scope.fileLink=filePath;
        $scope.showIframeDiv = true;
    }
    $scope.closeFilePreivewModel = function(){
        $('#viewFilePreview').closeModal();
        $scope.ao = {};
    };
    $scope.openEmail = function(mail){
        $scope.files=[];
        for(var i=0;i<mail.email.email_attachments.length;i++){
            var file={};
            file.fileTypeText = mail.email.email_attachments[i].fileTypeText;
            file.fileTypeImage=mail.email.email_attachments[i].fileTypeImage;
            file.filename=mail.email.email_attachments[i].filename;
            $scope.files.push(file);
        }
        if(mail.readStatus == 'N'){
            InboxAjaxService.updateReadStatus(mail.emailId,function(status){
                if(status=="SUCCESS"){
                    mail.readStatus='Y';
                }else{

                }
            });
        };
        $timeout(function () { 
            $('.mailcontent .note-editable').attr('contenteditable','false');
        }, 0, false);
    };
    $scope.attachmentClicked = function(mail,file){
        $scope.ao = {};
        $scope.ao.fileIframeUrl = 'https://drive.google.com/viewerng/viewer?url=http://crownelearner.com/SchoolId-'+$rootScope.schooldetails.schoolId+'/EmailAttachments/'+mail.emailId+'_'+file.filename+'?&embedded=true&pid=explorer&chrome=true';
        $scope.ao.openedFileName = file.filename;
        $scope.ao.openedFilePath = mail.emailId+'_'+file.filename;
        $scope.ao.openedImageFullPath = 'SchoolId-'+$rootScope.schooldetails.schoolId+'/EmailAttachments/'+mail.emailId+'_'+file.filename;
        if(file.fileTypeText == 'Image'){
            $scope.ao.showImage = true;
        }else{
            $scope.ao.showImage = false;
        }
        $('#viewFilePreview').openModal({dismissible:false});

    };
    $scope.getInboxItems = function(){
        InboxAjaxService.getInboxMails(function(status,mails){
            $scope.mails = mails;

            $timeout(function () { 
                    $('.mailcontent .note-editable').attr('contenteditable','false');
            }, 0, false);

            $('.collapsible').collapsible({
                accordion : true 
            });
            hidePreloader();
            //$rootScope.refreshVariable = $timeout($scope.getInboxItems,2000,false);
        });
    };
    
    $scope.composeMail = function(){
        $scope.$broadcast('composeMail');
    };
    $scope.$on('refreshMail',function(event,args){
        if($scope.refreshVariable != undefined)
            $timeout.cancel($scope.refreshVariable);
        $scope.getInboxItems();
    });


    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        console.log('schooldetails done');
        $timeout($scope.getInboxItems,0,false);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    console.log('schooldetails event Receivied');
                                    $timeout($scope.getInboxItems,0,false);
                                });
    };

    $scope.showMoreClicked = function(mail){
        if(mail.showMoreClicked){
            mail.showMoreClicked = false;
        }else{
            mail.showMoreClicked = true;
        }
    };
}]);

app.controller('sentCtr', ['$http','$rootScope','InboxAjaxService','$scope','$timeout','deviceDetector',function ($http,$rootScope,InboxAjaxService,$scope,$timeout,deviceDetector) {
    $rootScope.AndroidText = 'Sent';

    // if(!deviceDetector.isDesktop()){
    //     $('#main').css('background-image','url("./images/Chota-bheem-gif.gif")');
    // }
    //$rootScope.refreshBackgroundImage();

    $timeout(function(){
        $('li.active a.active').trigger('click.collapse');
        $('li.nav-li').removeClass('active');
        $('#mail').trigger("click.collapse");
        $('.sentitems-li').addClass('active');
    },0,false);
    
    $scope.viewMailOptions = {
        toolbar: [],
        toolbarContainer : '.delimage'
    };
    
    $scope.openEmail = function(mail){
        $scope.files=[];
        for(var i=0;i<mail.email.email_attachments.length;i++){
            var file={};
            file.fileTypeText = mail.email.email_attachments[i].fileTypeText;
            file.fileTypeImage=mail.email.email_attachments[i].fileTypeImage;
            file.filename=mail.email.email_attachments[i].filename;
            $scope.files.push(file);
        }
        if(mail.readStatus == 'N'){
            InboxAjaxService.updateReadStatus(mail.emailId,function(status){
                if(status=="SUCCESS"){
                    mail.readStatus='Y';
                }else{

                }   
            });
        };
        $timeout(function () { 
            $('.mailcontent .note-editable').attr('contenteditable','false');
        }, 0, false);
    };
    $scope.closeFilePreivewModel = function(){
        $('#viewFilePreview').closeModal();
        $scope.ao = {};
    };
    $scope.getSentItmes = function(){
        InboxAjaxService.getSentMails(function(status,mails){
            if(status == "EMPTY")
                $scope.emptyInbox = true;
            else
                $scope.emptyInbox = false;

            $scope.mails = mails;
            $timeout(function () { 
                $('.mailcontent .note-editable').attr('contenteditable','false');
            }, 0, false);
            $('.collapsible').collapsible({
                accordion : true 
            });
            hidePreloader();
        });
    };
    $scope.composeMail = function(){
        $scope.$broadcast('composeMail');
    };
    $scope.$on('refreshMail',function(event,args){
        if($scope.refreshVariable != undefined)
            $timeout.cancel($scope.refreshVariable);
        $scope.getSentItmes();
    });
    
    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        showPreloader();
        $timeout($scope.getSentItmes,0,false);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    showPreloader();
                                    $timeout($scope.getSentItmes,0,false);
                                 });
    };
    $scope.attachmentClicked = function(mail,file){
        $scope.ao = {};
        $scope.ao.fileIframeUrl = 'https://drive.google.com/viewerng/viewer?url=http://crownelearner.com/SchoolId-'+$rootScope.schooldetails.schoolId+'/EmailAttachments/'+mail.emailId+'_'+file.filename+'?&embedded=true&pid=explorer&chrome=true';
        $scope.ao.openedFileName = file.filename;
        $scope.ao.openedFilePath = mail.emailId+'_'+file.filename;
        $scope.ao.openedImageFullPath = 'SchoolId-'+$rootScope.schooldetails.schoolId+'/EmailAttachments/'+mail.emailId+'_'+file.filename;
        if(file.fileTypeText == 'Image'){
            $scope.ao.showImage = true;
        }else{
            $scope.ao.showImage = false;
        }
        $('#viewFilePreview').openModal({dismissible:false});

    };
    $scope.showMoreClicked = function(mail){
        if(mail.showMoreClicked){
            mail.showMoreClicked = false;
        }else{
            mail.showMoreClicked = true;
        }
    };
}]);
       
