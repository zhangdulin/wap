$(function () {

    var rec_id = GetQueryString('rec_id');

    $.sValid.init({//密码找回验证
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
    var re = /^1\d{10}$/
    if (re.test(telphone)) {
        GetCode();
    } 
});
     


/*$('#codebtn').click(function () {//获取验证码
      GetCode();
       
    });*/

    $('#loginbtn').click(function () {
        var username = $("input[name=username]").val();
        var pwd = $("input[name=pwd]").val();
        var password_confirm = $("input[name=password_confirm]").val();
        var vcode = $("input[name=vcode]").val();
        var client = $("input[name=client]").val();

        if ($.sValid()) {
            $.ajax({
                type: 'post',
                url: ApiUrl + "/index.php?act=login&op=forget",
                data: { username: username, password: pwd, password_confirm: password_confirm, vcode: vcode, client: client, rec_id:rec_id },
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    if (!result.datas.error) {
                        $(".error-tips").html("修改成功").show();
                        window.setTimeout("local()",3000); 
                        // location.href = WapSiteUrl + '/tmpl/member/login.html';                        
                    } else {
                        $(".error-tips").html(result.datas.error).show();
                    }
                }
            });
        }
    });
});

function local(){
    location.href = WapSiteUrl + '/tmpl/member/login.html';
}

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