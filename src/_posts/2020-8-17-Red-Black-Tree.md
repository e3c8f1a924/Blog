---
time: 2020-08-07 15:19:09
title: 红黑树入门
description: 其实没有想象中的那么难。
tag: 
- 学习笔记
- OI相关
- 数据结构
- 树形结构
---

# 前置知识

- 二叉搜索树

# 红黑树简介

## 红黑树是什么

红黑树是一种弱平衡二叉树。相比 AVL（一种严格平衡二叉树），它牺牲了一部分的查询效率，从而实现它飞快的插入与删除操作。

## 红黑树的性质

红黑树主要有以下性质：

1. 是一颗二叉查找树
2. 结点有红、黑两种颜色
3. 根结点、叶子结点（NIL，不维护任何数值）是黑色
4. 红色结点的子结点是黑色
5. 根结点到所有叶子结点的路径上的黑色结点数量相等（这个数值被称为 `黑高度`）

特别的，除了根结点可能是红色，这些性质对一颗红黑树的所有子树均适用。

这些性质严格限制了红黑树的高度在 $\operatorname O(\log n)$ 级别，也让它成为了最难写、最难调的平衡树之一。

# 基本框架

根据上面的定义和性质，我们可以写出基本的程序框架：

```cpp
namespace RBTree{
    struct node{int val,color,siz,cnt;node *son[2],*f;node(int,node*);node();//son[0]左儿子，son[1]右儿子，f父亲，color颜色
    }*nil=new node(),*root=nil;int size;
    node::node():val(0),f(nil),color(1),siz(0),cnt(0){son[0]=son[1]=nil;}
    node::node(int val,node* f):val(val),f(f),color(0),siz(1),cnt(1){son[0]=son[1]=nil;}
    #define s(u,k) (u->son[k])
    #define val(u) (u->val)
    #define f(u) (u->f)
    #define siz(u) (u->siz)
    #define cnt(u) (u->cnt)
    #define color(u) (u->color)
    int checkred(node* u){return !color(s(u,1));}//查询红儿子的方向，右侧优先
    int check(node* u){return s(f(u),1)==u;}void swap(int& x,int& y){x^=y,y^=x,x^=y;}//查询结点相对父亲的方向、交换两数值
    void pushup(node* u){if(u!=nil)siz(u)=siz(s(u,0))+siz(s(u,1))+cnt(u);}//向上维护权值
    void swap(node* x,node* y){swap(val(x),val(y)),swap(siz(x),siz(y)),swap(cnt(x),cnt(y)),pushup(x),pushup(y);}//交换权值
    void connect(node* u,node* v,int k){if(v!=nil)s(v,k)=u;if(u!=nil)f(u)=v;}//连边
    void cut(node* u){node* f=f(u);int k=check(u);if(f!=nil)s(f,k)=nil;}//断边
    void rotate(node* u,int k){if(u==nil)return;node *v=s(u,k^1),*t=s(v,k),*f=f(u);int ku=check(u);
        if(v==nil)return;connect(t,u,k^1),connect(u,v,k),connect(v,f,ku);pushup(u),pushup(v);if(u==root)root=v;
    }void init(){nil->son[0]=nil->son[1]=nil;}//旋转、初始化
}
```

# 红黑树的操作

## 查询操作

同二叉查找树。

## 插入操作

### 插入结点

从根开始向下寻找，同二叉查找树。遇到空的结点就插入。新插入的结点染成红色，这是为了避免破坏性质 5。

```cpp
namespace RBTree{
    void insert(node* &u,int x,node* f){if(u==nil)return u=new node(x,f),insertfix(u),void();
        if(val(u)==x)return cnt(u)++,pushup(u),void();insert(s(u,val(u)<x),x,u),pushup(u),insertfix(u);
    }void insert(int x){insert(root,x,nil);}
}
```

看起来很简单？

让人智息的操作在下面。

### 双红修正

我们发现直接插入一个结点可能会破坏性质 3、4。

