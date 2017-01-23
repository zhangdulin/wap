$(function() {
    var order_id = GetQueryString('order_id');
    
    var key = getcookie('key');
    var user_id = getcookie('id');
    var user_name = getcookie('user');

    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_order&op=getOrderInfo",
        data: {
            key: key,
            order_id: order_id,
        },
        dataType: 'json',
        success: function(result) {
            if (result) {
                var data = result.datas;
                var html = template.render('order-list-tmpl', data);
                $("#order-list").html(html);
                $('#order_id').val(order_id);
                $('#user_id').val(user_id);
                $('#user_name').val(user_name);
            }
        }
    });          
});

function submit(){
        $.ajax({
            type: 'post',
            url: ApiUrl + "/index.php?act=member_order&op=add_evaluation",
            data: $("form").serialize(),
            dataType: 'json',
            success: function(result) {
                location.href = WapSiteUrl + '/tmpl/member/order_list.html';

            }
        });
};


function resubmit()
{
        $.ajax({
            type: 'post',
            url: ApiUrl + "/index.php?act=member_order&op=add_evaluation_append",
            data: $("form").serialize(),
            dataType: 'json',
            success: function(result) {
                alert('提交成功');
                location.href = WapSiteUrl + '/tmpl/member/order_list.html';
            }
        });               
}