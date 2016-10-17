$(function(){
	$('#contrast').on('touchstart','a',function(){
		$(this).addClass('borderTop');
		$(this).siblings().removeClass('borderTop');
	});
	
	
	//初始化页面 ,从服务器加载页面数据
	initPage();
function initPage(){
    var goodsID = location.search.replace("?id=","");

    $.ajax({
			type:"GET",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			data:{
				goodsID:goodsID
			},
			dataType:"JSONP",
			success:function(data){
				console.log(typeof data);
				console.log(data);
//				console.log(data[0].goodsBenUrl);
				var Ben = JSON.parse(data[0].goodsBenUrl);
//				console.log(Ben[0]);
				var Url = JSON.parse(data[0].imgsUrl);
//				console.log(Url);
				
				if(data[0].discount != 0){
					var old_price = (data[0].price/(data[0].discount/10)).toFixed(0);
				}else{
					var old_price = data[0].price;
				}
				
				$('.main .img img').prop('src',data[0].goodsListImg);
				$('.desc p').html('¥'+data[0].price+' &nbsp;'+data[0].goodsName);
				$('.old').html('¥'+old_price);
				$('.count').html(data[0].discount+"折");
				$('.pageTwo img').prop('src',Ben[0]);
				$('.last').html(data[0].detail);
				
				//动态创建实拍页面;
				var str = '';
				$('#detail_img').html('');
				for(var i=0 ; i<Url.length; i++){
					
					str += "<div class='swiper-slide'><img src='"+ Url[i]+"'/></div>";
				}
				$('#detail_img').html(str);
				
				swiperInner = new Swiper('.pageInner',{
					pagination: '.paginationCont',
				  	paginationClickable: true,
				  	nested:true,
				});
				
			}
	});
}



});
