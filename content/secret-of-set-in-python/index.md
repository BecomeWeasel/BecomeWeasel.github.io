---
emoji: 📓
title: Python 3의 Set 훔쳐보기
date: '2021-08-07 00:00:00'
author: weasel
tags: Python3 Set
categories: Python
---
## 문제 상황
[백준 빵집](https://www.acmicpc.net/problem/3109)를 풀때 이상한 점이 확실히 생겼다.  일반적으로 python에서 방문 여부를 확인하기 위해 `set`과 `list`중에 하나를 사용한다.
`set`같은 경우는 잘못된 접근 같은 행동에서 안전한 편이고 대부분의 기능에서 `O(1)`의 시간이 보장된다고 알고 있기 때문에 `set`을 이용한 풀이를 종종했다.

> List에서는 미숙한 코드로 indexError를 경험할 수 있다.

이 문제는 naive 하게 `set`을 사용하면 시간초과를 당한다. 처음엔 논리를 잘못 구성해 recursionDepth가 커져서 시간초과가 나는건가 라고 생각했지만 논리에는 문제가 없었다. 그래서 `set`만을 `list`로 바꿔주었더니 통과했다.

분명 `lookup`도 똑같이 `O(1)`이고 `set`에서는 `add`도 `O(1)`이라고 알고 있는데 왜 차이가 나는 것일까? 이 이해 안되는 상황을 지금부터 알아보자.

### 메모리 사용량
먼저 간단하게 두 자료구조의 메모리 사용량을 비교해보았다.

아래 코드는 10000개의 행 , 500개의 열을 가진 2차원 board에서 사용되는 방문을 기록하는 일반적인 구현이다. 

하나는 `List`로 하나는 `set`으로 구현한 뒤 `sys.getsizeof(object)`를 이용해서 각각의 객체의 메모리 사용량을 체크해보았다.

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
**놀라운 결과**다. 같은 기능을 수행하는 서로 다른 자료구조인데 메모리차이가 대략 **31,000**배 정도의 차이를 보였다.

`list`는 **4264 Byte**, `set`은 **134217944 Byte**를 사용한다. 대략적으로 두 자료구조는 각각 **4KB,134MB**을 사용한다는 것이다.

## List와 Set의 내부구조
왜 이렇게 차이가 나는 것일까?

`list`와 `set`이 내부적으로 **데이터를 저장하는 방식**에서 차이가 있어서 그렇다. [stackoverflow의 한 답변](https://stackoverflow.com/questions/39914266/memory-consumption-of-a-list-and-set-in-python)에 따르면 

### List
>List는 그저 원래의 객체들에 대한 참조를 모아놓은것에 불과하다. 만약 1000개의 integer를 만든다고 하면 , 그것들이 만들어지고 list는 오직 그 integer들에 대한 참조만을 담고 있다.

`list`는 참조들의 `collection`이고 일종의 주솟값을 가지고 있는것이다. 그렇기에 아래와 같은 코드를 수행해도 여전히 **4264 Byte**다.
```python
c= [[[1,2,3] for _ in range(10000)] for _ in range(500)]
sys.getsizeof(c)
>>> 4264
```
`list`가 세번 중첩되어 있지만 `[1,2,3]`에 대한 **참조**만을 가지고 있기 때문에 메모리 사용량이 같은 것이다.

> 내부적으로는 [dynamic array](https://en.wikipedia.org/wiki/Dynamic_array)를 사용하고 있다.

### Set

반대로 `set`은 어떨까? Python에서의 `set`은 내부적으로 **key가 dummy value인 `dict`** 를 상당 부분 재사용함으로써 **`hash table`** 의 구조를 가지고 있다.

여전히 위의 같은 답변을 참고하자면 
>반면에, set이나 dictionary는 1000개의 integer들의 hash value를 모두 계산해야하고 그에 따라 메모리 사용량이 증가한다.

>예를 들어 set이나 dict나 가장 작은 크기의 기본값은 8이다.(즉, 오직 3개의 값만 저장한다해도 python은 8개를 지정해준다.) `resize`를 할때, buckets들의 개수는 요소가 50,000개가 되기 전까지는 4배씩 증가한다. 그런 다음에는 2배씩 증가한다.

## Set에서의 resize
과연 정말 그렇게 작동할까? `resize`는 `set`에 일반적으로 값을 추가할 때 호출되기 때문에 `add`를 할때 호출되는 CPython의 `set`의 `set_add_entry`의 구현 코드를 직접 보자.

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

위의 코드에서 [load factor](https://www.geeksforgeeks.org/load-factor-and-rehashing/)가 일정 부분(아래서 다시 언급할 것이다.)을 넘어갈때를 보자.
(`if ((size_t)so->fill*5 < mask*3)` 의 아랫부분이다.)
so(set object)의 크기에 따라 `set_table_resize`의 **인자를 다르게** 주고 있음이 보인다.

>**Load factor** : Hash table 전체에서 얼마나 원소가 차 있는지를 나타내는 수치.
m개의 bucket의 Hash tablen에 n개의 원소가 저장되어 있다면 load_factor = n/m 이다


**`so->used`가 50,000이 넘어가면 현재 used의 2배를, 그렇지 않으면 4배만큼 큰 값으로 `resize`를 하는 것이다.**

>여기서 mask는 `hash_table`의 크기보다 1 작다. modulo의 역할처럼 hash에 쓰이는데 AND 연산을 이용한다.

### resize의 내부동작 방식
이제 `set_table_resize`가 내부적으로 어떻게 동작하는지를 살펴보자. 

**요약하자면 `set_table_resize`는 `hash table`의 구조를 가지는 `setentry` 구조체를 기존 `oldtable`의 2배 혹은 4배의 크기인 `newtable`이라는 이름으로 동적할당 받은 후 `oldtable`의 모든 `entry`들을 `newtable`에 넣어주는 과정을 거친다.**
```c
typedef struct {
    PyObject *key;
    Py_hash_t hash;             /* Cached hash code of the key */
} setentry;
```

>이해가 안가도 당황하지 마세요... 아래서 차근차근 설명해줄거에요...😅




단계별로 살펴보자. 아래 코드부터다.
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
일단, `newtable`의 크기를 정해야 한다. `set_table_resize`의 두번째 인자만큼 
`newsize`를 left shift를 사용해 `Pyset_MINSIZE`에서 `minused`만큼 증가시킨다. 
(`PySet_MINSIZE`는 위에 언급한 것처럼 **8**이다.) 


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
`newsize`가 `PySet_MINSIZE`(8)가 아닐때, `PyMem_New(type,n)`를 통해서 위에서 계산된 `newsize`의 크기만큼 `setentry`의 객체를 생성하는 것이다. 
>좀 더 엄밀하게 얘기하면 `PyMem_new(type,n)`는 `PyMem_Malloc(n)`를 이용해서 `(n)*sizeof(type)` Byte만큼의 메모리를 동적할당(malloc) 하는 macro다. (cpython/include/pymem.h 참조) 

**이제 거의 다 왔다. `oldtable`들의 값들을 `newtable`에 옮겨주기만 하면 된다.**

```c
/* CPython */
/* https://github.com/python/cpython/blob/main/Objects/setobject.c */
    ...
    so->mask = newsize - 1;
    so->table = newtable;
    ...
```
hashing에 필요한 mask 값을 갱신해주고 (modulo와 비슷한 역할을 한다. 다만 **AND 연산자**를 사용할뿐이다.)
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
`newmask` 를 이용해서 `oldtable`안의 기존의 값들을 `newtable`에 `set_insert_clean`을 이용해 넣어준다.

**이런 복잡한 과정들을 거쳐서 `set`에서 `resize`가 진행되는 것이다.**

### 그래서 얼마나 걸리는데?

```python
b=set()
for i in range(R):
    for j in range(C):
        b.add((i,j))
```

위 문제에선 `set`이 최대 몇 번 `resize`를 할까? `resize` 전 후로 `b`의 메모리 크기가 달라지니 아래와 같은 코드로 확인 할 수 있다.
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
**13번 resize를 한다. 그럼 그때마다 내부 구조인 `hash table`의 bucket은 언제 , 그리고 얼만큼 늘어날까?**

### Set의 load factor

아래와 같은 코드로 확인 할 수 있다.
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
1. 처음 `bucket`의 크기는 8이니 5/8만큼 찼을때 늘어난다. 
2. 19/32만큼 찼을때 늘어난다.
3. 77/128만큼 찼을때 늘어난다.
...



이걸 바탕으로 우린 위에서 언급한 **load factor**를 계산 할 수 있는데, 미리 계산해왔다. 😅
대략 **0.6**에 근접하면 **resize**가 호출된다. 

**Python에서, 최소한 CPython의 `set`의 **load factor**는 0.6에 근접하는것 같다.**

>직접 계산 해보면 `hash table`의 bucket의 크기는 8->32->128->...->32768->**131072**->262144->...->4194304 순으로 늘어난다. **정말 50,000을 넘어서부터는 4배가 아니라 2배씩 늘고 있다.**

아까 위에서 언급한 `resize`를 할지 말지 결정하는 부분을 다시 한번 보자. 
```c
    if ( (size_t)so->fill*5 < mask*3)
        return 0;
    return set_table_resize(so, so->used>50000 ? so->used*2 : so->used*4);
```
`mask`는 **`size`보다 1 작은 값**이니 `bucket`의 `size-1`로 바꿔쓸 수 있다.. 식을 보기 좋게 살짝 정리해보자.

```c
    if ( (so->fill) < (size-1) * 0.6 )
        return 0;
    return set_table_resize(so, so->used>50000 ? so->used*2 : so->used*4);
```
해석해보자. `size-1`개의 `bucket`들 중에서
*  **60%보다 덜 차있다면**, `resize`를 진행하지 않고 `add` 함수를 종료한다. 
*  **60%보다 더 차있다면** `resize`를 진행한다.

**최소한 CPython의 `set`의 load factor는 0.6에 아주 근사하다고 말할 수 있게 된 것이다.**

## 결론
우리는 긴 과정을 거쳐서 `set`이 `add`를 할 때 사실은 `resize`를 할 때가 있기 때문에 **Overhead**를 동반한다는 것을 알게 되었다. 

그렇기에 아주 naive하게 `set`의 `add`가 `O(1)`이라는 건 엄밀하지 않다. `add`하는 과정에서 `resize`를 호출할때가 있고 , 그 과정에서 현재 element의 약 **60%** 개의 element들을 옮겨야 하니 , **[amortized](https://en.wikipedia.org/wiki/Amortized_analysis)** `O(1)`이다. 

우리가 이 상황을 왜 분석했을까? BFS 탐색 문제를 푸는데 시간초과가 나서이다. 

**그 원인은 `add`를 반복할때 `resize`에 있다는 것을 확실하게 알 수 있다.** 


## 그럼 어떻게?
`List`도 index 기반 접근을 하기 때문에 `lookup`에 대한 시간이 `O(1)`이다. 또 `List`를 처음 선언할때 메모리를 할당해주기 때문에, **`append`를 쓰지 않는다면,** `resize`가 필요하지 않다.

>`List`도 내부 구조는 dynamic array이기 때문에 `resize`가 발생할 수 있다. `append`도 **amortized** O(1)인 이유가 있다.


정말 특수한 상황을 제외하고는 `List`를 사용하는게 의문의 시간 초과 오류를 보지 않는 방법이다.

>경험상 특수한 상황은 탐색에서 조건적으로 매우 크고 sparse한 범위의 방문을 할 때다. 

>모든 코드는 Python 3.8.10 [GCC 9.4.0] on linux 버전을 사용했습니다

## 참고자료
[CPython Source Code](https://github.com/akheron/cpython)
[Python 메모리 관리 공식문서](https://docs.python.org/ko/3/c-api/memory.html#c.PyMem_Malloc)
[Memory consumption of a list and set in Python](https://stackoverflow.com/questions/39914266/memory-consumption-of-a-list-and-set-in-python)
[Load Factor and Rehashing](https://www.geeksforgeeks.org/load-factor-and-rehashing/)
[Time complexity for adding elements to list vs set in python](https://stackoverflow.com/questions/58792963/time-complexity-for-adding-elements-to-list-vs-set-in-python)

```toc

```
