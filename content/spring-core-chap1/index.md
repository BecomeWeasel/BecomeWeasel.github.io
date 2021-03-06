---
emoji: 📓
title: '스프링 핵심 원리 - 기본편 : 객체 지향 설계와 스프링'
date: '2022-03-04 23:21:00'
author: weasel
tags: Spring Spring core 김영한
categories: Spring
---

## 들어가며

![마션](martian.jpeg)

마션이라는 책에서 가장 유명한 파트이다. 그리고 나는 저 도입부에 **100%** 공감하고 있다.  

현장실습을 3월 2일자로 시작하면서, 이젠 돌이킬 수 없는 4학년이고 취업 전선에 뛰어든 신세다.  
그렇기에 현장실습과 코딩테스트, CS 스터디를 두개씩 동시에 하고 있으며 개인 Spring 프로젝트를 준비하고 있다.

그중에서도 빼놓을 수 업는 중요한 것은 Spring에 대한 공부라고 생각한다.  
물론 Spring에 대한 지식이 전혀 없는 것은 아니다. 공부를 하면 했지, 절대 하지 않은 것은 아니다.  
하지만 그럼에도 **나는 왜 다시 스프링을 공부해야 하는가?**

항상 참인 명제인 ***나는 생각보다 멍청하고, 배운것을 모조리 까먹는다는 것이다.***

그렇기에 Spring의 1타 강사 아니 사실 인프런 1타 강사인것 같은 김영한 님의 강의를 듣기로 했다.  
>물론 강의가 중요한 것은 아니지만, 내가 쌩돈 내면서 결제하면 그나마 열심히 할 것 같아서..

그래서 공부한 것들을 내 **기억이 아닌 기록**에 의존하려 한다.

# 객체 지향 설계와 스프링

## 스프링의 진짜 핵심
* 스프링은 자바 언어 기반의 프레임워크
* 자바 언어의 가장 큰 특징 : 객체 지향 언어
  * 즉, 스프링은 객체 지향 언어가 가진 강력한 특징을 살려냄으로써 **좋은 객체 지향** 어플리케이션을 개발할 수 있게 도와주는 프레임워크다.



## 좋은 객체 지향 프로그래밍은...
프로그램을 단순히 명령어의 목록으로 보는것에서 벗어나, **객체들의 모임**으로 파악하는 것.  
객체끼리는 메시지를 주고받으며 데이터를 처리한다.

또 유연하고 변경이 용이하다는 특징이 있다... 이 난해한 말은 간단히 말해서 **레고를 조립**하듯이 프로그램을 개발하는 것이다.

## 다형성
실제 우리가 살고 있는 세계와 객체 지향은 완전히 대응시키기는 어렵지만,  
실생활에서의 예제를 **역할**과 **구현**으로 나눠서 보면 좋다.

운전자와 자동차들이 있다고 해보자.  
운전자는 운전만 하고, 자동차는 굴러가기만 하면 되는것이다.

즉, 타고 있는 **자동차가 바뀌어도 운전자는 아무 신경쓰지 않고 그대로 운전을 할 수 있어야 한다.**

다시 말해서 자동차의 **구현**과 운전자를 분리한 이유는 운전자가 자동차의 내부적인 동작 방식에 대해서 모르더라도 운전자에게 영향을 주지 않기 위함이다.

이렇게 자동차가 K3,아반떼,벤츠,BMW ... 등으로 운전자에게 영향을 주지 않고 자동차의 종류를 무한히 확장가능한 이것을 **다형성**이라고 한다.

이를 통해서 새로운 자동차가 등장하더라도, **운전자는 새로운 자동차의 내부적인 방식에 대해서 신경 쓸 필요가 전혀 없다.** 그저 굴러가는 자동차일뿐이다.

### 달성하고자 하는 것
**역할**과 **구현**으로 세상을 바라보면 세상이 **단순**해지고, **유연**해지고 **변경**이 편리하다.

아까 운전자의 예시를 그대로 들면,
1. 운전자는 자동차라는 인터페이스의 역할만 알면 된다.
2. 운전자는 자동차의 내부 구조를 몰라도 된다.
3. 운전자는 자동차가 전기로 가든, 기름으로 가든, 뒤에서 밀어서 가든 내부구조가 변경되어도 영향을 받지 않게 된다.
4. 운전자는 자동차의 종류가 변하는 상황에서도 영향을 받지 않는다.

