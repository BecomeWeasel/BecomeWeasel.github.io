---
emoji: 📓
title: Hash Table에 대해서 완전 자세하게 알아보자.
date: '2022-01-10 00:00:00'
author: weasel
tags: 자료구조 hashtable
categories: 자료구조
---
내부적으로 배열을 사용하여 조회,삽입,삭제 모두 `O(1)`안에 수행하기 위한 특별한 자료구조다. 배열의 인덱스를 유일하게(혹은 그에 가깝게) 지정하기 위해서 데이터와 연관된 고유한 숫자를 만들어낸 후 그것을 인덱스로 사용한다.

또 일반적으로 순서를 보장하지 않기 때문에, 순서, 관계가 있는 목적에는 적합하지 않다.

## Hash funciton

데이터에 연관된 고유한 값을 만들기 위해서 해시 함수를 사용한다. 이 해시 함수를 통해서 나온 결과값을 해시 값(혹은 해쉬 코드,해쉬)라고 하고 이것을 이용해 데이터에 대한 접근 연산을 수행한다.

가장 많이 쓰이는 해시 함수는 나머지 연산(modulo)를 이용한다. 키 `k` 를 어떤 정해진 수 `D` 로 나눈 나머지를 `k` 를 저장하는 버킷의 인덱스로 사용하는 것이다. 
→ `h(k)=k`

일반적으로 `D` 는 적절히 큰 소수(prime number)를 사용하는데 이유는 다음과 같다. 
>만약 D를 소수가 아닌 값이라 하면, D의 모든 약수는 자신의 배수가 곧 키값이 된다. 해시충돌이 많이  일어나는것이다.

만약 이 해시 함수가 엄밀하지 못해서 **여러개의 객체가 서로 같은 값을 가지게 된다면 이것을 해시 충돌(hash collision)이라고 한다**. 

일반적인 경우에서 가능한 키들의 집합을 `U`라고 하고, 버킷들의 개수를 `m`이라고 할때 `U>>m`인 경우가 대부분이므로 충돌은 필연적으로 발생한다. 이것을 해결하기 위해서 버킷의 사이즈를 단순히 키우는것은 좋은 해결책이 아니다. 메모리 사용량에서 치명적이다.

좋은 해시 함수를 고안해도, **여전히 해시 충돌은 불가피하다**. 해시충돌이 늘어나게되면 `O(1)`의 시간복잡도 장점을 잃어버리고 `O(n)`에 가깝게 되니, 적절한 해결책을 세워야 한다.

## Open Addressing

개방주소법(Open Addressing)은 간단히 말해서 해시충돌이 발생하면(계산된 인덱스로 접근한 버킷이 이미 사용중이면) 단순히 다른 인덱스에 데이터를 저장하는 방식이다.

개방주소법 안에서도 여러개로 나뉜다.

- **Linear Probing**
    - 계산된 해시값에서 해시충돌이 발생한다면, 고정폭만큼 건너뛰어 비어있는 해시에 저장하는 방법이다. 만약 그 자리에도 차있다면, 그 다음 고정폭의 위치를 탐색한다.
    - 이 방법은 단순해서 계산을 하기 쉽지만, 최악의 경우 탐색을 시작한 위치까지 돌아오게 되어 종료할 수 있다.  `O(n)`이 걸리는 것이다.
    - 또 primary clustering이라는 특정 해쉬 값 슬롯 근처에 값들이 뭉치게 되는 문제도 생길 수 있다. `x` 라는 해쉬 값을 공유하는 객체들이 `x+1,x+2,x+3` 등으로 모이기 때문이다. 
    **클러스터의 크기가 커질수록, 비슷한 해쉬값들이 적절히 배치되지 못하고 다음을 probing하니 클러스터가 더 빠르게 자라나고**, 이는 성능적으로 이슈를 불러일으킨다.
    - 다만 값들이 *클러스터링* 되어있기 때문에 **cache hit** 적인 측면에서는 유리하다. 처음 키에 대해서 접근을 하면 **다음 키도 캐쉬에 올라와 있기 때문**이다.
- **Quadratic Probing**
    - Linear Probing과 비슷하게 , 해시충돌이 발생한다면 다음 슬롯을 찾는다. 다른 점은 `idx=(hash(key)+i^2) mod m` 의 꼴을 취하는 것이다.
    - 이 방법도 primary clustering보다는 덜 하지만 성능에 영향을 주는 secondary clustering 문제를 일으킨다.
    - 초기 hash 포지션이 아닌 좀 더 광범위하게 퍼져있는 것이다.
- **Double hashing**
    - 이름 그대로 해시 충돌이 생기면, 2차 해시함수를 이용해서 다시 해시를 하는 방법.
    - 값이 퍼지게 되어서 캐쉬의 측면에서는 비효율적이고 연산량이 많이 들지만, 클러스터링에는 큰 영향을 받지 않는다.

### 장점과 단점

이처럼 개방주소법 내에서도 여러가지 충돌 처리방식이 있다. 일반적으로 개방주소법은 **적은 양의 데이터에는 효과**를 보이고 메모리 효율도 분리연결법에 비해 상대적으로 좋고, 메모리 할당에 대한 오버헤드도 없는 편이다.

또 일반적으로 연결리스트를 사용하는 분리연결법에 비하여 **캐쉬 효율이 좋기** 때문에 (**특히 Linear Probing**) Python에서 hashtable을 구현할때 사용된다.