于是我们考虑修正。

为了方便，我们给结点命名、着色如下（下同）：

![](https://cdn.luogu.com.cn/upload/image_hosting/liy3pn1q.png)

- U 是当前修正的节点
- F 是 U 修正之前的父亲
- G 是 F 在 U 修正之前的父亲
- A 是 G 在 U 修正之前的另外一个儿子
- B 是 F 在 U 修正之前的另外一个儿子
- R 是一个特定的红色结点
- 空心结点是将要修正的结点
- $\mathrm X_0$ 是编号为 X 的结点的左子树，在合法情况下可以为空
- $\mathrm X_1$ 是编号为 X 的结点的右子树，在合法情况下可以为空
- 结点的颜色就是图中所着的颜色
- 对于 $\mathrm X_{0/1}$，图中所着的颜色是是它的根结点的颜色
- 图中着除红黑外的颜色的结点可以是任何颜色（对于 $\mathrm X_{0/1}$ 同样适用）; 除蓝色外，所有图中着相同颜色的结点的颜色相同。

分五种情况讨论。

1. U 或 F是黑色  
不需要进行任何操作。
2. U 是根结点  
染黑即可。此时全树黑高度增加 $1$。
3. U、F、A 是红色，G 是黑色  
显然，$\mathrm U_0, \mathrm U_1, \mathrm A_0, \mathrm A_1$ 和 F 的另一个子树的黑高度相等，所以直接染红 G，染黑 F、A，然后对 G 进行双红修正即可（这个可以在插入回溯的过程中进行）。  
e.g.
   - 修正前  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/9qpw5hqp.png)
   - 修正后  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/kumowa3z.png)
4. U、F 是红色，G 是黑色，A 是黑色，且 U 相对 F 的方向和 F 相对 G 的方向相同  
显然，$\mathrm U_0, \mathrm U_1$ 和 F 的另一个子树的黑高度比 $\mathrm A_0, \mathrm A_1$ 的黑高度大 $1$。我们直接旋转 G，使 F 上调到 G 的位置，然后染黑 F，染红 G 即可。  
e.g.  
   - 修正前  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/ao9wlhyv.png)
   - 修正后  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/0t16pmi3.png)
5. U、F 是红色，G 是黑色，A 是黑色，且 U 相对 F 的方向和 F 相对 G 的方向不同
显然，$\mathrm U_0, \mathrm U_1$ 和 F 的另一个子树的黑高度比 $\mathrm A_0, \mathrm A_1$ 的黑高度大 $1$。我们先旋转 F，使 U 上调到 F 的位置，再旋转 G，使 U 上调到 G 的位置，最后染红 G，染黑 U 即可。  
e.g.
   - 修正前  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/liy3pn1q.png)
   - 修正后  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/5zcjwqv4.png)

```cpp
namespace RBTree{
    void insertfix(node* u){if(u==root)return color(u)=1,void();if(color(u)==1||color(f(u))==1)return;
        node *f=f(u),*g=f(f),*h=s(g,check(f)^1);int ku=check(u),kf=check(f);pushup(f),pushup(g);node* get(node* u,int x){if(val(u)==x||u==nil)return u;return get(s(u,val(u)<x),x);}
        if(color(h)){if(ku==kf)color(g)=0,color(f)=1,rotate(g,kf^1);
            else color(u)=1,color(g)=0,rotate(f,ku^1),rotate(g,kf^1);
        }else color(g)=0,color(f)=color(h)=1;
    }
}
```

## 删除操作

### 删除结点

和普通的二叉查找树一样。若被删除结点有右子树，那么就用它在以它为根的子树范围内的后继结点替换它，否则用它的左子结点替换它。然后把替换结点当作被删除结点继续执行删除操作，直到叶子结点（忽略 NIL，下同）

我们发现，最后真正删除的只有一个叶子结点。我们只要找出这个叶子结点，找的过程中替换一下，最后删除这个叶子结点即可。删除之前别忘了向上更新信息。

