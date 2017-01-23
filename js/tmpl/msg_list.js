$(function () {
    var key = getcookie('key');
    if (key.length < 10) {
        location.href = 'login.html';
    }

    //初始化列表 获取站内信息
    function initPage() {
        $.ajax({
            type: 'post',
            url: ApiUrl + "/index.php?act=msg_list&op=msg_list",
            data: { key: key },
            dataType: 'json',
            success: function (result) {
                checklogin(result.login);
                if (result.datas.msg_list == null) {
                    $("#msg_nr_nomessge").show();
                    return false;
                }
                $("#msg_nr_nomessge").hide();
                var data = result.datas;
                var html = html_encode(template.render('saddress_list', data));
                var msgids = new Array();
                var message_ismore = new Array();
                for(var i=0;i<data.msg_list.length;i++){
                    msgids[i] = data.msg_list[i].message_id;
                }
                for(var j=0;j<data.msg_list.length;j++){
                    message_ismore[j] = data.msg_list[j].message_ismore;
                }
                console.log(html);
                $("#address_list").empty();
                $("#address_list").append(html);
                $("#msg_clear").click(function(){
                    $.sDialog({
                        content: '确定清空？',
                        okFn: function () {
                            $.ajax({
                                type: 'post',
                                url: ApiUrl + "/index.php?act=msg_list&op=delmsg",
                                data: { key: key,msg:msgids,more:message_ismore},
                                dataType: 'json',
                                success: function (result) {
                                    location.href = WapSiteUrl + '/tmpl/member/member.html';
                                }
                            });
                        }
                    })
                });
                //点击删除地址
                // $('.deladdress').click(delAddress);
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

