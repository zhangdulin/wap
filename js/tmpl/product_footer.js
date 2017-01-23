$(function (){
    var memberHtml = '<a class="btn mr5" href="'+WapSiteUrl+'/tmpl/member/member.html?act=member">个人中心</a>';
    var act = GetQueryString("act");
    if(act && act == "member"){
        memberHtml = '<a class="btn mr5" id="logoutbtn" href="javascript:void(0);">注销账号</a>';
    }
    // var tmpl = '<div class="footer">'
    //     +'<div class="footer-top">'
    //         +'<div class="footer-tleft">'+ memberHtml +'</div>'
    //         +'<a href="javascript:void(0);"class="gotop">'
    //             +'<span class="gotop-icon"></span>'
    //             +'<p>回顶部</p>'
    //         +'</a>'
    //     +'</div>'
    //     +'<div class="footer-content">'
    //         +'<p class="link">'
    //             +'<a href="'+SiteUrl+'" class="standard">标准版</a>'
    //             +'<a href="'+AndroidSiteUrl+'">下载Android客户端</a>'
    //         +'</p>'
    //         +'<p class="copyright">'
    //             +'版权所有 2015 © 康尔佳'
    //         +'</p>'
    //     +'</div>'
    // +'</div>';

    var tmpl = '<div style="height:50px;display:block"></div><div class="main-opera-pannel" style="display: block;              position:fixed;bottom:0; width:100%;">'
                    + '<div class="main-op-table main-op-warp">'
                        + ' <a href="'+SiteUrl+'/wap/index.html" class="quarter"><span class="i-home"></span><p>首页</p></a>'
                        + ' <a href="/one/plus/list.php?tid=1" class="quarter"><span class="i-categroy"></span><p>发现</p>'
                        + '</a><a href="http://www.viptry.cn/wap/tmpl/cart_list.html" class="quarter"><span class="i-cart"></span><p>&nbsp;购物车</p></a>'
                        + '<a href="http://www.viptry.cn/wap/tmpl/member/member.html?act=member" class="quarter"><span class="i-mine"></span><p>&nbsp;我的</p></a>'
                    + '</div>'
                + '</div>';

    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)!="micromessenger") 
    {
        tmpl='';
    } 
    var headTitle = document.title;
    //当前页面
	var render = template.compile(tmpl);
	var html = render();
	
	$("#footer").html(html);
    if(headTitle == "商品分类"){
        $(".i-categroy").parent().addClass("current");
    }else if(headTitle == "购物车列表"){
        $(".i-cart").parent().addClass("current");
    }else if(headTitle == "我的商城"){
        $(".i-mine").parent().addClass("current");
    }else if(headTitle == "首页"){
        $(".i-home").parent().addClass("current");
    }
    //回到顶部
    $(".gotop").click(function (){
        $(window).scrollTop(0);
    });
    var key = getcookie('key');
	// $('#logoutbtn').click(function(){
	// 	var username = getcookie('username');
	// 	var key = getcookie('key');
	// 	var client = 'wap';
	// 	$.ajax({
	// 		type:'get',
	// 		url:ApiUrl+'/index.php?act=logout',
	// 		data:{username:username,key:key,client:client},
	// 		success:function(result){
	// 			if(result){
	// 				delCookie('username');
	// 				delCookie('key');
	// 				location.href = WapSiteUrl+'/tmpl/member/login.html';
	// 			}
	// 		}
	// 	});
	// });
    $('#logoutbtn').click(function(){
        $.sDialog({
            content: '确定注销？',
            okFn: function () { logOut(); }
        })
    })

    function logOut() {
        var username =getcookie('username');
        var key =getcookie('key');
        var client ='wap';
        $.ajax({
            type:'get',
            url:ApiUrl+'/index.php?act=logout',
            data:{username:username,key:key,client:client},
            success:function(result){
                if(result){
                    delCookie('username');
                    delCookie('key');
                    location.href = WapSiteUrl+'/tmpl/member/login.html';
                }
            }
        });
    }
});