var k;
$(function () {
    var key = getcookie('key');
    if (key == '') {
        location.href = 'login.html';
    }
    k = key;
    $('#loginbtnpwd').click(function () {//会员登陆


        var pwd = $('#userpwd').val();
        var pwd1 = $('#Password1').val();
        var pwd2 = $('#Password2').val();
        var pwd3 = $('#Password4').val();
        var pwd4 = $('#Password5').val();
        var vcode = $('#Password3').val();

        if (true) {
            $.ajax({
                type: 'post',
                url: ApiUrl + "/index.php?act=member_index&op=updatepwd",
                data: { pwd1: pwd1, pwd2: pwd2, pwd3: pwd3, pwd4: pwd4, pwd: pwd, vcode: vcode, key: key },
                dataType: 'json',
                success: function (result) {
                    if (!result.datas.error) {
                        if (typeof (result.datas.key) == 'undefined') {
                            return false;
                        } else {

                        }
                        $(".error-tips").html("密码修改成功！").show();
						   
                        $('#loginbtnpwd').html("密码修改成功");
						 $('#loginbtnpwd').unbind("click");

                    } else {
                        $(".error-tips").html(result.datas.error).show();
                    }
                }
            });
        }
    });

    $('#codebtn').click(function () {//获取验证码
        time();
        GetCode();

    });



    //点击删除地址
    function delAddress() {
        var address_id = $(this).attr('address_id');
        $.ajax({
            type: 'post',
            url: ApiUrl + "/index.php?act=member_address&op=address_del",
            data: { address_id: address_id, key: key },
            dataType: 'json',
            success: function (result) {
                checklogin(result.login);
                if (result) {
                    initPage();
                }
            }
        });
    }
});

function  GetCode() {
    $.ajax({
        type: 'post',
        url: ApiUrl + '/index.php?act=member_index&op=makeUpdateSeccode',
        data: { key: k },
        success: function (result) {
            $(".error-tips").html("短信:" + result).show();
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
        $('#codebtn').click(function () { GetCode() });
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