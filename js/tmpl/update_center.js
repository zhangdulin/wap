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
            return false;
        }
    });
});