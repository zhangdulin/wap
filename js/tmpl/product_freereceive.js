$(function () {
	// checkSameLogin();
	var key = getcookie("key");
  var goods_id = GetQueryString('goods_id');
  var member_id = GetQueryString('member_id');
  console.log(member_id);
	$.ajax({
		type: 'post',
		url: ApiUrl + "/index.php?act=product_share&op=product_freereceive&goods_id="+goods_id,
		data: {key: key,member_id:member_id},
		dataType: 'json',
		jsonp:'callback',
		success: function (result) {
			var datas = result.datas;
			var data = datas.msg_list;
			var html ="";
			var tmpl = []; 
			$.each(data, function(k, v) {
                	//v.url = buildUrl(v.goods_image);
             tmpl += '<ul class="clearfix"><li class="sharefree_goodsli">'
                  +'<a href="product_detail.html?goods_id='+v.goods_id+'"><img src="/data/upload/shop/store/goods/8/'+v.goods_image+'" id="sharefree_goods_img"/></a></li>'
                  +'<li class="sharefree_goodsli1 clearfix">'
                  +'<p class="sharefree_goodsname">'+v.goods_name+'</p>'
                  +'<p class="share_gooddetail">'+v.share_name+'</p>'
                  +'<p class="sharefree_atonce" onclick="sharefree_atonce('+v.goods_id+')"><span class="sharefree_atonceshare">点击免费领<span class="triangle_border_right"></span></span></p>'
                  +'<p class="share_goodsnumber">限量前2000个</p>'
                  +'</li></ul>';
            });
        	var render = template.compile(tmpl);
	        var html = render();
          $("#sharefree_goods").html(html);
//商品详情
          $.ajax({
                url: ApiUrl + "/index.php?act=goods&op=goods_body",
                data: {goods_id: goods_id},
                type: "get",
                success: function(result) {
                    $("#sharefree_img").html(result);
                }
            });
		}
	});
});
//弹出层
function sharefree_atonce(data) {
  layer.open({
    type: 1,
    skin: 'layui-layer-demo', //样式类名
    closeBtn: 1, //不显示关闭按钮
    title: '<div class="sharefree_dalog"><input type="hidden" value='+data+' id="goods_id"></div>',
    anim: 2,
    shadeClose: true, //开启遮罩关闭
    area: ['80%', 'auto'],
    skin: 'layui-layer-rim', //加上边框
    content: $('.sharefree_get'), //捕获的元素
  })};




$(function () {

    var rec_id = GetQueryString('rec_id');

    // $.sValid.init({//注册验证
    //     rules: {
    //         vcode: "required",
    //         username: "required",
    //     },
    //     messages: {
    //         username: "用户名需要写哦",
    //         vcode: "验证码不能为空"
    //     },
    //     callback: function (eId, eMsg, eRules) {
    //         if (eId.length > 0) {
    //             var errorHtml = "";
    //             $.map(eMsg, function (idx, item) {
    //                 errorHtml += "<p>" + idx + "</p>";
    //             });
    //             $(".error-tips").html(errorHtml).show();
    //         } else {
    //             $(".error-tips").html("").hide();
    //         }
    //     }
    // });

/*正则表达式判断手机号*/

$('#codebtn').click(function () {//获取验证码
  var telphone = $("#username").val();
    var re = /^1\d{10}$/
    if (re.test(telphone)) {
        GetCode();
    } 
});
    

    $('#loginbtn').click(function () {
        var goods_id = $('#goods_id').val();
        var username = $("input[name=username]").val();
        var vcode = $("input[name=vcode]").val();
        //if ($.sValid()) {
            $.ajax({
                type: 'post',
                url: ApiUrl + "/index.php?act=product_share&op=product_giftexchange",
                data: { username: username,vcode: vcode ,goods_id: goods_id},
                dataType: 'json',
                success: function (result) {
                  console.log(result);
                    if (!result.datas.error) {
                        window.location.href='./product_giftexchange.html?goods_id='+goods_id;
                    } else {
                        $(".error").html(result.datas.error).show();
                    }
                }
            });
        //}
    });
});



function GetCode(){
   time();
   var username = $("input[name=username]").val();
   $.ajax({
       type: 'post',
       url: ApiUrl + '/index.php?act=login&op=makeSeccode',
       data: { username: username},
       success: function (result) {
               $(".error-tips").html("短信:"+result).show();
           }
       
   });
}


var wait = 60;
function time() {
  $('#codebtn').unbind("click");
    if (wait == 0) {
    
        $('#codebtn').removeAttr("disabled");
        $('#codebtn').html("获取验证码");
        wait = 60;
     $('#codebtn').click(function(){GetCode()});
    } else {
        $('#codebtn').attr("disabled", true);
         $('#codebtn').html("重新发送(" + wait + ")");
        wait--;
        setTimeout(function () {
            time()
        },
            1000)
    }
}

