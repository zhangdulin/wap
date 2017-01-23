$(function () {
    var key = getcookie('key');
    if (key.length < 10) {
        location.href = 'login.html';
    }
    var user_id = getcookie('id');

    var level = GetQueryString('level');
    if(level == '1')
    {
        $('h2').html('一级朋友');
    }else if(level == '2'){
        $('h2').html('二级朋友');
    }else if(level == '3'){
        $('h2').html('三级朋友');
    }else{
        return false;
    }

    $.ajax({
        type: 'post',
        url: ApiUrl + "/index.php?act=member_index&op=memberAgents",
        data: {
            user_id: user_id,
        },
        dataType: 'json',
        success: function (result) {
            var data = result.datas;
            var agents_data = {};
            console.log(data);
            if(level == '1')
            {
                $('h2').html('一级朋友');
                agents_data.list = data.first_level;
            }else if(level == '2'){
                $('h2').html('二级朋友');
                agents_data.list = data.second_level;
            }else if(level == '3'){
                $('h2').html('三级朋友');
                agents_data.list = data.third_level;
            }else{
                return false;
            }
            console.log(agents_data);
            var html = template.render('agents_list', agents_data);
            $("#agents_data").append(html);            
        }
    });
});

function getcookie(name){
    var strcookie=document.cookie;
    var arrcookie=strcookie.split("; ");
    for(var i=0;i<arrcookie.length;i++){
    var arr=arrcookie[i].split("=");
    if(arr[0]==name)return arr[1];
    }
    return "";
}

function setCookies(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
} 
/*我的朋友展示*/
// $(function(){
//         $('.distribution_sharebroker_level1').hide();
//         $('.distribution_sharebroker_level2').hide();
//         $('.distribution_sharebroker_level3').hide();

//         $('.distribution_sharebroker_inner1').click(function(){
//         $('.distribution_sharebroker_inner2').css("border-bottom","none");
//         $('.distribution_sharebroker_inner3').css("border-bottom","none");
//         $(this).css('border-bottom','2px solid #ff0000');
//         $('.distribution_sharebroker_level2').hide();
//         $('.distribution_sharebroker_level3').hide();
//         $('.distribution_sharebroker_level1').show();
         
//         });
//         $('.distribution_sharebroker_inner2').click(function(){
//         $('.distribution_sharebroker_inner1').css("border-bottom","none");
//         $('.distribution_sharebroker_inner3').css("border-bottom","none");    
//         $(this).css('border-bottom','2px solid #ff0000');
//         $('.distribution_sharebroker_level1').hide();
//         $('.distribution_sharebroker_level3').hide();
//         $('.distribution_sharebroker_level2').show();
         
//         });
      
//       $('.distribution_sharebroker_inner3').click(function(){
//         $('.distribution_sharebroker_inner1').css("border-bottom","none");
//         $('.distribution_sharebroker_inner2').css("border-bottom","none");
//         $(this).css('border-bottom','2px solid #ff0000');
//         $('.distribution_sharebroker_level1').hide();
//         $('.distribution_sharebroker_level2').hide();
//         $('.distribution_sharebroker_level3').show();
         
//         });
// });