```cpp
namespace RBTree{
    node* get(node* u,int x){if(val(u)==x||u==nil)return u;return get(s(u,val(u)<x),x);}  //寻找结点
    node* next(node* u){if(s(u,1)!=nil)return suc(u,val(u));return s(u,0);}  //寻找替换结点
    void up(node* u){while(u!=nil){pushup(u),u=f(u);}}//向上更新信息
    void del(int x){node* u=get(root,x);if(u==nil)return;if(cnt(u)>1)return cnt(u)--,up(u),void();  //如果不止一个就只更新个数
        while(siz(u)!=cnt(u)){node* v=next(u);cnt(u)=cnt(v),val(u)=val(v),u=v;}siz(u)=cnt(u)=0;  //寻找最终删除的结点
        up(u),delfix(u),cut(u);if(u==root)root=nil;delete u;  //更新信息，删除
    }
}
```

简单吗？不。

### 双黑修正

这也是红黑树最令人智息的操作之一。

我们发现，删除一个叶子结点（忽略 NIL），若它是红色，则不会破坏红黑树的性质; 若它是黑色，那么会破坏红黑树的性质 5。那么就要对它进行双黑修正。理解的时候考虑下删除它对黑高度的影响。

还是双红修正时的命名、着色方式。

分情况讨论：

1. U 是红结点  
不用执行任何操作。
2. U 是黑结点，B 是红结点  
显然, $\mathrm U_0, \mathrm U_1$ 的黑高度比 $\mathrm B_0, \mathrm B_1$ 小 $2$。只需要旋转 F，使 B 上调，然后给 B 染黑色，F 染红色，继续双黑修正。  
e.g.
   - 修正前  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/njsmzus7.png)
   - 修正后  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/eg8wno0u.png)
3. U, F, B 都是黑色，B 没有红儿子  
显然，$\mathrm U_0, \mathrm U_1$ 的黑高度比 $\mathrm B_0, \mathrm B_1$ 小 $1$，所以只需染红 B。由于整颗子树的黑高度都少了 $1$，所以还需要对 F 进行双黑修正。  
e.g.
   - 修正前  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/dvl8ja36.png)
   - 修正后  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/sgwnog7d.png)
