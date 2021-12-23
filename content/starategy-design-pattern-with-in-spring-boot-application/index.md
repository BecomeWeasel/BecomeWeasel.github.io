---
emoji: 📓
title: 스프링 부트 어플리케이션의 전략 패턴(Strategy Design Pattern with in Spring Boot application)
date: '2021-01-30 00:00:00'
author: weasel
tags: Springboot 전략패턴 StartegyPattern
categories: Spring
---
> 본 글은 [Strategy Design Pattern with in Spring Boot application.](https://medium.com/@ravthiru/strategy-design-pattern-with-in-spring-boot-application-2ff5a7486cd8)을 번역한 글입니다.

> 잘 쓰여진 글을 정리 하는 겸 한글로 공유하고 싶어서 번역했습니다.

전략 디자인 패턴은 실행 중에 알고리즘을 선택하게 해주는 행동 디자인 패턴이다.

전략 디자인 패턴의 의도는 다음과 같다 :
"알고리즘 집합을 선언하고, 각각을 캡슐화하며 그것들을 교체가 가능하게 만든다. 전략 패턴은 알고리즘을 사용하는 유저와는 독립적으로 알고리즘을 다양하게끔 한다."

## UML Class와 sequence diagram

[![전략 패턴의 다이어그램](https://images.velog.io/images/hsw0194/post/354b2fad-7109-48e0-b5ee-8c00099a6f4b/image.png)](https://en.wikipedia.org/wiki/Strategy_pattern)
전략 디자인 패턴을 설명하고 다양한 언어로 그것을 구현하는 많은 글들이 시중에 있다. 
이 글의 목적은 스프링 부트 어플리케이션에서 전략 패턴을 어떻게 구현하는지 알려주는 것이다.

## 스프링 부트
스프링 부트는 Java microservice 개발의 실질적 표준이 되었다. 스프링 부트 어플리케이션에서 자주 쓰이는 디자인 패턴들을 어떻게 구현하는지 아는 것은 유용할 것이다.

스프링은 의존성 주입을 위해 `@Autowired` annotation을 도입했다. 모든 스프링 구성요소는 주입이 가능하다. 구성요소에는 `components`, `configurations`, `services`, `bean`들이 있다.

이 글에서 우리는 의존성 주입에 전략 디자인 패턴을 구현할 것이다.

첫번째로, 우리는 전략 패턴에 필요한 알고리즘 집합을 구현하면서 시작한다.
아래가 전략 패턴을 위한 인터페이스다. 그리고 `enum`으로 정의된 `StrategyName`을 이용해서 각각의 전략을 구분한다.
```java
public interface Strategy{
	void doStuff();
	
	StrategyName getStrategyName();
}

public enum StrategyName{
	StrategyA,
	StrategyB,
	StrategyC
}
```
아래는 전략 패턴을 위한 세가지 알고리즘이다. 각각의 알고리즘은 `StrategyName`을 기준으로 구분된다. 전략들을 구분하는데 있어서 `String`보다는 `enum`을 사용하는 것이 더 좋다.

```java
@Component
public class StrategyA implements Strategy{

	@Override
	public void doStuff(){
		// 알고리즘 A 구현하기
	}
    
	@Override
    public StrategyName getStrategyName(){
		return StrategyName.StrategyA;
	}
}

@Component
public class StrategyB implements Strategy{

	@Override
	public void doStuff(){
		// 알고리즘 B 구현하기
	}
    
	@Override
	public StrategyName getStrategyName(){
		return StrategyName.StrategyB;
	}
}

@Component
public class StrategyC implements Strategy{

	@Override
	public void doStuff(){
		// 알고리즘 C 구현하기
	}
    
	@Override
	public StrategyName getStrategyName(){
		return StrategyName.StrategyC;
	}
}
```
이제 우리는 `StrategyFactory`를 다른 스프링 bean으로 만들고, 모든 전략을 factory에 주입한다. 여기서 `StrategyFactory`를 구성할 때 전략들을 Map을 이용해서 저장하는데, 이건 전략들을 `lookup`하는데 $$O(1)$$이 걸리게끔 한다.
```java
@Component
public class StrategyFactory {
  private Map<StrategyName, Strategy> strategies;
  
  @Autowired
  public StrategyFactory(Set<Strategy> strategySet) {
     createStrategy(strategySet);
  }
  
  public Strategy findStrategy(StrategyName strategyName) {
     return strategies.get(strategyName);
  }
  private void createStrategy(Set<Strategy> strategySet) {
      strategies = new HashMap<StrategyName, Strategy>();
      strategySet.forEach( 
   strategy ->strategies.put(strategy.getStrategyName(), strategy));
  }
}
```
이제 `StrategyFactory`를 `@Autowired`를 이용해서 주입받을 수 있게 되었다. 아래가 `StrategyFactory`를 사용한 예제 코드다.
```java
@Service
public class SomeService {
    @Autowired
    private StrategyFactory strategyFactory;
    
    public void findSome(){
    // 이름을 전달해서 전략을 가져올 수 있다.
    Strategy strategy = strategyFactory.findStrategy(StrategyName.StrategyA);
    
    // 이제 전략에 정의된 메소드를 호출할 수 있다.
    strategy.doStuff();
    }
}
```

## 결론
지금까지 스프링 부트 어플리케이션에서 의존성 주입을 전략 패턴을 이용해서 하는 방법을 살펴보았다.

더 많은 정보는 [The Strategy design pattern](http://w3sdesign.com/?gr=b09&ugr=proble)에서..

>첫 번역글인데 영문 어체를 한국어로 어색하지 않게 전달하는게 쉽지 않네요.

>전략 패턴을 사용하면 실행 중에 알고리즘을 교체할 수 있는데 원글에서 그런 부분 설명이 빠진점이 아쉽습니다.

```toc

```
