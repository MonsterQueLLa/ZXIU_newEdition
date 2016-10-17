//保存cookie
//name value days
function setCookie(name,value,days){
	var now = new Date();
	setDate(now.getDate()+days);
	var str = name+"="+value;
	if(days){
		str = str +";expires="+now.toGMTString();
	}
	document.cookie = str;
}

//获取cookie
//name
function getCookieValueByName(name){
	var elem =null;
	var strA = document.cookie;
	var strC = strA.split(";");
	for(var i=0;i<strC.length;i++){
		var strLast = strC[i].split("=");
		if(name = "strLast[0]"){
			elem = strLast[1];
			break;
		}
	}
	return elem;
}


//删除cookie
//name 
function selCookieByName(name){
	setCookie(name,1,-1);
}
