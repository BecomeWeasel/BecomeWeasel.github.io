---
emoji: ๐
title: ์ด์์ฒด์ ์ ๋ฉ๋ชจ๋ฆฌ ํ์ณ๋ณด๊ธฐ 3ํธ - ํ์ด์ง ๊ต์ฒด ์๊ณ ๋ฆฌ์ฆ
date: '2022-02-06 13:00:00'
author: weasel
tags: ์ด์์ฒด์  ํ์ด์ง๊ต์ฒด LRU FIFO
categories: ์ด์์ฒด์ 
---

[์ด์ ํธ : ๊ฐ์ ๋ฉ๋ชจ๋ฆฌ](https://becomeweasel.me/virtual-memory/)

## ์ง์ญ์ฑ

ํ์ด์ง ๊ต์ฒด ์๊ณ ๋ฆฌ์ฆ์ ๋ํด ์ธ๊ธํ๊ธฐ ์ ์ ๋จผ์  **์ง์ญ์ฑ**์ด๋ผ๋ ๊ฒ์ ๋ํด์ ์์์ผ ํ๋ค.

- **์๊ฐ ์ง์ญ์ฑ** (Temporal Locality ) : ํ์ฌ ์ฐธ์กฐ๋ ๋ฉ๋ชจ๋ฆฌ๊ฐ **๊ฐ๊น์ด ๋ฏธ๋๋ด์ ์ฐธ์กฐ**๋  ๊ฐ๋ฅ์ฑ์ด ๋์
  - loop,subroutine,stack
- **๊ณต๊ฐ ์ง์ญ์ฑ** (Spatial Locality) : ํ๋์ ๋ฉ๋ชจ๋ฆฌ๊ฐ ์ฐธ์กฐ๋๋ฉด **์ฃผ๋ณ์ ๋ฉ๋ชจ๋ฆฌ๊ฐ ์ฐธ์กฐ**๋  ๊ฐ๋ฅ์ฑ์ด ๋์
  - Array ์ํ, ๋ช๋ น์ด์ ์์ฐจ์คํ

ํ๋ก๊ทธ๋จ์ ๋ฉ๋ชจ๋ฆฌ ์ฐธ์กฐ๋ ๊ณ ๋์ ์ง์ญ์ฑ์ ๊ฐ์ง๋ค. ์์์ ์๊ฐ ฮt ๋ด์ ํ๋ก๊ทธ๋จ์ **์ผ๋ถ๋ถ๋ง์ ์ง์ค์ ์ผ๋ก ์ฐธ์กฐ**ํ๋ค๋ ๊ฒ์ด๋ค.  
์ด๋ฌํ ์ง์ญ์ฑ์ด ์๊ธฐ ๋๋ฌธ์ ์ ์ ํ ํ์ด์ง ๊ต์ฒด ์๊ณ ๋ฆฌ์ฆ์ด ์ค์ํ๋ค.

์ ์ค์ํ ๊น?  
์๋ฅผ ๋ค์ด์ ์ฃผ๊ธฐ์ ์ผ๋ก ๋๊ฐ์ ํ์ด์ง๋ง ์ฐธ์กฐํ๋ ๋ก์ง์ด ์๋ค๊ณ  ํด๋ณด์.  
๋ง์ฝ ๊ทธ ๋๊ฐ์ ํ์ด์ง๋ฅผ ๋ฒ๊ฐ์๊ฐ๋ฉด์ ๊ต์ฒด๋ฅผ ํ๋ค๋ฉด, ํ์ด์ง ํดํธ๋ ๋ ๊ฐ์ ํ์ด์ง์ ๋ํด์ ์ ๊ทผํ ๋๋ง๋ค ๊ณ์ ์ผ์ด๋  ๊ฒ์ด๋ค.

์ด๊ฒ ์ ์ํํ๋๋ฉด, **๋ถํ์ํ I/O ์์์ ์ค๋ฒํค๋๋ ์๊ณ , ๊ทธ๋๋ง๋ค ์ปจํ์คํธ ์ค์์นญ**์ด ๊ณ์ ์ผ์ด๋๊ธฐ ๋๋ฌธ์ด๋ค.


## ํ์ด์ง ๊ต์ฒด ์๊ณ ๋ฆฌ์ฆ

ํ์ด์ง ํดํธ๊ฐ ๋ฌ์๋, ๋ฉ๋ชจ๋ฆฌ์ ๋น๊ณต๊ฐ์ด ์์ผ๋ฉด ์ฌ๋ฆฌ๋ฉด ๋๋ ์ผ์ด๋ค. ๋ฌผ๋ก  I/O๊ฐ ๋ค์ด๊ฐ๊ธด ํ์ง๋ง.
๊ทผ๋ฐ ๋ง์ฝ **๋ชจ๋  ๋ฉ๋ชจ๋ฆฌ๊ฐ ์ฌ์ฉ์ค**์ด๋ผ๋ฉด ๊ต์ฒด๋  ํ์ด์ง๋ฅผ ๊ณจ๋ผ์ผํ๋๋ฐ, ์ด๊ฑธ ์ ๊ณ ๋ฅด๋๊ฒ ์ฑ๋ฅ์ ํฐ ์ํฅ์ ๋ฏธ์น๋ค.

๊ทธ๋ฌ๋ฏ๋ก ์ํ๋ ๊ฒ์ **๊ฐ์ฅ ๋ฎ์ ํ์ด์ง ํดํธ ํ๋ฅ **์ด๋ค. ๋ชจ๋  ์์์์ `[1,2,3,4,1,2,5,1,2,3,4,5]` ์ ์์๋ก ํ์ด์ง๊ฐ ํ์๋ก ํ๋ค๊ณ  ํด๋ณด์.

์ผ๋ฐ์ ์ผ๋ก ํ๋ ์์ ๊ฐ์๊ฐ ๋ง์ผ๋ฉด, ํ์ด์ง ํดํธ์ ๋น๋๋ ์ค์ด๋ ๋ค.

> ๋ค๋ง ์ ๋น๋ก ํ๋๊ฒ์ ์๋๋ค. ์ด๋ '๋ฒจ๋ผ๋์ ๋ชจ์'๊ณผ ์ฐ๊ด๋์ด ์๋ค.

### FIFO

- ๋จ์ํ๊ฒ ํ์ด์ง ๊ต์ฒด๋ฅผ ํ  ๋ **๊ฐ์ฅ ์ค๋๋ ํ์ด์ง๋ฅผ ์ ํํด ๊ต์ฒด**ํ๋ค.
  ![Untitled](./1.png)
- ๊ทผ๋ฐ ํ๋ ์์ด 3๊ฐ์ผ๋์ 4๊ฐ์ผ๋๋ฅผ ๋น๊ตํด๋ณด๋ฉด, **ํ๋ ์์ด ๋์๋๋ฐ๋ ์คํ๋ ค ํ์ด์ง ํดํธ๊ฐ ์ฆ๊ฐํ๋ค. โ ์ด๊ฒ์ '๋ฒจ๋ผ๋์ ๋ชจ์'ํ์์ด๋ผ ํ๋ค.**
- ์ฆ ํฌ์ํ ๋ฆฌ์์ค์ ํจ๊ณผ๊ฐ ๋น๋กํ์ง ์์์ ์ ์ ์๊ณ , ์ ์ ํ ๊ต์ฒด ์๊ณ ๋ฆฌ์ฆ์ ์ ํํ๋๊ฒ์ด ์ค์ํจ์ ๋ณด์ธ๋ค.

### Optimal

- ๊ฐ์ฅ ์ค๋ซ๋์ ์ฌ์ฉ๋์ง ์์ (ํ์ด์ง ๊ต์ฒด๊ฐ ํ์ํ ์์ ์ผ๋ก๋ถํฐ) ํ์ด์ง๋ฅผ ์ ํํ๋ค.
  ![Untitled](./2.png)
- ๊ฐ์ฅ ์ด์์ ์ธ ์๊ณ ๋ฆฌ์ฆ์ด๊ธฐ ๋๋ฌธ์ ๊ฐ์ฅ ๋ฎ์ ํ์ด์ง ํดํธ๋ฅผ ๋ณด์ฌ์ค๋ค.
- ๊ทธ๋ ์ง๋ง, ๋ค์์ ๋ฌด์์ ์ฌ์ฉํ ์ง ์ ์ ์๊ธฐ ๋๋ฌธ์ **๊ตฌํ์ด ์ด๋ ต๊ณ ** Optimal์ ๋ค๋ฅธ ์๊ณ ๋ฆฌ์ฆ๊ณผ์ ์ฑ๋ฅ๋น๊ต์ ๊ธฐ์ค์ผ๋ก ์ฌ์ฉ๋๋ค.
- **๋ง์ฝ, ๊ฐ์ ํ๋์ ๋ฐ๋ณตํ๋ Bot์ ํํ๊ณ , ๋ฉ๋ชจ๋ฆฌ ์์ธก์ ์๋ฒฝํ๊ฒ ์ ์ ์๋ค๋ฉด ์ ์ฉํ  ์ ์๋ค.**

### LRU

LRU๋ **Least Recently Used**์ ์ฝ์๋ก ํ์ด์ง ๊ต์ฒด๋ฅผ ํ๋ ์์ ์์  
๊ฐ์ฅ ๋ ์ต๊ทผ์ ์ฌ์ฉ๋๊ฒ, ๋ค์ ๋งํด **๊ฐ์ฅ ์ค๋์ ์ ์ฌ์ฉํ ๊ฒ** ํ์ด์ง๋ฅผ ์ ํํด ๊ต์ฒดํ๋ ์๊ณ ๋ฆฌ์ฆ์ด๋ค.
![Untitled](./3.png)

- Optimal์ ์ ์ธํ๊ณ  ๊ต์ฅํ ์ข์ ์ฑ๋ฅ์ ๋ณด์ด๋๋ฐ, ๊ทธ ์ด์ ๋ LRU๊ฐ **Temporal Locality๋ฅผ ์ ์ ๋ก ํ๊ณ  ์๊ธฐ ๋๋ฌธ์ด๋ค.** **์ต๊ทผ์ ์ฌ์ฉ๋๊ฒ์ ๋ค์ ์ฐธ์กฐ๋  ๊ฐ๋ฅ์ฑ์ด ํฌ๋,** ๋ฐ๋๋ก ๊ฐ์ฅ ์ค๋์ ์ ์ฌ์ฉํ๊ฒ์ ์ง์ฐ๋ฉด์ ํ์ด์ง ๊ต์ฒด ์์ฒด๋ฅผ ์ค์ด๋ ค๋ ๊ฒ์ด๋ค.
  - ๊ทธ๋ฐ๋ฐ ๋ฌธ์ ์ ์ **LRU๋ฅผ ์ค์ ๋ก ๊ตฌํํ๋๋ฐ์ ์๋ค.**
    - ์๋ฅผ ๋ค์ด ๋ชจ๋  ํ์ด์ง์ ์ฐธ์กฐ๋ ์๊ฐ์ ์ ์ด๋๋๋ค๋ฉด, ํ์ด์ง ํ์ด๋ธ์ ์ถ๊ฐ์ ์ธ ๋ฉ๋ชจ๋ฆฌ๊ฐ ๋ค๊ฒ์ด๊ณ  (min heap์ผ๋ก ์ปทํด๋ ๋ ๋ฏ) ์ฐธ์กฐ๋ ๋๋ง๋ค ์ด๊ฒ์ ๊ณ์ ์์ ํ๋ ์ค๋ฒํค๋๊ฐ ์๋ค.
    - ๋ง์ฝ Linearํ๊ฒ ๊ฐ์ฅ ์ค๋์ ์ ์ฌ์ฉ๋ ๊ฒ์ ์ฐพ๋๋ค๊ณ  ํด๋ณด์.
    - ์ด๋์ ์๊ฐ๋ณต์ก๋๋ `n`๊ฐ์ ํ์ด์ง์ ๋ํด์ `O(n)`์ธ๋ฐ, ์ด N ๊ฐ์ด ์๋ฏธํ๋ ๊ฒ์ ํ๋ก์ธ์ค์ ๊ฐ์์ด๊ณ  ๋ณดํต ๋๋ฌด ํฌ๋ค๋๋ฐ ์๋ค.
  - **๊ทธ๋ฌ๋ฏ๋ก ์ปค๋์ ๊ตฌํํ๊ธฐ๋ ์๊ฐ์ /๊ณต๊ฐ์  ์ค๋ฒํค๋๊ฐ ๋๋ฌด ํฌ๋ค. ๋ฐ๋ผ์ ๊ทผ์ฌ์น ๋ชจ๋ธ์ด ํ์ํ๋ค.**

### LRU ๊ทผ์ฌ

- ์นด์ดํฐ ๊ตฌํ
  - ๋ฉ๋ชจ๋ฆฌ ์ฐธ์กฐ๊ฐ ์ผ์ด๋ ๋๋ง๋ค CPU counter๋ฅผ ์ฌ๋ฆฌ๊ณ , ํ์ด์ง A๊ฐ ์ฐธ์กฐ๋๋ฉด ํ์ด์ง์ ์นด์ดํฐ๋ฅผ ๋ฎ์ด์์ด๋ค.
  - O(n)์ ์กฐํ๋ฐฉ์, ์ฌ์ง์ด ๊ทธ๋๋ง๋ค ๋ฉ๋ชจ๋ฆฌ ์ก์ธ์ค๊ฐ ํ๋ฒ ๋ ์ผ์ด๋จ.
- ์คํ ๊ตฌํ
  - ํ์ด์ง ๋ฒํธ๋ก [Doubly Linked List](https://becomeweasel.me/array-and-linked-list/#doubly-linked-list) ํํ๋ก ์คํ์ ๊ตฌํํ๋ค.
  - ํ์ด์ง A๊ฐ ์ฐธ์กฐ๋๋ฉด, A๋ฅผ ํค๋๋ก ์ฎ๊ธด๋ค.
    - ์ด๋ 6๋ฒ์ ํฌ์ธํฐ ์์ง์์ด ํ์ํ๋ค.
  - ์ฐพ๋๋ฐ ๋๋ ์ค๋ฒํค๋๋ ์์ง๋ง, ๋งค๋ฒ์ ํ์ด์ง ์ฐธ์กฐ๋ง๋ค 6๋ฒ์ ๋ฉ๋ชจ๋ฆฌ ์ก์ธ์ค๊ฐ ์๋ค.
  - **๊ต์ฒด๊ฐ ์ผ์ด๋์ง ์์๋ ํ์ ์ค๋ฒํค๋๊ฐ ๋๋ฌด ํฌ๋ค.**
- **๋๋ฒ์งธ ๊ธฐํ (Second Chance)**
  - ๊ธฐ๋ณธ์ ์ผ๋ก FIFO๋ค.
  - ํ์ด์ง๋ฅผ **์ํ์ ํ**๋ก ๊ตฌ์ฑํ๋ค.
  - ํ์ด์ง ํ์ด๋ธ ๋ด์ ๋ชจ๋  ํ์ด์ง์ Ref bit๋ฅผ ์ด๊ธฐ๊ฐ 0์ผ๋ก ํ ๋นํ๊ณ , ์ฐธ์กฐ๊ฐ ๋๋ฉด 1๋ก ๋ฐ๊พผ๋ค.
  - ์ฐธ์กฐ๋นํธ๊ฐ **0์ธ ํ์ด์ง๋ฅผ ์ฐพ์ผ๋ฉด, ๊ทธ ํ์ด์ง๋ฅผ ๊ต์ฒด**ํ๋ค.
  - **๋ง์ฝ 1์ด๋ผ๋ฉด, ๊ทธ ํ์ด์ง๋ 0์ผ๋ก ๋ฐ๊พธ๊ณ  ํ๋ฒ ๋ ๋๋ค. ํ๋ฒ์ ๊ธฐํ๋ฅผ ๋ ์ฃผ๋๊ฒ์ด๋ค.**
  - ํ๋ฒ ๋ ๋์์๋๋, 0์ด๋ฉด ๊ตํํ๋ค.
  - ๊ทธ๋ฐ๋ฐ ๋ชจ๋  **bit๊ฐ 1์ธ ๊ฒฝ์ฐ๋ฅผ ์๊ฐํด๋ณด๋ฉด, FIFO์ ์๊ณ ๋ฆฌ์ฆ์ฒ๋ผ ๋์ํ๋ค.**

### LFU

- ์ ์ ๋ **๋ง์ด ์ฌ์ฉ๋๋ ํ์ด์ง๋ ๋ ๋ง์ด ์ฌ์ฉ๋  ๊ฒ**์ด๋ผ๋ ์ ์ 
- ํ์ด์ง์ ์ฐธ์กฐ๋ ํ์๋ฅผ ๋ํ๋ด๋ ์นด์ดํฐ๋ฅผ ๋ฃ๋๋ค.
- ๊ฐ์ฅ ์นด์ดํฐ๊ฐ ์ ์ ํ์ด์ง๋ฅผ ๊ต์ฒดํ๋ค.
- ํ์ง๋ง ์ด๋ ํ ํ์ด์ง๊ฐ ์ง์ค์ ์ผ๋ก ์ฐธ์กฐ๋๋ค๊ฐ ๊ทธ ๋ค์๋ ์ฌ์ฉ๋์ง ์์ผ๋ฉด ์ด๋์ ๋๊น์ง ๊ณ์ ๋จธ๋ฌด๋ฅด๋ ๊ฒฝํฅ์ด ์ผ์ด๋๋ค. ์ฆ ์ ์ ์ ์ด๊ธ๋๊ฒ ๋๋ค.

### MFU

- ์ ์ ๋ **์นด์ดํฐ๊ฐ ์์ ํ์ด์ง๋ ์ด์  ๋ง ๋ค์ด์๊ณ , ์ฌ์ฉ๋์ง ์์๋ค**๋ ์ ์ .
- ํ์ด์ง์ ์ฐธ์กฐ๋ ํ์๋ฅผ ๋ํ๋ด๋ ์นด์ดํฐ๋ฅผ ๋ฃ๋๋ค.
- ๊ฐ์ฅ ์นด์ดํฐ๊ฐ ํฐ ํ์ด์ง๋ฅผ ๊ต์ฒดํ๋ค.
- **Locality๊ฐ ์์ฃผ ๋ณํ๋ ์์คํ์์ ์ ์ฉํ๋ค.**

## ํ๋ฆฌํ์ด์ง(Prepaging)

ํ๋ก์ธ์ค๊ฐ ์์๋ ๋๋ ํญ์ initial page fault๊ฐ ๋๋ค. ์๋ฌด๊ฒ๋ ์์ฌ๋ผ์ ์๊ธฐ ๋๋ฌธ์..

์ด๊ฒ์ ๋ฐฉ์งํ๊ธฐ ์ํด์, ํ๋ก์ธ์ค๊ฐ ํ์๋ก ํ๋ ํ์ด์ง์ ์ ๋ถ ํน์ ์ผ๋ถ๋ฅผ ์ฐธ์กฐ๋๊ธฐ์ ์ ๋ฏธ๋ฆฌ ๋ฉ๋ชจ๋ฆฌ์ ์ฌ๋ฆฌ๋๊ฒ์ด๋ค.

๋ฌผ๋ก , ํ์ด์ง๊ฐ ์ฌ์ฉ๋์ง ์์ผ๋ฉด ๋ญ๋น๊ฐ ์๋ค.

## Swap์ ์ด๋ค ์ด์ ์ด ์๋๊ฐ?

- ์ฅ์ 
  - ๊ฐ์ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๋ง๋ค๊ณ  ์ ์งํ๋๋ฐ ๋์์ด ๋๋ค. ๊ทธ๋ ๊ธฐ์ ๋ ๋ง์ ํ๋ก์ธ์ค๊ฐ ๊ตฌ๋๋  ์ ์๋ค.
  - ์ค์  ํ์ํ ๋ฉ๋ชจ๋ฆฌ์ฉ๋๋งํผ๋ง ๋์คํฌ์์ ๋ฉ๋ชจ๋ฆฌ๋ก ์ฌ๋ฆด ์ ์๊ฒ ํด์ฃผ๋, ๋ฌผ๋ฆฌ๋ฉ๋ชจ๋ฆฌ๋ณด๋ค ๋ ํฐ ์ฉ๋์ ํ๋ก์ธ์ค๊ฐ ๊ตฌ๋๋  ์ ์๋ค.
- ๋จ์ 
  - ๋์คํฌ์ ์ ๊ทผํ๋ I/O โ ๋์คํฌ๊ฐ ์์ถ๋ ฅ์ ํ ๋ ๊ธฐ๋ค๋ฆฌ์ง ์๊ณ  ์ปจํ์คํธ ์ค์์นญ

```toc

```
