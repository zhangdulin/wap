$(function () {
    checkSameLogin();
    var key = getcookie('key');
    var user_id = getcookie('id');
   
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index&op=distribution",
        data: { key: key },
        dataType: 'json',
        //jsonp:'callback',
        success: function (result) {
            checklogin(result.login);
            console.log(result);
            if(result.datas.member_info.member_user_name){
                $('#username').html(result.datas.member_info.member_user_name);
            }else{
                $('#username').html(result.datas.member_info.user_name);
            }            
            setCookies('user', result.datas.member_info.user_name);
            setCookies('id', result.datas.member_info.user_id);
            if(result.datas.member_info.rec_id)
            {
            	$('#rec_id').html(result.datas.member_info.rec_id);
            }else{
            	$('.rec').hide();
            }
            $("#deposit").html(result.datas.member_info.deposit);
            $("#frozen_amount").html(result.datas.member_info.frozen_amount);
            $("#team_results").html(result.datas.member_info.team_results+'元');
            $("#retail_income").html(result.datas.member_info.retail_income+'元');
            var dis = result.datas.member_info.dis_id;
            var dis_status = (dis == '1') ? 'Air': ((dis == '2')?'Pro':'Max');
            $("#dis_status").html(dis_status);
            $('#avatar').attr("src", result.datas.member_info.avator);
            return false;
        }
    });

    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index&op=qrcode",
        data: {
            user_id: user_id,
            key : key,
        },
        dataType: 'json',
        success: function (result) {
            var data = result.datas;
            $('#qr_code').html('<img src="'+data.url+'" width="50%"/>');
        }
    });

    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index&op=memberAgents",
        data: {
            user_id: user_id,
            key : key,
        },
        dataType: 'json',
        success: function (result) {
            var data = result.datas;
            if(data.first_level)
            {
            	var first_level_num = data.first_level.length;
            }else{
            	first_level_num = 0;
            }
            
            if(data.second_level)
            {
            	var second_level_num = data.second_level.length;
            }else{
            	second_level_num = 0;
            }
            
            if(data.third_level)
            {
            	var third_level_num = data.third_level.length;
            }else{
            	third_level_num = 0;
            }
            
            var all_level_num = parseInt(first_level_num) + parseInt(second_level_num) + parseInt(third_level_num);

            $('#all_level_num').html(all_level_num);
            $('#first_level_num').html(first_level_num);
            $('#second_level_num').html(second_level_num);
            $('#third_level_num').html(third_level_num);
            
        }
    });

    /*$('.item_content').hide();
    $('.item').on('click',function(){
        //$('.item_content').hide();
        $(this).next('.item_content').toggle();

    });*/
   

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
       var fileSize = 0;         
       if (isIE && !target.files) {     
         var filePath = target.value;     
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


 $(function () { 
   $(".avatar").click(function () { 
   $("#uploadAvartar").click(function(){
	   var This =this
	   $('#avatar_change').src=This.getAttirbute("src");
	   /*document.getElementById('uploadAvartar').getAttirbute("src");*/ }
	   
	   ); 
        }); 
    }); 

//$('#avatar_change').live('click',function(){
  //if( $('input:file').trigger('click'))
  //{$('input:file').change(function(){
  //dosomthing
  //var url=$(this).prop("src");
  //$('#avatar_change').src=url;
 //});
 

