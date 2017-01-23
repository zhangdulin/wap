$(function () {
	var key = getcookie('key');
	if(key==''){
       window.location.href = WapSiteUrl+'/tmpl/member/login.html';
     }
    $("#btn_sublit").click(function(){
    	var code = $('input[name=mygift]').val();
	 	if (code != "") {
	    	$.ajax({
	            url :ApiUrl +"/index.php?act=member_cart&op=member_id",
	            data: {code:code,key:key},
	            type :"post",
	            dataType:"json",
	            success:function(result){
	            	if(result.datas.msg_list ==1){
	                        var quantity =1;
	                        var goods_id = 1054;
	                        $.ajax({
	                           url:ApiUrl+"/index.php?act=member_cart&op=cart_add",
	                           data:{key:key,goods_id:goods_id,quantity:quantity},
	                           type:"post",
	                           success:function (result){
	                           console.log(result);	
	                              var rData = $.parseJSON(result);
	                              if(checklogin(rData.login)){
	                                if(!rData.datas.error){
	                                  //购买数量加并加入购物车
	                                 window.location.href = WapSiteUrl+'/tmpl/cart_list.html?goods_id='+goods_id;
	                                }
	                              }
	                           }
	                        })
	            	}else{
                          alert("请输入正确的礼品兑换码.");
                    }
                }
	        })
	    }
	            
	})
});
	

   
                
     
    		//one wine  http://127.0.0.1/wap/tmpl/product_detail.html?goods_id=1054 
  //       $.ajax({
		// type: 'post',
		// url: ApiUrl + "/index.php?act=product_share&op=index&goods_id="+goods_id,
		// data: {key: key},
		// dataType: 'json',
		// jsonp:'callback',
		// success: function (result) {
		// var datas = result.datas;
  //           //商品列表
		// 	var data = datas.msg_list;
		// 	var html ="";
		// 	var tmpl = []; 
		// 	$.each(data, function(k, v) {
  //            tmpl += '<ul class="clearfix">'
  //             + '<li class="share_goodsli"><a href="product_detail.html?goods_id='+v.goods_id+'"><img src="/data/upload/shop/store/goods/8/'+v.goods_image+'" alt="" id="share_goods_img"/></span></a>'
  //             + '<li class="share_goodsli1 clearfix"><a href="product_freereceive.html?goods_id='+v.goods_id+'&member_id='+datas.member_id+'"><p class="share_gooddetail">'+v.share_name+'</p></a>'
  //             + '<p class="share_atonce"><span class="share_atonceshare">￥:0元</span></p></li>'
  //             + '</ul>';
  //                  //html += template.render(k, v);
  //                 // $("#product_sharet").html(html);  
  //           });
  //       	var render = template.compile(tmpl);
	 //        var html = render();
  //           $("#share_goods").html(html);

		//     }
	 //     });  

