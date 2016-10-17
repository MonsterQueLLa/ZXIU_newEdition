	//tmod工具;
	var data = {};

 
    var html = template('classify', data);
    document.getElementById('content').innerHTML = html;
    
	//init
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
	location.href = 'myShow.html';
});


$('footer>div').eq(1).css('border-top','#e43669 3px solid');
	
	var navSwiper;
	var contSwiper;
	var myIscroll;
	var listID = parseInt(location.search.replace("?pro=",""));
	var index = listID-1;
	var indexArray = [];//设数组存储classID 防止每个页面的数据多次请求;



	//获得icon和classID 然后通过classID再次请求每类商品的列表;
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		async:true,
		success: function(data){
			Data = JSON.parse(data);
			console.log(Data);
//			console.log(Data.length);
			var contHtml = '';
			$('.contWrapper').html('');
			var html = '';
			$('.navWrapper').html("");
			
			for(var i=0; i<Data.length; i++){
//				console.log(Data[i].classID);
				console.log(Data[i].icon);
				
				html += "<div class='swiper-slide'><span class='iconfont'>"+Data[i].icon+"</span></div>";
				contHtml += "<div class='swiper-slide'></div>";
			}
			$('.navWrapper').html(html);
			$('.contWrapper').html(contHtml);
			$('.navSwiper .iconfont').removeClass('active').eq(index).addClass('active');
			
//			console.log(Data[0].classID);
			var classID = parseInt(Data[index].classID);
			getClassifygoods(classID);
			swiperDoc(index);
			
		},
		error: function(XMLHTTPRequest, textStatus, errorThrown){
    			console.log("XMLHttpRequest :"+ XMLHTTPRequest);
    			console.log("textStatus :"+textStatus);
    			console.log("errorThrown :"+errorThrown);
    	}
	});
	
	
	
	//添加对应ID下的分类列表的商品;
	function getClassifygoods(classID){
		//判断数组 防止页面数据多次ajax请求刷新;
		for(var i =0; i<indexArray.length; i++){
			if(indexArray[i]===classID){
				return;
			}
		}
		indexArray.push(classID);
		console.log(indexArray);
		$('.contWrapper .swiper-slide').eq(classID-1).addClass('contSlide'+classID);
		$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		async:true,
		dataType:"JSONP",
		data:{classID:classID},
		success: function(data){
			console.log(data);
			
			var htmlStr = '';
			$('.contSlide'+classID).html("");
			htmlStr += "<div class='wrapper all"+classID+"'><ul>";//给每一个页面的Iscroll的添加一个不同的类型;
			for(var i = 0; i<data.length; i++){
				if(data[i].discount != 0){
					var old_price = (data[i].price/(data[i].discount/10)).toFixed(0);
				}else{
					var old_price = data[i].price;
				}
				
				htmlStr += "<li><div class='good'><a href='detail.html?id="+data[i].goodsID+"'><img src='"+ data[i].goodsListImg+"' alt='good' /></a><p>" + data[i].goodsName+ "</p><div class='price'><span class='left'>¥"+data[i].price +"</span><span class='right'>¥"+ old_price +"</span></div></div></li>";
				
			}
			htmlStr += "</div></ul>";
			$('.contSlide'+classID).html(htmlStr);
			var myIscroll = new IScroll('.all'+classID,{//通过不同的类型;声明不同的Iscroll对象,这样才能保证每个Iscroll正常运行;
				mouseWheel: true,
    			scrollbars: true,
				mouseWheelSpeed:100,
				tap:true,
				click:true,
				scrollbars:".iScrollHorizontalScrollbar",
				
			});
			myIscroll.refresh();
			
		},
		error: function(XMLHTTPRequest, textStatus, errorThrown){
    			console.log("XMLHttpRequest :"+ XMLHTTPRequest);
    			console.log("textStatus :"+textStatus);
    			console.log("errorThrown :"+errorThrown);
    	}
	});
	
	}




    

	
//swiper对象声明;
function swiperDoc(index){
	navSwiper = new Swiper('.navSwiper',{
			slidesPerView : 8,
			initialSlide :index,
			onTap: function(swiper){
		      contSwiper.slideTo(swiper.clickedIndex, 1000, false);//切换到第一个slide，速度为1秒
		      $('.navSwiper .iconfont').removeClass('active').eq(swiper.clickedIndex).addClass('active');
		      getClassifygoods(swiper.clickedIndex+1);
		    }
	
	});
	
	
	
	contSwiper = new Swiper('.contSwiper',{
			slidesPerView : 'auto',
			initialSlide :index,
//			touchAngle : 10,
			onSlideChangeStart: function(swiper){
		      $('.navSwiper .iconfont').removeClass('active').eq(swiper.activeIndex).addClass('active');
		      navSwiper.slideTo(swiper.activeIndex, 1000, false);//切换到第一个slide，速度为1秒
		      
		   },
		   onSlideChangeEnd: function(swiper){
		   		getClassifygoods(swiper.activeIndex+1);
		   }
			
	});
}
	