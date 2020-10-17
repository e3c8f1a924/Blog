---
title: 莫比乌斯反演
description: 迪利克雷卷积的性质以及莫比乌斯反演的入门。
time: 2020-07-16 20:14:33
tags:
- 学习笔记
- OI相关
- 数学
- 树论
- 莫比乌斯反演
---

# 积性函数

## 定义

- 若 $f(a)f(b)=f(ab)$ 在 $\gcd(a,b)=1$ 时成立，则称 $f$ 为积性函数。
- 若 $f(a)f(b)=f(ab)$ 在任何情况下成立，则称 $f$ 为完全积性函数。

## 常见积性函数${}^{[1]}$

- \* $\epsilon(n)=[n=1]$
- \* $\operatorname{I}(n)=1$
- \* $\operatorname{id}(n)=n$

带 * 的是完全积性函数。

# 狄利克雷卷积

## 定义${}^{[1]}$

$$(f*g)(n)=\sum_{ab=n}f\left(a\right)g(b)$$

其中 $a,b\in \mathbb{N^*}$。

等价写法：

$$(f*g)(n)=\sum_{d|n}f\left(d\right)g\left(\frac{n}{d}\right)$$

亦可简记为 $f*g$。

## 运算定律${}^{[2]}$

- 交换律  
显然，简记 $f*g=g*f$

- 结合律  
$$
\begin{aligned}
(f*g*h)(n)&=\sum_{ab=n}\left[\sum_{cd=a}f\left(c\right)g\left(d\right)\right]h\left(b\right)\\
&=\sum_{bcd=n}f\left(c\right)g\left(d\right)h\left(b\right)\\
&=\sum_{acd=n}f\left(a\right)g\left(c\right)h\left(d\right)\\
&=\sum_{ab=n}f\left(a\right)\left[\sum_{cd=b} g\left(c\right)h\left(d\right)\right]\\
&=[f*(g*h)](n)
\end{aligned}
$$
证毕。  
简记 $f*g*h=f*(g*h)$。

- 分配率  
$$
\begin{aligned}
[(f+g)*h](n)&=\sum_{ab=n}(f+g)(a)h(b)\\
&=\sum_{ab=n}f(a)h(b)+\sum_{ab=n}f(g)h(b)\\
&=(f*h+g*h)(n)
\end{aligned}
$$
证毕。  
简记 $(f+g)*h=f*h+g*h$。由交换律可得 $f*(g+h)=f*g+f*h$。

# 莫比乌斯函数 ($\mu$)

## 定义${}^{[3]}$

$$
\mu(n)=
\begin{cases}
1&n=1,\\
(-1)^k&\forall a\in\mathbb{N^*},a\neq 1,\exist a^2\not|n,\\
0&\mathrm{Otherwise}.
\end{cases}
$$

其中 $k$ 是 $n$ 的质因数个数。

## 性质

一些常用的性质

- 积性函数：$\mu(a)\mu(b)=\mu(ab)$，其中 $\gcd(a,b)=1$  
证明  
分情况讨论。  
若 $a,b$ 中有一个数是 $1$，那么该性质显然成立。  
若 $a,b$ 有一个数有平方数因子，那么 $\mu(a)\mu(b)=\mu(ab)$ 也显然成立。  
其他情况，由于条件限定 $a,b$ 互质，那么它们的乘积的质因数个数显然是两数质因数个数之和，即 $\mu(ab)=(-1)^{k_1+k_2}=(-1)^{k_1}(-1)^{k_2}=\mu(a)\mu(b)$，其中 $k_1,k_2$ 分别是 $a,b$ 的质因数个数。  
证毕。
- ${}^{[4]}\mu*\operatorname{I}=\epsilon$  
证明  
$$
\begin{aligned}
(\mu*\operatorname{I})(n)&=\sum_{d|n}\mu(d)
\end{aligned}
$$
当 $n=1$ 时，显然。  
当 $n>1$ 时，设 $d|n$，$m$ 是 $n$ 的质因数个数。  
由莫比乌斯函数的定义可得，当 $d$ 的任意一个质因数指数 $>1$ 时，$\mu(d)=0$，否则 $\mu(n)=(-1)^k$，其中 $k$ 是 $d$ 的质因数个数。  
那么对 $(\mu*\operatorname{I})(n)$ 有 $(-1)^k$ 贡献的 $d$ 有 $\binom{m}{k}$ 个，即
$$
(\mu*\operatorname{I})(n)=\sum_{k=0}^m(-1)^k\binom{m}{k}
$$
应用二项式定理得
$$
\begin{aligned}
(\mu*\operatorname{I})(n)&=\sum_{k=0}^m(-1)^k\binom{m}{k}\\
&=(1-1)^m\\
&=0
\end{aligned}
$$
即 $(\mu*\operatorname{I})(n)=[n=0]=\epsilon$，证毕。

# 莫比乌斯反演

## 定义

$$F(n)=\sum_{d|n}f(d)\Leftrightarrow f(n)=\sum_{d|n}\mu(d)F\left(\frac{n}{d}\right)$$

## 证明${}^{[1]}$

定义中的内容可以表示为 $F=f*\operatorname{I}\Leftrightarrow f=\mu*F$。
又因为

$$\begin{aligned}a\end{aligned}$$

即 $F=f*\operatorname{I}\Leftrightarrow f=\mu*F$ 成立，莫比乌斯反演得证。

## 应用

先鸽着。

---

# References

- [1] <https://www.cnblogs.com/peng-ym/p/9446555.html>
- [2] <https://www.jianshu.com/p/09e55098fbd7>
- [3] <https://baike.baidu.com/item/%E9%BB%98%E6%AF%94%E4%B9%8C%E6%96%AF%E5%87%BD%E6%95%B0/16625781>
- [4] <https://www.luogu.com.cn/blog/MaouSanta/Mobius-function>