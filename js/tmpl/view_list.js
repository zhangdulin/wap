$(function(){
    var goods = getcookie('goods');
		
    if(goods.length>0){
        var goods_info = goods.split('@');
        if(goods_info.length>0){
            for(var i=0;i<goods_info.length;i++){
                    AddViewGoods(goods_info[i]);
            }
            var html1 = '<div class="clear_all">'
            	      +'<div class="clear_s" id="clears">一键清空</div>'
		              +'</div>';

            $('.clear_alls').append(html1);
        }     
    }
    else
    {
        var html = '<center>'
    			+'<li>没有符合条件的记录</li>'
    			+'</centr>'
    			+'<div class="clear_all">'
                    +'<div class="clear_s" id="goto">再去逛逛吧～</div>'
			    +'</div>';
        $('#viewlist').append(html);        
    }
    $('#clears').click(function(){
        $.sDialog({
            content: '确定清空？',
            okFn: function () { delCook(); }
        })
    });
	$('#goto').click(function(){
		window.location.href = WapSiteUrl+'/tmpl/product_list.html?keyword=';
	})        
});

function delCook(){
        delCookie('goods');
        location.reload();
}
function AddViewGoods(goods_id){
	$.ajax({
		type:'get',
		url:ApiUrl+'/index.php?act=goods&op=goods_detail&goods_id='+goods_id,
		dataType:'json',
		success:function(result){
			var pic = result.datas.goods_image.split(',');
			var html = '<li>'
			    +'<a href="'+WapSiteUrl+'/tmpl/product_detail.html?goods_id='+result.datas.goods_info.goods_id+'" class="mf-item clearfix">'
				+'<span class="mf-pic">'
					+'<img src="'+pic[0]+'"/>'
				+'</span>'
				+'<div class="mf-infor">'
				+'<p class="mf-pd-name">'+result.datas.goods_info.goods_name+'</p>'
				+'<p class="mf-pd-price">￥'+result.datas.goods_info.goods_price+'</p></div>';
    			+'</a></li>';
			$('#viewlist').append(html);
		}
	});
}
