module.exports = {
	title: 'Bambusoideae\'s Blog',
	description: '一个OIer的仓库',
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
			'link',
			{
				rel: 'stylesheet',
				href: '//unpkg.com/gitalk/dist/gitalk.css'
			}
		],
		[
			'link',
			{
				rel: 'stylesheet',
				href: '//cdnjs.loli.net/ajax/libs/mdui/0.4.3/css/mdui.min.css'
			}
		],
		[
			'script',
			{
				src: '//code.jquery.com/jquery-3.4.1.min.js'
			}
		],
		[
			'script',
			{
				src: '//cdnjs.loli.net/ajax/libs/mdui/0.4.3/js/mdui.min.js'
			}
		],
		[
			'script',
			{
				src: '//cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js'
			}
		],
		[
			'script',
			{
				src: '//unpkg.com/gitalk/dist/gitalk.min.js'
			}
		],
		[
			'script',
			{
				src: '/global.js'
			}
		],
		[
			'script',
			{
				
			},
			"var _hmt = _hmt || [];(function() {var hm = document.createElement(\"script\");hm.src = \"https://hm.baidu.com/hm.js?a04f74e26e451964b94a7461c1ed6d0d\";var s = document.getElementsByTagName(\"script\")[0]; s.parentNode.insertBefore(hm, s);})();"
		]
	],
	plugins: {
		'@vuepress/last-updated': {},
		'sitemap': {
			hostname: 'https://bambusoideae.cn'
		},
		'nprogress': {}
	},
	serviceWorker: true,
	markdown:{
		lineNumbers: true
	}
}
