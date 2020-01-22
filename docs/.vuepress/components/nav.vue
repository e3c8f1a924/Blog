<template>
    <div class="mdui-drawer mdui-drawer-opened mdui-color-white" id="mb-nav">
        <div class="mdui-list mdui-collapse" mdui-collapse="{accordion: true}">
            <div class="mdui-collapse-item mdui-collapse-item-open">
                <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
                    <i class="mdui-list-item-icon mdui-icon material-icons">&#xe157;</i>
                    <div class="mdui-list-item-content">Links</div>
                    <i class="mdui-collapse-item-arrow mdui-icon material-icons">&#xe313;</i>
                </div>
                <div class="mdui-collapse-item-body mdui-list" v-for="page in $site.pages" v-if="page.frontmatter.layout=='home'">
                    <div class="mdui-divider"></div>
                    <a v-for="link in page.frontmatter.links" :href="link.href" class="mdui-list-item mdui-ripple" target="_blank">
                        <div class="mdui-list-item-content">{{ link.name }}</div>
                    </a>
                    <div class="mdui-divider"></div>
                </div>
            </div>
            <div class="mdui-collapse-item">
                <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
                    <i class="mdui-list-item-icon mdui-icon material-icons">&#xe8e6;</i>
                    <div class="mdui-list-item-content">Tags</div>
                    <i class="mdui-collapse-item-arrow mdui-icon material-icons">&#xe313;</i>
                </div>
                <div class="mdui-collapse-item-body mdui-list mdui-collapse" mdui-collapse="{accordion: true}">
                    <div class="mdui-divider"></div>
                    <div class="mdui-collapse-item" v-for="t in tags" v-if="typeof t !='undefined'">
                        <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
                            <div class="mdui-list-item-content">{{ t }}</div>
                            <i class="mdui-collapse-item-arrow mdui-icon material-icons">&#xe313;</i>
                        </div>
						<div class="mdui-collapse-item-body mdui-list">
							<div class="mdui-divider"></div>
							<a class="mdui-list-item mdui-ripple" v-for="page in tag[t]" :href="page.path">
								<div class="mdui-list-item-content">{{ page.title }}</div>
							</a>
							<div class="mdui-divider"></div>
						</div>
					</div>
					<div class="mdui-divider"></div>
				</div>
			</div>
		</div>
		<script>(function() {document.getElementsByTagName("body")[0].className+=' mdui-drawer-body-left';})();</script>
	</div>
</template>
<script>
export default{
    name: "_nav",
	data(){
		return {
			tags: [],
			tag: {}
		};
	},
	mounted() {
		let tags=this.$site.pages.map(v => {
			if(v.frontmatter.layout=='post'){
				return v.frontmatter.tag;
			}
		})
		tags=Array.from(new Set(tags));
		tags.push('Other');
		let tag={};
		for(var i=0;i<tags.length;i++){
			tag[tags[i]]=this.$site.pages.filter(v => {
				if(v.frontmatter.layout=='post'&&(typeof v.frontmatter.tag!='undefined')){
					if(v.frontmatter.tag==tags[i]){
						return v;
					}
				}
				else if(v.frontmatter.layout=='post'&&tags[i]=='Other')return v;
			});
		}
		this.tags=tags;
		this.tag=tag;
	}
};
</script>