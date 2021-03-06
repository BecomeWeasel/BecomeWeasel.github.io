---
emoji: π
title: μ€νλ§ λΆνΈ μ΄νλ¦¬μΌμ΄μμ μ λ΅ ν¨ν΄(Strategy Design Pattern with in Spring Boot application)
date: '2021-01-30 00:00:00'
author: weasel
tags: Springboot μ λ΅ν¨ν΄ StartegyPattern
categories: Spring
---
> λ³Έ κΈμ [Strategy Design Pattern with in Spring Boot application.](https://medium.com/@ravthiru/strategy-design-pattern-with-in-spring-boot-application-2ff5a7486cd8)μ λ²μ­ν κΈμλλ€.

> μ μ°μ¬μ§ κΈμ μ λ¦¬ νλ κ²Έ νκΈλ‘ κ³΅μ νκ³  μΆμ΄μ λ²μ­νμ΅λλ€.

μ λ΅ λμμΈ ν¨ν΄μ μ€ν μ€μ μκ³ λ¦¬μ¦μ μ ννκ² ν΄μ£Όλ νλ λμμΈ ν¨ν΄μ΄λ€.

μ λ΅ λμμΈ ν¨ν΄μ μλλ λ€μκ³Ό κ°λ€ :
"μκ³ λ¦¬μ¦ μ§ν©μ μ μΈνκ³ , κ°κ°μ μΊ‘μννλ©° κ·Έκ²λ€μ κ΅μ²΄κ° κ°λ₯νκ² λ§λ λ€. μ λ΅ ν¨ν΄μ μκ³ λ¦¬μ¦μ μ¬μ©νλ μ μ μλ λλ¦½μ μΌλ‘ μκ³ λ¦¬μ¦μ λ€μνκ²λ νλ€."

## UML Classμ sequence diagram

[![μ λ΅ ν¨ν΄μ λ€μ΄μ΄κ·Έλ¨](https://images.velog.io/images/hsw0194/post/354b2fad-7109-48e0-b5ee-8c00099a6f4b/image.png)](https://en.wikipedia.org/wiki/Strategy_pattern)
μ λ΅ λμμΈ ν¨ν΄μ μ€λͺνκ³  λ€μν μΈμ΄λ‘ κ·Έκ²μ κ΅¬ννλ λ§μ κΈλ€μ΄ μμ€μ μλ€. 
μ΄ κΈμ λͺ©μ μ μ€νλ§ λΆνΈ μ΄νλ¦¬μΌμ΄μμμ μ λ΅ ν¨ν΄μ μ΄λ»κ² κ΅¬ννλμ§ μλ €μ£Όλ κ²μ΄λ€.

## μ€νλ§ λΆνΈ
μ€νλ§ λΆνΈλ Java microservice κ°λ°μ μ€μ§μ  νμ€μ΄ λμλ€. μ€νλ§ λΆνΈ μ΄νλ¦¬μΌμ΄μμμ μμ£Ό μ°μ΄λ λμμΈ ν¨ν΄λ€μ μ΄λ»κ² κ΅¬ννλμ§ μλ κ²μ μ μ©ν  κ²μ΄λ€.

μ€νλ§μ μμ‘΄μ± μ£Όμμ μν΄ `@Autowired` annotationμ λμνλ€. λͺ¨λ  μ€νλ§ κ΅¬μ±μμλ μ£Όμμ΄ κ°λ₯νλ€. κ΅¬μ±μμμλ `components`, `configurations`, `services`, `bean`λ€μ΄ μλ€.

μ΄ κΈμμ μ°λ¦¬λ μμ‘΄μ± μ£Όμμ μ λ΅ λμμΈ ν¨ν΄μ κ΅¬νν  κ²μ΄λ€.

μ²«λ²μ§Έλ‘, μ°λ¦¬λ μ λ΅ ν¨ν΄μ νμν μκ³ λ¦¬μ¦ μ§ν©μ κ΅¬ννλ©΄μ μμνλ€.
μλκ° μ λ΅ ν¨ν΄μ μν μΈν°νμ΄μ€λ€. κ·Έλ¦¬κ³  `enum`μΌλ‘ μ μλ `StrategyName`μ μ΄μ©ν΄μ κ°κ°μ μ λ΅μ κ΅¬λΆνλ€.
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
μλλ μ λ΅ ν¨ν΄μ μν μΈκ°μ§ μκ³ λ¦¬μ¦μ΄λ€. κ°κ°μ μκ³ λ¦¬μ¦μ `StrategyName`μ κΈ°μ€μΌλ‘ κ΅¬λΆλλ€. μ λ΅λ€μ κ΅¬λΆνλλ° μμ΄μ `String`λ³΄λ€λ `enum`μ μ¬μ©νλ κ²μ΄ λ μ’λ€.

```java
@Component
public class StrategyA implements Strategy{

	@Override
	public void doStuff(){
		// μκ³ λ¦¬μ¦ A κ΅¬ννκΈ°
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
		// μκ³ λ¦¬μ¦ B κ΅¬ννκΈ°
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
		// μκ³ λ¦¬μ¦ C κ΅¬ννκΈ°
	}
    
	@Override
	public StrategyName getStrategyName(){
		return StrategyName.StrategyC;
	}
}
```
μ΄μ  μ°λ¦¬λ `StrategyFactory`λ₯Ό λ€λ₯Έ μ€νλ§ beanμΌλ‘ λ§λ€κ³ , λͺ¨λ  μ λ΅μ factoryμ μ£Όμνλ€. μ¬κΈ°μ `StrategyFactory`λ₯Ό κ΅¬μ±ν  λ μ λ΅λ€μ Mapμ μ΄μ©ν΄μ μ μ₯νλλ°, μ΄κ±΄ μ λ΅λ€μ `lookup`νλλ° $$O(1)$$μ΄ κ±Έλ¦¬κ²λ νλ€.
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
μ΄μ  `StrategyFactory`λ₯Ό `@Autowired`λ₯Ό μ΄μ©ν΄μ μ£Όμλ°μ μ μκ² λμλ€. μλκ° `StrategyFactory`λ₯Ό μ¬μ©ν μμ  μ½λλ€.
```java
@Service
public class SomeService {
    @Autowired
    private StrategyFactory strategyFactory;
    
    public void findSome(){
    // μ΄λ¦μ μ λ¬ν΄μ μ λ΅μ κ°μ Έμ¬ μ μλ€.
    Strategy strategy = strategyFactory.findStrategy(StrategyName.StrategyA);
    
    // μ΄μ  μ λ΅μ μ μλ λ©μλλ₯Ό νΈμΆν  μ μλ€.
    strategy.doStuff();
    }
}
```

## κ²°λ‘ 
μ§κΈκΉμ§ μ€νλ§ λΆνΈ μ΄νλ¦¬μΌμ΄μμμ μμ‘΄μ± μ£Όμμ μ λ΅ ν¨ν΄μ μ΄μ©ν΄μ νλ λ°©λ²μ μ΄ν΄λ³΄μλ€.

λ λ§μ μ λ³΄λ [The Strategy design pattern](http://w3sdesign.com/?gr=b09&ugr=proble)μμ..

>μ²« λ²μ­κΈμΈλ° μλ¬Έ μ΄μ²΄λ₯Ό νκ΅­μ΄λ‘ μ΄μνμ§ μκ² μ λ¬νλκ² μ½μ§ μλ€μ.

>μ λ΅ ν¨ν΄μ μ¬μ©νλ©΄ μ€ν μ€μ μκ³ λ¦¬μ¦μ κ΅μ²΄ν  μ μλλ° μκΈμμ κ·Έλ° λΆλΆ μ€λͺμ΄ λΉ μ§μ μ΄ μμ½μ΅λλ€.

```toc

```
