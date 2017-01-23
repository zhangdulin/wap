var key = getcookie('key');
    if (key.length < 10) {
        location.href = 'login.html';
    }
var user_id = getcookie('id');

$(function () {
   
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index",
        data: { key: key },
        dataType: 'json',
        //jsonp:'callback',
        success: function (result) {
            //console.log(result);
            checklogin(result.login);
            // alert(result.datas.member_info.member_user_name);
            $('#username').html(result.datas.member_info.user_name);
            setCookies('user', result.datas.member_info.user_name);
            setCookies('id', result.datas.member_info.user_id);
            $('#member_user_name').html(result.datas.member_info.member_user_name);
            if(result.datas.member_info.member_sex =='1'){
                $('#member_sex').html("男");
            }else{
                $('#member_sex').html("女");
            }
            
            $('#member_truename').html(result.datas.member_info.member_truename);
            $('#member_email').html(result.datas.member_info.member_email);
            $('#member_avatar').attr("src", result.datas.member_info.avator);
            return false;
        }
    });
});
$('#member_nicok').click(function(){
    var nickname = $("#member_renick").val();
    if(nickname =='') return false;
    $.ajax({
        type: 'post',
        url: ApiUrl + "/",
        data: { key: key,nickname:nickname},
        dataType: 'json',
        //jsonp:'callback',
        success: function (result) {
            if(result){
                if(!result.datas.error){
                    $.sDialog({
                        skin:"green",
                        content:"提交成功！",
                        okBtn:false,
                        cancelBtn:false
                    });
                window.setTimeout("local()",3000);
                }else{
                    $.sDialog({
                        skin:"red",
                        content:result.datas.error,
                        okBtn:false,
                        cancelBtn:false
                    });
                }
            }
            
        }
    });
})
// $('#member_nicok_sex').click(function(){
//     var member_sex = $('#member_wrap input[name="gender"]:checked ').val();
//     $.ajax({
//         type: 'post',
//         url: ApiUrl + "/index.php?act=member_index&op=updatamemb",
//         data: { key: key,member_sex:member_sex},
//         dataType: 'json',
//         //jsonp:'callback',
//         success: function (result) {
//             if(!result.datas.error){
//                 $.sDialog({
//                     skin:"green",
//                     content:"修改成功！",
//                     okBtn:false,
//                     cancelBtn:false
//                 });
//                 window.setTimeout("local()",3000);
//             }else{
//                 $.sDialog({
//                     skin:"red",
//                     content:result.datas.error,
//                     okBtn:false,
//                     cancelBtn:false
//                 });
//             }
//         }
//     });
//     window.setTimeout("local()",3000);
// })
$('#member_man').click(function(){
    var member_sex ='1';
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index&op=updatamemb",
        data: { key: key,member_sex:member_sex},
        dataType: 'json',
        //jsonp:'callback',
        success: function (result) {
            if(!result.datas.error){
                location.href = WapSiteUrl + '/tmpl/member/member_center.html';
            }
        }
    });
})
$('#member_wm').click(function(){
    var member_sex ='2';
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index&op=updatamemb",
        data: { key: key,member_sex:member_sex},
        dataType: 'json',
        //jsonp:'callback',
        success: function (result) {
            if(!result.datas.error){
                location.href = WapSiteUrl + '/tmpl/member/member_center.html';
            }
        }
    });
})
$('#member_true').click(function(){
    var member_truename = $('#member_truename').val();
    if(member_truename =='') return false;
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index&op=updatamemb",
        data: { key: key,member_truename:member_truename},
        dataType: 'json',
        //jsonp:'callback',
        success: function (result) {
            if(!result.datas.error){
                $.sDialog({
                    skin:"green",
                    content:"修改成功！",
                    okBtn:false,
                    cancelBtn:false
                });
            }else{
                $.sDialog({
                    skin:"red",
                    content:result.datas.error,
                    okBtn:false,
                    cancelBtn:false
                });
            }
            window.setTimeout("local()",3000); 
        }
    });
})
$('#member_email_ok').click(function(){
    var member_email = $('#member_email').val();
    if(member_email =='') return false;
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index&op=updatamemb",
        data: { key: key,member_email:member_email},
        dataType: 'json',
        //jsonp:'callback',
        success: function (result) {
            if(!result.datas.error){
                $.sDialog({
                    skin:"green",
                    content:"修改成功！",
                    okBtn:false,
                    cancelBtn:false
                });
                window.setTimeout("local()",3000);
            }else{
                $.sDialog({
                    skin:"red",
                    content:result.datas.error,
                    okBtn:false,
                    cancelBtn:false
                });
            }
        }
		
    });
})
$('#logoutbtn').click(function(){
    $.sDialog({
        content: '确定注销？',
        okFn: function () { logOut(); }
    })
})

function logOut() {
    var username =getcookie('username');
    var key =getcookie('key');
    var client ='wap';
    $.ajax({
        type:'get',
        url:ApiUrl+'/index.php?act=logout',
        data:{username:username,key:key,client:client},
        success:function(result){
            if(result){
                delCookie('username');
                delCookie('key');
                location.href = WapSiteUrl+'/tmpl/member/login.html';
            }
        }
    });
}
function local(){
    location.href = WapSiteUrl + '/tmpl/member/member_center.html';
}


	
	
	
	
		
$('li').click(function(){//给id为li的元素添加点击事件
    $(this).toggleClass('active');//每次点击的时候，将当前的元素切换active样式
                                  //如果有，则去掉，否则添加
});
	
	