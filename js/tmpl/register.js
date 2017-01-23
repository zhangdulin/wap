$(function () {

    var rec_id = GetQueryString('rec_id');

    $.sValid.init({//注册验证
        rules: {
            vcode: "required",
            username: "required",
            userpwd: "required",
            password_confirm: "required"
          
        },
        messages: {
            username: "用户名需要写哦",
            userpwd: "密码需要填写",
            password_confirm: "请确认密码",
            vcode: "验证码不能为空"
        },
        callback: function (eId, eMsg, eRules) {
            if (eId.length > 0) {
                var errorHtml = "";
                $.map(eMsg, function (idx, item) {
                    errorHtml += "<p>" + idx + "</p>";
                });
                $(".error-tips").html(errorHtml).show();
            } else {
                $(".error-tips").html("").hide();
            }
        }
    });

/*正则表达式判断手机号*/

$('#codebtn').click(function () {//获取验证码
	var telphone = $("#username").val();
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=login&op=phone_show",
        data: {phone:telphone},
        dataType: 'json',
        success: function (result) {
            if(result == 1){
                $(".error-tips").html('手机号码已存在').show();
            }
            console.log(result);
        }
    })
    var re = /^1(3|4|5|7|8)\d{9}$/;
    if(telphone != re){
        $(".error-tips").html('手机号码格式不正确').show();
    }
    if (re.test(telphone)) {
        GetCode();
    } 
});
    

    $('#loginbtn').click(function () {
        var username = $("input[name=username]").val();
        var pwd = $("input[name=pwd]").val();
        var password_confirm = $("input[name=password_confirm]").val();
        var vcode = $("input[name=vcode]").val();
        var client = $("input[name=client]").val();

        if ($.sValid()) {
            $.ajax({
                type: 'post',
                url: ApiUrl + "/index.php?act=login&op=register",
                data: { username: username, password: pwd, password_confirm: password_confirm, vcode: vcode, client: client, rec_id:rec_id },
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    if (!result.datas.error) {
                        if (typeof (result.datas.key) == 'undefined') {
                            return false;
                        } else {
                            addcookie('username', result.datas.username);
                            addcookie('key', result.datas.key);
                            /*$.sDialog({
                                skin:"green",
                                content:"默认支付密码为登录密码,请尽快修改！",
                                okBtn:false,
                                cancelBtn:false
                            });*/
                            window.setTimeout("locallog()",4000);
                            
                            // location.href = 'http://a.app.qq.com/o/simple.jsp?plg_nld=1&pkgname=com.dz.kejstore&plg_uin=1&plg_auth=1&plg_usr=1&plg_dev=1&plg_nld=1&plg_vkey=1';
                        }
                        $(".error-tips").hide();
                    } else {
                        $(".error-tips").html(result.datas.error).show();
                    }
                }
            });
        }
    });
});


//获取验证码
function GetCode(){
	 time();
	 var username = $("input[name=username]").val();
	 $.ajax({
	     type: 'post',
	     url: ApiUrl + '/index.php?act=login&op=makeSeccode',
	     data: { username: username},
	     success: function (result) {
	             $(".error-tips").html("短信:"+result).show();
	         }
	     
	 });
	
}

var wait = 60;
function time() {
	$('#codebtn').unbind("click");
    if (wait == 0) {
        $('#codebtn').removeAttr("disabled");
        $('#codebtn').html("获取验证码");
        wait = 60;
		 $('#codebtn').click(function(){GetCode()});
    } else {
        $('#codebtn').attr("disabled", true);
         $('#codebtn').html("重新发送(" + wait + ")");
        wait--;
        setTimeout(function () {
            time()
        },
            1000)
    }
}
function locallog(){
    location.href = WapSiteUrl + '/index.html';
}  