window.onload = function () {
	setTimeout(function () {
		var head = document.getElementsByTagName("head")[0], script;
		script = document.createElement("script");
		script.type = "text/x-mathjax-config";
		script[(window.opera ? "innerHTML" : "text")] =
		"MathJax.Hub.Config({\n" +
		"  tex2jax: { inlineMath: [['$','$'], ['\\\\(','\\\\)']] }\n" +
		"});"
		head.appendChild(script);
		script = document.createElement("script");
		script.type = "text/javascript";
		script.src  = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML";
		head.appendChild(script);
	},100)
}

function showNav(){
	var nav=new mdui.Drawer('#mb-nav');
	if(nav.getState()=='opened'){
		nav.close();
	}else if(nav.getState()=='closed'){
		nav.open();
	}
}
		