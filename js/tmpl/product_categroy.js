$(function () {
    $.ajax({
        url: ApiUrl + "/index.php?act=goods_class&op=goods_class_list",
        type: 'get',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function (result) {
            var data = result.datas;
         
            var html = template.render('category-one', data);
            $("#contain").html(html);
        }
    });

    $.ajax({
        url: ApiUrl + "/index.php?act=goods_class&op=goods_class_second_list",
        type: 'get',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function (result) {
            var data = result.datas;
            var html = template.render('category-one', data);
            $(".menu").html(html);
            $('#780').trigger('click');
        }
    });

    $('.cate').live('click',function(){
        gc_id = $(this).attr('id');
        $.ajax({
            url: ApiUrl + "/index.php?act=goods_class&op=get_sub_class&gc_id="+gc_id,
            type: 'get',
            dataType: 'json',
            success: function (result) {
                var data = result.datas;
                var html = template.render('category-two', data);
                $(".cbox").html(html);
            }
        });

        $('.current').addClass('common');
        $('.current').removeClass('current');
        $(this).addClass('current');   
        $(this).removeClass('common');   
    })

    $('.search_bt').live('blur',function(){
        var keyword = encodeURIComponent($(this).val());
        location.href = WapSiteUrl+'/tmpl/product_list.html?keyword='+keyword;
    })
});