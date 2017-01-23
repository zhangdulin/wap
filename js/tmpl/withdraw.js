$(function () {
    //  获取用户手机号码隐藏
    var key = getcookie('key');
    console.log(key);
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=withdraw&op=member_id",
        data: {key:key},
        dataType: 'json',
        success: function (result) {
             console.log(result);
             $("#username").val(result.datas.msg_list.member_name);
             $("#money").html(result.datas.config.number);
        }
    });
})


// 获取焦点从新给隐藏val赋值
$(".card").focus(function (){
    $(".hidden").val('');
    $('.import').html("");
})
// 银行卡号
$(".card").blur(function (){
    var key = getcookie('key');
    if (key.length < 10) {
        location.href = 'login.html';
    }
   var bank =  $(".card").val();
    if(!bank || typeof(bank) == "undefined" || bank == 0){
        $(".import").html('请先输入银行卡号');
        return false;
    }
     var lastNum=bank.substr(bank.length-1,1);//取出最后一位（与luhm进行比较）
 
    var first15Num=bank.substr(0,bank.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9
     
    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
            arrJiShu.push(parseInt(newArr[j])*2);
            else
            arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else //偶数位
        arrOuShu.push(newArr[j]);
    }
     
    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }        
     
    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }
     
    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }
     
    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }      
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
     
    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
    var luhm= 10-k;
     
    if(lastNum==luhm){
        // $(".import").html("银行卡输入格式正确");
    }else{
        $(".import").html("银行卡号不合法,请从新输入");
        $(".hidden").val(1);
        return false;
    }        
     $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=withdraw&op=index",
        data: {bank:bank},
        dataType: 'json',
        success: function (result) {
             $(".card_type").val(result.datas.member_info);
        }
    });
})



// 获取焦点从新给隐藏val赋值
$(".identity").focus(function (){
    $(".hidden").val('');
    $('.import').html("");
})
// 身份证号码
$(".identity").blur(function (){
    var idcard =  $(".identity").val();
    if(!idcard || typeof(idcard) == "undefined" || idcard == 0){
        $(".import").html('请输入身份证号码');
        return false;
    } 
    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=withdraw&op=idcard",
        data: {idcard:idcard},
        dataType: 'json',
        success: function (result) {
            var idcard_mi = result.datas.member_info;
            if(idcard_mi == 2){
                $(".hidden").val(2);
                $(".import").html('身份证号码格式不正确');
            }else if(idcard_mi == 3){
                $(".hidden").val(3); 
                $(".import").html('省份日期格式不正确');
            }else if(idcard_mi == 4){
                $(".hidden").val(4); 
                $(".import").html('身份证号码不存在');
            }
        }
    });
})




// 手机发送短信
function GetCode(){
    time();
    var username = $("#username").val();
    //console.log(username);
    $.ajax({
        type: 'post',
        url: ApiUrl + '/index.php?act=login&op=makeSeccode',
        data: { username: username},
        success: function (result) {
            //console.log(result);
            $(".error-tips").html("短信:"+result).show();
        }
    });
}
$(function () {

    var rec_id = GetQueryString('rec_id');

    /*正则表达式判断手机号*/

    $('#codebtn').click(function () {//获取验证码
        var telphone = $("#username").val();
        console.log(telphone);
        var re = /^1\d{10}$/
        if (re.test(telphone)) {
            //console.log(telphone);
            GetCode();
        }
    });


    $('#loginbtn').click(function () {
        var username = $("input[name=username]").val();
        var vcode = $("input[name=vcode]").val();
        //if ($.sValid()) {
        $.ajax({
            type: 'post',
            url: ApiUrl + "/index.php?act=product_share&op=product_giftexchange",
            data: { username: username,vcode: vcode },
            dataType: 'json',
            success: function (result) {
                //console.log(result);
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




// 提交申提现
$('#btn_subli').click(function(){

   var input_val =  $(".hidden").val();
       var money =  parseInt($("#money").html()); // 最低提现金额
        if(input_val == 1){
            $(".import").html("银行卡号不合法,请从新输入");
            return false;
        }else if(input_val == 2){
            $(".import").html("身份证号码格式不正确");
            return false;
        }else if(input_val == 3){
            $(".import").html("省份日期格式不正确");
            return false;
        }else if(input_val == 4){
            $(".import").html("身份证号码不存在");
            return false;
        }
    var key = getcookie('key');
    var myname =  $(".myname").val(); // 真实姓名
    var identity =  $(".identity").val(); // 身份证
    var card =  $(".card").val();         // 卡号
    var card_address =  $(".card_address").val(); // 开户行地址
    var card_type =  $(".card_type").val(); // 开户行
    var wd_amount =  $(".wd_amount").val(); // 提现金额
    var vcode =  $(".vcode").val();   // 验证码



    if(!myname || typeof(myname) == "undefined" || myname == 0){
        $(".import").html('请输入姓名');
        return false;
    }else if(!identity || typeof(identity) == "undefined" || identity == 0){
        $(".import").html('请输入身份证');
        return false;
    }else if(!card || typeof(card) == "undefined" || card == 0){
        $(".import").html('请输入卡号');
        return false;
    }else if(!card_address || typeof(card_address) == "undefined" || card_address == 0){
        $(".import").html('请输入开户行地址');
        return false;
    }else if(!wd_amount || typeof(wd_amount) == "undefined" || wd_amount == 0){
        $(".import").html('请输入金额');
        return false;
    }else if(!vcode || typeof(vcode) == "undefined" || vcode == 0){
        $(".import").html('请输入验证码');
        return false;
    }else if(money > wd_amount){
        $(".import").html('最低提现金额为'+money);
        return false;
    }

    $.ajax({
            type: 'post',
            url: ApiUrl + "/index.php?act=Withdraw&op=Withdraw_submit",
            data: { myname: myname, identity:identity ,card:card, card_address:card_address, card_type:card_type, wd_amount:wd_amount, vcode:vcode,key:key},
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if(!result.datas.error){
                    location.href = WapSiteUrl+'/tmpl/member/withdraw_history.html';
                }
                $(".error-tips").html(result.datas.error).show();
            }
        });

})
    



