showSlidedata();
showListdata();

console.log($('footer>div'));
$('footer>div').eq(0).on('click tap',function(){
	location.href = 'shop_V1.html';
});
$('footer>div').eq(1).on('click tap',function(){
	location.href = 'classifyList.html';
});
$('footer>div').eq(2).on('click tap',function(){
	location.href = 'cart.html';
});
$('footer>div').eq(3).on('click tap',function(){
	location.href = 'me.html';
});


$('footer>div').eq(0).css('border-top','#e43669 3px solid');

//获取并添加轮播图信息;
function showSlidedata(){
    	var baseURL = "http://datainfo.duapp.com/shopdata/";
    	var tmpURL = "getBanner.php";
    	$.ajax({
    		type:"get",
    		url:baseURL+tmpURL,
    		dataType:"JSONP",
  			success: function(data){
//  			console.log(typeof data);
//  			console.log(data);
				for(var i = 0;i<data.length; i++){
//					console.log(data[i].goodsBenUrl);
					var Data = JSON.parse(data[i].goodsBenUrl);
//					console.log(Data[0]);
					$('.slide'+(i+1)+'>img').attr('src',Data[0]);
				}
				var swiper = new Swiper('.banner', {
					pagination: '.swiper-pagination',
			        paginationClickable: true,
			        spaceBetween: 30,
			        centeredSlides: true,
			        autoplay: 2500,
			        autoplayDisableOnInteraction: false,
			        loop:true
    			});
    		},
    		error: function(XMLHTTPRequest, textStatus, errorThrown){
    			console.log("XMLHttpRequest :"+ XMLHTTPRequest);
    			console.log("textStatus :"+textStatus);
    			console.log("errorThrown :"+errorThrown);
    		}
    	});
}

//获取并添加List商品信息;
function showListdata(){
	var baseURL = "http://datainfo.duapp.com/shopdata/";
    var tmpURL = "getGoods.php";
        
        $.ajax({
    		type:"get",
    		url:baseURL+tmpURL,
    		dataType:"JSONP",
  			success: function(data){
//              console.log(data);
                load(data);
               
				var mySwiper = new Swiper('.pageList', {
	            	direction: 'vertical',
	            	slidesPerView: 'auto',
	            	spaceBetween: 1,
	            	freeMode: true
	
	            });
	            $(document).on("click",".add_cart",addToCart);
	            var code=-1;//linenumber等于1时,数据被分10组,所以每次让pageCode++才能依次输出数据;
			    mySwiper.on("TouchEnd", function(swiper) {
	            	//下拉加载  第二次ajax请求要放在第一次ajax请求的success的回调里面;用isEnd方法判断;
			        if(swiper.isEnd) {
			        	code++;
			        	if(code>10){
			        		code = 0;
			        	}
			        	console.log(code);
		   				$.ajax({
		   					type: "get",
		   					url: baseURL + tmpURL,
		   					dataType: "JSONP",
		   					data:{
		   						pageCode:code,
		   						linenumber:1
		   					},
		   					success: function(data) {
		   							console.log(data);
		   						//script标签模板
		   						var html_main ="";
								var tplStr=$("#goods_tpl").html();
								for(var i = 0; i < data.length; i++) {
									
									if(data[i].discount != 0) {
										var old_price = (data[i].price / (data[i].discount / 10)).toFixed(0);
									} else {
										var old_price = data[i].price;
									}
								
									var html = tplStr
										.replace(/{{src}}/g, data[i].goodsListImg)
										.replace(/{{p}}/g, data[i].goodsName)
										.replace(/{{goodsId}}/g, data[i].goodsID)
										.replace(/{{price}}/g, data[i].price)
										.replace(/{{old_price}}/g, old_price)
										.replace(/{{discount}}/g, data[i].discount);
									
									html_main += html;
								}
								
								mySwiper.appendSlide(html_main);
								$(document).on("click",".add_cart",addToCart);
							}
	            		});
		   			}
//	            	//上拉刷新  
//	            	if(swiper.translate > 0) {
//	            		document.getElementById('show').innerHTML = '刷新中';
//	            		//reloadData();  
//	            	}
	            });
		 
			},
    		error: function(XMLHTTPRequest, textStatus, errorThrown){
    			console.log("XMLHttpRequest :"+ XMLHTTPRequest);
    			console.log("textStatus :"+textStatus);
    			console.log("errorThrown :"+errorThrown);
    		}
    	});
}


//原生模板引擎
function load(data) {
	var ul = document.getElementById("tpl");
	var tpl = ul.innerHTML
                            .replace(/^\s*/,'')
                            .replace(/\s*$/,'');
    var out_tpl = [];
    
	for(var i = 0; i < data.length; i++) {

		if(data[i].discount != 0) {
			var old_price = (data[i].price / (data[i].discount / 10)).toFixed(0);
		} else {
			var old_price = data[i].price;
		}

		var html_main = tpl
			.replace(/{{src}}/g, data[i].goodsListImg)
			.replace(/{{p}}/g, data[i].goodsName)
			.replace(/{{goodsId}}/g, data[i].goodsID)
			.replace(/{{price}}/g, data[i].price)
			.replace(/{{old_price}}/g, old_price)
			.replace(/{{discount}}/g, data[i].discount);

		out_tpl.push(html_main);
	}
	 ul.innerHTML = out_tpl.join('');
}


//添加到购物车
function addToCart(){
//	console.log('zzz');
	if(getCookieValueByName("u_status")!=1){
		location.href="me.html";
	}else{
//		console.log('zzz');
		var userId=getCookieValueByName("u_name");
		var goodsId=$(this).attr("goodsId");
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/updatecar.php",
			async:true,
			data:{
				userID:userId,
				goodsID:goodsId,
				number:1
			},
			success:function(ret){
				if(ret)
				{
					showMsg("添加商品成功!");
				}else{
					showMsg("添加失败!");
				}
			},
			error:function(err){
				
				showMsg("添加失败!");
			}
		});
	}
}