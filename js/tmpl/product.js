function addshop(data){
    var key = getcookie('key');
   var goods_id = GetQueryString('goods_id');
    // console.log(ifcart);
    var quantity = parseInt($(".buy-num1").val());
    $.ajax({
        url: ApiUrl + "/index.php?act=product&op=index",
        type:"get",
        dataType:"json",
        data:{key:key,quantity:quantity,goods_id:goods_id},
        success: function (result) {
            if(result.login == 0){
                window.location.href = WapSiteUrl+'/tmpl/member/login.html';
            }
        }
    });
}
