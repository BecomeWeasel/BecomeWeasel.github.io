---
emoji: ๐
title: ํ๋ก๊ทธ๋๋จธ์ค - ๊ฒฝ์ฃผ๋ก ๊ฑด์ค (2020 ์นด์นด์ค ์ธํด์ฝ)
date: '2021-07-15 00:00:00'
author: weasel
tags: ์นด์นด์ค ์ฝ๋ฉํ์คํธ ์๊ณ ๋ฆฌ์ฆ
categories: PS
---

![](./race-road.png)

### ๋ฌธ์  ์ ๋ชฉ
[๊ฒฝ์ฃผ๋ก ๊ฑด์ค](https://programmers.co.kr/learn/courses/30/lessons/67259)

### ๋ฌธ์  ์ค๋ช
![](https://images.velog.io/images/hsw0194/post/8326247c-0516-4faf-a2a5-4baacac9e202/image.png)
๊ฑด์คํ์ฌ์ ์ค๊ณ์ฌ์ธ ์ฃ ๋ฅด๋๋ ๊ณ ๊ฐ์ฌ๋ก๋ถํฐ ์๋์ฐจ ๊ฒฝ์ฃผ๋ก ๊ฑด์ค์ ํ์ํ ๊ฒฌ์ ์ ์๋ขฐ๋ฐ์์ต๋๋ค.
์ ๊ณต๋ ๊ฒฝ์ฃผ๋ก ์ค๊ณ ๋๋ฉด์ ๋ฐ๋ฅด๋ฉด ๊ฒฝ์ฃผ๋ก ๋ถ์ง๋ N x N ํฌ๊ธฐ์ ์ ์ฌ๊ฐํ ๊ฒฉ์ ํํ์ด๋ฉฐ ๊ฐ ๊ฒฉ์๋ 1 x 1 ํฌ๊ธฐ์๋๋ค.
์ค๊ณ ๋๋ฉด์๋ ๊ฐ ๊ฒฉ์์ ์นธ์ 0 ๋๋ 1 ๋ก ์ฑ์์ ธ ์์ผ๋ฉฐ, 0์ ์นธ์ด ๋น์ด ์์์ 1์ ํด๋น ์นธ์ด ๋ฒฝ์ผ๋ก ์ฑ์์ ธ ์์์ ๋ํ๋๋๋ค.
๊ฒฝ์ฃผ๋ก์ ์ถ๋ฐ์ ์ (0, 0) ์นธ(์ข์ธก ์๋จ)์ด๋ฉฐ, ๋์ฐฉ์ ์ (N-1, N-1) ์นธ(์ฐ์ธก ํ๋จ)์๋๋ค. ์ฃ ๋ฅด๋๋ ์ถ๋ฐ์ ์ธ (0, 0) ์นธ์์ ์ถ๋ฐํ ์๋์ฐจ๊ฐ ๋์ฐฉ์ ์ธ (N-1, N-1) ์นธ๊น์ง ๋ฌด์ฌํ ๋๋ฌํ  ์ ์๊ฒ ์ค๊ฐ์ ๋๊ธฐ์ง ์๋๋ก ๊ฒฝ์ฃผ๋ก๋ฅผ ๊ฑด์คํด์ผ ํฉ๋๋ค.
๊ฒฝ์ฃผ๋ก๋ ์, ํ, ์ข, ์ฐ๋ก ์ธ์ ํ ๋ ๋น ์นธ์ ์ฐ๊ฒฐํ์ฌ ๊ฑด์คํ  ์ ์์ผ๋ฉฐ, ๋ฒฝ์ด ์๋ ์นธ์๋ ๊ฒฝ์ฃผ๋ก๋ฅผ ๊ฑด์คํ  ์ ์์ต๋๋ค.
์ด๋, ์ธ์ ํ ๋ ๋น ์นธ์ ์ํ ๋๋ ์ข์ฐ๋ก ์ฐ๊ฒฐํ ๊ฒฝ์ฃผ๋ก๋ฅผ ์ง์  ๋๋ก ๋ผ๊ณ  ํฉ๋๋ค.
๋ํ ๋ ์ง์  ๋๋ก๊ฐ ์๋ก ์ง๊ฐ์ผ๋ก ๋ง๋๋ ์ง์ ์ ์ฝ๋ ๋ผ๊ณ  ๋ถ๋ฆ๋๋ค.
๊ฑด์ค ๋น์ฉ์ ๊ณ์ฐํด ๋ณด๋ ์ง์  ๋๋ก ํ๋๋ฅผ ๋ง๋ค ๋๋ 100์์ด ์์๋๋ฉฐ, ์ฝ๋๋ฅผ ํ๋ ๋ง๋ค ๋๋ 500์์ด ์ถ๊ฐ๋ก ๋ญ๋๋ค.
์ฃ ๋ฅด๋๋ ๊ฒฌ์ ์ ์์ฑ์ ์ํด ๊ฒฝ์ฃผ๋ก๋ฅผ ๊ฑด์คํ๋ ๋ฐ ํ์ํ ์ต์ ๋น์ฉ์ ๊ณ์ฐํด์ผ ํฉ๋๋ค.

์๋ฅผ ๋ค์ด, ์๋ ๊ทธ๋ฆผ์ ์ง์  ๋๋ก 6๊ฐ์ ์ฝ๋ 4๊ฐ๋ก ๊ตฌ์ฑ๋ ์์์ ๊ฒฝ์ฃผ๋ก ์์์ด๋ฉฐ, ๊ฑด์ค ๋น์ฉ์ 6 x 100 + 4 x 500 = 2600์ ์๋๋ค.
![](https://images.velog.io/images/hsw0194/post/aef8054f-c65c-488a-b209-3d34dc644a2a/image.png)
๋ ๋ค๋ฅธ ์๋ก, ์๋ ๊ทธ๋ฆผ์ ์ง์  ๋๋ก 4๊ฐ์ ์ฝ๋ 1๊ฐ๋ก ๊ตฌ์ฑ๋ ๊ฒฝ์ฃผ๋ก์ด๋ฉฐ, ๊ฑด์ค ๋น์ฉ์ 4 x 100 + 1 x 500 = 900์ ์๋๋ค.
![](https://images.velog.io/images/hsw0194/post/714149fd-a102-4f9e-87eb-1029f4fe0ecb/image.png)
๋๋ฉด์ ์ํ(0์ ๋น์ด ์์, 1์ ๋ฒฝ)์ ๋ํ๋ด๋ 2์ฐจ์ ๋ฐฐ์ด board๊ฐ ๋งค๊ฐ๋ณ์๋ก ์ฃผ์ด์ง ๋, ๊ฒฝ์ฃผ๋ก๋ฅผ ๊ฑด์คํ๋๋ฐ ํ์ํ ์ต์ ๋น์ฉ์ return ํ๋๋ก solution ํจ์๋ฅผ ์์ฑํด์ฃผ์ธ์.

#### ์ ํ ์ฌํญ
* board๋ 2์ฐจ์ ์ ์ฌ๊ฐ ๋ฐฐ์ด๋ก ๋ฐฐ์ด์ ํฌ๊ธฐ๋ 3 ์ด์ 25 ์ดํ์๋๋ค.
* board ๋ฐฐ์ด์ ๊ฐ ์์์ ๊ฐ์ 0 ๋๋ 1 ์๋๋ค.
* ๋๋ฉด์ ๊ฐ์ฅ ์ผ์ชฝ ์๋จ ์ขํ๋ (0, 0)์ด๋ฉฐ, ๊ฐ์ฅ ์ฐ์ธก ํ๋จ ์ขํ๋ (N-1, N-1) ์๋๋ค.
์์์ ๊ฐ 0์ ์นธ์ด ๋น์ด ์์ด ๋๋ก ์ฐ๊ฒฐ์ด ๊ฐ๋ฅํจ์ 1์ ์นธ์ด ๋ฒฝ์ผ๋ก ์ฑ์์ ธ ์์ด ๋๋ก ์ฐ๊ฒฐ์ด ๋ถ๊ฐ๋ฅํจ์ ๋ํ๋๋๋ค.
* board๋ ํญ์ ์ถ๋ฐ์ ์์ ๋์ฐฉ์ ๊น์ง ๊ฒฝ์ฃผ๋ก๋ฅผ ๊ฑด์คํ  ์ ์๋ ํํ๋ก ์ฃผ์ด์ง๋๋ค.
์ถ๋ฐ์ ๊ณผ ๋์ฐฉ์  ์นธ์ ์์์ ๊ฐ์ ํญ์ 0์ผ๋ก ์ฃผ์ด์ง๋๋ค.


### ์์  ์์ถ๋ ฅ
**์๋ ฅ**
```
[[0,0,0],[0,0,0],[0,0,0]]	
[[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,1],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,0,0,0,0,0,0]]	
[[0,0,1,0],[0,0,0,0],[0,1,0,1],[1,0,0,0]]	
[[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,1,0,0,0],[1,0,0,1,0,1],[0,1,0,0,0,1],[0,0,0,0,0,0]]	
```
**์์ถ๋ ฅ ์ #4**
![](https://images.velog.io/images/hsw0194/post/b1614d13-f782-4bbe-807e-86c1216d0580/image.png)
>๋ถ์์ ๊ฒฝ๋ก์ ๊ฐ์ด ๊ฒฝ์ฃผ๋ก๋ฅผ ๊ฑด์คํ๋ฉด ์ง์  ๋๋ก 12๊ฐ, ์ฝ๋ 4๊ฐ๋ก ์ด 3200์์ด ๋ญ๋๋ค.
๋ง์ฝ, ํ๋์ ๊ฒฝ๋ก์ ๊ฐ์ด ๊ฒฝ์ฃผ๋ก๋ฅผ ๊ฑด์คํ๋ค๋ฉด ์ง์  ๋๋ก 10๊ฐ, ์ฝ๋ 5๊ฐ๋ก ์ด 3500์์ด ๋ค๋ฉฐ, ๋ ๋ง์ ๋น์ฉ์ด ๋ญ๋๋ค.

**์ถ๋ ฅ**
```
900
3800
2100
3200
```

### ํ์ด
์ฒ์ ๋  ์๊ฐ์ ์นด์นด์ค๋ค์ด ๋ฌธ์ ์๋ค. BFS/DFS์ ๊ฐ์ ์ด๋ ต์ง ์์ ํ์ ํ์ด๋ฅผ ์๊ตฌํ์ง๋ง , naiveํ์ง ์๊ณ  ์ฌ๋ฌ๊ฐ์ง ์ ์ฝ์ ์ฃผ๊ณ  ~~๋ฌธ์ ๊ฐ ๊ท์ฝ๊ณ ~~ ๋ฌธ์  ์ค๋ช์ด ๊ต์ฅํ ์น์ ํ๋ค๋ ๊ฒ์ด๋ค. ์์๋ ๊ต์ฅํ ๋ง๊ณ  ๊ฐ๊ฐ์ ์์์ ๋ํด์ ์ค๋ช์ด ๋์์๊ธฐ ๋๋ฌธ์ ์ฝ๋์ผ์ด์ค ๋ฐฉ์ด์ ์ฝ๊ณ  ๋ผ๋ฆฌ๊ตฌ์กฐ ์๊ธฐ๊ฐ ์์ํ๋ค.

**๊ทธ๋ ๋ค๊ณ  ๋ง๋ฅ ์ฌ์ด ๋ฌธ์ ๋ ์๋๋ค.**

#### ์ฌ๊ณ ์ ๊ณผ์ 
๋ฌธ์  ๋ํด๋ฅผ ์ฒ์ฒํ ํด๋ณด๋ฉด, ์ต๋จ๊ฒฝ๋ก๋ฅผ ๊ตฌํ๋ ๋ฌธ์ ์ฒ๋ผ ํฌ์ฅ์ ํด๋์๋ค. ํ์ง๋ง ๋ฐ๋ก ์์ ์ธ๊ธํ **์์ถ๋ ฅ #4**๋ฅผ ๋ณด๋ฉด ํ๋์ ๊ฒฝ๋ก๊ฐ ์ต๋จ๊ฒฝ๋ก์์ ์ ์ ์์ง๋ง, ์ต๋จ๊ฒฝ๋ก๊ฐ ์๋ ๋นจ๊ฐ์ ๊ฒฝ๋ก๊ฐ ๊ฐ์ฅ ์ ์ ๋น์ฉ์ผ๋ก ๋ชฉํ์ง์ ์ ๋๋ฌํ  ์ ์๋ ๊ฒฝ๋ก๋ค. naiveํ๊ฒ ์ต๋จ๊ฒฝ๋ก๋ฅผ ๊ตฌํ๋ ๋ฌธ์ ๋ ์๋๊ฒ์ด๋ค. 

๊ทธ๋ ๋ค๊ณ  [ํธ๋ฆฌ์ ์ง๋ฆ](https://www.acmicpc.net/problem/1967) ๊ฐ์ ์ต์ฅ๊ฒฝ๋ก ๋ฌธ์ ์ผ๊น? **์ ํ ์๋๋ค.** ์ต์ํ ์ฐ๋ฆฌ๊ฐ ๊ตฌํ๋ ๊ฒฝ๋ก๋ ์ต๋จ๊ฒฝ๋ก์ ๊ทผ์ ํ์ง๋ง, ๊ทธ ์์์ ๋น์ฉ์ ๊ณ ๋ฏผํด์ผ ํ๋ ๋ฌธ์ ๋ค. 

๋ฌธ์ ๋ด์ ๋ช์๋ ๋น์ฉ์ ์ ์ฝ์ฌํญ์ ์๋์ ๊ฐ๋ค.
>์ธ์ ํ ๋ ๋น ์นธ์ ์ํ ๋๋ ์ข์ฐ๋ก ์ฐ๊ฒฐํ ๊ฒฝ์ฃผ๋ก๋ฅผ ์ง์ ๋๋ก๋ผ๊ณ  ํฉ๋๋ค. ๋ํ ๋ ์ง์  ๋๋ก๊ฐ **์๋ก ์ง๊ฐ์ผ๋ก ๋ง๋๋ ์ง์ ์ ์ฝ๋**๋ผ๊ณ  ๋ถ๋ฆ๋๋ค.

์ฌ์ด ๋ง๋ก ๋ฐ๊พธ๋ฉด, ๊ฒฝ์ฃผ๋ก๊ฐ ๊ณ์ **์ค๋ฅธ์ชฝ์ผ๋ก ๊ฐ๋ค๊ฐ ์,์๋ ๋ฐฉํฅ**์ผ๋ก ๋ฐ๊พธ๋ฉด ๋๋ฉด ์ฝ๋๊ฐ ์๊ธด๋ค๋ ๊ฒ์ด๋ค. (**์ ์ผ์ชฝ์ด ์ ์ธ๋์๋๊ฐ๋ ์๋์์ ์ค๋ชํ๊ฒ ๋ค.**) ๋ค์ ๋งํด์ ํ์์ ๋ฐฉํฅ์ด ์ ํ๋๋ ์์ ์์ ์ฝ๋๊ฐ ์๊ธด๋ค๋ ๊ฒ์ด๊ณ , ์ง์ ์ ํ์์ ๋ฐฉํฅ์ด ์ค์ํ๋ ๊ธฐ๋ก ํ  ํ์๊ฐ ์๋ค.

>์ด๊ฑธ ๋ณธ ์๊ฐ ๋ฐ๋ก ๋ ์ค๋ฅธ ๋น์ทํ ๋ฌธ์ ๊ฐ ์๋ค. ๋ฐฑ์ค์ [๋ก๋ด](https://www.acmicpc.net/problem/1726)์ด๋ผ๋ ๋ฌธ์ ์ธ๋ฐ, ๋จ์ํ ํ์์ด ์๋ ์ด์  ํ์์์์ ๋ฐฉํฅ์ด ์ง๊ธ์ ํ์์ ๋ช๋ น๊ฐ์์ ์ํฅ์ ์ฃผ๋ ๋ฌธ์ ๋ค.

#### visit ๋ฐฐ์ด์ ์ด์  ๋ฐฉํฅ์ด ํฌํจ๋์ด์ผํ๋?
์ง์  ํ์์ ๋ฐฉํฅ์ด ์ค์ํ๋ค๋ ๊ฒ์, ์ง์  ํ์์์์ ์ํฉ์ด ๋จ์ **x,y**์ขํ๊ฐ ์๋๋ผ **์,ํ,์ข,์ฐ**์ธ ๋ฐฉํฅ ์ญ์ ํฌํจํ๋ค๋ ๊ฒ์ด๋ค. [์ผ์ฐจ์ DFS ํ์์ ๊ดํ ์ด์  ๊ธ](https://velog.io/@hsw0194/%EB%B0%B1%EC%A4%80-16922-%EB%A1%9C%EB%A7%88%EC%88%AB%EC%9E%90-%EB%A7%8C%EB%93%A4%EA%B8%B0)์์ ๋ช์ํ ๋ด์ฉ ์ค์์ _BFS์ DFS๋  ๋ธ๋์ ๋ฐฉ๋ฌธ์ฌ๋ถ ๋ฐฐ์ด์ ์ฐจ์์ ๊ตฌ์ฑํ๋๊ฒ์ ๋ธ๋๋ฅผ ๋ฐฉ๋ฌธํ ๋์ ์ํฉ์ ๊ฐ์์ ๋ฐ๋ผ ๋๋์ด ์ง๋ค๋๊ฒ_ ์ด๋ผ๋ ๋ถ๋ถ์ด ์๋ค. 

๊ทธ๋ฌ๋ฉด (x,y)๋ฅผ ๋ฐฉ๋ฌธํ๋์ง ์ฒดํฌํ๋ visit ๋ฐฐ์ด์ด ์ง์  ๋ฐฉํฅ๊น์ง ํฌํจํ 3์ฐจ์์ด์ฌ์ผ ํ ๊ฒ๊ฐ๋ค.
> `visit[y][x][prev_dir]` =์ด์  ๋ฐฉํฅ์ด prev_dir์ธ ์ํ๋ก (x,y)๋ฅผ ๋ฐฉ๋ฌธํ๋์ง

์๋ง ํ์ํ ๋ ์ด๋ฐ ์์ผ๋ก ๊ฒ์ฌํ๋ฉด ๊ฐ์ ๋ฐฉํฅ ์ ๊ทผ์ ์ค๋ณต ๋ฐฉ๋ฌธ์ ๋ง์ ์ ์๋ค.
```python
if 0<=ny<n and 0<=nx<n and board[ny][nx]!=1 and not visit[ny][nx][dir]:
    visit[ny][nx][dir]=True
    q.append((ny,nx,dir))
```
#### ํ์คํ๊ฒ ํ๋ฆฌ๋ ๋ฐ๋ก
**๋ฌธ์  ํด๊ฒฐ!!!** ์ด๋ฉด ์ฐธ ์ข๊ฒ ์ง๋ง, ์์์กฐ์ฐจ ํต๊ณผํ์ง ๋ชปํ๋ค. ๊ทธ ์ด์ ๋ ์๋์ ๊ฐ๋ค.
![](https://images.velog.io/images/hsw0194/post/a09fb254-5c56-4a89-9dec-a028d894ac3c/%EA%B7%B8%EB%A6%BC2.png)
์์ ๊ทธ๋ฆผ์์ ํ๋์ ๊ฒฝ๋ก์ ๋นจ๊ฐ์ ๊ฒฝ๋ก๊ฐ ์๋ค๊ณ  ํ ๋ ๋นจ๊ฐ์ ๊ฒฝ๋ก๊ฐ ์ต์๋น์ฉ์ ๊ฐ์ง๋ ๊ฒฝ๋ก๋ค. ์ฃผ์ ๊น๊ฒ ๋ด์ผํ  ๋ถ๋ถ์ ์ด๋ก์ ๋ฐ์ค๋ฅผ ์น ๋ถ๋ถ์ด๋ค. 

๋ง์ฝ ํ๋์ ๊ฒฝ๋ก๊ฐ ๋นจ๊ฐ์ ๊ฒฝ๋ก๋ณด๋ค ๋จผ์  ์ํ๋๋ค๊ณ  ํ๋ค๋ฉด , **(3,1)์์ (3,2)** ์ผ๋ก ๋ด๋ ค์ฌ๋ `visit[2][3][up]`์ ๊ฐ์ `False`์์ `True`๋ก ๋ฐ๋๊ฒ ๋๋ค. **(3,2)** ๋ฅผ ์์์ ์๋๋ก ๋ด๋ ค์ค๋ ๋ฐฉ๋ฌธ์ ์ถํ ํ์์์ ๋ฐฉ๋ฌธ ๋ถ๊ฐ๋ฅํ ์ํ์ธ๊ฒ์ด๋ค.

๊ทธ๋ฐ๋ฐ ๋นจ๊ฐ์ ๊ฒฝ๋ก๋ ์ ํํ๊ฒ **(3,2)** ๋ก ๋ด๋ ค์ค๋ ๊ฒฝ๋ก๋ฅผ ํฌํจํ๊ณ  ์๋ค. `visit[2][3][up]`์ ์ฒดํฌํ๊ฒ ๋๋๋ฐ, ์ด์  ํ์์ธ ํ๋์ ๊ฒฝ๋ก์์ ์ด๋ฏธ `True`๋ก ์ ์ฅํ๊ธฐ ๋๋ฌธ์ ๋ฐฉ๋ฌธํ ์ ์๊ฒ ๋๋ ๊ฒ์ด๋ค. **์ต์ ๋น์ฉ**์ด ์๋ ๊ฒฝ๋ก๊ฐ ๋ฏธ๋ฆฌ ๋ฐฉ๋ฌธํ๊ธฐ ๋๋ฌธ์ **์ต์ ๋น์ฉ**์ ๊ฐ์ง๋ ๊ฒฝ๋ก๊ฐ ์ ์์ ์ธ ํ์์ ์งํํ  ์ ์๊ฒ ๋๋ ๊ฒ์ด๋ค.

#### ๊ทธ๋ฌ๋ฉด ์ด๋ป๊ฒ?
๊ทธ๋ฌ๋ฉด ์ด๋ป๊ฒ ํด์ผํ๋ ๊ฑธ๊น ? ๋ชจ๋  ๊ฐ๋ฅํ ๊ฒฝ๋ก๋ง๋ค ๋ฐฉ๋ฌธํ๋ ์ขํ๋ฅผ ๊ธฐ๋กํด์ผ ํ๋? ๊ทธ๋ฌ๋ฉด ํ์คํ๊ฒ ๋ต์ ๊ตฌํ  ์ ์๋ค. ํ๋์์ด ๋ฐฉ๋ฌธํ **(3,2)** ์ ๋นจ๊ฐ์์ด ๋ฐฉ๋ฌธํ **(3,2)** ๋ ๋ค๋ฅด๊ธฐ ๋๋ฌธ์ด๋ค. ํ์ง๋ง ๊ณต๊ฐ ๋ณต์ก๋๊ฐ ์ง์๋งํผ ์ฆ๊ฐํ๊ธฐ์ ์ ์ ํ์ง ์๋ค.

๋ฌธ์ ๋ฅผ ๋ค์ ์ฒ์ฒํ ์ฝ์ด๋ณด๋ฉด, ๊ฐ๊ฐ์ ์ขํ๋ค์ ๋ํด์ **์ต์ ๋น์ฉ**๊ฒฝ๋ก๋ก ์ ๊ทผํด์ผํ๋ ๊ฒ์ด๋ค. ์์ ์์๋ฅผ ๋ค์ ๋ณด๋ฉด, **(3,2)** ๋ฅผ ๋ฐฉ๋ฌธํ ๋ ๋นจ๊ฐ์ ๊ฒฝ๋ก์ ๋น์ฉ๊ณผ ํ๋์ ๊ฒฝ๋ก์ ๋น์ฉ์ ๋น๊ตํ๋ฉด ๋นจ๊ฐ์ ๊ฒฝ๋ก์ ๋น์ฉ์ด ๋ ์ ๋ค. ๊ทธ ๋ง์ ์ด๋ฏธ ํ๋์ ๊ฒฝ๋ก์์ **(3,2)** ๋ฅผ ๋ฐฉ๋ฌธํ๋๋ผ๋, ๋นจ๊ฐ์ ๊ฒฝ๋ก๊ฐ ๋ ์ ์ ๊ฑด์ค๋น์ฉ์ ๊ณ์ฐ ํ  ์ ์์ผ๋ฉด **(3,2)** ๋ฅผ ์ฌ๋ฐฉ๋ฌธํ๊ฒ ํด์ผ ํ๋ค. **์กฐ๊ฑด์ ์ธ ์ฌ๋ฐฉ๋ฌธ์ ํ์ฉํ  ํ์๊ฐ ์๊ณ  `visit` ๋ฐฐ์ด์ ์ฌ์ ์ํด์ผ ํ๋ค.**

#### visit ๋ฐฐ์ด์ DP์  ํน์ฑ
> `visit[y][x]` = (x,y)๋ฅผ ๋ฐฉ๋ฌธํ์๋์ ๋น์ฉ, (x,y)๋ฅผ ๋ฐฉ๋ฌธํ ๋ ๋น์ฉ์ด visit[y][x]๋ณด๋ค ์๊ฑฐ๋ ๊ฐ์ผ๋ฉด ์ฌ๋ฐฉ๋ฌธ ๊ฐ๋ฅ

์ด๋ ๊ฒ ์ ์ํ๊ณ  ๋ค์ ๋ฌธ์ ๋ฅผ ๋ณด์. ๋ชจ๋  ๋ธ๋๋ค๊ฐ์ ๊ฐ์ ์ด  **์์ ๊ฐ์ค์น๋ฅผ ๊ฐ๋** ๊ทธ๋ํ์์์ **DP์ BFS**๋ฌธ์ ๋ก ๋ณผ ์ ์๋ค.

๊ฒฐ๊ตญ์ ๋ฌธ์ ์ ํต์ฌ์ **(y,x)๋ก ๋์ฐฉํ๋ ์ต์ ๋น์ฉ** ๊ฒฝ๋ก๊ฐ ์๋ก ์๋ค๋ฉด, ์ค๋ณต ๋ฐฉ๋ฌธ์ ํ์ฉํ๋ ์์ด๋์ด๋ค. ์์ ์ด์ง ์ธ๊ธํ ์๋ ์ฌ๋ก๋ visit ๋ฐฐ์ด์ ํน์ฑ์ ์๊ฐํ๋ฉด ์๋ชํ๊ฒ ํ๋ฆฐ๋ค.
>๊ฒฝ์ฃผ๋ก๊ฐ ๊ณ์ ์ค๋ฅธ์ชฝ์ผ๋ก ๊ฐ๋ค๊ฐ ์,์๋ ๋ฐฉํฅ์ผ๋ก ๋ฐ๊พธ๋ฉด ๋๋ฉด ์ฝ๋๊ฐ ์๊ธด๋ค๋ ๊ฒ์ด๋ค. (์ ์ผ์ชฝ์ด ์ ์ธ๋์๋๊ฐ๋ ์๋์์ ์ค๋ชํ๊ฒ ๋ค.) 

**์ค๋ฅธ์ชฝ**์ผ๋ก๋ง ๊ฐ๋ค๊ฐ **์ผ์ชฝ**์ผ๋ก ๋ฐฉํฅ์ ํธ๋ ๊ฒ์ , ์๋ ๊ณณ์ ๋๋์ ๊ฐ๋ ๊ฒ์ด๊ณ , **๋ชจ๋  ์ขํ๋ผ๋ฆฌ์ ์ด๋์ ์์ ๊ฐ์ค์น**๋ฅผ ๊ฐ๊ธฐ ๋๋ฌธ์ ๋๋์ ๊ฐ๋๋ ์๋ ๊ฒ๋ณด๋ค ๋ฌด์กฐ๊ฑด ํฐ ๋น์ฉ์ ๊ฐ๊ธฐ ๋๋ฌธ์ ์ผ์ชฝ ๋ฐฉํฅ์ผ๋ก ์ด๋์ ๊ณ ๋ คํ  ํ์๊ฐ ์๋ ๊ฒ์ด๋ค.

**`visit[y][x]`์ ๋น์ฉ๋ณด๋ค ๊ฐ์๋๋ ์ค๋ณต ๋ฐฉ๋ฌธ์ ํ์ฉ**ํด์ผ ํ๋ ์ด์ ๊ฐ ๋ญ๊น?
๊ฐ๋จํ ์๊ฐํด์ ์ต์๋น์ฉ ๊ฒฝ๋ก๊ฐ ๋ฌด์กฐ๊ฑด **(3,3)** ์ ๋ฐฉ๋ฌธํด์ผ ํ๋ค๊ณ  ํด๋ณด์. **(3,3)** ์  ์ง์ ์ผ๋ก ๋ฐฉ๋ฌธํ ๋๊ฐ ์๊ณ , ๊บพ์ด์ ๋ฐฉ๋ฌธํ ๋๊ฐ ์๋ค. ๋ง์ฝ **(3,3)** ์ ๋ฐฉ๋ฌธํ๊ธฐ ์ ๊น์ง์ ๋์ ๋น์ฉ์ด ๊ฐ๋ค๊ณ  ํ ๋ ,๋จผ์  ๊บพ์ด์ ๋ฐฉ๋ฌธํ๊ฒ ๋๋ ๊ฒฝ์ฐ์๋ ์ถํ์ ์ถ๊ฐ์ ์ผ๋ก ์ฝ๋ ๊ฑด์ค ๋น์ฉ์ด 500๋งํผ ๋ ๋ค๊ธฐ ๋๋ฌธ์ **์ต์ ๋น์ฉ** ๊ฑฐ๋ฆฌ๊ฐ ์๋ ์ ์๋ค. ๊ทธ๋ ๊ธฐ์ ๋น์ฉ์ด ๊ฐ์๋ ๋ฐฉ๋ฌธ์ ๋ง๊ฒ ๋๋ค๋ฉด ์ผ์ง์ ์ผ๋ก **(3,3)** ์ ๋ฐฉ๋ฌธํ๋ ์ต์๋น์ฉ ๊ฑฐ๋ฆฌ๋ฅผ ๊ตฌํ ์ ์๋ค.



๋๋จธ์ง ๋ถ๋ถ์ ๋จ์ ๊ตฌํ์ด๊ธฐ ๋๋ฌธ์ ์ค๋ช์ ์๋ตํ๋ค.

### ํ์ด์ฝ๋
```python
from collections import deque
def solution(board):
    n=len(board)
    answer = 1e9
    # ์ต๋จ๊ฑฐ๋ฆฌ๊ฐ ์ต์๊ฐ์ด ์๋ ์ ์๋ค. ํ์ง๋ง ๊ทผ์ ํ๊ฒ ํ์ด์ผํ๋ค.
    
    dy=[-1,1,0,0]
    dx=[0,0,-1,1]
    
    q=deque()
    # visit ๋ฐฐ์ด์ ๋ชจ๋ INF๋ก ์ฑ์
    visit=[[float('inf') for _ in range(n)]for _ in range(n)]
    
    q.append((0,0,0,-1))
    
    while q:
        y,x,cost,prev_dir=q.popleft()
        
        # ๋์ฐฉํ๋ค๋ฉด
        if y==n-1 and x==n-1:
            answer=min(answer,cost)
            continue
            
        
        for k in range(4):
            # ์ด์  ๋ฐฉํฅ๊ณผ ๋ค๋ฅด๋ค๋ฉด ์ฝ๋ ๊ฑด์ค๋น์ฉ์ด ์ถ๊ฐ๋ก ๋ฌ
            curve_cost=0 if prev_dir==k else 500
            
            new_cost=cost+100+curve_cost

            ny,nx=y+dy[k],x+dx[k]
            
            # (nx,ny) ๋ฐฉ๋ฌธ์ ์ด์  ๋ฐฉ๋ฌธ๋ณด๋ค ์ ์ ๋น์ฉ์ผ๋ก ๋ฐฉ๋ฌธํ๋ฉด
            if 0<=ny<n and 0<=nx<n and board[ny][nx]!=1 and new_cost<=visit[ny][nx]:
                visit[ny][nx]=new_cost
                q.append((ny,nx,new_cost,k))
    # ์ด๊ธฐ ์ถ๋ฐ์์๋ ๋ฐฉํฅ์ด ์์ผ๋ ๋ฌด์กฐ๊ฑด ์ฝ๋๋ฅผ ๋๊ฒ ํ๋๋ฐ
    # ๋ถํ์ํ๊ฒ 500์ ์ด๊ณผ ๋น์ฉ์ด ๋ฐ์ํ๋ ๋นผ์ค์ผํจ
    return answer-500

```

>๋ฐฑ์ค ๋์ด๋๋ก ํ์ฐํ๋ฉด ๊ณจ๋4 ์ ๋๋ก ๋ณด์ธ๋ค.

>์์ฃผ ๊น๋ํ๊ณ  ์ฌ๋ฐ๋ ๋ฌธ์ ์๋ค. 30~40๋ถ ๋ด๋ก ํ์ดํ๋ฉด ์ ์ ํ๋ค.

>bottom up DP๋ก ํ์ด๋ ์ถฉ๋ถํ ๋ต์ด ๋์ฌ๊ฒ๊ฐ๋ค.

```toc

```
