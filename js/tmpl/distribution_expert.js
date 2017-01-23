$(function () {
    checkSameLogin();
    var key = getcookie('key');
    var user_id = getcookie('id');

    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index&op=getMemberLevel",
        data: {
            user_id: user_id,
            key : key,
        },
        dataType: 'json',
        success: function (result) {
            // console.log(result);
            //var data = result.datas.first[1].grade_id;
            var data = result.datas;
            console.log(data);
        $('.distribution_sharebroker_level1').hide();
        $('.distribution_sharebroker_level2').hide();
        $('.distribution_sharebroker_level3').hide();
            $.each(data,function () {
            if(data.first[1].grade_id =='1'){
            $('.distribution_sharebroker_level1').show();
            $('.distribution_sharebroker_inner1').css('border-bottom','2px solid #ff0000');
           }else if(data.first[1].grade_id =='2'){
            $('.distribution_sharebroker_level2').show();
            $('.distribution_sharebroker_inner2').css('border-bottom','2px solid #ff0000');
           }else if(data.first[1].grade_id =='3'){
            $('.distribution_sharebroker_level3').show();
            $('.distribution_sharebroker_inner3').css('border-bottom','2px solid #ff0000');
        }

       });
        }
    });
});




