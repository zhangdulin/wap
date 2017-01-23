$(function () {

	// checkSameLogin();
	var key = getcookie('key');
    var goods_id = GetQueryString('goods_id');

	$.ajax({
		type: 'post',
		url: ApiUrl + "/index.php?act=product_share&op=product_code",
		data: {key: key , goods_id:goods_id},
		dataType: 'json',
		jsonp:'callback',
		success: function (result) {
    		var data =result.datas;
    		var goodsList =data.goods_list;
    		var presentCode =goodsList.present_code;
    		if (presentCode!= "") {
    			$("#share_exchange_code").val(presentCode);
    		};
    		var msgList =data.msg_list;
    		var goodsName =msgList.goods_name;
    		if (goodsName!= "") {
    			$("#share_exchange_name").html(goodsName);
    		};
		}
	})
})