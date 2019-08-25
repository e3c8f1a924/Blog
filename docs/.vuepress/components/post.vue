<template>
	<div class="mdui-bottom-nav-fixed" id="mb-post">
		<div class="mdui-drawer mdui-drawer-close mdui-color-white" id="mb-nav">
			<div class="mdui-list mdui-collapse" mdui-collapse="{accordion: true}">
				<div class="mdui-collapse-item">
					<div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
						<i class="mdui-list-item-icon mdui-icon material-icons">&#xe157;</i>
						<div class="mdui-list-item-content">Links</div>
						<i class="mdui-collapse-item-arrow mdui-icon material-icons">&#xe313;</i>
					</div>
					<div class="mdui-collapse-item-body mdui-list" v-for="page in $site.pages" v-if="page.frontmatter.layout=='home'">
						<a v-for="link in page.frontmatter.links" :href="link.href" class="mdui-list-item mdui-ripple" target="_blank">
							<div class="mdui-list-item-content">{{ link.name }}</div>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="mdui-appbar">
			<div class="mdui-toolbar mdui-color-indigo">
				<button class="mdui-btn mdui-btn-icon" onclick="showNav()"><i class="mdui-icon material-icons">menu</i></button>
				<div class="mdui-typo-title">{{ $page.title }}</div>
				<div class="mdui-toolbar-spacer"></div>
				<a href="https://github.com/Bambusaceae" class="mdui-btn mdui-btn-icon" target="_blank"><svg class="mdui-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><path fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff" d="M16,0.4c-8.8,0-16,7.2-16,16c0,7.1,4.6,13.1,10.9,15.2  c0.8,0.1,1.1-0.3,1.1-0.8c0-0.4,0-1.4,0-2.7c-4.5,1-5.4-2.1-5.4-2.1c-0.7-1.8-1.8-2.3-1.8-2.3c-1.5-1,0.1-1,0.1-1  c1.6,0.1,2.5,1.6,2.5,1.6c1.4,2.4,3.7,1.7,4.7,1.3c0.1-1,0.6-1.7,1-2.1c-3.6-0.4-7.3-1.8-7.3-7.9c0-1.7,0.6-3.2,1.6-4.3  c-0.2-0.4-0.7-2,0.2-4.2c0,0,1.3-0.4,4.4,1.6c1.3-0.4,2.6-0.5,4-0.5c1.4,0,2.7,0.2,4,0.5C23.1,6.6,24.4,7,24.4,7  c0.9,2.2,0.3,3.8,0.2,4.2c1,1.1,1.6,2.5,1.6,4.3c0,6.1-3.7,7.5-7.3,7.9c0.6,0.5,1.1,1.5,1.1,3c0,2.1,0,3.9,0,4.4  c0,0.4,0.3,0.9,1.1,0.8C27.4,29.5,32,23.5,32,16.4C32,7.6,24.8,0.4,16,0.4z"/></svg></a>
			</div>
			<div class="mdui-tab mdui-tab-centered mdui-color-indigo" mdui-tab>
				<a :href="$site.base" class="mdui-ripple">Home</a>
				<a class="mdui-ripple" v-for="tab in tabs" :href="tab.path">
					{{ tab.title }}
				</a>
			</div>
		</div>
		<div class="mdui-fab-wrapper" mdui-fab="{trigger: 'hover'}">
			<a href="#" class="mdui-fab mdui-ripple mdui-color-red">
				<i class="mdui-icon material-icons">&#xe145;</i>
				<i class="mdui-icon material-icons mdui-fab-opened">&#xe316;</i>
			</a>
			<div class="mdui-fab-dial">
				<a :href="$site.base" class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-indigo">
					<i class="mdui-icon material-icons">&#xe88a;</i>
				</a>
			</div>
		</div>
		<div class="mdui-container">
			<div class="mdui-typo mb-post-content">
				<Content />
				<div class="mdui-text-right mdui-typo-caption-opacity" v-if="$page.frontmatter.time">{{ $page.frontmatter.time }}</div>
				<hr />
				<div id="mb-comments"></div>
			</div>
		</div>
		<div class="mdui-bottom-nav mdui-color-indigo mdui-bottom-nav-scroll-hide">
			<a class="mdui-ripple mdui-bottom-nav-active" v-for="page in home" v-if="page.frontmatter.mail" :href="'mailto:'+page.frontmatter.mail">
				<i class="mdui-icon material-icons">&#xe0be;</i>
				<label>Mail</label>
			</a>
			<a class="mdui-ripple mdui-bottom-nav-active" mdui-tooltip="{content: 'Powered by vuepress', position: 'top'}">
				<i class="mdui-icon material-icons">&#xe88e;</i>
				<label>Info</label>
			</a>
		</div>
		<script type="text/javascript">
			mdui.mutation();
		</script>
		<script>
			const gitalk = new Gitalk({
				clientID: 'b6fcb9963606f41a6109',
				clientSecret: '8e9d236be7f3dbd3c8e3e47a21386d132d915209',
				repo: 'Bambusaceae.github.io',
				owner: 'Bambusaceae',
				admin: ['Bambusaceae'],
				id: md5(window.location.pathname),
				distractionFreeMode: false
			})
			gitalk.render('mb-comments')
		</script>
		<script>
			(function(){
				var bp = document.createElement('script');
				var curProtocol = window.location.protocol.split(':')[0];
				if (curProtocol === 'https') {
					bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
				}else {
					bp.src = 'http://push.zhanzhang.baidu.com/push.js';
				}
				var s = document.getElementsByTagName('script')[0];
				if(window.location.hostname=='bambusoideae.cn')s.parentNode.insertBefore(bp, s);
			})();
		</script>
	</div>
</template>

<script>
export default{
	data(){
		return {
			tabs: [],
			home: []
		};
	},
	mounted() {
		let t=this.$site.pages.filter(v => {
			if(v.frontmatter.layout=='page'){
				return v;
			}
		});
		let h=this.$site.pages.filter(v => {
			if(v.frontmatter.layout=='home'){
				return v;
			}
		});
		this.tabs=t;
		this.home=h;
	},
	methods:{
		
	}
};
</script>
<style>
.mb-post-list-item{
	margin-bottom: 5px;
}
.mdui-typo a{
	color: #3f51b5;
}
.mb-post-content{
	padding-top: 1.2em;
}
.mdui-bottom-nav{
	z-index: 500;
}
</style>
