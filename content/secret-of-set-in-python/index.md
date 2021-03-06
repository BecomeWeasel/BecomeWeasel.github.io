---
emoji: ๐
title: Python 3์ Set ํ์ณ๋ณด๊ธฐ
date: '2021-08-07 00:00:00'
author: weasel
tags: Python3 Set
categories: Python
---
## ๋ฌธ์  ์ํฉ
[๋ฐฑ์ค ๋นต์ง](https://www.acmicpc.net/problem/3109)๋ฅผ ํ๋ ์ด์ํ ์ ์ด ํ์คํ ์๊ฒผ๋ค.  ์ผ๋ฐ์ ์ผ๋ก python์์ ๋ฐฉ๋ฌธ ์ฌ๋ถ๋ฅผ ํ์ธํ๊ธฐ ์ํด `set`๊ณผ `list`์ค์ ํ๋๋ฅผ ์ฌ์ฉํ๋ค.
`set`๊ฐ์ ๊ฒฝ์ฐ๋ ์๋ชป๋ ์ ๊ทผ ๊ฐ์ ํ๋์์ ์์ ํ ํธ์ด๊ณ  ๋๋ถ๋ถ์ ๊ธฐ๋ฅ์์ `O(1)`์ ์๊ฐ์ด ๋ณด์ฅ๋๋ค๊ณ  ์๊ณ  ์๊ธฐ ๋๋ฌธ์ `set`์ ์ด์ฉํ ํ์ด๋ฅผ ์ข์ขํ๋ค.

> List์์๋ ๋ฏธ์ํ ์ฝ๋๋ก indexError๋ฅผ ๊ฒฝํํ  ์ ์๋ค.

์ด ๋ฌธ์ ๋ naive ํ๊ฒ `set`์ ์ฌ์ฉํ๋ฉด ์๊ฐ์ด๊ณผ๋ฅผ ๋นํ๋ค. ์ฒ์์ ๋ผ๋ฆฌ๋ฅผ ์๋ชป ๊ตฌ์ฑํด recursionDepth๊ฐ ์ปค์ ธ์ ์๊ฐ์ด๊ณผ๊ฐ ๋๋๊ฑด๊ฐ ๋ผ๊ณ  ์๊ฐํ์ง๋ง ๋ผ๋ฆฌ์๋ ๋ฌธ์ ๊ฐ ์์๋ค. ๊ทธ๋์ `set`๋ง์ `list`๋ก ๋ฐ๊ฟ์ฃผ์๋๋ ํต๊ณผํ๋ค.

๋ถ๋ช `lookup`๋ ๋๊ฐ์ด `O(1)`์ด๊ณ  `set`์์๋ `add`๋ `O(1)`์ด๋ผ๊ณ  ์๊ณ  ์๋๋ฐ ์ ์ฐจ์ด๊ฐ ๋๋ ๊ฒ์ผ๊น? ์ด ์ดํด ์๋๋ ์ํฉ์ ์ง๊ธ๋ถํฐ ์์๋ณด์.

### ๋ฉ๋ชจ๋ฆฌ ์ฌ์ฉ๋
๋จผ์  ๊ฐ๋จํ๊ฒ ๋ ์๋ฃ๊ตฌ์กฐ์ ๋ฉ๋ชจ๋ฆฌ ์ฌ์ฉ๋์ ๋น๊ตํด๋ณด์๋ค.

์๋ ์ฝ๋๋ 10000๊ฐ์ ํ , 500๊ฐ์ ์ด์ ๊ฐ์ง 2์ฐจ์ board์์ ์ฌ์ฉ๋๋ ๋ฐฉ๋ฌธ์ ๊ธฐ๋กํ๋ ์ผ๋ฐ์ ์ธ ๊ตฌํ์ด๋ค. 

ํ๋๋ `List`๋ก ํ๋๋ `set`์ผ๋ก ๊ตฌํํ ๋ค `sys.getsizeof(object)`๋ฅผ ์ด์ฉํด์ ๊ฐ๊ฐ์ ๊ฐ์ฒด์ ๋ฉ๋ชจ๋ฆฌ ์ฌ์ฉ๋์ ์ฒดํฌํด๋ณด์๋ค.

> getsizeof(object [, default]) -> int : Return the size of object in **bytes**.

```python
R=10000 # ROW
C=500	# COL

a=[[True for _ in range(R)] for _ in range(500)]
sys.getsizeof(a)
>>> 4264

b=set()
for i in range(R):
    for j in range(C):
        b.add((i,j))
sys.getsizeof(b)
>>> 134217944

```
**๋๋ผ์ด ๊ฒฐ๊ณผ**๋ค. ๊ฐ์ ๊ธฐ๋ฅ์ ์ํํ๋ ์๋ก ๋ค๋ฅธ ์๋ฃ๊ตฌ์กฐ์ธ๋ฐ ๋ฉ๋ชจ๋ฆฌ์ฐจ์ด๊ฐ ๋๋ต **31,000**๋ฐฐ ์ ๋์ ์ฐจ์ด๋ฅผ ๋ณด์๋ค.

`list`๋ **4264 Byte**, `set`์ **134217944 Byte**๋ฅผ ์ฌ์ฉํ๋ค. ๋๋ต์ ์ผ๋ก ๋ ์๋ฃ๊ตฌ์กฐ๋ ๊ฐ๊ฐ **4KB,134MB**์ ์ฌ์ฉํ๋ค๋ ๊ฒ์ด๋ค.

## List์ Set์ ๋ด๋ถ๊ตฌ์กฐ
์ ์ด๋ ๊ฒ ์ฐจ์ด๊ฐ ๋๋ ๊ฒ์ผ๊น?

`list`์ `set`์ด ๋ด๋ถ์ ์ผ๋ก **๋ฐ์ดํฐ๋ฅผ ์ ์ฅํ๋ ๋ฐฉ์**์์ ์ฐจ์ด๊ฐ ์์ด์ ๊ทธ๋ ๋ค. [stackoverflow์ ํ ๋ต๋ณ](https://stackoverflow.com/questions/39914266/memory-consumption-of-a-list-and-set-in-python)์ ๋ฐ๋ฅด๋ฉด 

### List
>List๋ ๊ทธ์  ์๋์ ๊ฐ์ฒด๋ค์ ๋ํ ์ฐธ์กฐ๋ฅผ ๋ชจ์๋์๊ฒ์ ๋ถ๊ณผํ๋ค. ๋ง์ฝ 1000๊ฐ์ integer๋ฅผ ๋ง๋ ๋ค๊ณ  ํ๋ฉด , ๊ทธ๊ฒ๋ค์ด ๋ง๋ค์ด์ง๊ณ  list๋ ์ค์ง ๊ทธ integer๋ค์ ๋ํ ์ฐธ์กฐ๋ง์ ๋ด๊ณ  ์๋ค.

`list`๋ ์ฐธ์กฐ๋ค์ `collection`์ด๊ณ  ์ผ์ข์ ์ฃผ์๊ฐ์ ๊ฐ์ง๊ณ  ์๋๊ฒ์ด๋ค. ๊ทธ๋ ๊ธฐ์ ์๋์ ๊ฐ์ ์ฝ๋๋ฅผ ์ํํด๋ ์ฌ์ ํ **4264 Byte**๋ค.
```python
c= [[[1,2,3] for _ in range(10000)] for _ in range(500)]
sys.getsizeof(c)
>>> 4264
```
`list`๊ฐ ์ธ๋ฒ ์ค์ฒฉ๋์ด ์์ง๋ง `[1,2,3]`์ ๋ํ **์ฐธ์กฐ**๋ง์ ๊ฐ์ง๊ณ  ์๊ธฐ ๋๋ฌธ์ ๋ฉ๋ชจ๋ฆฌ ์ฌ์ฉ๋์ด ๊ฐ์ ๊ฒ์ด๋ค.

> ๋ด๋ถ์ ์ผ๋ก๋ [dynamic array](https://en.wikipedia.org/wiki/Dynamic_array)๋ฅผ ์ฌ์ฉํ๊ณ  ์๋ค.

### Set

๋ฐ๋๋ก `set`์ ์ด๋จ๊น? Python์์์ `set`์ ๋ด๋ถ์ ์ผ๋ก **key๊ฐ dummy value์ธ `dict`** ๋ฅผ ์๋น ๋ถ๋ถ ์ฌ์ฌ์ฉํจ์ผ๋ก์จ **`hash table`** ์ ๊ตฌ์กฐ๋ฅผ ๊ฐ์ง๊ณ  ์๋ค.

์ฌ์ ํ ์์ ๊ฐ์ ๋ต๋ณ์ ์ฐธ๊ณ ํ์๋ฉด 
>๋ฐ๋ฉด์, set์ด๋ dictionary๋ 1000๊ฐ์ integer๋ค์ hash value๋ฅผ ๋ชจ๋ ๊ณ์ฐํด์ผํ๊ณ  ๊ทธ์ ๋ฐ๋ผ ๋ฉ๋ชจ๋ฆฌ ์ฌ์ฉ๋์ด ์ฆ๊ฐํ๋ค.

>์๋ฅผ ๋ค์ด set์ด๋ dict๋ ๊ฐ์ฅ ์์ ํฌ๊ธฐ์ ๊ธฐ๋ณธ๊ฐ์ 8์ด๋ค.(์ฆ, ์ค์ง 3๊ฐ์ ๊ฐ๋ง ์ ์ฅํ๋คํด๋ python์ 8๊ฐ๋ฅผ ์ง์ ํด์ค๋ค.) `resize`๋ฅผ ํ ๋, buckets๋ค์ ๊ฐ์๋ ์์๊ฐ 50,000๊ฐ๊ฐ ๋๊ธฐ ์ ๊น์ง๋ 4๋ฐฐ์ฉ ์ฆ๊ฐํ๋ค. ๊ทธ๋ฐ ๋ค์์๋ 2๋ฐฐ์ฉ ์ฆ๊ฐํ๋ค.

## Set์์์ resize
๊ณผ์ฐ ์ ๋ง ๊ทธ๋ ๊ฒ ์๋ํ ๊น? `resize`๋ `set`์ ์ผ๋ฐ์ ์ผ๋ก ๊ฐ์ ์ถ๊ฐํ  ๋ ํธ์ถ๋๊ธฐ ๋๋ฌธ์ `add`๋ฅผ ํ ๋ ํธ์ถ๋๋ CPython์ `set`์ `set_add_entry`์ ๊ตฌํ ์ฝ๋๋ฅผ ์ง์  ๋ณด์.

```c
/* CPython */
/* https://github.com/python/cpython/blob/main/Objects/setobject.c */ 
static int
set_add_entry(PySetObject *so, PyObject *key, Py_hash_t hash)
...
...
  found_unused:
    so->fill++;
    so->used++;
    entry->key = key;
    entry->hash = hash;
    if ((size_t)so->fill*5 < mask*3)
        return 0;
    return set_table_resize(so, so->used>50000 ? so->used*2 : so->used*4);

...
...
```

์์ ์ฝ๋์์ [load factor](https://www.geeksforgeeks.org/load-factor-and-rehashing/)๊ฐ ์ผ์  ๋ถ๋ถ(์๋์ ๋ค์ ์ธ๊ธํ  ๊ฒ์ด๋ค.)์ ๋์ด๊ฐ๋๋ฅผ ๋ณด์.
(`if ((size_t)so->fill*5 < mask*3)` ์ ์๋ซ๋ถ๋ถ์ด๋ค.)
so(set object)์ ํฌ๊ธฐ์ ๋ฐ๋ผ `set_table_resize`์ **์ธ์๋ฅผ ๋ค๋ฅด๊ฒ** ์ฃผ๊ณ  ์์์ด ๋ณด์ธ๋ค.

>**Load factor** : Hash table ์ ์ฒด์์ ์ผ๋ง๋ ์์๊ฐ ์ฐจ ์๋์ง๋ฅผ ๋ํ๋ด๋ ์์น.
m๊ฐ์ bucket์ Hash tablen์ n๊ฐ์ ์์๊ฐ ์ ์ฅ๋์ด ์๋ค๋ฉด load_factor = n/m ์ด๋ค


**`so->used`๊ฐ 50,000์ด ๋์ด๊ฐ๋ฉด ํ์ฌ used์ 2๋ฐฐ๋ฅผ, ๊ทธ๋ ์ง ์์ผ๋ฉด 4๋ฐฐ๋งํผ ํฐ ๊ฐ์ผ๋ก `resize`๋ฅผ ํ๋ ๊ฒ์ด๋ค.**

>์ฌ๊ธฐ์ mask๋ `hash_table`์ ํฌ๊ธฐ๋ณด๋ค 1 ์๋ค. modulo์ ์ญํ ์ฒ๋ผ hash์ ์ฐ์ด๋๋ฐ AND ์ฐ์ฐ์ ์ด์ฉํ๋ค.

### resize์ ๋ด๋ถ๋์ ๋ฐฉ์
์ด์  `set_table_resize`๊ฐ ๋ด๋ถ์ ์ผ๋ก ์ด๋ป๊ฒ ๋์ํ๋์ง๋ฅผ ์ดํด๋ณด์. 

**์์ฝํ์๋ฉด `set_table_resize`๋ `hash table`์ ๊ตฌ์กฐ๋ฅผ ๊ฐ์ง๋ `setentry` ๊ตฌ์กฐ์ฒด๋ฅผ ๊ธฐ์กด `oldtable`์ 2๋ฐฐ ํน์ 4๋ฐฐ์ ํฌ๊ธฐ์ธ `newtable`์ด๋ผ๋ ์ด๋ฆ์ผ๋ก ๋์ ํ ๋น ๋ฐ์ ํ `oldtable`์ ๋ชจ๋  `entry`๋ค์ `newtable`์ ๋ฃ์ด์ฃผ๋ ๊ณผ์ ์ ๊ฑฐ์น๋ค.**
```c
typedef struct {
    PyObject *key;
    Py_hash_t hash;             /* Cached hash code of the key */
} setentry;
```

>์ดํด๊ฐ ์๊ฐ๋ ๋นํฉํ์ง ๋ง์ธ์... ์๋์ ์ฐจ๊ทผ์ฐจ๊ทผ ์ค๋ชํด์ค๊ฑฐ์์...๐




๋จ๊ณ๋ณ๋ก ์ดํด๋ณด์. ์๋ ์ฝ๋๋ถํฐ๋ค.
```c
/* CPython */
/* https://github.com/python/cpython/blob/main/Objects/setobject.c */ 
static int
set_table_resize(PySetObject *so, Py_ssize_t minused)
{
    setentry *oldtable, *newtable, *entry;
    ...
    /* Find the smallest table size > minused. */
    /* XXX speed-up with intrinsics */
    size_t newsize = PySet_MINSIZE;
    while (newsize <= (size_t)minused) {
        newsize <<= 1; // The largest possible value is PY_SSIZE_T_MAX + 1.
    }
```
์ผ๋จ, `newtable`์ ํฌ๊ธฐ๋ฅผ ์ ํด์ผ ํ๋ค. `set_table_resize`์ ๋๋ฒ์งธ ์ธ์๋งํผ 
`newsize`๋ฅผ left shift๋ฅผ ์ฌ์ฉํด `Pyset_MINSIZE`์์ `minused`๋งํผ ์ฆ๊ฐ์ํจ๋ค. 
(`PySet_MINSIZE`๋ ์์ ์ธ๊ธํ ๊ฒ์ฒ๋ผ **8**์ด๋ค.) 


```c
/* CPython */
/* https://github.com/python/cpython/blob/main/Objects/setobject.c */
    ...
    /* Get space for a new table. */

    if (newsize == PySet_MINSIZE) {
        ...
        /* A large table is shrinking, or we can't get any smaller. */
    	...
        ...
        }
    }
    else {
        newtable = PyMem_NEW(setentry, newsize);
        if (newtable == NULL) {
            PyErr_NoMemory();
            return -1;
        }
    }
```
`newsize`๊ฐ `PySet_MINSIZE`(8)๊ฐ ์๋๋, `PyMem_New(type,n)`๋ฅผ ํตํด์ ์์์ ๊ณ์ฐ๋ `newsize`์ ํฌ๊ธฐ๋งํผ `setentry`์ ๊ฐ์ฒด๋ฅผ ์์ฑํ๋ ๊ฒ์ด๋ค. 
>์ข ๋ ์๋ฐํ๊ฒ ์๊ธฐํ๋ฉด `PyMem_new(type,n)`๋ `PyMem_Malloc(n)`๋ฅผ ์ด์ฉํด์ `(n)*sizeof(type)` Byte๋งํผ์ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๋์ ํ ๋น(malloc) ํ๋ macro๋ค. (cpython/include/pymem.h ์ฐธ์กฐ) 

**์ด์  ๊ฑฐ์ ๋ค ์๋ค. `oldtable`๋ค์ ๊ฐ๋ค์ `newtable`์ ์ฎ๊ฒจ์ฃผ๊ธฐ๋ง ํ๋ฉด ๋๋ค.**

```c
/* CPython */
/* https://github.com/python/cpython/blob/main/Objects/setobject.c */
    ...
    so->mask = newsize - 1;
    so->table = newtable;
    ...
```
hashing์ ํ์ํ mask ๊ฐ์ ๊ฐฑ์ ํด์ฃผ๊ณ  (modulo์ ๋น์ทํ ์ญํ ์ ํ๋ค. ๋ค๋ง **AND ์ฐ์ฐ์**๋ฅผ ์ฌ์ฉํ ๋ฟ์ด๋ค.)
```c
/* CPython */
/* https://github.com/python/cpython/blob/main/Objects/setobject.c */
    /* Copy the data over; this is refcount-neutral for active entries;
       dummy entries aren't copied over, of course */
    newmask = (size_t)so->mask;
    if (so->fill == so->used) {
        for (entry = oldtable; entry <= oldtable + oldmask; entry++) {
            if (entry->key != NULL) {
                set_insert_clean(newtable, newmask, entry->key, entry->hash);
            }
        }
    } else {
        so->fill = so->used;
        for (entry = oldtable; entry <= oldtable + oldmask; entry++) {
            if (entry->key != NULL && entry->key != dummy) {
                set_insert_clean(newtable, newmask, entry->key, entry->hash);
            }
        }
    }
```
`newmask` ๋ฅผ ์ด์ฉํด์ `oldtable`์์ ๊ธฐ์กด์ ๊ฐ๋ค์ `newtable`์ `set_insert_clean`์ ์ด์ฉํด ๋ฃ์ด์ค๋ค.

**์ด๋ฐ ๋ณต์กํ ๊ณผ์ ๋ค์ ๊ฑฐ์ณ์ `set`์์ `resize`๊ฐ ์งํ๋๋ ๊ฒ์ด๋ค.**

### ๊ทธ๋์ ์ผ๋ง๋ ๊ฑธ๋ฆฌ๋๋ฐ?

```python
b=set()
for i in range(R):
    for j in range(C):
        b.add((i,j))
```

์ ๋ฌธ์ ์์  `set`์ด ์ต๋ ๋ช ๋ฒ `resize`๋ฅผ ํ ๊น? `resize` ์  ํ๋ก `b`์ ๋ฉ๋ชจ๋ฆฌ ํฌ๊ธฐ๊ฐ ๋ฌ๋ผ์ง๋ ์๋์ ๊ฐ์ ์ฝ๋๋ก ํ์ธ ํ  ์ ์๋ค.
```python
resize_count=0
prev=cur_size=sys.getsizeof(b)

for i in range(R):
    for j in range(C):
        b.add((i,j))
        if prev!=sys.getsizeof(b):
            prev=cur_size
            resize_count+=1
            
print(resize_count)
>>>13
```
**13๋ฒ resize๋ฅผ ํ๋ค. ๊ทธ๋ผ ๊ทธ๋๋ง๋ค ๋ด๋ถ ๊ตฌ์กฐ์ธ `hash table`์ bucket์ ์ธ์  , ๊ทธ๋ฆฌ๊ณ  ์ผ๋งํผ ๋์ด๋ ๊น?**

### Set์ load factor

์๋์ ๊ฐ์ ์ฝ๋๋ก ํ์ธ ํ  ์ ์๋ค.
```python
element_count=0
prev=cur_size=sys.getsizeof(b)

for i in range(R):
    for j in range(C):
        s=time.time()
        b.add((i,j))
        element_count+=1
        if prev!=sys.getsizeof(b):
            cur_size=sys.getsizeof(b)
            print("resize at "+str(element_count))
            prev=cur_size
            
>>>
resize at 5
resize at 19
resize at 77
resize at 307
resize at 1229
resize at 4915
resize at 19661
resize at 78643
resize at 157286
resize at 314573
resize at 629145
resize at 1258291
resize at 2516582

```
1. ์ฒ์ `bucket`์ ํฌ๊ธฐ๋ 8์ด๋ 5/8๋งํผ ์ฐผ์๋ ๋์ด๋๋ค. 
2. 19/32๋งํผ ์ฐผ์๋ ๋์ด๋๋ค.
3. 77/128๋งํผ ์ฐผ์๋ ๋์ด๋๋ค.
...



์ด๊ฑธ ๋ฐํ์ผ๋ก ์ฐ๋ฆฐ ์์์ ์ธ๊ธํ **load factor**๋ฅผ ๊ณ์ฐ ํ  ์ ์๋๋ฐ, ๋ฏธ๋ฆฌ ๊ณ์ฐํด์๋ค. ๐
๋๋ต **0.6**์ ๊ทผ์ ํ๋ฉด **resize**๊ฐ ํธ์ถ๋๋ค. 

**Python์์, ์ต์ํ CPython์ `set`์ **load factor**๋ 0.6์ ๊ทผ์ ํ๋๊ฒ ๊ฐ๋ค.**

>์ง์  ๊ณ์ฐ ํด๋ณด๋ฉด `hash table`์ bucket์ ํฌ๊ธฐ๋ 8->32->128->...->32768->**131072**->262144->...->4194304 ์์ผ๋ก ๋์ด๋๋ค. **์ ๋ง 50,000์ ๋์ด์๋ถํฐ๋ 4๋ฐฐ๊ฐ ์๋๋ผ 2๋ฐฐ์ฉ ๋๊ณ  ์๋ค.**

์๊น ์์์ ์ธ๊ธํ `resize`๋ฅผ ํ ์ง ๋ง์ง ๊ฒฐ์ ํ๋ ๋ถ๋ถ์ ๋ค์ ํ๋ฒ ๋ณด์. 
```c
    if ( (size_t)so->fill*5 < mask*3)
        return 0;
    return set_table_resize(so, so->used>50000 ? so->used*2 : so->used*4);
```
`mask`๋ **`size`๋ณด๋ค 1 ์์ ๊ฐ**์ด๋ `bucket`์ `size-1`๋ก ๋ฐ๊ฟ์ธ ์ ์๋ค.. ์์ ๋ณด๊ธฐ ์ข๊ฒ ์ด์ง ์ ๋ฆฌํด๋ณด์.

```c
    if ( (so->fill) < (size-1) * 0.6 )
        return 0;
    return set_table_resize(so, so->used>50000 ? so->used*2 : so->used*4);
```
ํด์ํด๋ณด์. `size-1`๊ฐ์ `bucket`๋ค ์ค์์
*  **60%๋ณด๋ค ๋ ์ฐจ์๋ค๋ฉด**, `resize`๋ฅผ ์งํํ์ง ์๊ณ  `add` ํจ์๋ฅผ ์ข๋ฃํ๋ค. 
*  **60%๋ณด๋ค ๋ ์ฐจ์๋ค๋ฉด** `resize`๋ฅผ ์งํํ๋ค.

**์ต์ํ CPython์ `set`์ load factor๋ 0.6์ ์์ฃผ ๊ทผ์ฌํ๋ค๊ณ  ๋งํ  ์ ์๊ฒ ๋ ๊ฒ์ด๋ค.**

## ๊ฒฐ๋ก 
์ฐ๋ฆฌ๋ ๊ธด ๊ณผ์ ์ ๊ฑฐ์ณ์ `set`์ด `add`๋ฅผ ํ  ๋ ์ฌ์ค์ `resize`๋ฅผ ํ  ๋๊ฐ ์๊ธฐ ๋๋ฌธ์ **Overhead**๋ฅผ ๋๋ฐํ๋ค๋ ๊ฒ์ ์๊ฒ ๋์๋ค. 

๊ทธ๋ ๊ธฐ์ ์์ฃผ naiveํ๊ฒ `set`์ `add`๊ฐ `O(1)`์ด๋ผ๋ ๊ฑด ์๋ฐํ์ง ์๋ค. `add`ํ๋ ๊ณผ์ ์์ `resize`๋ฅผ ํธ์ถํ ๋๊ฐ ์๊ณ  , ๊ทธ ๊ณผ์ ์์ ํ์ฌ element์ ์ฝ **60%** ๊ฐ์ element๋ค์ ์ฎ๊ฒจ์ผ ํ๋ , **[amortized](https://en.wikipedia.org/wiki/Amortized_analysis)** `O(1)`์ด๋ค. 

์ฐ๋ฆฌ๊ฐ ์ด ์ํฉ์ ์ ๋ถ์ํ์๊น? BFS ํ์ ๋ฌธ์ ๋ฅผ ํธ๋๋ฐ ์๊ฐ์ด๊ณผ๊ฐ ๋์์ด๋ค. 

**๊ทธ ์์ธ์ `add`๋ฅผ ๋ฐ๋ณตํ ๋ `resize`์ ์๋ค๋ ๊ฒ์ ํ์คํ๊ฒ ์ ์ ์๋ค.** 


## ๊ทธ๋ผ ์ด๋ป๊ฒ?
`List`๋ index ๊ธฐ๋ฐ ์ ๊ทผ์ ํ๊ธฐ ๋๋ฌธ์ `lookup`์ ๋ํ ์๊ฐ์ด `O(1)`์ด๋ค. ๋ `List`๋ฅผ ์ฒ์ ์ ์ธํ ๋ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ํ ๋นํด์ฃผ๊ธฐ ๋๋ฌธ์, **`append`๋ฅผ ์ฐ์ง ์๋๋ค๋ฉด,** `resize`๊ฐ ํ์ํ์ง ์๋ค.

>`List`๋ ๋ด๋ถ ๊ตฌ์กฐ๋ dynamic array์ด๊ธฐ ๋๋ฌธ์ `resize`๊ฐ ๋ฐ์ํ  ์ ์๋ค. `append`๋ **amortized** O(1)์ธ ์ด์ ๊ฐ ์๋ค.


์ ๋ง ํน์ํ ์ํฉ์ ์ ์ธํ๊ณ ๋ `List`๋ฅผ ์ฌ์ฉํ๋๊ฒ ์๋ฌธ์ ์๊ฐ ์ด๊ณผ ์ค๋ฅ๋ฅผ ๋ณด์ง ์๋ ๋ฐฉ๋ฒ์ด๋ค.

>๊ฒฝํ์ ํน์ํ ์ํฉ์ ํ์์์ ์กฐ๊ฑด์ ์ผ๋ก ๋งค์ฐ ํฌ๊ณ  sparseํ ๋ฒ์์ ๋ฐฉ๋ฌธ์ ํ  ๋๋ค. 

>๋ชจ๋  ์ฝ๋๋ Python 3.8.10 [GCC 9.4.0] on linux ๋ฒ์ ์ ์ฌ์ฉํ์ต๋๋ค

## ์ฐธ๊ณ ์๋ฃ
[CPython Source Code](https://github.com/akheron/cpython)
[Python ๋ฉ๋ชจ๋ฆฌ ๊ด๋ฆฌ ๊ณต์๋ฌธ์](https://docs.python.org/ko/3/c-api/memory.html#c.PyMem_Malloc)
[Memory consumption of a list and set in Python](https://stackoverflow.com/questions/39914266/memory-consumption-of-a-list-and-set-in-python)
[Load Factor and Rehashing](https://www.geeksforgeeks.org/load-factor-and-rehashing/)
[Time complexity for adding elements to list vs set in python](https://stackoverflow.com/questions/58792963/time-complexity-for-adding-elements-to-list-vs-set-in-python)

```toc

```
