//优惠券显现
//原始总价
$(function(){
function choiceyouhui(){
        alert(1);
console.log($("input[name=total_priceold]").val());
   var totalPrice =$("input[name=total_priceold]").val();
console.log(totalPrice);
    //var totalPrice =parseInt($(".store_total").html().replace('￥', ''));
    var totalPrice =$("input[name=total_priceold]").val();
    var ifcart = GetQueryString('ifcart');
    var goods_id = GetQueryString("goods_id");
    var number = GetQueryString("buynum");
    var cart_id = goods_id+'|'+number;
    if(ifcart==1){
        var cart_id = GetQueryString('cart_id');
        window.location.href= WapSiteUrl +"/tmpl/order/buy_step1choice.html?ifcart="+ifcart+'&cart_id='+cart_id+'&totalPrice='+totalPrice;
    }else{
        window.location.href= WapSiteUrl +"/tmpl/order/buy_step1choice.html?goods_id="+goods_id+'&buynum='+number+'&totalPrice='+totalPrice;
    }   
}
});