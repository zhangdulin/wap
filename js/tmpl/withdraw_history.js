$(function () {
    //  获取用户手机号码隐藏
    var key = getcookie('key');
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=withdraw&op=withdraw_history",
        data: {key:key},
        dataType: 'json',
        success: function (result) {
             console.log(result);
             // $("#username").val(result.datas.msg_list.member_name);
             // $("#money").html(result.datas.config.number);
        }
    });
})