자바에서는 **역할**은 인터페이스로, **구현**은 인터페이스를 구현한 클래스이다.

### 자바에서의 다형성
대표적인 예시가 상위 클래스 혹은 인터페이스의 메소드를 재정의하는 **오버라이딩**이다.

클라이언트는 서버의 인터페이스의 함수를 호출하면서, 서버 내의 메소드가 어떻게 구성되어있는지는 관심이 없으며, 서버는 **런타임**에 필요에 의해 **구현을 유연하게 변경**하여 적용할 수 있다.

이를 통해 **클라이언트를 변경하지 않고, 서버의 구현 기능을 유연하게 변경**할 수 있다.

## 스프링과 객체 지향
결국 가장 중요한 것은 **다양성**이다.  

스프링은 이 다형성을 극대화하게 이용할 수 있게 도와주는 것이다.  
**DI,IOC**와 같은 개념들 역시 다형성을 서포트하는 기능들이다.

## SOLID
로버트 마틴이 주장한 객체지향 설계 5가지 원칙을 앞 글자만 따서 SOLID라고 한다.

### SRP : 단일 책임 원칙
한 클래스는 **하나의 책임**만을 가져야 하는데, 이 **책임**이라는 것은 모호하다. 문맥에 따라서 클 수도 있고, 작을 수도 있다.

가장 중요한 기준은 **변경**이다. **어떠한 변경점이 있을때 클래스에 미치는 파급효과가 적으면** SRP를 잘 따른 것이다.

>하나의 클래스에 DB접근,View 로직,비즈니스 로직이 다 들어가 있다고 생각해보자.  
>DB에 변경점이 생기면, 클래스 전체가 바뀌어야 한다. SRP를 잘 지키지 못한 예시다.

### OCP : 개방 폐쇄 원칙
**가장 중요한 원칙이다.**  
요소들이 **확장에는 열려 있고 변경에는 닫혀** 있어야 한다. 근데 확장을 하는데 어떻게 변경 없이 한다는 것일까? 

처음으로 돌아가서 다형성을 생각해보자.  
운전자와 자동차의 관계에서 자동차의 모델이 바뀔때
**역할이 확장**된다고 해도 기존의 자동차 모델 구현은 **변경이 필요하지 않는 것이다.**

인터페이스를 구현한 새로운 클래스를 만듦으로써 확장한다고 해보자.  
**그러면 인터페이스는 변경되지 않으며, 확장은 일어난다.**

근데 이것이 정말 변경이 없을까? 요리를 예시로 들어보자.  
예를 들어 고든 램지는 나에게 요리를 시키고, 나는 요리를 한다.
```
내 kitchen 인터페이스와 클래스가 이렇다고 해보자.

interface kitchen:    
    func cook()

class fryKitchen :
    @오버라이드
    func cook():
        fry()

class boilKitchen :
    @오버라이드
    func cook():
        boil()

램지 do : 
kitchen k= new fryKitchen()

k.cook() -> kitchen 인터페이스 안에 있는 cook을 호출

나는 kitchen 인터페이스 안에서 기존에는 구워서(fry()) 해서 만드는데,
만약 삶아서 요리를 하는것으로 변경한다면?

아마 코드는 이렇게 변할 것이다.

램지의 do :
# kitchen k = new fryKitchen()
kitchen k = new boilKitchen()

k.cook() -> kitchen 인터페이스 안에 있는 cook을 호출

고든 램지의 행동은 여전히 같다. 하지만 k에 대해서 코드가 변경이 일어난다. 이상하다...
```
위 코드에서의 문제점은 **`kitchen`에 대한 구현 객체**를 직접 선택하는데 있다.  
**내가 다형성을 사용한게 확실한데, OCP 원칙을 위반**하는 것이다. 

이 문제를 해결하기 위해서는 객체를 생성하고 연관관계를 맺어주는 **별도의 설정자, 조립자**가 필요하다.

