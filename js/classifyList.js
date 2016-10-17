$('#footer').load('footer.html');


var myIscroll;

$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		async:true,
		success: function(data){
			Data = JSON.parse(data);
			console.log(Data);
//			console.log(Data.length);
			var html = '';
			for(var i=0; i<Data.length; i++){

				console.log(Data[i].classID);
				
				html += "<li><a href='classify.html?pro="+Data[i].classID+"'>"+Data[i].className+"</a></li>	";
			
			}
			$('.wrapper ul').append(html);

			swiperDoc();
			
		},
		error: function(XMLHTTPRequest, textStatus, errorThrown){
    			console.log("XMLHttpRequest :"+ XMLHTTPRequest);
    			console.log("textStatus :"+textStatus);
    			console.log("errorThrown :"+errorThrown);
    	}
	});


//声明对象;
function swiperDoc(){
	myIscroll = new IScroll('.wrapper',{
				mouseWheel: true,
    			scrollbars: true,
//				mouseWheelSpeed:100,
				tap:true,
				click:true,
				scrollbars:".iScrollHorizontalScrollbar",
				
});
}