하지만 **데이터의 삭제에서 좋지 않은 퍼포먼스를 보인다.** 
예를 들어 `A,B,C` 가 연속적으로 있을때(linear probing) `A` 를 삭제한다고 해보자. 그럼 `NULL,B,C` 라고 변경될텐데, 이때 `C` 에 대해서 조회를 한다면, `NULL` 을 만나게 된다. 이것을 **원래부터 비어있는 공간**인지 혹은 **삭제되어서 비어있는 공간**인지 알 수 없기 때문에 `C` 를 조회하지 못하고 탐색이 종료된다.
이를 극복하기 위해서 삭제된 공간은 삭제되었음을 표시해주는 `DEL` 같은 표기자를 사용해 다음 index를 조회할수 있게끔 해야한다. 
물론 이러한 `DEL` 표시자가 늘어난다면, **조회할 데이터가 없어도 계속적인 탐색을 수행해줘야 하니 표시자의 개수에 따라 해시테이블 전체에 대해서 rehashing을 해줘야 한다.**

**load factor를 `l`이라고 하였을때 삽입과 조회, 삭제 모두 `O(\frac{1}{1-l})`의 성능을 보여준다.**

## Seperate Chaining

분리연결법(Separate Chaining)은 일반적인 상황에서 개방주소법보다는 빠른데, 개방주소법의 경우 load factor가 커질수록 최악의 경우( `O(n)`)의 발생 빈도가 높아지기 때문이다.

분리연결법은 해시충돌이 잘 발생하지 않게끔 하기 위해서 보조 해시 함수를 이용해 최악의 경우로 가는 상황을 줄이려고 한다.

분리연결법에도 두가지 방법이 존재한다.

- **Linked List**
    - 각각의 버킷들을 연결리스트로 두어 충돌이 발생하면 해당 버킷의 리스트에 추가하는 방식.
    - 단, 연결리스트의 단점을 그대로 가지고 있다. 메모리 주소 상에서 연속적이지 않기 때문에 **캐시의 효율이 나쁘고**, **아주 적은 데이터가 있을때의 메모리 오버헤드가 있다.(개방주소법과 비교해서)**
    - 또 Traverse를 할 때 최악의 경우에는  `O(n)`의 시간복잡도를 보인다.
- **Tree**
    - 연결리스트의 단점을 개선하기 위해 나온 것으로 연결리스트가 아닌 Tree 구조를 이용해 데이터를 저장한다.
    - 단, Tree에서도 **데이터가 편향되게 들어오면**  `O(n)`의 시간복잡도를 가질 수 있으니 Red-black Tree와 같은 **Balanced Binary Tree를 사용함**으로써 `O(logn)`의 연산을 보장시킨다.
    - 하지만 적은 데이터 수에서 RB Tree를 유지하는데 드는 메모리 사용량이 연결리스트보다 크니, 적은 수의 데이터보다는 **어느정도 데이터가 들어왔을때  연결리스트에서 트리로 전환한다.**
    - Java 8에서부터는 데이터가 8개가 넘어가면 트리로 전환하고, 6개가 되면 다시 연결리스트로 전환한다. 두개의 차이가 2가 나는 이유는 데이터의 잦은 삽입,삭제로 1개단위로 전환하게 되면 오버헤드가 더 크기 때문에 일정 수준을 유지하는것이다.
    - AVL 트리도 균형이진트리인데 사용하지 않는 이유는, 일반적으로 hashtable 같은 경우 데이터의 조회만 intensive하게 일어나지 않기 때문에, **AVL 트리를 사용하면 rotation과 같은 balance를 유지하는데 드는 오버헤드가 너무 크다.**
    - 이에 반해 RB 트리는 조금 더 느슨하게 균형을 유지함으로써 조회,삽입,삭제에 **평균적으로 좋은** 퍼포먼스를 보여주기 때문에 hashtable의 내부 자료구조로 사용되는 것이다.

### 장점과 단점

분리연결법은 load factor에 크게 민감하게 반응하지 않아도 된다. 일반적으로 개방주소법에서 load factor가 커지면 성능이 기하급수적으로 나빠지는것에 비해서 
분리연결법은 조금 linear한 나쁜 성능을 보여준다. 

또 개방주소법에서는 hash table의 resize가 필연적으로 일어나게 되는데, 이것은 `O(m) , (m은 key의  개수)`의 시간복잡도를 요구하니 꽤 치명적이다. 
하지만 분리연결법에서는 하나의 버킷에 대해 지속적으로 사용하기 때문에 테이블의 확장이 **개방주소법보다는 더디게** 일어나는 편이다.

다만 일반적으로 개방주소법에서 버킷들의 캐시 효율이 좋은 반면 분리연결법은 링크드리스트나 트리를 이용하기에 캐시의 효율이 좋지 않다.

## 해시 테이블 자체의 단점

데이터가 pseudo-random 위치에 저장되기 때문에, **데이터를 정렬된 순서로 접근하는 것에 있어서 엄청난 비용이 발생한다**. Self-balancing binary tree와 같은 자료구조에서는 `O(logn)`의 조회를 보장해 조금 느리고 구현이 더 복잡하지만 데이터는 정렬되어 있다.

또 데이터를 loop하면서 traverse하는 능력도 떨어지는데, **데이터가 흩뿌려질(산재된) 확률이 높은 해쉬테이블의 특성상** **빈 슬롯도 모조리 체크**해가면서 순회해야 하기 때문이다.

일반적으로 해시 테이블은 지역참조성에 취약한데, 해시 테이블의 조회 자체가 **버킷들을 건너띄면서 확인하는 방식이기 때문이다.** 그렇기에 프로세스가 계속해서 **캐시 미스를 발생시키고 이는 오버헤드로 이어진다.** 데이터가 적고 type이 간단한(Integer...) 경우에는 배열을 이용한 자료구조가 더 나은 성능을 보일 수 있다.

```toc

```