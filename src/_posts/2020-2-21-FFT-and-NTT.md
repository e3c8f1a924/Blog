---
time: 2020-02-21 11:29:36
title: "FFT&NTT"
description: FFT and NTT
tags:
- OI相关
- 数学
- 多项式 
- 学习笔记
---

看到各位神仙已经写的够详细了，我也来写写我的见解吧。

# 多项式

## 多项式是什么

关于多项式，我们已经在小学一年级的时候已经认识了，所以就不多说了。

## 多项式的表示方法

### 多项式的系数表示法

设 $f_i$ 表示 $n$ 次多项式$F(x)$ $i$ 次项的系数，则

$$F(x)=\sum_{i=0}^nf_ix^i$$

### 点值表示法

我们在小学二年级的时候学过，一个 $n$ 次多项式 $F(x)$ 可以由 $n+1$ 个不同的点 $(x_i,F(x_i))$ 确定。如果不明白的话没关系，这不重要。

# 多项式的乘法

关于多项式的乘法，我们已经在小学二年级学过了。我也就不多说了。

很明显，系数表示法下朴素算法的时间复杂度是 $\Theta(nm)$，会被卡。

那点值表示法呢？看上去只要每个点和对应的点乘一乘就好了，复杂度 $\Theta(nm)$，但从系数表示法转换成点值表示法是 $\Theta(nm)$ 的。

怎么优化呢？这就用到我们的 $\text{FFT}\&\text{NTT}$了。

# FFT

在学习 FFT 之前，我们先来复习一下我们小学三年级学的**复数**和**单位根**

## 复数

### 复数的概念

>我们把形如 $z=a+bi$（$a,b$ 均为实数）的数称为`复数`，其中 $a$ 称为实部，$b$ 称为`虚部`，$i$ 称为`虚数单位`。 ——百度百科

我觉得这已经讲得够详细了，我就不补充了。

### 复数的运算

- 复数的加法：$(a+bi)+(c+di)=(a+c)+(b+d)i$
- 复数的减法：同理
- 复数的乘法：$(a+bi)(c+di)=ac+adi+bci-bd=(ac-bd)+(ad+bc)i$

此外，复数相乘在极坐标中的几何意义是：**模长相乘，幅角相加**。

## 单位根

### 单位根的定义

>数学上，$n$ 次单位根是 $n$ 次幂为 $1$ 的复数。它们位于复平面的单位圆上，构成正 $n$ 边形的顶点，其中一个顶点是 $1$。$n$次单位根的模为 $1$  ——百度百科

$n$ 次单位根共有 $n$ 个，它们是：

$$\cos\frac{2k\pi}{n}+i\sin\frac{2k\pi}{n}$$

其中 $k$ 是整数且 $1\leq k \leq n$。

配合图片理解（$n=8$ 的情况）：

