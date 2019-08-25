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
		]
	],
	plugins: {
		'@vuepress/last-updated': {},
		'sitemap': {
			hostname: 'https://bambusoideae.cn'
		},
		'nprogress': {}
	},
	serviceWorker: true
}
