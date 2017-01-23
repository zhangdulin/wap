$(function () {
    checkSameLogin();
    var key = getcookie('key');
    var user_id = getcookie('id');
   
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index",
        data: { key: key },
        dataType: 'json',
        //jsonp:'callback',
        success: function (result) {
            checklogin(result.login);
            if(result.datas.member_info.member_user_name){
                $('#username').html(result.datas.member_info.member_user_name);
            }else{
                $('#username').html(result.datas.member_info.user_name);
            }            
            setCookies('user', result.datas.member_info.user_name);
            setCookies('id', result.datas.member_info.user_id);
            $('#point').html(result.datas.member_info.point);
            $('#predepoit').html(result.datas.member_info.predepoit);
            
            var dis = result.datas.member_info.dis_id;
            if(dis == '0'){
                $("#distribution").css('display','block');
                $("#distribution").click(function(){
                	alert('您暂无资格！');
                	return false;
                	
                });
            }
            $('#avatar').attr("src", result.datas.member_info.avator);
            return false;
        }
    });
});

function getcookie(name){
    var strcookie=document.cookie;
    var arrcookie=strcookie.split("; ");
    for(var i=0;i<arrcookie.length;i++){
    var arr=arrcookie[i].split("=");
    if(arr[0]==name)return arr[1];
    }
    return "";
}

function setCookies(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
} 







/*上传头像*/
 var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
 function filefujianChange(target) {
     alert(11111111);
       var fileSize = 0;         
       if (target.files) {
         var filePath = target.value;
           console.log(target.value);
         var fileSystem = new ActiveXObject("Scripting.FileSystemObject");        
         var file = fileSystem.GetFile (filePath);     
         fileSize = file.Size;    
       } else {    
        fileSize = target.files[0].size;     
        }   
        var size = fileSize / 1024;    
        if(size>2000){  
         alert("附件不能大于2M");
         target.value="";
         return
        }
        var name=target.value;
        var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
        if(fileName !="jpg" && fileName !="jpeg" && fileName !="pdf" && fileName !="png" && fileName !="dwg" && fileName !="gif" ){
          alert("请选择图片格式文件上传(jpg,png,gif,dwg,pdf,gif等)！");
            target.value="";
            return
        }
      }




