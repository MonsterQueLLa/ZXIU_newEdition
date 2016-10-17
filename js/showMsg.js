//弹出框设置:
function showMsg(msg,callback){
	
	var msgBoxStr="<div class='msgbox'><div>"+msg+"</div><div onclick='hideMsg()'>确定</div></div>";
	$("body").append(msgBoxStr);	
}

function hideMsg(){
	$(".msgbox").remove();	
}
	
