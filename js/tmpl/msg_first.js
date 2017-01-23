$(function () {
    var key = getcookie('key');
    var message_id = GetQueryString("message_id");

    if (key.length < 10) {
        location.href = 'login.html';
    }

    //初始化列表 获取站内信息
    function initPage() {
        $.ajax({
            type: 'post',
            url: ApiUrl + "/index.php?act=msg_list&op=msg_first",
            data: { key: key,message_id:message_id},
            dataType: 'json',
            success: function (result) {
                checklogin(result.login);
                if (result.datas.msg_list == null) {
                    return false;
                }
                var data = result.datas;
                var html = html_encode(template.render('saddress_list', data));
                console.log(html);
                $("#address_list").empty();
                $("#address_list").append(html);
            }
        });
    }
    initPage();
}); 

 function html_encode(str)   
{   
  var s = "";   
  if (str.length == 0) return "";   
  s = str.replace(/&#60;/g, "<");   
  s = s.replace(/&#62;/g, ">");
  s = s.replace(/&#34;/g, "\"");    
  return s;   
}