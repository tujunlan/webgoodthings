
var usrState = null;
(function($, owner) {
	owner.apiUrl = 'http://114.116.100.74:80/goodthings/';
	owner.crossDomain = true;	//是否强制跨域
	owner.ajaxTimeout = 5000; //ajax请求超时时间 5s
	
	owner.book_category_id = 1;		//book
	owner.audio_category_id = 2;	//audio
	owner.video_category_id = 3;	//video
	
	owner.setUserInfo = function(callback) {
		callback = callback || $.noop;
		var info = function(){
			$.ajax({
                type: 'get',
                url: owner.apiUrl+'/v2/rest/user/info' ,
                async: true,
                crossDomain: webApp.crossDomain, //强制使用5+跨域
                dataType: "json",
				xhrFields: {
					withCredentials: true
				},
                success: function(data,status,xhr) {
                    var state = data.content;
					if(state instanceof Object) {
						owner.setState(state);
						return callback();
					} else {
						return callback('获取用户信息失败：'+data.desc);
					}
                },
                error: function(xhr,status,error) {
					console.error("获取用户信息失败"+status);
                }
            });
		};
		
	};
	
	/**
	 * post 请求
	 **/
	owner.postRequest = function(urlStr, dataJson, callBack, callBackParam) {
		dataJson = dataJson || {};
		callBackParam = callBackParam || {};
		$.ajax({
			url: owner.apiUrl + urlStr,
		//	async: true,
		//	dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(dataJson),
		//	crossDomain: webApp.crossDomain, //强制使用5+跨域
			type: 'POST',
		//	xhrFields: {withCredentials: true},
			beforeSend: function () {
			//	webApp.showMask();
			},
			complete: function () {
			//	webApp.closeMask();
			},
			success: function (r) {
				var result = JSON.parse(r);
				if (result.code == 20000) {
					if(callBack && callBack instanceof Function){
						callBack(result, callBackParam);
					}
				} else {
					console.error('request error code ='+result.code);
				}
			},
			error: function (xhr, type, errorThrown) {
				//请求失败
				console.error('request error');
			}
		});
	};
	

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	};

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		};
	
	owner.myhtmlencode = function(s) {
		if(s == null) return '';
		//注意替换的顺序不能颠倒
		s = s + '';
		var r1 = s.replace(/&/g, "&amp;");
		var r2 = r1.replace(/</g, "&lt;");
		var r3 = r2.replace(/>/g, "&gt;");
		var r4 = r3.replace(/\r\n/g, "<br>");
		var r5 = r4.replace(/"/g, "&quot;");
		var r6 = r5.replace(/'/g, "&#039;");
		return r6;
	};
	
	/*获取指定日期是星期几*/
	owner.getWeek = function(s) {
		s = s.replace(/-/g, '/');
		var week = new Date(s).getDay();
		var a = new Array("日", "一", "二", "三", "四", "五", "六");  
		return '周'+a[week];
	};
	
	owner.getCurrentTime = function(){
		var now = new Date();
		var year = now.getFullYear();
		var month =now.getMonth()+1; 
		var day = now.getDate(); 
		var hour = now.getHours(); 
		var minute = now.getMinutes(); 
		var second = now.getSeconds(); 
		month = parseInt(month)<10 ? '0'+month : month;
		day = parseInt(day)<10 ? '0'+day : day;
		hour = parseInt(hour)<10 ? '0'+hour : hour;
		minute = parseInt(minute)<10 ? '0'+minute : minute;
		second = parseInt(second)<10 ? '0'+second : second;
		return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second; 
	};
	
	owner.trim = function(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};
	
	owner.ajaxChkLogin = function(xhr){
		if(typeof xhr.responseText != 'undefined' && xhr.responseText.substr(0, 9) == '<!DOCTYPE') {
			window.location.href = 'login.jsp';
		}
	};
	
	owner.disabledFormSubmitButton = function(formId, isDisabled){
		isDisabled = typeof isDisabled == "undefined" ? true : isDisabled;
		if(isDisabled) {
			$("#"+formId+" button[type='submit']").addClass("disabled").attr("disabled", "disabled");
		} else {
			$("#"+formId+" button[type='submit']").removeClass("disabled").attr("disabled", false);
		}
	};

	owner.disabledButton = function(id, isDisabled){
		isDisabled = typeof isDisabled == "undefined" ? true : isDisabled;
		if(isDisabled) {
			$("#"+id).addClass("disabled").attr("disabled", "disabled");
		} else {
			$("#"+id).removeClass("disabled").attr("disabled", false);
		}
	};
	
	owner.IEVersion = function() {
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
		var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
		var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
		var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
		if(isIE) {
			var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
			reIE.test(userAgent);
			var fIEVersion = parseFloat(RegExp["$1"]);
			if(fIEVersion == 7) {
				return 7;
			} else if(fIEVersion == 8) {
				return 8;
			} else if(fIEVersion == 9) {
				return 9;
			} else if(fIEVersion == 10) {
				return 10;
			} else {
				return 6;//IE版本<=7
			}   
		} else if(isEdge) {
			return -2;//edge
		} else if(isIE11) {
			return 11; //IE11  
		} else{
			return -1;//不是ie浏览器
		}
	};
	
	owner.myBrowser = function() {
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		var isOpera = userAgent.indexOf("Opera") > -1;
		if (isOpera) { 
			//判断是否Opera浏览器 
			return "Opera";
		}
		if (userAgent.indexOf("Firefox") > -1) {
			//判断是否Firefox浏览器
			return "FF";
		}
		if (userAgent.indexOf("Chrome") > -1) {
			return "Chrome";
		}
		if (userAgent.indexOf("Safari") > -1) {
			//判断是否Safari浏览器
			return "Safari";
		}
		if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
			//判断是否IE浏览器
			return "IE";
		}
	};
	
	//创建遮罩层
	owner.createMask = function() {
		var node=document.createElement('div');
			node.setAttribute('id','backdrop');
		//	node.style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:1000;background-color:rgba(0,0,0,0.6);";
		//	node.style.display="none";
		var html='<div style="position: fixed; top: 38%; left: 38%; z-index: 20000;">';
			html+='<div style="text-align:center;">';
			html+='<img src="assets/images/loading.jpg" style="width:60px;height:60px;">';
			html+='<div style="padding-left:10px;font-size:14px;color:#FFF;margin-top:10px;">网络请求中...</div>';
			html+='</div>';
			html+='</div>';
			node.innerHTML=html;
		var body=document.querySelector('body');
			body.appendChild(node);    
	};
	
	//开启遮罩层
	owner.showMask = function() {
		var backdrop=document.getElementById('backdrop');
			backdrop.style.display='block';
	};

	//关闭遮罩层
	owner.closeMask = function() {
		var backdrop=document.getElementById('backdrop');
			backdrop.style.display='none';
	};
	
	//截取字符串(一个汉字相当于2个字符)
	owner.cut_str = function(str, len) {
        var char_length = 0;
        for (var i = 0; i < str.length; i++){
            var son_str = str.charAt(i);
            encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            if (char_length >= len){
                var sub_len = char_length == len ? i+1 : i;
                return str.substr(0, sub_len);
                break;
            }
        }
		return str;
    };
	
	owner.set_cookie = function(e, t, o) {
		var r = new Date;
		r.setTime(r.getTime() + o);
		var n = window.document.domain;
		document.cookie = e + "=" + escape(t) + ";expires=" + r.toGMTString() + ";path=/;domain=" + n
	};
	owner.get_cookie = function(e) {
		var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
		return null != t ? unescape(t[2]) : null
	};
	owner.delete_cookie = function(e) {
		null != owner.get_cookie(e) && owner.set_cookie(e, "", -1)
	};
	

	
}(jQuery, window.webApp = {}));
//webApp.createMask();