![](https://i.loli.net/2020/02/21/l2tg6HQANhu8ydq.png)

我们把 $\cos\frac{2\pi}{n}+i\sin\frac{2\pi}{n}$ 记为 $\omega_n$（如图中的 $D$表示的复数，我们就把它记作 $\omega_8$）。

显然，$\omega_n^k=\cos\frac{2k\pi}{n}+i\sin\frac{2k\pi}{n}$

### 单位根的性质：

1. $\omega_n^0=1$  
显然。
2. $\omega_n^n=1$  
证明：$\omega_n^n=\omega_n^k=\cos\frac{2n\pi}{n}+i\sin\frac{2n\pi}{n}=\cos 2\pi+\sin 2\pi=1+0=1$
3. $\omega_{2n}^{2k}=\omega_n^k$  
证明：$\omega_{2n}^{2k}=\cos\frac{4k\pi}{2n}+i\sin\frac{4k\pi}{2n}=\cos\frac{2k\pi}{n}+i\sin\frac{2k\pi}{n}=\omega_n^k$
4. $\omega_{n}^{\frac{n}{2}}=-1$  
证明：$\omega_{n}^{\frac{n}{2}}=\cos\frac{n\pi}{n}+i\sin\frac{n\pi}{n}=\cos\pi+i\sin\pi=-1$

## 快速傅里叶变换（FFT）

上面讲了一大堆什么单位根，有什么用呢？没错！我们要把它们带入多项式里去。

前面说过，一个 $n$ 次多项式 $F(x)$ 可以由 $n+1$ 个不同的点 $(x_i,F(x_i))$ 确定。**我们这里令$n$为 $F(x)$ 的次数 $+1$。**

但显然，仅仅是简单的带入和朴素算法没区别。但利用单位根的性质，我们可以使用**分治**进行优化。

不妨把一个多项式 $F(x)$ 按照奇偶性分成两组：

$$\begin{aligned}F(x)&=f_0x^0+f_1x^1+f_2x^2+\dots\\&=(f_0x^0+f_2x^2+f_4x^4+\dots)+(f_1x^1+f_3x^3+f_5x^5+\dots)\\&=(f_0x^0+f_2x^2+f_4x^4+\dots)+x(f_1x^0+f_3x^2+f_5x^4+\dots)\end{aligned}$$

我们令 $L(x)=f_0x^0+f_2x^1+f_3x^2+\dots$，$R(x)=f_1x^0+f_3x^1+f_5x^2+\dots$

显然，$F(x)=L(x^2)+xR(x^2)$。

然后我们带入 $\omega_n^k$。
，得到

$$\begin{aligned}F(\omega_n^k)&=L(\omega_n^{2k})+\omega_n^kR(\omega_n^{2k})\\&=L(\omega_\frac{n}{2}^k)+\omega_n^kR(\omega_\frac{n}{2}^k)\end{aligned}$$

然后我们发现，$L(x)$ 和 $R(x)$ 的 $x$ 取值范围是 $\omega_\frac{n}{2}^0\sim\omega_\frac{n}{2}^{\frac{n}{2}-1}$，但这里的 $k$ 取值范围是 $0\sim n-1$，明显超过了。但别忘了，$\omega_{n}^{\frac{n}{2}}=-1$。我们把 $\omega_n^{k+\frac{n}{2}}$带入。

$$\begin{aligned}F(\omega_n^{k+\frac{n}{2}})&=L(\omega_n^{2k+n})+\omega_n^{k+\frac{n}{2}}R(\omega_n^{2k+n})\\&=L(\omega_\frac{n}{2}^k)-\omega_n^kR(\omega_\frac{n}{2}^k)\end{aligned}$$

于是我们在计算 $F(\omega_n^k)$ 的时候同时计算 $F(\omega_n^{k+\frac{n}{2}})$。

## 快速傅里叶逆变换

转换成点至表示法运算完之后还需要重新转换成系数表示法。

设 $g_i=F(\omega_n^i)$，$G(x)=\sum_{i=0}^ng_ix^i$

看似无从下手呢。

~~于是我们可以考虑上网搜题解。~~

~~网上的题解显示~~先带一个 $\omega_n^{-k}$ 。~~然后直觉告诉我们这是对的。~~

$$\begin{aligned}G(\omega_n^{-k})&=\sum_{i=0}^{n-1}g_i\omega_n^{-ki}\\&=\sum_{i=0}^{n-1}(\sum_{j=0}^{n-1}f_j\omega_n^{ij})\omega_n^{-ki}\\&=\sum_{i=0}^{n-1}\sum_{j=0}^{n-1}f_j\omega_n^{ij}\omega_n^{-ki}\\&=\sum_{j=0}^{n-1}f_j\sum_{i=0}^{n-1}\omega_n^{(j-k)i}\end{aligned}$$

我们先对 $\sum_{i=0}\limits^{n-1}\omega_n^{(j-k)i}$ 这个式子下手。

分两种情况讨论：

1. 当 $j=k$ 时，显然这个式子的结果是 $n$。
2. 当 $j\neq k$ 时，我们就用到了我们的等比数列求和大法。先看这个等式：
$$\sum_{i=0}^{n-1}\omega_n^{(j-k)i}=\sum_{i=0}^{n-1}\omega_n^{(j-k)i}$$
它显然成立。我们在这个等式两边同时乘上 $\omega_n^{j-k}$，得到：
$$\omega_n^{j-k}\sum_{i=0}^{n-1}\omega_n^{(j-k)i}=\sum_{i=0}^{n-1}\omega_n^{(j-k)(i+1)}$$
两等式相减，得
$$(\omega_{n-1}^{j-k}-1)\sum_{i=0}^{n-1}\omega_n^{(j-k)i}=1-\omega_n^{n}$$
想想单位根的某个性质。
$$\begin{aligned}&\ \ \ \ \ \ (\omega_{n-1}^{j-k}-1)\sum_{i=0}^{n-1}\omega_n^{(j-k)i}&=&0\\&\Rightarrow\sum_{i=0}^{n-1}\omega_n^{(j-k)i}&=&0\end{aligned}$$

回到原式。我们发现，当 $j=k$ 时，$\sum_{i=0}\limits^{n-1}\omega_n^{(j-k)i}=n$，且这种情况只有一次出现，其余情况 $\sum_{i=0}\limits^{n-1}\omega_n^{(j-k)i}$ 均等于 $0$。

所以，
$$\begin{aligned}&\ \ \ \ \ \ G(\omega_n^{-k})&=&\sum_{j=0}^{n-1}f_j\sum_{i=0}^{n-1}\omega_n^{(j-k)i}\\&&=&nf_k\\&\Rightarrow f_k&=&\frac{G(\omega_n^{-k})}{n}\end{aligned}$$

---

好了，FFT的理论部分就讲到这里。

# NTT

# 铭谢

- 感谢@attack 神仙的题解。这篇题解和那篇题解的思路是基本一样的，所以会有很多相似的地方。