### LSP : 리스코프 치환 원칙
프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.

이게 무슨 소리일까...

아까 위의 요리 사례에서 `kitchen` 인터페이스의 메소드인 `cook()`은 어쨌든 요리를 만드는 메소드다.  
`fryKitchen` 이건, `boilKitchen`이건 요리가 만들어져야 하는 것이다.

내가 `kitchen` 인터페이스를 구현하면서 `cook()` 메소드를 요리가 아닌 음쓰를 만든다면?  
`kitchen` 인터페이스를 믿고 사용할 수 있을까?  
조금 타더라도, 조금 느리더라도 `cook()`을 호출하면 **요리는 만들어져야** 한다.

>![wow](wow.png)
>LSP를 위반한 대표적인 사례 : 와갤요리

즉, 하위 클래스는 인터페이스 규약을 다 지켜야 하는 것이다.  
단순히 컴파일 시점에서의 성공의 얘기가 아닌 의미론적으로 맞아야 한다는 것이다.

### ISP : 인터페이스 분리 원칙
특정 클래스를 위한 인터페이스 여러 개가 범용적인 인터페이스 하나보다 낫다.

간단히 얘기해서 인터페이스를 작게 분리함으로써 **명확하게끔하고, 대체가능성을 높**이라는 것이다.

위의 예시를 요리와 서빙, 포장으로 나누어보자.
`kitchen` 인터페이스와 `serve` 인터페이스와 `pack` 인터페이스를 각각 분리함으로써  
각각의 인터페이스를 명확하게 하고, 적절히 조합함으로써 대체 가능성을 높이는 것이다.

### DIP : 의존관계 역전 원칙
OCP 만큼이나 중요한 원칙이다.

프로그래머는 ***"추상화에 의존해야지, 구체화에 의존하면 안된다."*** 의존성 주입은 이 원칙을 따르는 방법 중 하나다.

앞서 이야기한 역할에 의존하게 해야한다는 것과 같은 맥락이다.  
클라이언트가 인터페이스가 아닌 구현체에 의존하게 되면 변경이 어려워진다.

즉, 고든 램지는 내가 요리를 한다는 것에만 관심이 있지 구워서 만들지, 삶아서 만들지에 대해서는 관심이 없어야 한다는 것이다.  
**구워서 만드는 것이 어떻게 이루어지는지, 삶는 방법은 어떤지에 대해서 관심 끄라는 얘기!** ~~이세계 고든 램지~~

아까의 OCP 사례가 문제점이 있다고 했으니 다시 가져와보자.

램지의 행동을 잘 보면 `kitchen k` 는 구현 클래스인 `fryKitchen`과 `boilKitchen`에 의존하고 있다.
```
램지 do :
# kitchen k = new fryKitchen()
kitchen k = new boilKitchen()
```
>여기서 의존한다라는 것은 강사님이 말하길 "저 코드를 알기만 하면 의존이다."
클라이언트인 고든 램지가 직접 어떤 구현 클래스를 선택할지 선택함으로써 클라이언트가 `fryKitchen`과 `boilKitchen`에 의존하고 있다.

이 부분에서 **DIP**를 위반하는 것이다.  

## 다형성만으로는 부족해
객체지향의 핵심은 다형성인것은 분명하지만, 다형성만으로는 쉽게 갈아끼우는 레고처럼 개발할 수 없다.  
다형성만 사용해서는 구현 객체를 변경할때 클라이언트인 램지의 행동도 변경이 된다.  
다형성만으로는 **OCP,DIP**를 지킬 수 없는 것이다.

뭔가가 더 필요하다.. More and More

## 객체 지향 설계와 스프링
스프링은 **DI(Dependency Injection)** 을 이용해서 OCP,DIP를 가능하게끔 해준다.  
즉, 우리가 원하는 대로 레고를 조립하듯이 개발을 할 수 있게끔 해준다.

>DI 개념은 솔직히 공부만으로는 잘 이해가 안간다. 면접에서 받은 질문 중에 하나.. 

앞으로 코드를 직접 작성해보면서 의존성 주입을 이해하며 스프링의 재미를 느끼고 싶다. ~~아니 느껴야 한다.~~


```toc
```




