app.factory('EventService',['$http','$rootScope',function($http,$rootScope){
    var EventServices = {};
    EventServices.saveEvent = function(data,callback){
        var url=$rootScope.baseUrl+ '/api/Events/SaveEvent';
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
    EventServices.getEvents = function(callback,studentId){
        var url=$rootScope.baseUrl+ '/api/Events/GetEvents?studentId='+$rootScope.userDetails.student.loginId+'&schoolId='+$rootScope.schooldetails.schoolId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    EventServices.getClasses = function(qs,callback){
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
    EventServices.getSections = function(qs,callback){
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
    EventServices.getTeachers = function(qs,callback){
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
    EventServices.getStudents = function(qs,callback){
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
            EventServices.getClasses(qs,function(classStatus,clas){
                if(classStatus == "SUCCESS"){
                    responseData.classes = clas;
                    status = classStatus;
                }
                EventServices.getSections(qs,function(sectionStatus,sections){
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

    EventServices.getAdmins = function(qs,callback){
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
    return EventServices;
}]);
app.controller('calendarCtr', ['$http','$rootScope','EventService','$routeParams','$scope','$timeout','$location','Upload',function ($http,$rootScope,EventService,$routeParams,$scope,$timeout,$location,Upload) {
    $rootScope.AndroidText = 'Events'
    $timeout(function(){
        $('li.active a.active').trigger('click.collapse');
        $('li.nav-li').removeClass('active');
        $('.events-li').addClass('active');
    },0,false);

    var getEvents = function(){
        EventService.getEvents(function(status,events){    
            $scope.userEvents = [];
            if(status == "SUCCESS"){
                for(var i=0;i<events.length;i++){
                    var event = {};
                    event.id = i;
                    event.eventId = events[i].event_id;
                    event.title = events[i].eventName;
                    if(events[i].allDayEvent = 'Y'){
                        event.allDay = true;
                        event.start = moment(events[i].startTime,'D/MM/YYYY');
                        event.end = moment(events[i].endTime,'D/MM/YYYY');
                    }else{
                        event.allDay = false;
                        event.start = moment(events[i].startTime,'D/MM/YYYY H:mm');
                        event.end = moment(events[i].endTime,'D/MM/YYYY H:mm');
                    }
                    event.className = ['userEvent',events[i].event_id,events[i].creator_user_id];
                    event.editable = false;
                    event.startEditable = false;
                    event.durationEditable = false;
                    event.resourceEditable = false;
                    event.eventsOriginalObject = events[i]
                    $scope.userEvents.push(event);
                }
            }else if(status=="EMPTY"){

            }
            else{

            }
            hidePreloader();
            $timeout(function () {  
                $('#CalendarMain').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay,listMonth'
                    },
                    eventLimit: true,
                    events: $scope.userEvents,
                    eventClick: function(calEvent, jsEvent, view) {
                        eventClicked(calEvent);
                    }
                });
            }, 0, true);
        });
    }
    var eventClicked = function(event){
        $scope.clickedEvent = {};
        $scope.clickedEvent.organizer = event.eventsOriginalObject.eventName;
        $scope.clickedEvent.eventTitle = event.eventsOriginalObject.eventName;
        $scope.clickedEvent.startTime = event.eventsOriginalObject.startTime;
        $scope.clickedEvent.endTime = event.eventsOriginalObject.endTime;
        $scope.clickedEvent.eventLocation = event.eventsOriginalObject.eventLocation;
        $scope.clickedEvent.eventDescription = event.eventsOriginalObject.eventDescription;
        $scope.clickedEvent.repeatSummary = event.eventsOriginalObject.repeatSummary;
        $timeout(function () {
            $('#showEventDetails').openModal({dismissible: true},1);
        }, 0, true);
    };
    $scope.closeShowEventModal = function(){
        $('#showEventDetails').closeModal();
    }
    hidePreloader();
    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        //showPreloader();
        if($rootScope.userDetails.userType=='ADMIN'){
            $scope.admin=true;
        }else{
            $scope.admin=false;
        }
        getEvents();
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    //showPreloader();
                                    if($rootScope.userDetails.userType=='ADMIN'){
                                        $scope.admin=true;
                                    }else{
                                        $scope.admin=false;
                                    }
                                    getEvents();
                                });
    }
    $scope.$on('refreshEvents',function(event,args){
        console.log('event received');
        getEvents();
    });
    $scope.createEvent = function(){
        $scope.$broadcast('createEvent');
    };
}]);

app.controller('createEventCtr',['$http','$rootScope','EventService','$scope','$timeout','$location',function ($http,$rootScope,EventService,$scope,$timeout,$location) {
    $scope.closeCreateEventModal = function(){
        $('#createEventModal').closeModal();
    };
    
    
    $scope.saveEvent = function(){

        var userSelected = false;
        for(var j=0;j<$scope.newEvent.toEvents.length;j++){
            if($scope.newEvent.toEvents[j].selected.length != 0){
                userSelected=true;
                break;
            }
        }
        if(!userSelected){   
            return false;
        }
        if(!$scope.newEvent.eventName.replace(/\s/g, '').length){
            return false;
        }
        
        if($scope.newEvent.allDayEvent){
            var startTime = $('#startDate').val();
            var endTime = $('#endDate').val();
            var allDay = 'Y';

            var momentStartTime = moment(startTime,'D/MM/YYYY');
            var momentEndTime = moment(endTime,'D/MM/YYYY');
            if(moment(momentStartTime).isAfter(momentEndTime)){
                return false;
            }
        }else{
            var startTime = $('#startTime').val();
            var endTime = $('#endTime').val();
            var allDay = 'N';
            var momentStartTime = moment(startTime,'D/MM/YYYY H:mm');
            var momentEndTime = moment(endTime,'D/MM/YYYY H:mm');
            if(moment(momentStartTime).isAfter(momentEndTime)){
                return false;
            }
        }
        if($scope.newEvent.endsOn.id == 1){
            var repeatEnds = {'id':1};
        }else if($scope.newEvent.endsOn.id == 2){
            var repeatEnds = {'id':2,'after':$scope.newEvent.afterOccur};
        }else if($scope.newEvent.endsOn.id == 3){
            var repeatEnds = {'id':3,'on':$('#endsOn').val()};
        }

        var data = {
            'repeatType':$scope.newEvent.repeatTypeSelect.id,
            'repeatEvery':$scope.newEvent.repeatEverySelect.id,
            'repeatEnds': repeatEnds,
            'eventName':$scope.newEvent.eventName,
            'eventLocation':$scope.newEvent.eventLocation,
            'eventDescription':$scope.newEvent.eventDescription,
            'allDayEvent':allDay,
            'startTime':startTime,
            'endTime':endTime,
            'to_user_name' : $scope.newEvent.toEvents,
            'from_first_name' : $rootScope.userDetails.firstName,
            'from_last_name' : $rootScope.userDetails.lastName
        }
        //console.log('data is '+JSON.stringify(data));

        $('#createEventModal').closeModal();
        $rootScope.displayPreloaderToast('Saving Event..',true);
        EventService.saveEvent(data,function(status){
            if(status == "SUCCESS"){
                $rootScope.displayPreloaderToast('Event Saved',false,2000);
            }else{
                $rootScope.displayPreloaderToast('Error',false,2000);
            }
            $scope.$emit('refreshEvents');
        });
        
    };
    
    $scope.$on('createEvent',function(event,args){
        $scope.newEvent = {};
        $scope.newEvent.eventName = '';
        $scope.newEvent.eventLocation = '';
        $scope.newEvent.eventDescription = '';
        $scope.newEvent.activeRepeat =false;
        var repeatType = [{'id':0,'value':'Never'},{'id':1,'value':'Daily'},{'id':2,'value':'Weekly'},{'id':3,'value':'Monthly'},{'id':4,'value':'Yearly'}];
        $scope.newEvent.repeatType = repeatType;
        $scope.newEvent.repeatTypeSelect = repeatType[0];
        var endsOnOptions = [{'id':1,'value':'Never'},{'id':2,'value':'After'},{'id':3,'value':'On'}];
        $scope.newEvent.endsOnSelect = endsOnOptions;
        $scope.newEvent.endsOn = endsOnOptions[0];
        $scope.newEvent.repeatEvery = [];
        for(var i=0;i<30;i++){
            var everySelect = {'id':(i+1),'value':(i+1)};
            $scope.newEvent.repeatEvery.push(everySelect);
        }
        $scope.newEvent.repeatEverySelect = $scope.newEvent.repeatEvery[0];
        $scope.newEvent.summary1st = '';
        $scope.newEvent.summary2nd = '';
        $('#createEventModal').openModal({dismissible: false},1);
        $scope.init();
    });
    $scope.init = function(){
        $scope.newEvent.toEvents = [];
        $scope.queryString = '';
        var toEvent = {};
        toEvent.options = ['Students','Parents','Teachers'];
        toEvent.showAddButton = true;
        toEvent.showDeleteButton= false;
        toEvent.hideDropDown=true;
        toEvent.selected=[];
        toEvent.responseData = [];
        toEvent.index = 0;
        toEvent.toUsers='';
        toEvent.userType = toEvent.options[0];
        $scope.newEvent.toEvents.push(toEvent);
        $timeout(function () { 
            $('select').material_select();
            $('.eventTabs').tabs();
        }, 0, false);
    }; 
    $scope.selectChanged = function($index){
        $scope.newEvent.toEvents[$index].hideDropDown = true;
        $scope.newEvent.toEvents[$index].responseData = [];
        $scope.newEvent.toEvents[$index].selected=[];
    };
    $scope.inputFocused = function($index){
        if(!$scope.newEvent.toEvents[$index].toUsers.replace(/\s/g, '').length){
            $scope.newEvent.toEvents[$index].hideDropDown = true;
            $scope.newEvent.toEvents[$index].responseData = [];
            return false;
        }else{
            $scope.autoSuggestPopulate($index);
        }
    };
    $scope.inputBlurred = function($index){
        $scope.newEvent.toEvents[$index].hideDropDown = true;
        $scope.newEvent.toEvents[$index].responseData = [];
    };
    $scope.inputChanged = function($event,$index){
        var keyCode = $event.keyCode;
        if(!$scope.newEvent.toEvents[$index].toUsers.replace(/\s/g, '').length){
            $scope.newEvent.toEvents[$index].hideDropDown = true;
            $scope.newEvent.toEvents[$index].responseData = [];
            return;
        }
        // BACKSPACE KEY
        if (keyCode == '8' && $scope.newEvent.toEvents[$index].toUsers=='') {
            console.log('backspace pressed');
            if (!$scope.newEvent.toEvents[$index].selected.length) {
                return true;
            }
            $scope.newEvent.toEvents[$index].selected.pop();
            return false;
        }
        $scope.autoSuggestPopulate($index);
    };

    $scope.autoSuggestPopulate = function($index){

        $scope.queryString = $scope.newEvent.toEvents[$index].toUsers;
        $timeout.cancel($scope.timer);
        $scope.timer = $timeout(function(){
            if($scope.newEvent.toEvents[$index].userType == "Students"){
                        
                for(var i=0;i<$scope.newEvent.toEvents.length;i++){
                    if($scope.newEvent.toEvents[i].userType == "Students"){
                        if($scope.newEvent.toEvents[i].selected.length>0){
                            if(($scope.newEvent.toEvents[i].selected[0].id == -1) || ($scope.newEvent.toEvents[i].selected[0].name == "ALL")){
                                Materialize.toast('All students are already added.',3000);
                                return false;
                            }
                        }
                    }
                }
                        
                EventService.getStudents($scope.queryString,function(status,data){
                    if(status=="SUCCESS"){
                        $scope.newEvent.toEvents[$index].responseData=[];

                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.studentId = -1;
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                            $scope.newEvent.toEvents[$index].hideDropDown = false;
                        }

                        for(var j=0;j<data.classes.length;j++){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name=data.classes[j].className;
                            responseObject.classId = data.classes[j].classId;
                            responseObject.type = "CLASS"
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                        }

                        for(var k=0;k<data.sections.length;k++){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name=data.sections[k].sectionName;
                            responseObject.type = "SECTION"
                            responseObject.sectionId = data.sections[k].sectionId;
                            responseObject.classId = data.sections[k].classId;
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                        }
                        
                        for(var i=0;i<data.students.length;i++){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
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
                            //responseObject.dataObject = data[i];
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                        }


                        $scope.newEvent.toEvents[$index].hideDropDown = false;
                    }else{
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            $scope.newEvent.toEvents[$index].responseData=[];
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.studentId = -1;
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                            $scope.newEvent.toEvents[$index].hideDropDown = false;
                        }else
                            return false;
                    }
                });
            }else if($scope.newEvent.toEvents[$index].userType == "Parents"){
                        
                for(var i=0;i<$scope.newEvent.toEvents.length;i++){
                    if($scope.newEvent.toEvents[i].userType == "Parents"){
                        if($scope.newEvent.toEvents[i].selected.length>0){
                            if(($scope.newEvent.toEvents[i].selected[0].id == -1) || ($scope.newEvent.toEvents[i].selected[0].id == "ALL")){
                                Materialize.toast('Parents of all students are already added.',3000);
                                return false;
                            }
                        }
                    }
                }


                        
                EventService.getStudents($scope.queryString,function(status,data){
                    if(status=="SUCCESS"){
                        $scope.newEvent.toEvents[$index].responseData=[];
                                
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.studentId = -1;
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                            $scope.newEvent.toEvents[$index].hideDropDown = false;
                        }
                    
                        for(var j=0;j<data.classes.length;j++){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name=data.classes[j].className;
                            responseObject.classId = data.classes[j].classId;
                            responseObject.type = "CLASS"
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                        }

                        for(var k=0;k<data.sections.length;k++){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name=data.sections[k].sectionName;
                            responseObject.type = "SECTION"
                            responseObject.sectionId = data.sections[k].sectionId;
                            responseObject.classId = data.sections[k].classId;
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                        }
                        
                        for(var i=0;i<data.students.length;i++){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
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
                            //responseObject.dataObject = data[i];
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                        }

                        $scope.newEvent.toEvents[$index].hideDropDown = false;
                    }else{
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            $scope.newEvent.toEvents[$index].responseData=[];
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.parentId = -1;
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                            $scope.newEvent.toEvents[$index].hideDropDown = false;
                        }else
                            return false;
                    }
                });
            }else if($scope.newEvent.toEvents[$index].userType == "Teachers"){
                        
                for(var i=0;i<$scope.newEvent.toEvents.length;i++){
                    if($scope.newEvent.toEvents[i].userType == "Teachers"){
                        if($scope.newEvent.toEvents[i].selected.length>0){
                            if(($scope.newEvent.toEvents[i].selected[0].id == -1) || ($scope.newEvent.toEvents[i].selected[0].id == "ALL")){
                                Materialize.toast('All teachers are already added.',3000);
                                return false;
                            }
                        }
                    }
                }
                        
                EventService.getTeachers($scope.queryString,function(status,data){
                    if(status=="SUCCESS"){
                        $scope.newEvent.toEvents[$index].responseData=[];
                                
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.studentId = -1;
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                            $scope.newEvent.toEvents[$index].hideDropDown = false;
                        }    
                                
                        for(var i=0;i<data.length;i++){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
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
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                        }
                        $scope.newEvent.toEvents[$index].hideDropDown = false;
                    }else{
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            $scope.newEvent.toEvents[$index].responseData=[];
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.teacherId = -1;
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                            $scope.newEvent.toEvents[$index].hideDropDown = false;
                        }else
                            return false;
                    }
                });
            }else if($scope.newEvent.toEvents[$index].userType == "Admin"){
                        
                for(var i=0;i<$scope.newEvent.toEvents.length;i++){
                    if($scope.newEvent.toEvents[i].userType == "Admin"){
                        if($scope.newEvent.toEvents[i].selected.length>0){
                            if(($scope.newEvent.toEvents[i].selected[0].id == -1) || ($scope.newEvent.toEvents[i].selected[0].id == "ALL")){
                                Materialize.toast('All teachers are already added.',3000);
                                return false;
                            }
                        }
                    }
                }
                
                EventService.getAdmins($scope.queryString,function(status,data){
                    if(status=="SUCCESS"){
                        $scope.newEvent.toEvents[$index].responseData=[];
                                
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.studentId = -1;
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                            $scope.newEvent.toEvents[$index].hideDropDown = false;
                        }
                                
                        for(var i=0;i<data.length;i++){
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name=data[i].first_name+' '+data[i].last_name;
                            responseObject.firstName = data[i].first_name;
                            responseObject.lastName = data[i].last_name;
                            responseObject.adminId = data[i].admin_id;
                            responseObject.userId = data[i].admin_id;
                            responseObject.userType='ADMIN';
                            responseObject.userName = data[i].user_name;
                            responseObject.emailId = data[i].email_id;
                            responseObject.section = '';
                            responseObject.phone = data[i].phone;
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                        }
                        $scope.newEvent.toEvents[$index].hideDropDown = false;
                    }else{
                        if($scope.queryString.toUpperCase() == 'ALL' || $scope.queryString.toUpperCase() == 'A' || $scope.queryString.toUpperCase() == 'AL'){
                            $scope.newEvent.toEvents[$index].responseData=[];
                            var responseObject = {};
                            responseObject.id=$scope.newEvent.toEvents[$index].responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.adminId = -1;
                            responseObject.section = '';
                            $scope.newEvent.toEvents[$index].responseData.push(responseObject);
                            $scope.newEvent.toEvents[$index].hideDropDown = false;
                        }else
                            return false;
                    }
                });
            }else if($scope.newEvent.toEvents[$index].userType == "Others"){
            }       
        },200);
    };


    $scope.autoSuggestSelected = function(id,$index){
        $scope.newEvent.toEvents[$index].hideDropDown = true;
        if($scope.newEvent.toEvents[$index].userType == "Students"){
            if($scope.newEvent.toEvents[$index].responseData[id].studentId == -1){
                var spliceVariales = [];
                $scope.newEvent.toEvents[$index].selected = [];
                for(var j=($scope.newEvent.toEvents.length-1);j>=0;j--){
                    if($scope.newEvent.toEvents[j].userType == "Students"){
                        $scope.newEvent.toEvents[j].selected  = [];
                        //$scope.newEvent.toEvents.splice(j,1);
                    }
                }
                $scope.newEvent.toEvents[$index].selected  = [];
                var selected = {};
                selected.id = -1;
                selected.name = 'ALL';
                $scope.newEvent.toEvents[$index].selected.push(selected);
                $scope.newEvent.toEvents[$index].toUsers='';
                $scope.newEvent.toEvents[$index].responseData = [];
                return false;
            }else{
                if($scope.newEvent.toEvents[$index].responseData[id].type == "STUDENT"){
                    for(var j=0;j<$scope.newEvent.toEvents.length;j++){
                        if($scope.newEvent.toEvents[j].userType == "Students"){
                            for(var i=0;i<$scope.newEvent.toEvents[j].selected.length;i++){
                                if($scope.newEvent.toEvents[j].selected[i].type == "CLASS"){
                                    if($scope.newEvent.toEvents[j].selected[i].classId == $scope.newEvent.toEvents[$index].responseData[id].classId){
                                        Materialize.toast($scope.newEvent.toEvents[j].selected[i].name+' already added.',3000);
                                        return false;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "SECTION"){
                                    if($scope.newEvent.toEvents[j].selected[i].sectionId == $scope.newEvent.toEvents[$index].responseData[id].sectionId){
                                        Materialize.toast($scope.newEvent.toEvents[j].selected[i].name+' already added.',3000);
                                        return false;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "STUDENT"){
                                    if($scope.newEvent.toEvents[j].selected[i].studentId == $scope.newEvent.toEvents[$index].responseData[id].studentId){
                                        Materialize.toast($scope.newEvent.toEvents[j].selected[i].name+' already added.',3000);
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }else if($scope.newEvent.toEvents[$index].responseData[id].type == "SECTION"){
                    for(var j=0;j<$scope.newEvent.toEvents.length;j++){
                        if($scope.newEvent.toEvents[j].userType == "Students"){
                            for(var i=($scope.newEvent.toEvents[j].selected.length - 1);i>=0;i--){
                                if($scope.newEvent.toEvents[j].selected[i].type == "CLASS"){
                                    if($scope.newEvent.toEvents[j].selected[i].classId == $scope.newEvent.toEvents[$index].responseData[id].classId){
                                        Materialize.toast($scope.newEvent.toEvents[j].selected[i].name+' already added.',3000);
                                        return false;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "SECTION"){
                                    if($scope.newEvent.toEvents[j].selected[i].sectionId == $scope.newEvent.toEvents[$index].responseData[id].sectionId){
                                        Materialize.toast($scope.newEvent.toEvents[j].selected[i].name+' already added.',3000);
                                        return false;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "STUDENT"){
                                    if($scope.newEvent.toEvents[j].selected[i].sectionId == $scope.newEvent.toEvents[$index].responseData[id].sectionId){
                                        var temp = $scope.newEvent.toEvents[j].selected;
                                        temp.splice(i,1);
                                        $scope.newEvent.toEvents[j].selected = temp;
                                    }
                                }
                            }
                        }
                    }
                }else if($scope.newEvent.toEvents[$index].responseData[id].type == "CLASS"){
                    for(var j=0;j<$scope.newEvent.toEvents.length;j++){
                        if($scope.newEvent.toEvents[j].userType == "Students"){
                            for(var i=($scope.newEvent.toEvents[j].selected.length - 1);i>=0;i--){
                                if($scope.newEvent.toEvents[j].selected[i].type == "CLASS"){
                                    if($scope.newEvent.toEvents[j].selected[i].classId == $scope.newEvent.toEvents[$index].responseData[id].classId){
                                        Materialize.toast($scope.newEvent.toEvents[$index].responseData[id].name+' already added.',3000);
                                        return false;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "SECTION"){
                                    if($scope.newEvent.toEvents[j].selected[i].classId == $scope.newEvent.toEvents[$index].responseData[id].classId){
                                        var temp = $scope.newEvent.toEvents[j].selected;
                                        temp.splice(i,1);
                                        $scope.newEvent.toEvents[j].selected = temp;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "STUDENT"){
                                    if($scope.newEvent.toEvents[j].selected[i].classId == $scope.newEvent.toEvents[$index].responseData[id].classId){
                                        var temp = $scope.newEvent.toEvents[j].selected;
                                        temp.splice(i,1);
                                        $scope.newEvent.toEvents[j].selected = temp;   
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        
        
        else if($scope.newEvent.toEvents[$index].userType == "Parents"){
            if($scope.newEvent.toEvents[$index].responseData[id].studentId == -1){
                var spliceVariales = [];
                for(var j=($scope.newEvent.toEvents.length-1);j>=0;j--){
                    if($scope.newEvent.toEvents[j].userType == "Parents"){
                        $scope.newEvent.toEvents[j].selected  = [];
                        // var temp = $scope.newEvent.toEvents;
                        // temp = temp.splice(j,1);
                        // $scope.newEvent.toEvents = temp;
                    }
                }
                $scope.newEvent.toEvents[$index].selected  = [];
                var selected = {};
                selected.id = -1;
                selected.name = 'ALL';
                $scope.newEvent.toEvents[$index].selected.push(selected);
                $scope.newEvent.toEvents[$index].toUsers='';
                $scope.newEvent.toEvents[$index].responseData = [];
                return false;
            }else{
                if($scope.newEvent.toEvents[$index].responseData[id].type == "STUDENT"){
                    for(var j=0;j<$scope.newEvent.toEvents.length;j++){
                        if($scope.newEvent.toEvents[j].userType == "Parents"){
                            for(var i=0;i<$scope.newEvent.toEvents[j].selected.length;i++){
                                if($scope.newEvent.toEvents[j].selected[i].type == "CLASS"){
                                    if($scope.newEvent.toEvents[j].selected[i].classId == $scope.newEvent.toEvents[$index].responseData[id].classId){
                                        Materialize.toast($scope.newEvent.toEvents[j].selected[i].name+' already added.',3000);
                                        return false;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "SECTION"){
                                    if($scope.newEvent.toEvents[j].selected[i].sectionId == $scope.newEvent.toEvents[$index].responseData[id].sectionId){
                                        Materialize.toast($scope.newEvent.toEvents[j].selected[i].name+' already added.',3000);
                                        return false;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "STUDENT"){
                                    if($scope.newEvent.toEvents[j].selected[i].studentId == $scope.newEvent.toEvents[$index].responseData[id].studentId){
                                        Materialize.toast($scope.newEvent.toEvents[j].selected[i].name+' already added.',3000);
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }else if($scope.newEvent.toEvents[$index].responseData[id].type == "SECTION"){
                    for(var j=0;j<$scope.newEvent.toEvents.length;j++){
                        if($scope.newEvent.toEvents[j].userType == "Parents"){
                            for(var i=($scope.newEvent.toEvents[j].selected.length - 1);i>=0;i--){
                                if($scope.newEvent.toEvents[j].selected[i].type == "CLASS"){
                                    if($scope.newEvent.toEvents[j].selected[i].classId == $scope.newEvent.toEvents[$index].responseData[id].classId){
                                        Materialize.toast($scope.newEvent.toEvents[j].selected[i].name+' already added.',3000);
                                        return false;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "SECTION"){
                                    if($scope.newEvent.toEvents[j].selected[i].sectionId == $scope.newEvent.toEvents[$index].responseData[id].sectionId){
                                        Materialize.toast($scope.newEvent.toEvents[j].selected[i].name+' already added.',3000);
                                        return false;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "STUDENT"){
                                    if($scope.newEvent.toEvents[j].selected[i].sectionId == $scope.newEvent.toEvents[$index].responseData[id].sectionId){
                                        var temp = $scope.newEvent.toEvents[j].selected;
                                        temp.splice(i,1);
                                        $scope.newEvent.toEvents[j].selected = temp;
                                    }
                                }
                            }
                        }
                    }
                }else if($scope.newEvent.toEvents[$index].responseData[id].type == "CLASS"){
                    for(var j=0;j<$scope.newEvent.toEvents.length;j++){
                        if($scope.newEvent.toEvents[j].userType == "Parents"){
                            for(var i=($scope.newEvent.toEvents[j].selected.length - 1);i>=0;i--){
                                if($scope.newEvent.toEvents[j].selected[i].type == "CLASS"){
                                    if($scope.newEvent.toEvents[j].selected[i].classId == $scope.newEvent.toEvents[$index].responseData[id].classId){
                                        Materialize.toast($scope.newEvent.toEvents[$index].responseData[id].name+' already added.',3000);
                                        return false;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "SECTION"){
                                    if($scope.newEvent.toEvents[j].selected[i].classId == $scope.newEvent.toEvents[$index].responseData[id].classId){
                                        var temp = $scope.newEvent.toEvents[j].selected;
                                        temp.splice(i,1);
                                        $scope.newEvent.toEvents[j].selected = temp;
                                    }
                                }else if($scope.newEvent.toEvents[j].selected[i].type == "STUDENT"){
                                    if($scope.newEvent.toEvents[j].selected[i].classId == $scope.newEvent.toEvents[$index].responseData[id].classId){
                                        var temp = $scope.newEvent.toEvents[j].selected;
                                        temp.splice(i,1);
                                        $scope.newEvent.toEvents[j].selected = temp;   
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        
        
        else if($scope.newEvent.toEvents[$index].userType == "Teachers"){
            if($scope.newEvent.toEvents[$index].responseData[id].teacherId == -1){
                var spliceVariales = [];
                for(var j=($scope.newEvent.toEvents.length-1);j>=0;j--){
                    if($scope.newEvent.toEvents[j].userType == "Teachers"){
                        $scope.newEvent.toEvents[j].selected  = [];
                    }
                }
                $scope.newEvent.toEvents[$index].selected  = [];
                var selected = {};
                selected.id = -1;
                selected.name = 'ALL';
                $scope.newEvent.toEvents[$index].selected.push(selected);
                $scope.newEvent.toEvents[$index].toUsers='';
                $scope.newEvent.toEvents[$index].responseData = [];
                return false;
            }else{
                for(var j=0;j<$scope.newEvent.toEvents.length;j++){
                    if($scope.newEvent.toEvents[j].userType == "Teachers"){
                        for(var i=0;i<$scope.newEvent.toEvents[j].selected.length;i++){
                            if($scope.newEvent.toEvents[$index].responseData[id].teacherId == $scope.newEvent.toEvents[j].selected[i].teacherId){
                                Materialize.toast($scope.newEvent.toEvents[$index].responseData[id].name+' already added.',3000);
                                return false;
                            }
                        }
                    }
                }
            }
        }
        
        
        else if($scope.newEvent.toEvents[$index].userType == "Admin"){
            if($scope.newEvent.toEvents[$index].responseData[id].adminId == -1){
                var spliceVariales = [];
                for(var j=($scope.newEvent.toEvents.length-1);j>=0;j--){
                    if($scope.newEvent.toEvents[j].userType == "Admin"){
                        $scope.newEvent.toEvents[j].selected  = [];
                    }
                }
                $scope.newEvent.toEvents[$index].selected  = [];
                var selected = {};
                selected.id = -1;
                selected.name = 'ALL';
                $scope.newEvent.toEvents[$index].selected.push(selected);
                $scope.newEvent.toEvents[$index].toUsers='';
                $scope.newEvent.toEvents[$index].responseData = [];
                return false;
            }else{
                for(var j=0;j<$scope.newEvent.toEvents.length;j++){
                    if($scope.newEvent.toEvents[j].userType == "Admin"){
                        for(var i=0;i<$scope.newEvent.toEvents[j].selected.length;i++){
                            if($scope.newEvent.toEvents[$index].responseData[id].adminId == $scope.newEvent.toEvents[j].selected[i].adminId){
                                Materialize.toast($scope.newEvent.toEvents[$index].responseData[id].name+' already added.',3000);
                                return false;
                            }
                        }
                    }
                }
            }
        }
        
        
        else if($scope.newEvent.toEvents[$index].userType == "Others"){
        }
        $scope.newEvent.toEvents[$index].selected.push($scope.newEvent.toEvents[$index].responseData[id]);
        $scope.newEvent.toEvents[$index].toUsers='';
        $scope.newEvent.toEvents[$index].responseData = [];
    };
    
    
    $scope.chipClosed = function($parentIndex,$index){
        $scope.newEvent.toEvents[$parentIndex].selected.splice($index,1);
    };

    $scope.removeToEvent = function($index){
        $scope.newEvent.toEvents.splice($index,1);
    }
        
    $scope.addToEvent = function($index){
        var toEvent = {};
        $scope.newEvent.toEvents[$index].showAddButton = false;
        $scope.newEvent.toEvents[$index].showDeleteButton = true;
        toEvent.options = ['Students','Parents','Teachers'];
        toEvent.index = $scope.newEvent.toEvents.length;
        toEvent.hideDropDown=true;
        toEvent.selected=[];
        toEvent.responseData = [];
        toEvent.userType = toEvent.options[0];
        toEvent.toUsers = '';
        toEvent.showAddButton = true;
        toEvent.showDeleteButton= false;
        $scope.newEvent.toEvents.push(toEvent);
        $timeout(function () { 
            $('select').material_select();
        }, 0, false);
    }; 
    $scope.repeatTypeChanged = function(){
        if($scope.newEvent.repeatTypeSelect.id == 0){
            $scope.newEvent.activeRepeat = false;
        }else{
            $scope.newEvent.activeRepeat = true;
            $timeout(function () { 
                $('select').material_select();
            }, 0, false);
            $scope.updateSummary();
        }
    };
    $scope.endsonChanged = function(){
        if($scope.newEvent.endsOn.id == 2){
            $scope.newEvent.afterOccur = parseInt(5);
        }
        $scope.updateSummary();
    };
    $scope.repeatEveryChanged = function(){
        $scope.updateSummary();
    }
    $scope.afterOccurChanged = function(){
        $scope.updateSummary();
    }
    $scope.endsOnDateChanged = function(dateValue){
        $scope.updateSummary();
    }
    $scope.updateSummary = function(){

        var repeatType = $scope.newEvent.repeatTypeSelect.id;
        var endsOn = $scope.newEvent.endsOn.id;
        var repeatEvery = $scope.newEvent.repeatEverySelect.id;
        if(repeatType == 0){
            return false;
        }
        if(repeatType == 1){
            if(repeatEvery == 1){
                $scope.newEvent.summary1st = 'Daily'
            }else{
                $scope.newEvent.summary1st = 'Every '+repeatEvery+' days';
            }
        }else if(repeatType == 2){
            if(repeatEvery == 1){
                $scope.newEvent.summary1st = 'Weekly';
            }else{
                $scope.newEvent.summary1st = 'Every '+repeatEvery+' weeks';
            }
        }else if(repeatType == 3){
            if(repeatEvery == 1){
                $scope.newEvent.summary1st = 'Monthly';
            }else{
                $scope.newEvent.summary1st = 'Every '+repeatEvery+' months';
            }
        }else if(repeatType == 4){
            if(repeatEvery == 1){
                $scope.summary1st = 'Anually';
            }else{
                $scope.newEvent.summary1st = 'Every '+repeatEvery+' years';
            }
        }
        if(endsOn == 1){
            $scope.newEvent.summary2nd = '';
        }else if(endsOn == 2){
            $scope.newEvent.summary2nd = ','+$scope.newEvent.afterOccur+' times';
        }else if(endsOn == 3){
            $scope.newEvent.summary2nd = ',until '+ $('#endsDate').val();
        }
    };
}]);