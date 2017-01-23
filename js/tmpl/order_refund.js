    	$(function() {
    	    var order_goods_id = GetQueryString('order_goods_id');

    	    var key = getcookie('key');
            var user_id = getcookie('id');
            var order_id = order_goods_id.split(",")[0];
            var goods_id = order_goods_id.split(",")[1];
            
            $('.type_2').hide();
            $('#refund_type').change(function(){
               if($(this).val() == 1)
               {
                $('.type_2').hide();
                init();
               }else{
                $('.type_2').show();
                init();                
               }
            });

            init();

            $('.add_address').click(submit);

            function init()
            {
                $('#order_id').val(order_id);
                $('#goods_id').val(goods_id);
                $('#user_id').val(user_id);
                $.ajax({
                    type: 'post',
                    url: ApiUrl + "/index.php?act=member_order&op=order_refund",
                    data: {
                        key: key,
                        user_id: user_id,
                        order_id: order_id,
                        goods_id: goods_id,
                    },
                    dataType: 'json',
                    success: function(result) {
                        if (result) {
                            var data = result.datas;
                            //console.log(data);
                            $('.max_amount').html(data.order.goods_list[0].goods_pay_price);
                            var str = "";
                            for ( var r in data.reason_list) {
                                  str += '<option value="'+data.reason_list[r].reason_id+'">'+data.reason_list[r].reason_info+'</option>';
                            };
                            $('select[name="reason_id"]').empty();
                            $('select[name="reason_id"]').append(str+'<option value="0">其他</option>');
                        }
                    }
                });                
            }          

    	    function submit(){
        	        $.ajax({
        	            type: 'post',
        	            url: ApiUrl + "/index.php?act=member_order&op=add_refund",
        	            data: $("form").serialize(),
        	            dataType: 'json',
        	            success: function(result) {
                            var data = result.datas;
                            console.log(data);
                            location.href = WapSiteUrl + '/tmpl/member/order_list.html';
        	            }
        	        });
    	    };


    	});