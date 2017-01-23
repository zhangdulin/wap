var k;

var state = GetQueryString('state');

$(function () {
    var key = getcookie('key');
    if (key == '') {
        window.location.href = WapSiteUrl + '/tmpl/member/login.html';
    }
	k=key;

    var page = pagesize;
    var curpage = 1;
    var hasMore = true;
    var readytopay = false;
    function initPage(page, curpage) {
        $.ajax({
            type: 'post',
            url: ApiUrl + "/index.php?act=member_order&op=order_list&page=" + page + "&curpage=" + curpage,
            data: { key: key, state:state},
            dataType: 'json',
            success: function (result) {
                //checklogin(result.login); //检测是否登录了
                var data = result.datas;
                data.hasmore = result.hasmore; //是不是可以用下一页的功能，传到页面里去判断下一页是否可以用
                data.WapSiteUrl = WapSiteUrl; //页面地址
                data.curpage = curpage; //当前页，判断是否上一页的disabled是否显示
                data.ApiUrl = ApiUrl;
                data.key = getcookie('key');

                //取消订单
                $(".cancel-order").click(cancelOrder);
                //下一页
                $(".next-page").click(nextPage);
                //上一页
                $(".pre-page").click(prePage);
                //确认订单
                $(".sure-order").click(sureOrder);

                $('.viewdelivery-order').click(viewOrderDelivery);

                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)!="micromessenger") 
                {
                    $('.check-payment').attr("href","#");
                } 
               
    
                $('.check-onlinepayment').click(function () {

                    var pay_sn = $("#a-check-onlinepayment").attr("pay_sn"); //order_paymentOp
                    submitOrder(pay_sn);

                });

                $(window).scrollTop(0);
            }
        });


        $.ajax({
            type: 'get',
            url: ApiUrl + "/index.php?act=member_payment&op=payment_list",
            data: { key: key },
            dataType: 'json',
            success: function (result) {
                $.each((result && result.datas && result.datas.payment_list) || [], function (k, v) {
                    // console.log(v);
                    if (v == 'alipay') {
                        readytopay = true;
                        return false;
                    }
                });
            }
        });
    }
    //初始化页面
    initPage(page, curpage);

    //下一页
    function nextPage() {
        var self = $(this);
        var hasMore = self.attr("has_more");
        if (hasMore == "true") {
            curpage = curpage + 1;
            initPage(page, curpage);
        }
    }
    //上一页
    function prePage() {
        var self = $(this);
        if (curpage > 1) {
            self.removeClass("disabled");
            curpage = curpage - 1;
            initPage(page, curpage);
        }
    }

    //取消订单
    function cancelOrder() {
        var order_id = $(this).attr("order_id");

        $.sDialog({
            content: '确定取消订单？',
            okFn: function () { cancelOrderId(order_id); }
        });
    }



    function submitOrder(pay_sn) {
        layer.open({
            title: [
        '请输入验证码',
        'background-color:#ff8a00; color:#fff;'
    ],
            content: '<input type="password" placeholder="支付密码" class="input-40" name="pwd" id="paypwd"/>&nbsp; <input type="text" placeholder="验证码" class="input-40" name="pwd" id="vcode"/>      <div class="error-tips mt10"></div> <input type="button"  onclick="GetCode()" class="l-btn-login mt10" value="获取验证码" id="codebtn" /><input type="button"  onclick="payOrder(\''+pay_sn+'\')" class="l-btn-login mt10" value="确认付款" id="orderbtn" />'

        });
    }

 

    


    function cancelOrderId(order_id) {
        $.ajax({
            type: "post",
            url: ApiUrl + "/index.php?act=member_order&op=order_cancel",
            data: { order_id: order_id, key: key },
            dataType: "json",
            success: function (result) {
                if (result.datas && result.datas == 1) {
                    initPage(page, curpage);
                }
            }
        });
    }

    //确认订单
    function sureOrder() {
        var order_id = $(this).attr("order_id");

        $.sDialog({
            content: '确定确认订单？',
            okFn: function () { sureOrderId(order_id); }
        });
    }

    function sureOrderId(order_id) {
        $.ajax({
            type: "post",
            url: ApiUrl + "/index.php?act=member_order&op=order_receive",
            data: { order_id: order_id, key: key },
            dataType: "json",
            success: function (result) {
                if (result.datas && result.datas == 1) {
                    initPage(page, curpage);
                }
            }
        });
    }

    function viewOrderDelivery() {
        var orderId = $(this).attr('order_id');
        location.href = WapSiteUrl + '/tmpl/member/order_delivery.html?order_id=' + orderId;
    }
	

});


function payOrder(pay_sn) {
  
    var paypwd = $("#paypwd").val();
    var vcode = $("#vcode").val();
    $.ajax({
        type: "post",
        url: ApiUrl + "/index.php?act=member_order&op=order_payment",
        data: { pay_sn: pay_sn, key: k, paypwd: paypwd, vcode: vcode },
        dataType: "json",
        success: function (result) {
       
            if (result.datas && result.datas == 1) {
                //  initPage(page, curpage);
                window.location.href = window.location.href;
            }
            if (result.datas && result.datas == 2) {
                alert("当前预存款余额不够");
            }
            if (result.datas && result.datas == 3) {
                $(".error-tips").html("验证码不对").show();
            }
            if (result.datas && result.datas == 4) {
                $(".error-tips").html('支付密码不对').show();
            }
            if (result.datas && result.datas == 5) {
                $(".error-tips").html('订单有误，请取消重新下订单').show();
            }
            if (result.datas && result.datas == 6) {
                $(".error-tips").html('支付失败，请重新支付！').show();
            }
			if (result.datas && result.datas ==7) {
                $(".error-tips").html('支付失败,订单异常').show();
            }
            if($('.error-tips').html =''){
                paytime();
            }
        }
    });
}


	function GetCode() {
	
    time();
    $.ajax({
        type: 'post',
        url: ApiUrl + '/index.php?act=member_order&op=makePaySeccode',
        data: { key: k },
        success: function (result) {
            $(".error-tips").html("短信:" + result).show();
        }

    });
}

function paytime() {
    $('#orderbtn').attr("disabled", true);
    $('#orderbtn').val("正在付款...");
      
}  

var wait = 60;
function time() {
    $('#codebtn').unbind("click");
    if (wait == 0) {

        $('#codebtn').removeAttr("disabled");
        $('#codebtn').val("获取验证码");
        wait = 60;
        $('#codebtn').click(function () { GetCode() });
    } else {
        $('#codebtn').attr("disabled", true);
        $('#codebtn').val("重新发送(" + wait + ")");
        wait--;
        setTimeout(function () {
            time()
        },
            1000)
    }
}  

//state10 20 30 40  
$(function(){
	$(".order-list-nex").click(function(){
		
	$(".order-bottom-three-bor").css('color','red');
	$(".order-bottom-three-bor").css('width','150px');
	$(".order-bottom-threes").css('border','3px');
	
		});
	
	});	

 $('.order-list-next').each(function(){
    if($($(this))[0].href==String(window.location))
	{
    $(this).parent().addClass('active');
	}
        
});
