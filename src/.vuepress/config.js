module.exports = {
	title: 'Bambusoideae\'s Blog',
	description: '一个专门存放 OI 方面的博文的博客。',
	theme: 'bootstrap-simple',
	head: [
		[
			'meta',
			{
				name: 'baidu-site-verification',
				content: 'ZkBG5vw3Wv'
			}
		],
		[
			'link',
			{
				rel: 'icon',
				href: '/favicon.ico'
			}
		],
		[
			'link',
			{
				rel: 'manifest',
				href: '/manifest.json'
			}
		],
		[
			'link',
			{
				rel: 'apple-touch-icon',
				href: '/favicon.ico'
			}
		],
		[
			'script',
			{
				
			},
			"var _hmt = _hmt || [];(function() {var hm = document.createElement(\"script\");hm.src = \"https://hm.baidu.com/hm.js?a04f74e26e451964b94a7461c1ed6d0d\";var s = document.getElementsByTagName(\"script\")[0]; s.parentNode.insertBefore(hm, s);})();"
		]
	],
	themeConfig: {
		pluginOptions: {
			feed: {
				canonical_base: "https://bambusoideae.cn/"
			}
		},
		preferences: {
			links: [
				{title: 'opensouls 的博客', href: 'https://blog.lhwcrt.top/'},
				{title: 'Helium 的博客', href: 'https://keepthethink.github.io/'},
				{title: 'F Zx 的博客', href: 'https://2759942374.github.io/'},
				{title: 'Schwarzkopf-Henkal 的博客', href: 'http://175.24.116.241/'}
			],
			navlinks: [
				{title: "GitHub",href: "https://github.com/Bambusaceae/"}
			],
			gitalk: {
				clientID: 'b6fcb9963606f41a6109',
				clientSecret: '8e9d236be7f3dbd3c8e3e47a21386d132d915209',
				repo: 'Bambusaceae.github.io',
				owner: 'Bambusaceae',
				admin: ['Bambusaceae'],
				distractionFreeMode: false
			}
		}
	},
	plugins: {
		'@vuepress/last-updated': {},
		'sitemap': {
			hostname: 'https://bambusoideae.cn'
		}
	},
	serviceWorker: true,
	extendMarkdown(md){
	    md.set({html: true});
		md.use(require('markdown-it-katex-renderer'));
		md.use(require('markdown-it-emoji'));
	}
};
