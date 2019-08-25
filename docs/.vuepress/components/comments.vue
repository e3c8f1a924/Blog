<template>
	<div id="mb-comments-container">
		<div id="mb-comments"></div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			
		};
	},
	mounted() {
		var body=document.querySelector("#mb-comments-container");
		var script=document.createElement("script");
		script.innerText="const gitalk = new Gitalk({clientID: 'b6fcb9963606f41a6109',clientSecret: '8e9d236be7f3dbd3c8e3e47a21386d132d915209',repo: 'Bambusaceae.github.io',owner: 'Bambusaceae',admin: ['Bambusaceae'],id: md5(window.location.pathname),distractionFreeMode: false});gitalk.render('mb-comments');"
		body.appendChild(script);
	},
	methods:{
		
	}
};
</script>
