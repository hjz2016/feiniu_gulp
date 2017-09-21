function setCookie(name,value,day,path){
	var d = new Date();
	d.setDate(d.getDate() + day)
	document.cookie = name+"="+value+";path="+path+";expires="+d
}
function removeCookie(name,path){
	setCookie(name,null,-1,path)
}
function getCookie(name){
	var sCookie = document.cookie;
	var aCookie = sCookie.split("; ");
	for(var i = 0 ; i < aCookie.length ; i++){
		var aCookieItem = aCookie[i].split("=");
		if(aCookieItem[0] == name){
			return aCookieItem[1];
		}
	}
	return "";
}