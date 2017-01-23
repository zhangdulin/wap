/*$(function() {
	//var headTitle = document.title;
    var specialId = GetQueryString("special_id");

    $.ajax({
        url: ApiUrl + "/index.php?act=index&op=special&special_id=" + specialId,
        type: 'get',
        dataType: 'json',
        success: function(result) {
            var data = result.datas;
            var html = '';

            $.each(data, function(k, v) {
                $.each(v, function(kk, vv) {
                    switch (kk) {
                        case 'adv_list':
                        case 'home3':
                            $.each(vv.item, function(k3, v3) {
                                vv.item[k3].url = buildUrl(v3.type, v3.data);
                            });
                            break;

                        case 'home1':
                            vv.url = buildUrl(vv.type, vv.data);
                            break;

                        case 'home2':
                        case 'home4':
                            vv.square_url = buildUrl(vv.square_type, vv.square_data);
                            vv.rectangle1_url = buildUrl(vv.rectangle1_type, vv.rectangle1_data);
                            vv.rectangle2_url = buildUrl(vv.rectangle2_type, vv.rectangle2_data);
                            break;
                    }
                    html += template.render(kk, vv);
                    return false;
                });
            });

            $("#main-container").html(html);

            $('.adv_list').each(function() {
                if ($(this).find('.item').length < 2) {
                    return;
                }

                    Swipe(this, {
                    startSlide: 2,
                    speed: 400,
                    auto: 3000,
                    continuous: true,
                    disableScroll: false,
                    stopPropagation: false,
                    callback: function(index, elem) {},
                    transitionEnd: function(index, elem) {}
                });
            });

        }
    });

});*/







//倒计时
$(function(){
	
setInterval(changTime, 1000);
function changTime(){
document.getElementById("time").innerHTML=getTime();
document.getElementById("day").innerHTML=getDay();
document.getElementById("hou").innerHTML=getHours();
document.getElementById("min").innerHTML=getMinutes();
document.getElementById("sec").innerHTML=getSeconds();
changeStyle();

}
function gR()
{
 return Math.floor(Math.random()*16);
}
function changeStyle(){
var ele=document.getElementById("time");
//var size=Math.random()*40;
//ele.style.fontSize=((size+10)+"px");
//var mc=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
//ele.style.color="#"+mc[gR()]+mc[gR()]+mc[gR()]+mc[gR()]+mc[gR()]+mc[gR()];
//ele.style.background="#000"; 
ele.style.fontSize="20px";
ele.style.height="30px";
ele.style.lineHeight="30px"; 
ele.style.width="10px";
}
function getTime(){
 var now=new Date().getTime();
 var end=new Date("2016/10/31").getTime();
 var temp=end-now;
 if(temp<=0)
 {
  document.getElementById("first").innerHTML="抢购活动已结束！！";
  return "";
 }else
 {
 var temp2=new Date();
 temp2.setTime(temp);
 var sec=Math.floor((temp)/1000%60);
 var min=Math.floor(temp/(60*1000)%60);
 var hou=Math.floor(temp/(60*60*1000)%24);
 var day=Math.floor(temp/(24*60*60*1000));

 return day+":"+hou+":"+min+":"+sec;
 

 }
}

function getDay(){
 var now=new Date().getTime();
 var end=new Date("2016/10/31").getTime();
 var temp=end-now;
 if(temp<=0)
 {
  document.getElementById("first").innerHTML="抢购活动已结束！！";
  return "";
 }else
 {
 var temp2=new Date();
 temp2.setTime(temp);

 var day=Math.floor(temp/(24*60*60*1000));

 return day;
 }
}



function getHours(){
 var now=new Date().getTime();
 var end=new Date("2016/10/31").getTime();
 var temp=end-now;
 if(temp<=0)
 {
  document.getElementById("first").innerHTML="抢购活动已结束！！";
  return "";
 }else
 {
 var temp2=new Date();
 temp2.setTime(temp);

 var hou=Math.floor(temp/(60*60*1000)%24);


 return hou;
											
 }
}



function getMinutes(){
 var now=new Date().getTime();
 var end=new Date("2016/10/31").getTime();
 var temp=end-now;
 if(temp<=0)
 {
  document.getElementById("first").innerHTML="抢购活动已结束！！";
  return "";
 }else
 {
 var temp2=new Date();
 temp2.setTime(temp);

 var min=Math.floor(temp/(60*1000)%60)

 return min;

 }
}


function getSeconds(){
 var now=new Date().getTime();
 var end=new Date("2016/10/31").getTime();
 var temp=end-now;
 if(temp<=0)
 {
  document.getElementById("first").innerHTML="抢购活动已结束！！";
  return "";
 }else
 {
 var temp2=new Date();
 temp2.setTime(temp);
 var sec=Math.floor((temp)/1000%60);

 return sec;
												
 }
}


	
	});