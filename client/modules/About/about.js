

app.factory('BlogSer',['$http','$rootScope',function($http,$rootScope){
    var BlogSers = {};
    BlogSers.resetBlogVariables = function(){
    };
    BlogSers.getUserBlogs = function(callback){
        var url=$rootScope.baseUrl+ '/api/UserBlogs/bUserBlogs?studentId='+$rootScope.userDetails.student.loginId+'&schoolId='+$rootScope.schooldetails.schoolId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");
        });
    };
    BlogSers.submitBlog = function(data,callback){
        var url=$rootScope.baseUrl+ '/api/Blogs/SubmitBlog';
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
    BlogSers.submitStudentBlog = function(data,callback){
        var url=$rootScope.baseUrl+ '/api/Blogs/SubmitStudentBlog';
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
    BlogSers.getBlogs = function(callback){
        var url=$rootScope.baseUrl+ '/api/UserBlogs/bAllBlogs?studentId='+$rootScope.userDetails.student.loginId+'&schoolId='+$rootScope.schooldetails.schoolId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    BlogSers.getUnSeenBlogs = function(callback){
        var url=$rootScope.baseUrl+ '/api/UserBlogs/bUnSeenBlogs?studentId='+$rootScope.userDetails.student.loginId+'&schoolId='+$rootScope.schooldetails.schoolId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    BlogSers.getClasses = function(qs,callback){
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
    BlogSers.getBlogDetails = function(blogId,callback){
        var url=$rootScope.baseUrl+ '/api/UserBlogs/bGetBlog?studentId='+$rootScope.userDetails.student.loginId+'&schoolId='+$rootScope.schooldetails.schoolId+'&blogId='+blogId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    BlogSers.getAllSchoolBlogs = function(callback){
        var url=$rootScope.baseUrl+ '/api/SchoolBlogs/bAllBlogs';
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    BlogSers.getPaBlogs = function(callback){
        var url=$rootScope.baseUrl+ '/api/SchoolBlogs/bPendingApprovalBlogs';
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    BlogSers.getMyClassBlogs = function(callback){
        var url=$rootScope.baseUrl+ '/api/UserBlogs/myClassBlogs?studentId='+$rootScope.userDetails.student.loginId+'&schoolId='+$rootScope.schooldetails.schoolId+'&classId='+$rootScope.userDetails.classId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };

    
    BlogSers.getBlogForAdmin = function(blogId,callback){
        var url=$rootScope.baseUrl+ '/api/SchoolBlogs/bGetAdminBlog?blogId='+blogId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus,response.data.responseData);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    BlogSers.approveBlog = function(blogId,callback){
        var url=$rootScope.baseUrl+ '/api/SchoolBlogs/bApproveBlog?blogId='+blogId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };

    BlogSers.markBlogsAsRead = function(blogId,callback){
        var url=$rootScope.baseUrl+ '/api/UserBlogs/bMarkAsRead?studentId='+$rootScope.userDetails.student.loginId+'&schoolId='+$rootScope.schooldetails.schoolId+'&blogId='+blogId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
    BlogSers.rejectBlog = function(blogId,callback){
        var url=$rootScope.baseUrl+ '/api/SchoolBlogs/bRejectBlog?blogId='+blogId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            callback(response.data.returnStatus);
        },function errorCallback(response) {
            callback("ERROR");  
        });
    };
        
    return BlogSers;
}]);

app.controller('createBlogCtr',['$scope','$rootScope','BlogSer','$timeout','$location',function($scope,$rootScope,BlogSer,$timeout,$location){
    $rootScope.AndroidText = 'Create Blog';
    showPreloader();
    $timeout(function(){
        $('li.active a.active').trigger('click.collapse');
        $('li.nav-li').removeClass('active');
        $('.blogs-li').addClass('active');
    },0,false);
    $scope.blogShareSelect = "Classes";    
    $scope.options = {
        toolbar: [
                ['edit',['undo','redo']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['alignment', ['ul', 'ol']],
            ],
        placeholder:'Write blog content, drag and drop images..',
        toolbarContainer : '.submitbutton'
    };
    
    $scope.stripHtml = function(html)
    {
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       return tmp.textContent || tmp.innerText || "";
    };
    
    $scope.submitBlog = function(){
        var text_content = $scope.stripHtml($scope.blogContentModel);
        var title = '';

        if(!$scope.blogTitle.replace(/\s/g, '').length){
            Materialize.toast('Title is required to publish blog',2000);
            return false;
        }else{
            title = $scope.blogTitle;
        }

        if($scope.toBlog.selected.length==0){
            Materialize.toast('Class should be selected to submit blog',2000);
            return false;
        }

        if($rootScope.userDetails.userType == 'STUDENT'){
            var author_class_name = $rootScope.userDetails.className;
            var author_class_id = $rootScope.userDetails.classId;
            var author_section_id = $rootScope.userDetails.sectionId;
            var author_section_name = $rootScope.userDetails.sectionName;
        }else{
            var author_class_name = '';
            var author_class_id = '';
            var author_section_id = '';
            var author_section_name = '';
        }

        var data = {
                        'blog_text_content':text_content,
                        'to_class' : $scope.toBlog.selected,
                        'blog_title' : title,
                        'blog_content' : $scope.blogContentModel,
                        'author_first_name' : $rootScope.userDetails.firstName,
                        'author_last_name' : $rootScope.userDetails.lastName,
                        'author_class_name' : author_class_name,
                        'author_class_id' : author_class_id,
                        'author_section_id' : author_section_id,
                        'author_section_name' : author_section_name
        }
        
        BlogSer.submitBlog(data,function(status){
            if(status == "SUCCESS"){
                Materialize.toast('Blog submitted',3000);
                $location.path('/blogs');
            }else{
                Materialize.toast('Blog submit failed',3000);
            }
        });
    };
    $scope.init = function(){
        $scope.blogTitle='';
        $scope.toBlog = {};
        $scope.toBlog.hideDropDown=true;
        $scope.toBlog.selected=[];
        $scope.toBlog.responseData = [];
        $scope.toBlog.userType = 'Classes';
        $scope.toBlog.toUsers='';
        hidePreloader();
        $timeout(function () { 
          $('select').material_select();
        }, 0, false);
    }; 
    
    $scope.inputFocused = function(){
        if($scope.toBlog.toUsers == ''){
            $scope.toBlog.hideDropDown = true;
            $scope.toBlog.responseData = [];
            return false;
        }else{
            
            var queryString = $scope.toBlog.toUsers;
            
            $scope.timer = $timeout(function(){
                if($scope.toBlog.userType == "Classes"){
                    if($scope.toBlog.selected.length>0){
                        if(($scope.toBlog.selected[0].id == -1) || ($scope.toBlog.selected[0].id == "ALL")){
                            Materialize.toast('All classes are already added.',3000);
                            return false;
                        }
                    }
                    BlogSer.getClasses(queryString,function(status,data){
                        if(status=="SUCCESS"){
                            $scope.toBlog.responseData=[];

                            var responseObject = {};
                            responseObject.id=$scope.toBlog.responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.classId = -1;
                            responseObject.section = '';
                            $scope.toBlog.responseData.push(responseObject);
                            
                            
                            for(var i=0;i<data.length;i++){
                                var responseObject = {};
                                responseObject.id=$scope.toBlog.responseData.length;
                                responseObject.name=data[i].className;
                                responseObject.classId = data[i].classId;
                                responseObject.section = '';
                                $scope.toBlog.responseData.push(responseObject);
                            }
                            $scope.toBlog.hideDropDown = false;
                        }else{
                            if(queryString.toUpperCase() == 'ALL' || queryString.toUpperCase() == 'A' || queryString.toUpperCase() == 'AL'){
                                $scope.toBlog.responseData=[];
                                var responseObject = {};
                                responseObject.id=$scope.toBlog.responseData.length;
                                responseObject.name = 'ALL';
                                responseObject.classId = -1;
                                responseObject.section = '';
                                $scope.toBlog.responseData.push(responseObject);
                                $scope.toBlog.hideDropDown = false;
                            }else
                                return false;
                        }
                    });
                }
            },200);
        }
    };
    
    $scope.inputBlurred = function($index){
        $scope.toBlog.hideDropDown = true;
        $scope.toBlog.responseData = [];
    };
    
    $scope.inputChanged = function($event){
        
        var keyCode = $event.keyCode;
        
        if($scope.toBlog.toUsers == ''){
            $scope.toBlog.hideDropDown = true;
            $scope.toBlog.responseData = [];
            return;
        }
        // BACKSPACE KEY
        
        if (keyCode == '8' && $scope.toBlog.toUsers=='') {
            if (!$scope.toBlog.selected.length) {
                return true;
            }
            $scope.toBlog.selected.pop();
            return false;
        }
        var queryString = $scope.toBlog.toUsers;
        $timeout.cancel($scope.timer);
        $scope.timer = $timeout(function(){
            
            if($scope.toBlog.userType == "Classes"){
                if($scope.toBlog.selected.length>0){
                    if(($scope.toBlog.selected[0].id == -1) || ($scope.toBlog.selected[0].id == "ALL")){
                        Materialize.toast('All classes are already added.',3000);
                        return false;
                    }
                }
                BlogSer.getClasses(queryString,function(status,data){
                    if(status=="SUCCESS"){
                        $scope.toBlog.responseData=[];

                        var responseObject = {};
                        responseObject.id=$scope.toBlog.responseData.length;
                        responseObject.name = 'ALL';
                        responseObject.classId = -1;
                        responseObject.section = '';
                        $scope.toBlog.responseData.push(responseObject);
                        
                        
                        for(var i=0;i<data.length;i++){
                            var responseObject = {};
                            responseObject.id=$scope.toBlog.responseData.length;
                            responseObject.name=data[i].className;
                            responseObject.classId = data[i].classId;
                            responseObject.section = '';
                            $scope.toBlog.responseData.push(responseObject);
                        }
                        $scope.toBlog.hideDropDown = false;
                    }else{
                        if(queryString.toUpperCase() == 'ALL' || queryString.toUpperCase() == 'A' || queryString.toUpperCase() == 'AL'){
                            $scope.toBlog.responseData=[];
                            var responseObject = {};
                            responseObject.id=$scope.toBlog.responseData.length;
                            responseObject.name = 'ALL';
                            responseObject.classId = -1;
                            responseObject.section = '';
                            $scope.toBlog.responseData.push(responseObject);
                            $scope.toBlog.hideDropDown = false;
                        }else
                            return false;
                    }
                });
            }
        },200);
    };
    
    $scope.autoSuggestSelected = function(id){
        $scope.toBlog.hideDropDown = true;
        if($scope.toBlog.userType == "Classes"){
            if($scope.toBlog.responseData[id].classId == -1){

                $scope.toBlog.selected  = [];
                var selected = {};
                selected.id = -1;
                selected.name = 'ALL';
                $scope.toBlog.selected.push(selected);
                $scope.toBlog.toUsers='';
                $scope.toBlog.responseData = [];
                return false;
            }else{
                if($scope.toBlog.userType == "Classes"){
                    for(var i=0;i<$scope.toBlog.selected.length;i++){
                        if($scope.toBlog.responseData[id].classId == $scope.toBlog.selected[i].classId){
                            Materialize.toast($scope.toBlog.responseData[id].name+' already added.',3000);
                            return false;
                        }
                    }
                }
            }
        }
        $scope.toBlog.selected.push($scope.toBlog.responseData[id]);
        $scope.toBlog.toUsers='';
        $scope.toBlog.responseData = [];
    };
    
    $scope.chipClosed = function($index){
        $scope.toBlog.selected.splice($index,1);
    };
    $scope.cancelBlog = function(){
        $location.path('/blogs');
        Materialize.toast('Blog Deleted',3000);
    };
    $scope.init();
    
}]);


app.controller('createStudentBlogCtr',['$scope','$rootScope','BlogSer','$timeout','$location',function($scope,$rootScope,BlogSer,$timeout,$location){
    $rootScope.AndroidText = 'Create Blog';
    $scope.shareBlog = "MyClass";    
    $scope.options = {
        toolbar: [
                ['edit',['undo','redo']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['alignment', ['ul', 'ol']],
            ],
        toolbarContainer : '.submitbutton'
    };
    
    $scope.stripHtml = function(html)
    {
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       return tmp.textContent || tmp.innerText || "";
    };
    
    $scope.submitBlog = function(){
        var text_content = $scope.stripHtml($scope.blogContentModel);
        var title = '';

        if(!$scope.blogTitle.replace(/\s/g, '').length){
            Materialize.toast('Title is required to publish blog',2000);
            return false;
        }else{
            title = $scope.blogTitle;
        }
        if($rootScope.userDetails.userType == 'STUDENT'){
            var author_class_name = $rootScope.userDetails.className;
            var author_class_id = $rootScope.userDetails.classId;
            var author_section_id = $rootScope.userDetails.sectionId;
            var author_section_name = $rootScope.userDetails.sectionName;
        }else{
            var author_class_name = '';
            var author_class_id = '';
            var author_section_id = '';
            var author_section_name = '';
        }
        if($scope.shareBlog == 'Classes'){
            var toUsersOfBlog = 'ALL';
        }else {
            var toUsersOfBlog = $rootScope.userDetails.classId;
        }

        var data = {
            'blog_text_content':text_content,
            'to_class' : $scope.shareBlog,
            'blog_title' : title,
            'blog_content' : $scope.blogContentModel,
            'author_first_name' : $rootScope.userDetails.firstName,
            'author_last_name' : $rootScope.userDetails.lastName,
            'author_class_name' : author_class_name,
            'author_class_id' : author_class_id,
            'author_section_id' : author_section_id,
            'author_section_name' : author_section_name
        }
        
        BlogSer.submitStudentBlog(data,function(status){
            if(status == "SUCCESS"){
                Materialize.toast('Blog submitted',3000);
                $location.path('/blogs');
            }else{
                Materialize.toast('Blog submit failed',3000);
            }
        });
    };
    $scope.init = function(){
        $scope.blogTitle='';
        $scope.shareBlog='MyClass';
        hidePreloader();
        $timeout(function () { 
          $('select').material_select();
        }, 0, false);
    };
    $scope.cancelBlog = function(){
        $location.path('/blogs');
        Materialize.toast('Blog Deleted',3000);
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




app.controller('blogCtr',['$scope','$rootScope','BlogSer','$location','$timeout','deviceDetector',function($scope,$rootScope,BlogSer,$location,$timeout,deviceDetector){
    
    $rootScope.AndroidText = 'Blogs';
    $scope.userIsAdmin = false;
    //$rootScope.refreshBackgroundImage();
    // if(!deviceDetector.isDesktop()){
    //     $('#main').css('background-image','url("./images/monkey-balloons-gif.gif")');
    // }
    $scope.switch = {};
    $timeout(function(){
        $('li.active a.active').trigger('click.collapse');
        $('li.nav-li').removeClass('active');
        $('.blogs-li').addClass('active');
    },0,false);
    $scope.initialize = function(){
        if($rootScope.userDetails.userType == 'STUDENT' ){
            $scope.blogTypeOptions = ['All blogs','My blogs','My class blogs'];
            $scope.showCreatedBlog = true
            $scope.blogType = 'All blogs';
            $scope.loadBlogs();
        }else if($rootScope.userDetails.userType=="PARENT"){
            $scope.showCreatedBlog = false;
            $scope.blogTypeOptions = ['All blogs','My child blogs','My child class blogs'];
            $scope.blogType = 'All blogs';
            $scope.loadBlogs();
        }else if($rootScope.userDetails.userType == 'ADMIN'){
            $scope.userIsAdmin = true;
            $scope.showCreatedBlog = true
            $scope.blogTypeOptions = ['All blogs','My blogs','Pending approval blogs'];
            $scope.blogType = 'All blogs';
            $scope.getAllBlogs();
        }else if($rootScope.userDetails.userType == 'TEACHER'){
            $scope.showCreatedBlog = true;
            $scope.blogTypeOptions = ['All blogs','My blogs'];
            $scope.getAllBlogs();
            $scope.blogType = 'All blogs';
        }
        $timeout(function () { 
          $('select').material_select();
        }, 0, false);
    };
    $scope.loadUserBlogs= function(){
        BlogSer.getUserBlogs(function(status,data){
            if(status=="SUCCESS" || status=="EMPTY"){
                $scope.blogs=[];
                $scope.blogs = data;
            }
            hidePreloader();
        });
    };
    $scope.loadBlogs = function(){
        BlogSer.getBlogs(function(status,data){
            if(status=="SUCCESS" || status=="EMPTY"){
                $scope.blogs = [];
                $scope.blogs=data;
            }
            hidePreloader();
        });
    };
    $scope.getPaBlogs = function(){
        BlogSer.getPaBlogs(function(status,data){
            if(status=="SUCCESS" || status=="EMPTY"){
                $scope.blogs = [];
                $scope.blogs=data;
            }
            hidePreloader();
        });
    };  
    $scope.getAllBlogs = function(){
        BlogSer.getAllSchoolBlogs(function(status,data){
            if(status=="SUCCESS" || status=="EMPTY"){
                $scope.blogs = [];
                $scope.blogs=data;
            }
            hidePreloader();
        });
    };
    $scope.loadMyClassBlogs = function(){
        BlogSer.getMyClassBlogs(function(status,data){
            if(status=="SUCCESS" || status=="EMPTY"){
                $scope.blogs = [];
                $scope.blogs=data;
            }
            hidePreloader();
        });
    }
    $scope.selectBlogTypeChanged = function($index){
        if($rootScope.userDetails.userType == 'STUDENT'){
            if($scope.blogType == 'All blogs'){
                $scope.loadBlogs();
            }else if($scope.blogType == 'My blogs'){
                $scope.loadUserBlogs();
            }else if($scope.blogType == 'My class blogs'){
                $scope.loadMyClassBlogs();
            }
        }else if($rootScope.userDetails.userType == 'PARENT'){
            if($scope.blogType == 'All blogs'){
                $scope.loadBlogs();
            }else if($scope.blogType == 'My child blogs'){
                $scope.loadUserBlogs();
            }else if($scope.blogType == 'My child class blogs'){
                $scope.loadMyClassBlogs();
            }
        }else if($rootScope.userDetails.userType == 'ADMIN'){
            if($scope.blogType == 'All blogs'){
                $scope.getAllBlogs();
            }else if($scope.blogType == 'My blogs'){
                $scope.loadUserBlogs();
            }else if($scope.blogType == 'Pending approval blogs'){
                $scope.getPaBlogs();
            }
        }else if($rootScope.userDetails.userType == 'TEACHER'){
            if($scope.blogType == 'All blogs'){
                $scope.getAllBlogs();
            }else if($scope.blogType == 'My blogs'){
                $scope.loadUserBlogs();
            }
        }
    }
    
    $scope.blogClicked = function(blogId){
        $location.path('/blogs/'+blogId);
    }; 
    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        showPreloader();
        $timeout($scope.initialize,0,false);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    showPreloader();
                                    $timeout($scope.initialize,0,false);
                                });
    };
    hidePreloader();
}]);

app.controller('blogViewCtr',['$scope','$routeParams','$rootScope','BlogSer','$timeout','$location','$http',function($scope,$routeParams,$rootScope,BlogSer,$timeout,$location,$http){
    $rootScope.AndroidText = 'Blogs';
    //showPreloader();
    $scope.showActionButtons = false;
    $scope.options = {
        toolbar: []
    };
    $timeout(function () { 
          $('#blogcontent').summernote('disable');
    }, 0, false);
    $scope.initialize =function(){
        if($rootScope.userDetails.userType == 'STUDENT'){
            $scope.loadBlog($routeParams.blogId);
            $scope.showCreatedBlog = true;
            $scope.showApproveButton = false;
        }else if($rootScope.userDetails.userType == 'PARENT'){
            $scope.loadBlog($routeParams.blogId);
            $scope.showCreatedBlog = true;
            $scope.showApproveButton = false;
        }else if($rootScope.userDetails.userType == 'ADMIN'){
            $scope.loadAdminBlog($routeParams.blogId);
            $scope.showCreatedBlog = false;
            $scope.showApproveButton = true;
        }else if($rootScope.userDetails.userType == 'TEACHER'){
            $scope.loadTeacherBlog($routeParams.blogId);
            $scope.showCreatedBlog = true;
            $scope.showApproveButton = false;
        }
    };

    $scope.editable = false;
    $scope.loadBlog= function(blogId){
        BlogSer.getBlogDetails(blogId,function(status,data){
            $scope.showActionButtons = false;
            if(status=="SUCCESS"){
                $scope.blog={};
                $scope.blog = data[0];
                var blog=$scope.blog;
                $scope.showSectionDetails=(blog.blog.author_class_name!='' && blog.blog.author_class_name!= undefined && blog.blog.author_class_name!=null) && (blog.blog.author_section_name!='' && blog.blog.author_section_name!= undefined && blog.blog.author_section_name!=null);
                $scope.blog.comments=$scope.blog.blog.comments;
                if($scope.blog.blog.likes != undefined && $scope.blog.blog.likes != null){
                    if($scope.blog.blog.likes.length==0)
                        $scope.blog.likestatus='Like';
                    else {
                        $scope.blog.likestatus='Like';
                        $scope.blog.likeCount=$scope.blog.blog.likes.length;
                        for(var i=0;i<$scope.blog.blog.likes.length;i++){
                            if($scope.blog.blog.likes[i].userId == $rootScope.userDetails.userId){
                                $scope.blog.likestatus='Unlike';
                            }
                        }
                    }
                }
            }
            hidePreloader();
        });
    };
    
    $scope.loadTeacherBlog= function(blogId){
        BlogSer.getBlogForAdmin(blogId,function(status,data){
            $scope.showActionButtons = false;
            if(status=="SUCCESS"){
                $scope.blog={};
                $scope.blog = data[0];
                var blog=$scope.blog;
                $scope.showSectionDetails=(blog.blog.author_class_name!='' && blog.blog.author_class_name!= undefined && blog.blog.author_class_name!=null) && (blog.blog.author_section_name!='' && blog.blog.author_section_name!= undefined && blog.blog.author_section_name!=null);
                $scope.blog.comments=$scope.blog.blog.comments;
                if($scope.blog.blog.likes != undefined && $scope.blog.blog.likes != null){
                    if($scope.blog.blog.likes.length==0)
                        $scope.blog.likestatus='Like';
                    else {
                        $scope.blog.likestatus='Like';
                        $scope.blog.likeCount=$scope.blog.blog.likes.length;
                        for(var i=0;i<$scope.blog.blog.likes.length;i++){
                            if($scope.blog.blog.likes[i].userId == $rootScope.userDetails.userId){
                                $scope.blog.likestatus='Unlike';
                            }
                        }
                    }
                }
            }
            hidePreloader();
        });
    };
    
    $scope.loadAdminBlog = function(blogId){
        BlogSer.getBlogForAdmin(blogId,function(status,data){
            if(status=="SUCCESS"){
                $scope.blog={};
                $scope.blog = data[0];
                var blog=$scope.blog;
                $scope.showSectionDetails=(blog.blog.author_class_name!='' && blog.blog.author_class_name!= undefined && blog.blog.author_class_name!=null) && (blog.blog.author_section_name!='' && blog.blog.author_section_name!= undefined && blog.blog.author_section_name!=null);
                $scope.blog.comments=$scope.blog.blog.comments;
                if($scope.blog.blog.likes != undefined && $scope.blog.blog.likes != null){
                    if($scope.blog.blog.likes.length==0)
                        $scope.blog.likestatus='Like';
                    else {
                        $scope.blog.likestatus='Like';
                        $scope.blog.likeCount=$scope.blog.blog.likes.length;
                        for(var i=0;i<$scope.blog.blog.likes.length;i++){
                            if($scope.blog.blog.likes[i].userId == $rootScope.userDetails.userId){
                                $scope.blog.likestatus='Unlike';
                            }
                        }
                    }
                }
                if(data[0].approvedStatus == 'WAITING')
                    $scope.showActionButtons = true;
            }
            hidePreloader();
        });
    };
    if($rootScope.schoolDetailsDone && $rootScope.userDetailsDone){
        showPreloader();
        $timeout($scope.initialize,0,false);
    }else{
        $scope.DetailDoneEvent = $scope.$on('DetailsDone',function(event,data){
                                    showPreloader();
                                    $timeout($scope.initialize,0,false);
                                });
    };  
    
    $scope.approveBlog = function(blogId){
        BlogSer.approveBlog(blogId,function(status){
            if(status == 'SUCCESS'){
                Materialize.toast('Blog approved',3000);
                $location.path('/blogs');
            }else{
                Materialize.toast('Error in blog approval',3000);
                $location.path('/blogs');
            }
        });
    }; 
    $scope.rejectBlog = function(blogId){
        BlogSer.rejectBlog(blogId,function(status){
            if(status == 'SUCCESS'){
                Materialize.toast('Blog rejected',3000);
                $location.path('/blogs');
            }else{
                Materialize.toast('Error in blog rejection',3000);
                $location.path('/blogs');
            }
        });
    };
    
    $scope.likeButtonPressed = function(like,blogId){
        if(like=="Like"){
            var url=$rootScope.baseUrl+ '/api/Blogs/LikeBlog?blogId='+blogId+'&userFirstname='+$rootScope.userDetails.firstName+'&userLastname='+$rootScope.userDetails.lastName;
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                if(response.data.returnStatus=='SUCCESS'){
                    $scope.blog.likestatus="Unlike";
                    $scope.refreshLikeCount($scope.blog.blogId);
                }
            },function errorCallback(response) {
                Materialize.toast('Error in liking blog',1000);
            });
        }else {
            var url=$rootScope.baseUrl+ '/api/Blogs/UnLikeBlog?blogId='+blogId;
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                if(response.data.returnStatus=='SUCCESS'){
                    $scope.blog.likestatus="Like";
                    $scope.refreshLikeCount($scope.blog.blogId);
                }
            },function errorCallback(response) {
                Materialize.toast('Error in unLiking blog',1000);
            });
        }
    };
    
    $scope.commentChanged = function($event){
        var keyCode = $event.keyCode;
        
        // ENTER KEY
        if (keyCode == '13') {
            if (!$scope.userComment.replace(/\s/g, '').length) {
                return true;
            }else{
                var url=$rootScope.baseUrl+ '/api/Blogs/PostComment';
                var comment = {
                        'comment':$scope.userComment,
                        'blogId' : $scope.blog.blogId,
                        'userId' : $rootScope.userDetails.userId,
                        'firstName' : $rootScope.userDetails.firstName,
                        'lastName' : $rootScope.userDetails.lastName,
                }
                $http({
                    method: 'POST',
                    url: url,
                    data:comment
                }).then(function successCallback(response) {
                    if(response.data.returnStatus=='SUCCESS')
                        $scope.userComment='';
                        $scope.refreshComments($scope.blog.blogId);
                },function errorCallback(response) {
                    Materialize.toast('Error in posting comment',1000);
                });
            }
        }
        
    };
    $scope.refreshComments = function(blogId){
        var url=$rootScope.baseUrl+ '/api/Blogs/getComments?blogId='+blogId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            if(response.data.returnStatus=='SUCCESS'){
                $scope.blog.comments=response.data.comments;
                $scope.userComment='';
            }
        },function errorCallback(response) {
            //Materialize.toast('Error in posting comment',1000);
        });
    }
    $scope.refreshLikeCount = function(blogId){
        var url=$rootScope.baseUrl+ '/api/Blogs/getLikeCount?blogId='+blogId;
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            if(response.data.returnStatus=='SUCCESS'){
                $scope.blog.likeCount=response.data.likeCount;
            }
        },function errorCallback(response) {
            //Materialize.toast('Error in posting comment',1000);
        });
    }
}]);

