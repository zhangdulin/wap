$(function () {
	// checkSameLogin();
	var key = getcookie('key');
    var goods_id = GetQueryString('goods_id');
	$.ajax({
		type: 'post',
		url: ApiUrl + "/index.php?act=product_share&op=index&goods_id="+goods_id,
		data: {key: key},
		dataType: 'json',
		jsonp:'callback',
		success: function (result) {
			var member_id = result.datas.member_id;
			var id = GetQueryString('member_id');
     		if(member_id != null && id == null){
    			window.location.href = WapSiteUrl+'/tmpl/product_share.html?member_id='+member_id;
    		}
		var datas = result.datas;
			//还差几人以及几张
		if (datas.number_share) {
			var thepeople = 5 - datas.number_share%5;
			$("#share_500").html(thepeople);
		};
		if (datas.sum_money) {
		    var voucherprice =[]; 	
			    voucherprice = datas.sum_money.voucher_price;
			if (voucherprice != "") {
				$("#share_5").html(1);
				for (var i = 0; i < voucherprice.length; i++) {
	            	var num =0;
	            	if (voucherprice[i] ==100) {
	                   num=num+1;
	                   $("#share_100").html(num);
	            	}
            	};
			};
           
        };
            //商品列表
			var data = datas.msg_list;
			var html ="";
			var tmpl = []; 
			$.each(data, function(k, v) {
             tmpl += '<ul class="clearfix">'
              + '<li class="share_goodsli"><a href="product_detail.html?goods_id='+v.goods_id+'"><img src="/data/upload/shop/store/goods/8/'+v.goods_image+'" alt="" id="share_goods_img"/></span><span class="share_new"></span></a>'
              + '<li class="share_goodsli1 clearfix"><p class="share_gooddetail">'+v.share_name+'</p>'
              + '<p class="share_atonce" onclick="wxfen()"><span class="share_atonceshare">立即分享<span class="triangle_border_right"></span></span></p></li>'
              + '</ul>';
                   //html += template.render(k, v);
                  // $("#product_sharet").html(html);  
            });
        	var render = template.compile(tmpl);
	        var html = render();
            $("#share_goods").html(html);
            var newimge =document.getElementsByClassName('share_new');
            for (var i = 0; i < newimge.length; i++) {
                newimge[0].setAttribute("class", "share_hot");
            }

		}
	});
});