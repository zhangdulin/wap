$(function () {
    var key = getcookie('key');
    if (key == '') {
        location.href = 'login.html';
    }
    var user_id = getcookie('id');
   
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index&op=qrcode",
        data: {
            user_id: user_id,
        },
        dataType: 'json',
        success: function (result) {
            var data = result.datas;
            $('#qr_code').html('<img src="'+data.url+'" />');
        }
    });
});

