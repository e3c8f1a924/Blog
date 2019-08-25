cd docs/.vuepress/dist
echo "bambusoideae.cn">CNAME
git init
git add -A
git commit -m"Publish"
git push -f git@github.com:Bambusaceae/Bambusaceae.github.io.git master
