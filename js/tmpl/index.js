$(function() {
    var key = GetQueryString("token");
    var ua = navigator.userAgent.toLowerCase();
    $.ajax({
            type: 'post',
            url: ApiUrl + "/index.php?act=member_index",
            data: { key: key },
            dataType: 'json',
            //jsonp:'callback',
            success: function (result) {
                if(result.datas.member_info.user != null)
                {
                    checklogin(result.login);
                    setCookies('user', result.datas.member_info.user_name);
                    setCookies('id', result.datas.member_info.user_id);
                    setCookies('key', key); 
                    return false;                   
                }
            }
        });
    $.ajax({
        url: ApiUrl + "/index.php?act=index",
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

            $.ajax({
                type: 'get',
                url: ApiUrl + "/index.php?act=index&op=getGroupbuy",
                dataType: 'json',
                success: function(result) {
                    if (result) {
                        var data = result.datas;
                        var html = template.render('group_buy_tmp', data);
                        $("#limit_buy").html(html);
                    }
                    timeshow(data.group_buy_list[0].count_down);
                }
            });    

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

    $.get(ApiUrl + "/index.php?act=msg_list&op=get_msg_unopen",function(data){
        //console.log(data);
        $('#message').html(data);
    })

    $('.search-btn').click(function(){
        var keyword = encodeURIComponent($('#keyword').val());
        location.href = WapSiteUrl+'/tmpl/product_list.html?keyword='+keyword;
    });

    function timeshow(downtime)
    {
        var tms = [];
        var day = [];
        var hour = [];
        var minute = [];
        var second = [];

        tms[tms.length] = downtime;
        day[day.length] = "d1";
        hour[hour.length] = "h1";
        minute[minute.length] = "m1";
        second[second.length] = "s1";
        function groupbuyTakeCount() {
            for (var i = 0, j = tms.length; i < j; i++) {
                tms[i] -= 1;
                //计算天、时、分、秒、
                var days = Math.floor(tms[i] / (1 * 60 * 60 * 24));
                var hours = Math.floor(tms[i] / (1 * 60 * 60)) % 24;
                var minutes = Math.floor(tms[i] / (1 * 60)) % 60;
                var seconds = Math.floor(tms[i] / 1) % 60;
                if (days < 0)
                    days = 0;
                if (hours < 0)
                    hours = 0;
                if (minutes < 0)
                    minutes = 0;
                if (seconds < 0)
                    seconds = 0;
                //将天、时、分、秒插入到html中
                document.getElementById(day[i]).innerHTML = days;
                document.getElementById(hour[i]).innerHTML = hours;
                document.getElementById(minute[i]).innerHTML = minutes;
                document.getElementById(second[i]).innerHTML = seconds;
            }
        }
        setInterval(groupbuyTakeCount, 1000);
    }

});


