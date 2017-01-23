//优惠券传入
$(function() {
    var key = getcookie('key');
    if (key == '') {
        window.location.href = WapSiteUrl+'/tmpl/member/login.html';
        return;
    }

    var page = pagesize;
    var curpage = 1;
    var hasMore = true;
    var voucher_state = GetQueryString('voucher_state');
    $("[data-state='"+voucher_state+"']").addClass('current');
    function initPage(page,curpage) {
        $.ajax({
            type:'post',
            url:ApiUrl+"/index.php?act=member_voucher&op=voucher_list&page="+page+"&curpage="+curpage,
            data:{key:key,voucher_state:voucher_state},
            dataType:'json',
            success:function(result){
                checklogin(result.login); //检测是否登录了
                var data = result.datas;
                data.hasmore = result.hasmore; //是不是可以用下一页的功能，传到页面里去判断下一页是否可以用
                data.WapSiteUrl = WapSiteUrl; //页面地址
                data.curpage = curpage; //当前页，判断是否上一页的disabled是否显示
                data.ApiUrl = ApiUrl;
                data.key = getcookie('key');
                var timestamp = Date.parse(new Date())/1000;
                    data['timestamp'] =timestamp;
              //   var voucherlist =[];
              //       voucherlist = result.datas.voucher_list;
              //   var voucher_end_date =[];
              // $.each(voucherlist,function(k,v){
              //   console.log(v.voucher_end_date);
              // 	 voucher_end_date =v.voucher_end_date;
              // });
              // console.log(voucher_end_date);   
                 template.helper('tsToDateString', function (t) {
                    var d = new Date(parseInt(t) * 1000);
                    var s = '';
                    s += d.getFullYear() + '年';
                    s += (d.getMonth() + 1) + '月';
                    s += d.getDate() + '日';
                    return s;
                });
                //console.log(d);
                var html = template.render('voucher-list-tmpl', data);

                $("#voucher-list").html(html);

                 //下一页
                 $(".next-page").click(nextPage);

                 //上一页
                 $(".pre-page").click(prePage);

                 $(window).scrollTop(0);
                
            }
        });
    }

    // 初始化页面
    initPage(page, curpage);

    // 下一页
    function nextPage() {
        var hasMore = $(this).attr("has_more");
        if (hasMore == "true") {
            curpage++;
            initPage(page, curpage);
        }
    }

    // 上一页
    function prePage() {
        if (curpage > 1) {
            $(this).removeClass("disabled");
            curpage--;
            initPage(page, curpage);
        }
    }

});

//选择优惠券 
function choice(price){
	var  discountprice = price;
	var key = getcookie('key');
    var totalPrice = GetQueryString('totalPrice');
	var ifcart = GetQueryString('ifcart');
    var goods_id = GetQueryString("goods_id");
	var number = GetQueryString("buynum");
	var cart_id = goods_id+'|'+number;
	if (discountprice > totalPrice) {
		alert("您还未达到优惠条件");
	}else{
		if(ifcart==1){
				var cart_id = GetQueryString('cart_id');
				window.location.href= WapSiteUrl +"/tmpl/order/buy_step1.html?ifcart="+ifcart+'&cart_id='+cart_id+'&discountprice='+discountprice; 
		    }else{
			window.location.href= WapSiteUrl +"/tmpl/order/buy_step1.html?goods_id="+goods_id+'&buynum='+number+'&discountprice='+discountprice; 
			}	

		//window.location.href= WapSiteUrl +"/tmpl/order/buy_step1.html?goods_id="+goods_id+'&buynum='+buynum+'&newPrice='+newPrice+'&discountprice='+discountprice; 
		}
}


//不选择优惠券
function nouse(){
	var key = getcookie('key');
    var totalPrice = GetQueryString('totalPrice');
	var ifcart = GetQueryString('ifcart');
    var goods_id = GetQueryString("goods_id");
	var number = GetQueryString("buynum");
	var cart_id = goods_id+'|'+number;
	if(ifcart==1){
				var cart_id = GetQueryString('cart_id');
				window.location.href= WapSiteUrl +"/tmpl/order/buy_step1.html?ifcart="+ifcart+'&cart_id='+cart_id; 
		    }else{
			window.location.href= WapSiteUrl +"/tmpl/order/buy_step1.html?goods_id="+goods_id+'&buynum='+number; 
			}	
}
