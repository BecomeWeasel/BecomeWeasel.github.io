---
emoji: ๐
title: ์ด์์ฒด์ ์ ๋ฉ๋ชจ๋ฆฌ ํ์ณ๋ณด๊ธฐ 2ํธ - ๊ฐ์ ๋ฉ๋ชจ๋ฆฌ(Virtual Memory)
date: '2022-01-28 10:00:00'
author: weasel
tags: ์ด์์ฒด์  ๊ฐ์๋ฉ๋ชจ๋ฆฌ virtualmemory ์๊ตฌํ์ด์ง
categories: ์ด์์ฒด์ 
---

[์ด์ ํธ : ํ์ด์ง](https://becomeweasel.me/paging/)

## ๊ฐ์ ๋ฉ๋ชจ๋ฆฌ (Virtual Memory)

๊ฐ์ ๋ฉ๋ชจ๋ฆฌ๋ ๋ผ๋ฆฌ์  ๋ฉ๋ชจ๋ฆฌ์ ๋ฌผ๋ฆฌ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๋ถ๋ฆฌ์์ผ, **ํ๋ก์ธ์ค ์ ์ฒด๊ฐ ๋ฉ๋ชจ๋ฆฌ๋ด์ ์ฌ๋ผ์ค์ง ์์๋ ์คํ๊ฐ๋ฅํ๋๋ก ํ๋ ๊ธฐ๋ฒ์ด๋ค.**

๋ฌผ๋ก  ํ๋ก๊ทธ๋จ์ด ์คํ๋๊ธฐ ์ํด์๋ ๋ฉ๋ชจ๋ฆฌ์ ํ๋ก์ธ์ค๊ฐ ์ฌ๋ผ์์ผ ํ๋๊ฒ์ ๋ง๋ค. ํ์ง๋ง ํน์  ๋ถ๋ถ์ ์คํํ ๋๋ ๊ทธ ๋ถ๋ถ๋ง ๋ฉ๋ชจ๋ฆฌ ์์ ์ฌ๋ผ์์์ด๋ ๊ตฌ๋์ด ๋๋ค.

๊ทธ๋ ๊ธฐ ๋๋ฌธ์ ๋ผ๋ฆฌ์  ์ฃผ์๊ณต๊ฐ์ ์ค์  ๋ฌผ๋ฆฌ์  ์ฃผ์๊ณต๊ฐ๋ณด๋ค ํจ์ฌ ์ปค๋ ๋๋ค. ์๋๋ฉด, ์ด์ฐจํผ ์ผ๋ถ๋ง ์คํํ ๋ ํ์ํ๋๊น..
๊ทธ๋ผ ๊ฐ์ฅ ํต์ฌ์ ์ธ ๊ธฐ์ ์ ํ๋ก์ธ์ค๋ฅผ ์คํํ ๋, ํ์ํ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๋ถ๋ฌ์ค๊ณ (**swapped in**) ํ์ํ์ง ์์ ๋ถ๋ถ์ ๋ด๋ฆฌ๋(**swapped out**) ๊ณผ์ ์ด ํ์ํ๋ค.

๊ฐ์๋ฉ๋ชจ๋ฆฌ๋ **์๊ตฌ ํ์ด์ง(Demand Paging)** ์ด๋ผ๋ ๊ธฐ์ ๋ก ๊ตฌํ๋๋ค.

ํน์  ํ์ด์ง์ ๋ํ ์์๊ฐ ์์๋, ์ฆ ํ์ด์ง์ ๋ํ ์ฐธ์กฐ ์์ฒญ์ด ๋ค์ด์์๋ ํ์ด์ง๋ฅผ ๋ฉ๋ชจ๋ฆฌ๋ก ๋ถ๋ฌ์ค๋๊ฒ์ด๋ค.
๋ค์ ๋งํด์ ๊ธฐ์กด์ ๋ฐฉ๋ฒ๊ณผ๋ ๋ค๋ฅด๊ฒ ๊ฐ์ ๋ฉ๋ชจ๋ฆฌ ๋ฐฉ์์ ์ทจํ๋ฉด, ์์ํ ๋๋ถํฐ ์๋ฌด ๋ฉ๋ชจ๋ฆฌ๋ ์ฌ๋ผ์์์ง ์์๋ ๋๊ณ  ํ์ํ ๋๋ง ๋ถ๋ฌ์ค๋ ๋ฐฉ์์ด๋ค.

ํ๋ก๊ทธ๋จ์์ ์ฌ์ฉ๋๋ ์ผ๋ถ๋ถ๋ง ๋ฉ๋ชจ๋ฆฌ์ ์ ์ฌํ๋ ๊ฐ์ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ํตํด์ ์๋์ ๊ฐ์๊ฒ๋ค์ด ๊ฐ๋ฅํ๋ค.

- ์์คํ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ ์ฌ๋ฌ ํ๋ก์ธ์ค ์ฌ์ด์ ๊ณต์ ๊ฐ ๊ฐ๋ฅํ๋ค.
  ํ๋ก์ธ์ค ์์ฅ์์๋ ์์ ์ ์ฃผ์๊ณต๊ฐ์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ ์ฌ๋ผ์์๋ค๊ณ  ์๊ฐํ์ง๋ง, ์ค์ ๋ก ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ ๋ค์ด ์๋ ๋ฌผ๋ฆฌ ๋ฉ๋ชจ๋ฆฌ๋ ํ๋๋ก ๋ชจ๋  ํ๋ก์ธ์ค์ ๊ณต์ ๋๋ ๋ฐฉ์์ด๋ค.
- **ํ๋ก์ธ์ค๊ฐ ๋ง๋ค์ด์ง๋ ํจ์ฌ ๋ ํจ์จ์ ์ด๋ค.** ์๋๋ฉด, ์ค์ ๋ก ํ๋ก์ธ์ค๋ฅผ ๋ง๋ค๋ ํ์ํ ๋ชจ๋  ๋ฉ๋ชจ๋ฆฌ๋ฅผ ํ ๋นํด์ฃผ๋๊ฒ์ด ์๋๋ผ **ํ์ํ ๋๋ง** ์ฃผ๊ธฐ ๋๋ฌธ์ **ํจ์ฌ ๊ฐ๋ณ๊ณ  ํจ์จ์ ์ด๋ค.**
  - ์๋ฅผ ๋ค์ด์ `fork` ๋ฅผ ํด์ ํ๋ก์ธ์ค๋ฅผ ์์ฑํ๋ค๊ณ  ํด๋ณด์.
    ์ด๋ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ์ง์  ์ฃผ๋๊ฒ์ด ์๋๋ผ **๊ธฐ์กด์ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๊ทธ๋๋ก ์ฌ์ฉํ๊ฒ๋๋ง ํ๊ณ  ํ๋ก์ธ์ค๋ ์ด๊ฒ์ ๋๋ฆฝ์ ์ธ ๋ฉ๋ชจ๋ฆฌ ๊ณต๊ฐ์ผ๋ก ์ธ์ํ๋ค.**
- **์ค์  ๋ฌผ๋ฆฌ ๋ฉ๋ชจ๋ฆฌ๋ณด๋ค ๋ ํฐ ๋ฉ๋ชจ๋ฆฌ๋ฅผ** ์๊ตฌํ๋ ํ๋ก์ธ์ค๋ฅผ ๊ตฌ๋์ํฌ ์ ์๋ค.
- **๋ ๋ง์ ํ๋ก์ธ์ค๊ฐ ๊ตฌ๋์ด ๊ฐ๋ฅํ๋ค.**

## ์๊ตฌ ํ์ด์ง (Demand Paging)

ํ์ด์ง๋ฅผ ๋ฉ๋ชจ๋ฆฌ์ ์ฌ๋ฆด๋ ์ค์ง ๊ทธ๊ฒ์ด ํ์ํ ๋๋ง ์ํํ๋๊ฒ์ ์๊ตฌ ํ์ด์ง์ด๋ผ๊ณ  ํ๋ค.
์ด๊ฒ์ Lazy Swapper์ด๋ผ๊ณ ๋ ํ๋๊ฒ๊ฐ๋ค.(๊ทธ ํ์ด์ง ํ์ํ ๋๊น์ง ์ ๋ ํ์ด์ง๋ฅผ ๋ฉ๋ชจ๋ฆฌ์ ์ฌ๋ฆฌ์ง ์๋๋ค)

- **์ ์ I/O** : ์ ์ฒด ์ฝ๋๋ด์์ ์ ๊ทผ ์๋๋ ์ฃผ์๊ณต๊ฐ์ ๊ฐ์ ธ์ฌ ํ์๊ฐ ์์ผ๋.
- **์ ์ ๋ฉ๋ชจ๋ฆฌ ์ฌ์ฉ๋**
- **๋น ๋ฅธ ์๋ต** : ๋ชจ๋  ํ์ด์ง๊ฐ ์ฌ๋ผ์์์ ํ์๊ฐ ์์ผ๋ ์์์ด ๋น ๋ฅด๋ค.
- **๋ ๋ง์ ์ ์ ** : "_๋ผ๋ฆฌ์  ๋ฉ๋ชจ๋ฆฌ >> ๋ฌผ๋ฆฌ์  ๋ฉ๋ชจ๋ฆฌ_ " ์ด๋ ๋ ๋ง์ ํ๋ก์ธ์ค๋ฅผ ์์ฉ๊ฐ๋ฅํ๋ค.

๋ง์ฝ์ ํน์  ํ์ด์ง๊ฐ ํ์ํ๋ค๊ณ  ํ์. ๊ทธ๋ผ ๊ทธ ํ์ด์ง๋ฅผ ์ฐธ์กฐํด์ผํ๋๋ฐ, ์๋์ ๊ฐ์ ๋ถ๊ธฐ๋ฅผ ๊ฐ์ง๊ฒ ๋๋ค.

- ํ์ด์ง์ ๋ํ ์๋ชป๋ ์ฐธ์กฐ โ ์๋ฌ
- ๋ฉ๋ชจ๋ฆฌ์ ์ฌ๋ผ์์์ง ์์ โ ๋ฐ์ดํฐ๋ฅผ ๋ฉ๋ชจ๋ฆฌ์ ์ ์ฌํจ

๊ทธ๋ผ ์ด ์ฌ๋ผ์์์ง ์๊ฑฐ๋ ์ฌ๋ผ์ ์๋๊ฒ์ ์ด๋ป๊ฒ ๊ตฌ๋ถํ ๊น?  
๋ผ๋ฆฌ์ฃผ์์ ๋ฌผ๋ฆฌ์ฃผ์๋ฅผ ๋ณํํ ๋ ์ฐ์๋ ํ์ด์ง ํ์ด๋ธ์ ์ด์ฉํด ํ์ด์ง ํ์ด๋ธ์ ์ํธ๋ฆฌ์ **valid-bit**๋ฅผ ๋ถ์ฐฉํด์ ๊ตฌ๋ถํ๋ค.

๋ง์ฝ valid-bit๊ฐ

- True๋ฉด
  - ํ์ฌ ๊ทธ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๊ฐ์ ธ์จ๋ค.
- False๋ฉด
  - **Page Fault ๋ฐ์**
  - Page fault์ ๋ํ ์ฒ๋ฆฌ๋ฅผ ํ๋๋ฐ ์ผ๋ฐ์ ์ผ๋ก ํ์ด์ง์ ํด๋นํ๋ ํ๋ ์์ ์ฐพ์์ ๋ก๋์ํจ๋ค.
  ![Untitled](./1.png)
  ์ ๊ทธ๋ฆผ์ ๋ณด๋ฉด B,D,E,F,G,H๋ valid-bit๊ฐ invalid๋ก ๋์ด์๋ค.  
  ๋ง์ฝ ์ด๋ B๋ F์ ๊ฐ์ ํ์ด์ง๋ฅผ ์ฐธ์กฐํ๋ ค ํ๋ฉด **Page Fault**๊ฐ ์ผ์ด๋๋ ๊ฒ์ด๋ค.

๊ทธ๋ผ **ํ์ด์ง ํดํธ** (Page Fault)๊ฐ ๋ญ๊น?

## ํ์ด์ง ํดํธ (Page Fault)
ํ์ด์ง ํดํธ๋ valid-bit๊ฐ invalid ์ธ ๊ณณ์ MMU๊ฐ ์ ๊ทผ์ ํ ๋ HW trap์ ๋ฐ์์ํค๋ฉด์ ์๊ธด๋ค.

valid-bit๊ฐ invalid ํ๋ค๋ ๊ฒ์ ํ์ฌ ๋ฉ๋ชจ๋ฆฌ์์ ๋ด๊ฐ ์ํ๋ ํ์ด์ง๊ฐ ์กด์ฌํ์ง ์์์ ์๋ฏธํ๋ฏ๋ก,  
์ํ๋ ํ์ด์ง์ ํด๋นํ๋ ํ๋ ์์ ๋ฉ๋ชจ๋ฆฌ๋ก ๊ฐ์ ธ์จ ํ ํ๋ก๊ทธ๋จ์ด ๊ณ์ ๋์๋๊ฒ๋ ํด์ผํ๋ค.  
์ด๊ฒ์ ํ์ด์ง ํดํธ ํธ๋ค๋ง์ด๋ผ๊ณ  ํ๋ค.

### ํ์ด์ง ํดํธ ํธ๋ค๋ง

ํ์ด์ง ํดํธ๋ ๊ฒฐ๊ตญ์ ์ธํฐ๋ฝํธ์ด๊ธฐ ๋๋ฌธ์ ISR์ ์ํํ๋ ์ฒ๋ฆฌ๊ณผ์ ์ ๊ฑฐ์น๋ค.

์๋๋ ํ๋ก์ธ์ค๊ฐ ํน์ ํ ํ์ด์ง๋ฅผ ์ฐธ์กฐํ๋ ค๊ณ  ํ์๋์ ๊ณผ์ ์ Page Fault ํธ๋ค๋งํ๋ ๊ณผ์ ์ด ์ถ๊ฐ๋๊ฒ์ด๋ค.

1. ํ๋ก์ธ์ค๊ฐ **๋ผ๋ฆฌ์ฃผ์** (p,d) ๋ฅผ ๊ฐ์ง๊ณ  ๋ฉ๋ชจ๋ฆฌ์ ์ ๊ทผํ๋ ค๊ณ  ์๋ํ๋ค.
2. **TLB๋ฅผ ๋จผ์  ํ์ธ**ํด์ p์ ํด๋นํ๋ ํ๋ ์ ๋ฒํธ f๊ฐ ์๋์ง ํ์ธํ๋ค.
   1. **TLB Hit**,์๋ค๋ฉด ๋ฐ๋ก ๋ฉ๋ชจ๋ฆฌ๋ก ์ ๊ทผํด์ (f,d)๋ฅผ ๊ฐ์ ธ์จ๋ค.
   2. **TLB Miss,** ์์ผ๋ ์ด์  ํ์ด์ง ํ์ด๋ธ์ ์ฐธ์กฐํด์ผ ํ๋ค.
3. **(p,d)๋ฅผ ๊ฐ์ง๊ณ  ํ์ด์ง ํ์ด๋ธ์ ์ ๊ทผํ๋ค.**
   1. ํ์ด์ง ํ์ด๋ธ์ p์ ํด๋นํ๋ f๊ฐ validํ๋ฉด, ๋ฉ๋ชจ๋ฆฌ์ ์ ๊ทผํด์ ๋ก๋ํ๋ค.
        - ์ด๋ **TLB ์ํธ๋ฆฌ๋ ๊ฐฑ์ ๋๋ค.**
   2. ๋ง์ฝ validํ์ง ์๋ค๋ฉด ํ์ฌ ๋ฉ๋ชจ๋ฆฌ์ ์ฌ๋ผ์์์ง ์๋ค๋ ๊ฒ โ Page Fault
4. ์ด์์ฒด์ ๊ฐ ๋ฉ๋ชจ๋ฆฌ ์ ๊ทผํ ๋์ ์ฃผ์๋ฅผ ํ์ธํ๋ค.
   1. ์๋ชป๋ ์ ๊ทผ์ธ๊ฐ? ๊ทธ๋ฌ๋ฉด ์ค์ง์์ผ์ผ ํ๋ค.
   2. ์๋๋ผ๋ฉด ์งํ.
5. ๋ฌผ๋ฆฌ ๋ฉ๋ชจ๋ฆฌ์์ ์ ์ ํ ๋น๊ณต๊ฐ์ ์ฐพ๋๋ค.
   1. ๋ง์ฝ ์ด๋ ์๋ค๋ฉด, **์ ์ ํ๊ฒ ๋ค๋ฅธ ํ๋ ์์ ๊ต์ฒด์์ผ์ผ ํ๋ค.** ์ด ๊ต์ฒด์ ๋ฐฉ์์ด ๋งค์ฐ ์ค์ํ๋ฐ, ์ ๊ณจ๋ผ์ผ ๋ค์์ replace๊ฐ ์ผ์ด๋  ํ๋ฅ ์ ์ค์ธ๋ค.
6. ์ ์ฅ์์์ ๋งค์น๋๋ ํ์ด์ง๋ฅผ ํ๋ ์์ ์ฌ๋ฆฐ๋ค.
   1. **์ด๋ ํ๋ก์ธ์ค๋ `wait` ์ํ์ธ๋ฐ, ์ ์ฅ์ ์ ๊ทผ ์์ฒด๊ฐ I/O ์ด๊ธฐ ๋๋ฌธ์ด๋ค. ์ปจํ์คํธ ์ค์์นญ ๋ฐ์.**
   2. I/O๊ฐ ๋๋๋ฉด, ํ์ด์ง ํ์ด๋ธ ์ํธ๋ฆฌ๊ฐ ์๋ฐ์ดํธ ๋๊ณ , valid-bit๊ฐ valid๋ก ์ค์ ๋๋ค. ์ด๋๋ ์ปจํ์คํธ ์ค์์นญ ๋ฐ์ํ ๊ฒ๊ฐ๋ค.
   3. **ํ๋ก์ธ์ค๋ ๋ ๋ํ๋ก ์ฎ๊ฒจ์ง๋ค. ๊ทธ๋ฆฌ๊ณ  ์ผ๋ฐ์ ์ผ๋ก ์ค์ผ์ฅด๋ง๋๋๊ฒ์ฒ๋ผ ๊ธฐ๋ค๋ ค์ผ ํ๋ค.**
7. CPU๋ฅผ ๋ค์ ํ ๋น๋ฐ๊ฒ ๋๋ฉด ํ์ด์ง ํดํธ ํธ๋ฉ ์ฒ๋ฆฌ๊ฐ ๋๋๋ค.
8. ํ์ด์ง ํดํธ๋ฅผ ์ด๋ฐ์์ผฐ๋ ๋ช๋ น์ด๋ถํฐ ๋ค์ ์ํํ๋ค. (PC๋ฅผ ์ฆ๊ฐ์ํค์ง ์๊ธฐ ๋๋ฌธ์. ๋ง์ฝ PC ์ฆ๊ฐ์ํค๋ฉด ๊ทธ ๋ช๋ น์ด๋ ๊ฐ์ ๋ก ๊ฑด๋๋๋๊ฒ์ด๋ค.)

![Untitled](./2.png)

## ์ฐ๋ ์ฑ (Threshing)

์ค๋ ์ฑ์ ๋ฉํฐํ๋ก๊ทธ๋๋ฐ ํ๊ฒฝ์์ ํ์ด์ง ํดํธ๊ฐ ๋ง์ด ์ผ์ด๋์ ์์คํ์ด ์๋ฌด๋ฐ ์์๋ ํ์ง ๋ชปํ๊ณ  ํ์ด์ง๋ฅผ ๋ฉ๋ชจ๋ฆฌ์์ ๊ฐ์ ธ์ค๊ณ  ๋นผ๋ด๋ ๊ณผ์ ๋ง ๋ฐ๋ณตํด CPU ์ด์ฉ๋ฅ ์ด ๊ธ๊ฒฉํ๊ฒ ๋จ์ด์ง๋ ํ์์ด๋ค.

๋ ์ต์์ธ ์ ์ CPU ์ด์ฉ๋ฅ ์ด ๋จ์ด์ง๋, ๋ ๋ํ์ ํ๋ก์ธ์ค๋ฅผ ์ฌ๋ฆฌ๋ Long-term scheduler๊ฐ ํ๋จํ๊ธฐ๋ฅผ
โCPU ์ด์ฉ๋ฅ ์ ๋์ด๊ธฐ ์ํด ๋ฉํฐํ๋ก๊ทธ๋๋ฐ ์ ๋๋ฅผ ์ฌ๋ ค์ผ ํจ"์ด๋ผ๊ณ  ํ๋จํ๊ณ  ๋ ๋ํ์ ๋ ๋ง์ ํ๋ก์ธ์ค๋ฅผ ์ฌ๋ฆฌ๋ฉด์ ํ์ด์งํดํธ๋ ๋ ๋์ด๊ฐ๋ค.

- ์ฌ๊ธฐ์ ๋ฉํฐํ๋ก๊ทธ๋๋ฐ ์ ๋๊ฐ ๋๋๊ฒ๊ณผ ํ์ด์งํดํธ๊ฐ ๋ฌด์จ์๊ด์ผ๊น?
  - ์๋ก์ด ํ๋ก์ธ์ค๊ฐ ์ฌ๋ผ์ค๋ฉด, Short-term scheduler๊ฐ ์๋ก์ด ํ๋ก์ธ์ค์ CPU๋ฅผ ํ ๋นํ  ๊ฒ์ด๊ณ , ์ด๋๋ initial page fault๊ฐ ์๊ธฐ๊ธฐ ๋๋ฌธ์ด๋ค.

๊ฒฐ๊ตญ Swap-in,Swap-out๋ง์ ํ๋๋ผ ๋ฐ์๊ณ , ํ๋ก์ธ์ค๋ Block ๋๋ฉฐ, CPU๋ ๋๋ถ๋ถ์ ์ํฉ์์ **IDLE** ์ํ๋ค.
>I/O ์์๋ง ํ๋๊น..

![Untitled](./thresing.png)

์์ ๊ทธ๋ฆผ์ฒ๋ผ MPD๋ฅผ ๊ณ์ ์ฌ๋ฆฌ๋ค๋ณด๋ ์ค๋ ์ฑ์ด ๋ฐ์ํ๊ณ , ๊ทธ๋ฌ๋ฉด ๋ MPD๋ฅผ ์ฌ๋ฆฌ๊ฒ๋๊ณ  ํ์ด์งํดํธ๋ ๋ ์์ฃผ์ผ์ด๋๋ฉด์ CPU ์ด์ฉ๋ฅ ์ ๊ธ๊ฐํ๋ค.

๊ฒฐ๊ตญ์ ์์ฃผ ์ ๊ทผ๋๋ ํ์ด์ง๊ฐ ๋ฉ๋ชจ๋ฆฌ์ ์ฌ๋ผ์์์ง ์์ผ๋ฉด ์ด๋ฐ ๋ง์ ํ์ด์ง ํดํธ๊ฐ ์๊ธฐ๋๋ฐ,  
๊ทธ๋ ๊ธฐ ๋๋ฌธ์ ๊ฐ ํ๋ก์ธ์ค๊ฐ ํ์๋ก ํ๋ **์ต์ ํ๋ ์์ ๊ฐ์๋งํผ์ ๋ณด์ฅ**์ ํด์ฃผ์ด์ผ ํ๋ค.

```toc

```
