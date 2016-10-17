$(function(){
	$("footer").load("footer_a.html");

	if($.fn.cookie("u_status")==1){
		$("#f_login").hide();
		
		$(".me .avatar img").prop("src",$.fn.cookie("u_img"));
		$(".me .u_name").html($.fn.cookie("u_name"));
	}
	else 
	{
		$(".me").hide();
		$(".h_center").html("登录");
	}
	
	$(".h_right a").tap(function(){
		$(this).hide();
		$(".h_center").html("注册");
		$("#f_login,.me").hide();
		$("#f_reg").show();
	})
	$(".logout").tap(function(){
		$.fn.cookie("u_status",0);
		location.reload();
	})
	$("#reg").tap(function(){
		console.log("reg");
		var regName=$("#f_reg .u_name").val();
		var regPwd=$("#f_reg .u_pwd").val();
		var ckPwd=$("#f_reg .u_ck_pwd").val();
		if(ckPwd!==regPwd){
			showMsg("两次密码输入不一致！");
		}else{
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				async:true,
				data:{
					status:'register',	
					userID:regName,
					password:regPwd
				},
				success:function(ret){
					console.log(ret);
					if(parseInt(ret)===0){
						showMsg("用户名已被注册！");
					}
					else if(parseInt(ret)===1)
					{
						$("#f_reg").hide();
						$(".h_center").html("登录");
						$("#f_login").show();
					}
				},
				error:function(error){
					console.log("error");
					showMsg("注册失败!");
				}
			});
		}
	})
	
	$("#login").tap(function(){
		console.log("login");
		var logName=$("#f_login .u_name").val();
		var logPwd=$("#f_login .u_pwd").val();
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			async:true,
			data:{
				status:'login',	
				userID:logName,
				password:logPwd
			},
			success:function(ret){
				
				if(parseInt(ret)===0)
				{
					showMsg("用户名不存在!");
				}else if(parseInt(ret)===2){
					showMsg("用户密码不正确!");
				}
				else{
					console.log(ret);
					ret=JSON.parse(ret);
					var uImg=ret.userimg_url;
					$("#f_reg,#f_login").hide();
					console.log($("hearder .h_center"));
					$(".me").show();
					$(".h_center").html("我的秀");
					$(".me .avatar img").prop("src",ret.userimg_url);
					$(".me .u_name").html(ret.userID);
					$.fn.cookie("u_status",1);
					$.fn.cookie("u_name",ret.userID);
					$.fn.cookie("u_img",ret.userimg_url);
				}
			},
			error:function(error){
				showMsg("注册失败!");
			}
		});
	})
})