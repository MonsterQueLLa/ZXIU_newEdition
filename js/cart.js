
$(function(){
	$(".content").load("footer_a.html");  

	if($.fn.cookie("u_status")!=1){
		location.href="me.html";
	}
	else 
	{
		var userid=$.fn.cookie("u_name");
		console.log(userid);
		$("footer").load("footer.html");
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getCar.php",
			async:true,
			data:{
				userID:userid
			},
			dataType:"jsonp",
			success:function(data){
//				console.log(data);
				var len=data.length;
				var listStr="";
				for (var i = 0; i < len; i++) {
					var tplStr=$("#cart_cell_tpl").html();
					var $tplStr=tplStr.replace("{{imgSrc}}",data[i].goodsListImg)
										.replace("{{goodsName}}",data[i].goodsName)
										.replace("{{goodsPrice}}",data[i].price)
										.replace("{{goodsNum}}",data[i].number)
										.replace("{{goodsId}}",data[i].goodsID)
										.replace("{{goodsClass}}",data[i].className);
					listStr+=$tplStr;
				}
				$(".cart_list").append(listStr);
				$(".cart_cell")
			},
			error:function(error){
				
			}
		});
	}
})