4. U, B 是黑色，F 是红色，B 没有红儿子  
显然，$\mathrm U_0, \mathrm U_1$ 的黑高度比 $\mathrm B_0, \mathrm B_1$ 小 $1$，又因 B 是黑色，F 是红色，所以只需把 F 染黑，B 染红即可。  
e.g.
   - 修正前  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/wq0wlfe2.png)
   - 修正后  
   ![](https://cdn.luogu.com.cn/upload/image_hosting/91zpepc2.png)
5. U，B 是黑色，B 有红儿子  
令 R 是 B 的红儿子。显然，$\mathrm U_0, \mathrm U_1$ 的黑高度比 $\mathrm R_0, \mathrm R_1$ 和 B 的另一个子树小 $1$。  
分情况讨论  
   1. R 相对 B 的方向和 B 相对 F 的方向相同  
   直接旋转 F，将 B 上调，然后给 B 染 F 的颜色，F、R 染黑。  
   e.g.  
      - 修正前  
      ![](https://cdn.luogu.com.cn/upload/image_hosting/o7i5g0cm.png)
      - 修正后  
      ![](https://cdn.luogu.com.cn/upload/image_hosting/k6a176hy.png)
   2. R 相对 B 的方向和 B 相对 F 的方向不同  
   旋转 B，上调 R，旋转 F，上调 R，给 R 然 F 的颜色，F、B 染黑即可。  
   e.g.  
      - 修正前  
      ![](https://cdn.luogu.com.cn/upload/image_hosting/4ckzgfki.png)
      - 修正后  
      ![](https://cdn.luogu.com.cn/upload/image_hosting/6tqgwlyy.png)

然后 delfix 函数也就很容易写出来了。

```cpp
namespace RBTree{
    void delfix(node* u){if(!color(u))return;
        while(u!=root){node *f=f(u),*b=s(f,check(u)^1);int k=check(u);
            if(!color(b)){rotate(f,k),color(b)=1,color(f)=0;continue;}
            if(color(b)&&color(f)&&color(s(b,0))+color(s(b,1))==2){color(b)=0,u=f;continue;}
            if(color(b)&&color(f)==0&&color(s(b,0))+color(s(b,1))==2){color(f)=1,color(b)=0;break;}
            if(color(b)&&color(s(b,0))+color(s(b,1))<2){int kr=checkred(b);node* r=s(b,kr);
                if(kr==check(b))rotate(f,k),color(b)=color(f),color(f)=color(r)=1;
                else rotate(b,kr^1),rotate(f,k),color(r)=color(f),color(f)=1;break;
            }
        }
    }
}
```

# 例题

## [Luogu-P6136](https://www.luogu.com.cn/problem/P6136)/[LOJ-104](https://loj.ac/problem/104) 【模板】普通平衡树（数据加强版）

- <https://www.luogu.com.cn/record/36565465>
- <https://loj.ac/submission/896855>

所有操作整合一下就好了。

```cpp
#include<cstdio>
namespace Global{int n,m,last,ans;}
int read(){int ret=0,c=getchar(),f=1;
    while(c<'0'||c>'9')f*=(c=='-'?-1:1),c=getchar();
    while(c>='0'&&c<='9')ret=(ret<<3)+(ret<<1)+(c^48),c=getchar();return ret*f;
}namespace RBTree{using namespace Global;
    struct node{int val,color,siz,cnt;node *son[2],*f;node(int,node*);node();
    }*nil=new node(),*root=nil;int size;
    node::node():val(0),f(nil),color(1),siz(0),cnt(0){son[0]=son[1]=nil;}
    node::node(int val,node* f):val(val),f(f),color(0),siz(1),cnt(1){son[0]=son[1]=nil;}
    #define s(u,k) (u->son[k])
    #define val(u) (u->val)
    #define f(u) (u->f)
    #define siz(u) (u->siz)
    #define cnt(u) (u->cnt)
    #define color(u) (u->color)
    int checkred(node* u){return !color(s(u,1));}
    int check(node* u){return s(f(u),1)==u;}void swap(int& x,int& y){x^=y,y^=x,x^=y;}
    void pushup(node* u){if(u!=nil)siz(u)=siz(s(u,0))+siz(s(u,1))+cnt(u);}
    void swap(node* x,node* y){swap(val(x),val(y)),swap(siz(x),siz(y)),swap(cnt(x),cnt(y)),pushup(x),pushup(y);}
    void connect(node* u,node* v,int k){if(v!=nil)s(v,k)=u;if(u!=nil)f(u)=v;}
    void cut(node* u){node* f=f(u);int k=check(u);if(f!=nil)s(f,k)=nil;}
    void rotate(node* u,int k){if(u==nil)return;node *v=s(u,k^1),*t=s(v,k),*f=f(u);int ku=check(u);
        if(v==nil)return;connect(t,u,k^1),connect(u,v,k),connect(v,f,ku);pushup(u),pushup(v);if(u==root)root=v;
    }node* kth(node* u,int k){if(u==nil||siz(s(u,0))<k&&siz(s(u,0))+cnt(u)>=k)return u;
        if(siz(s(u,0))+cnt(u)<k)return kth(s(u,1),k-siz(s(u,0))-cnt(u));return kth(s(u,0),k);
    }int find(int k){return val(kth(root,k));}
    node* pre(node* u,int x){if(u==nil)return nil;
        if(val(u)<x){node* v=pre(s(u,1),x);return (v==nil||val(u)>val(v))?u:v;}else return pre(s(u,0),x);
    }node* suc(node* u,int x){if(u==nil)return nil;
        if(val(u)>x){node* v=suc(s(u,0),x);return (v==nil||val(u)<val(v))?u:v;}else return suc(s(u,1),x);
    }int pre(int x){return val(pre(root,x));}int suc(int x){return val(suc(root,x));}
    int rank(node* u,int x){if(u==nil)return 1;if(val(u)==x)return siz(s(u,0))+1;
        if(val(u)<x)return siz(s(u,0))+cnt(u)+rank(s(u,1),x);else return rank(s(u,0),x);
    }int rank(int x){return rank(root,x);}
    void insertfix(node* u){if(u==root)return color(u)=1,void();if(color(u)==1||color(f(u))==1)return;
        node *f=f(u),*g=f(f),*h=s(g,check(f)^1);int ku=check(u),kf=check(f);pushup(f),pushup(g);
        if(color(h)){if(ku==kf)color(g)=0,color(f)=1,rotate(g,kf^1);
            else color(u)=1,color(g)=0,rotate(f,ku^1),rotate(g,kf^1);
        }else color(g)=0,color(f)=color(h)=1;
    }void insert(node* &u,int x,node* f){if(u==nil)return u=new node(x,f),insertfix(u),void();
        if(val(u)==x)return cnt(u)++,pushup(u),void();insert(s(u,val(u)<x),x,u),pushup(u),insertfix(u);
    }void insert(int x){insert(root,x,nil);}void init(){nil->son[0]=nil->son[1]=nil;}
    node* get(node* u,int x){if(val(u)==x||u==nil)return u;return get(s(u,val(u)<x),x);}
    void delfix(node* u){if(!color(u))return;
        while(u!=root){node *f=f(u),*b=s(f,check(u)^1);int k=check(u);
            if(!color(b)){rotate(f,k),color(b)=1,color(f)=0;continue;}
            if(color(b)&&color(f)&&color(s(b,0))+color(s(b,1))==2){color(b)=0,u=f;continue;}
            if(color(b)&&color(f)==0&&color(s(b,0))+color(s(b,1))==2){color(f)=1,color(b)=0;break;}
            if(color(b)&&color(s(b,0))+color(s(b,1))<2){int kr=checkred(b);node* r=s(b,kr);
                if(kr==check(b))rotate(f,k),color(b)=color(f),color(f)=color(r)=1;
                else rotate(b,kr^1),rotate(f,k),color(r)=color(f),color(f)=1;break;
            }
        }
    }node* next(node* u){if(s(u,1)!=nil)return suc(u,val(u));return s(u,0);}
    void up(node* u){while(u!=nil){pushup(u),u=f(u);}}
    void del(int x){node* u=get(root,x);if(u==nil)return;if(cnt(u)>1)return cnt(u)--,up(u),void();
        while(siz(u)!=cnt(u)){node* v=next(u);cnt(u)=cnt(v),val(u)=val(v),u=v;}siz(u)=cnt(u)=0;
        up(u),delfix(u),cut(u);if(u==root)root=nil;delete u;
    }
}using RBTree::find;using RBTree::pre;using RBTree::suc;using RBTree::rank;using RBTree::insert;
using namespace Global;using RBTree::init;using RBTree::del;
int main(){n=read(),m=read(),init();for(int i=1;i<=n;i++)insert(read());
    for(int i=1;i<=m;i++){int opt=read(),x=read();
        if(opt==1)insert(x^last);if(opt==2)del(x^last);if(opt==3)ans^=(last=rank(x^last));
        if(opt==4)ans^=(last=find(x^last));if(opt==5)ans^=(last=pre(x^last));if(opt==6)ans^=(last=suc(x^last));
    }printf("%d\n",ans);
}
```

# 作图工具

- 文中所有作图均使用 [GeoGebra·几何](https://www.geogebra.org/geometry)

# References

- [1] <https://www.jianshu.com/p/e136ec79235c>
- [2] <https://blog.csdn.net/Gosick_Geass_Gate/article/details/88556840>
- [3] <https://www.luogu.com.cn/blog/_post/26864>