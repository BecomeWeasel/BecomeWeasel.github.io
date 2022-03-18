---
emoji: 📓
title: Spring Boot에서 interface를 사용해야 할까? (Do I need an interface with Spring boot?)
date: '2021-07-15 00:00:00'
author: weasel
tags: Spring SpringBoot interface
categories: Spring
---
![](./spring-logo-9146a4d3298760c2e7e49595184e1975.svg)

> 본 글은 [Do I need an interface with Spring boot?](https://dimitr.im/spring-interface)을 번역한 글입니다.

> 잘 쓰여진 글을 정리 하는 겸 한글로 공유하고 싶어서 번역했습니다.

## 들어가면서

Spring boot를 사용하다보면, 종종 `service` (`@Service` annotation을 붙인 bean)을 사용하게 된다. 인터넷 상의 많은 예시에서, 사람들이 `service`들을 위해서 `interface`를 사용하는 걸 볼 수 있을것이다. 예를 들어서 , 우리가 todo 어플리케이션을 만든다고 할때, `TodoService`라는 `interface`와 `TodoServiceImpl`이라는 구현체를 만들때가 있다.

이 포스트에서, 우리는 왜 그런 것을 하는지와 필요한가에 대해서 알아볼 것이다.

## 짧은 결론은
짧은 결론은 꽤나 간단하다. **`interface`를 만들 필요가 없다.**  
`service`를 만든다고 하면, class의 자체의 이름을 `TodoService`라고 하고 `autowire`를 통해서 bean들에 주입하면 된다.  
예를 들어서 이런 코드가 있다고 해보자.

```java
@Service
public class TodoService {
    public List<Todo> findAllTodos() {
        // TODO: Implement
        return new ArrayList<>();
    }
}

@Component
public class TodoFacade {
    private TodoService service;
    
    public TodoFacade(TodoService service) {
        this.service = service;
    }
} 
```
위에 있는 예시는 `@Autowired`를 이용한 field injection을 사용하던 생성자 주입을 사용하던간에 **작동**할 것이다.

## 그럼 왜 신경써야할까?
만약, 우리가 그게 필요하지 않다면... 왜 그런 방식(`inteface`를 이용한 방식)을 종종 쓰곤 할까?  
음, 첫 번째 이유는 사실 좀 역사적인것이다. 하지만 그걸 살펴보기 전에 , Spring에서 annotation이 어떻게 작동하는지를 설명해야만 한다.

만약 `@Cacheable`같은 annotation을 사용한다고 하면, cache에서 결과를 얻을것이라고 예상할 수 있다. Spring에서 그것이 작동되는 방식은 bean들을 위한 proxy를 만들고 그 proxy들에 필요한 로직을 추가해주는것이다. 원래 스프링은 JDK dynamic proxies를 사용했다. 이 dynamic proxies는 오직 `interface`들만을 위해서 만들어졌고, 이것이 예전에는 `interface`를 작성해줘야 했던 이유다.

그러나, 10여 년 전부터 , Spring이 CGLIB proxying도 지원하기 시작했다. 이 proxy들은 **별도의** `interface`를 필요로 하지 않는다. 심지어 Spring 3.2 버전부터는 CGLIB가 Spring에 내장되어 있어서 별도로 추가해줄 필요도 없다.

## 느슨한 결합
아마 두 번째 이유는 두 class 간의 느슨한 결합을 만들기 위해서 일 것이다. `interface`를 사용함으로써, `service`에 의존하는 class는 더 이상 `service`의 구현에 의존하지 않게 된다. 이것이 `service`를 독립적으로 사용할 수 있게 해준다. 예를 들어서 이런 코드가 있다.

```java
public interface TodoService {
    List<Todo> findAllTodos();
}

@Service
public class TodoServiceImpl {
    public List<Todo> findAllTodos() {
        // TODO: Implement
        return new ArrayList<>();
    }
}

@Component
public class TodoFacade {
    private TodoService service;
    
    public TodoFacade(TodoService service) {
        this.service = service;
    }
}
```
그러나 위의 예시에서, 개인적인 의견으로 `TodoFacade`와 `TodoServiceImpl`이 함께 한다고 생각한다. 여기서 `interface`를 추가하는건 추가적인 복잡도를 늘릴 수 있다. 개인적으로, 그만한 가치는 없어 보인다.

## 여러 방식의 구현
느슨한 결합이 유용한 부분은 여러 가지 구현체를 가질 때이다. 예를 들어서 TodoService가 두 가지 구현체를 가진다고 해보자. 하나는 todo 리스트를 메모리에서 가져오는 것이고, 하나는 DB와 같은 곳에서 가져오는 것이다.
```java
public interface TodoService {
    List<Todo> findAllTodos();
}

@Service
public class InMemoryTodoServiceImpl implements TodoService {
    public List<Todo> findAllTodos() {
        // TODO: Implement
        return new ArrayList<>();
    }
}

@Service
public class DatabaseTodoServiceImpl implements TodoService {
    public List<Todo> findAllTodos() {
        // TODO: Implement
        return new ArrayList<>();
    }
}

@Component
public class TodoFacade {
    private TodoService service;
    
    public TodoFacade(TodoService service) {
        this.service = service;
    }
}
```
이런 경우에선 느슨한 결합이 매우 유용한데, `TodoFacade`가 todo가 메모리에 저장되어 있는지 DB에 저장되어 있는지 알 필요 없기 때문이다. 그건 `Facade`의 책임이 아니라 어플리케이션 설정의 책임이다.

원하는 것에 따라서 구현방식은 달라진다. 만약에 `TodoFacade`가 모든 구현체를 호출해야 한다면, `collection`을 주입해야 한다.
```java
@Component
public class TodoFacade {
    private List<TodoService> services;
    
    public TodoFacade(TodoService services) {
        this.services = services;
    }
}
```
만약 구현체 중에 하나가 99%의 상황에서 사용되고 나머지들은 아주 특수한 경우에만 사용된다면, `@Primary`를 사용해라.
```java
@Primary
@Service
public class DatabaseTodoServiceImpl implements TodoService {
    public List<Todo> findAllTodos() {
        // TODO: Implement
        return new ArrayList<>();
    }
}
```
`@Primary`를 사용함으로써, Spring container에게 `TodoService`에 의존성 주입을 해야할때, 이 구현체를 사용하라고 알려주는 것이다. 만약 다른 걸 사용해야 한다면, `@Qualifier`를 사용하거나 특정 구현체를 주입함으로써 **명시적으로** 설정해야 한다. 개인적으로 난 이런 방식을 분리된 `@Configuration` class에서 사용하는데, 그렇지 않으면 , `TodoFacade`를 또 다시 구현체에 관한 정보들로 오염시키기 때문이다.

예시 코드를 보자.
```java
@Configuration
public class TodoConfiguration {
    @Bean
    // Using @Qualifier
    public TodoFacade todoFacade(@Qualifier("inMemoryTodoService") TodoService service) {
        return new TodoFacade(service);
    }
    
    @Bean
    // Or by using the specific implementation
    public TodoFacade todoFacade(InMemoryTodoService service) {
        return new TodoFacade(service);
    }
}
```

## 제어의 역전
느슨한 결합의 또 다른 방식은 **IoC** 혹은 **제어의 역전**이다. 개인적으로 서로에게 의존하는 여러 가지 module을 사용할 때 제어의 역전이 유용했다. 예를 들어서 `OrderService`와 `CustomerService`가 있다고 해보자. Customer는 자신의 profile을 삭제할 수 있고 그때 pending 상태의 order들은 취소되어야 한다. `interface` 없이 구현했다면, 이런 방식으로 할것이다.
```java
@Service
public class OrderService {
    public void cancelOrdersForCustomer(ID customerId) {
        // TODO: implement
    }
}

@Service
public class CustomerService {
    private OrderService orderService;
    
    public CustomerService(OrderService orderService) {
        this.orderService = orderService;
    }
    
    public void deleteCustomer(ID customerId) {
        orderService.cancelOrdersForCustomer(customerId);
        // TODO: implement
    }
}
```
이렇게 한다면, 상황은 매우 나빠질 수 있다. 어플리케이션 내부의 domain들이 모두 결합되게 되고, 결과적으로 강하게 결합된 어플리케이션을 만들게 될것이다.

그러는 대신에, `CustomerDeletionListener`라는 `interface`를 만들 수 있다.
```java
public interface CustomerDeletionListener {
    void onDeleteCustomer(ID customerId);
}

@Service
public class CustomerService {
    private List<CustomerDeletionListener> deletionListeners;
    
    public CustomerService(List<CustomerDeletionListener> deletionListeners) {
        this.deletionListeners = deletionListeners;
    }
    
    public void deleteCustomer(ID customerId) {
        deletionListeners.forEach(listener -> listener.onDeleteCustomer(customerId));
        // TODO: implement
    }
}

@Service
public class OrderService {
    public void cancelOrdersForCustomer(ID customerId) {
        // TODO: implement
    }
}

@Component
public class OrderCustomerDeletionListener implements CustomerDeletionListener {
    private OrderService orderService;
    
    public OrderCustomerDeletionListener(OrderService orderService) {
        this.orderService = orderService;
    }
    
    @Override
    public void onDeleteCustomer(ID customerId) {
        orderService.cancelOrdersForCustomer(customerId);
    }
}
```
예시를 보면, 제어의 역전이 일어난 것을 볼 수 있다. 첫 번째 예시에서 우리가 `OrderService` 안에 있는 `cancelOrderForCustomer()`를 바꾸면, `CustomerService` 역시 바뀌어야 한다. 이 말은 `OrderService`가 제어되고 있다는 것을 말한다.

두 번째 예시에서는 `OrderService`가 제어되고 있지 않다. 우리가 `cancelOrderForCustomer()`를 변화시키면, 다른 module의 일부인 오직 `OrderCustomerDeletionListener`만 바뀌어야 한다. 이것은 `CustomerService`가 제어하고 있음을 말한다. 또, 두 `service`들은 느슨하게 결합되어 있기 때문에, 하나가 다른 하나에 직접적으로 의존하고 있지 않다.

비록 두 번째 방법이 복잡도를 더 늘리긴 하지만 (`class`와 `interface`가 각각 한개씩 늘었으니) domain들이 서로 결합되지 않게 해준다. 리팩토링 하기가 쉬워지는 것이다. 이 `listener`는 `event-driven`한 구조로 리팩토링 될 수 있다. domain-driven modular design이나 MSA같은 구조로 리팩토링하기 쉽게 해주는 것이다.

## Test
마지막으로 말하고 싶은 건 테스트다. 몇몇 사람들은 dummy 구현체를 가지기 위해서 (여러 구현체를 가질 수 있으니) `interface`가 필요하다고 주장하곤 한다. 하지만 **Mockito**같은 mocking 라이브러리가 이 문제를 해결해 준다.

단위 테스트를 작성할 때, `MockitoExtension`을 사용할 수 있다.
```java
@ExtendWith(MockitoExtension.class)
public class TodoFacadeTest {
    private TodoFacade facade;
    @Mock
    private TodoService service;
    
    @BeforeEach
    void setUp() {
        this.facade = new TodoFacade(service);
    }
    
    // TODO: implement tests
}
```
이 방법은 `service`가 무엇을 하는지 몰라도 `facade`를 적절히 테스트할 수 있게 해준다. `Mockito.when()`을 사용함으로써 `service` mock이 무엇을 반환하게 하는지 제어할 수 있고, `Mockito.verfiy()`를 사용함으로써 특정 method가 호출되었는지 확인할 수 있다.
예시 코드다.
```java
@Test
void findAll_shouldUseServicefindAllTodos() {
    Todo todo = new Todo();
    when(service.findAllTodos()).thenReturn(todo);
    assertThat(facade.findAll()).containsOnly(todo);
    verify(service).findAllTodos();
}
```
심지어 Spring container를 필요로 하는 통합 테스트를 작성할때도,`@MockBean` annotation을 이용해서 bean들을 mock할 수 있다. 실제 구현체가 있는 package를 탐색하지 않게 해라.
```java
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TodoFacade.class)
public class TodoFacadeTest {
    @Autowired
    private TodoFacade facade;
    @MockBean
    private TodoService service;
}
```
그러니까 대부분의 경우에서, 테스트 할때 `interface`는 필요하지 않다.

## 결론
만약 개인적으로 `interface`를 `serivce`에 사용해야 하냐는 질문을 받는다면, 내 대답은 **아니오**다. 유일한 예외는 제어의 역전을 사용하거나 여러개의 구현체를 신경써야 하는 경우다.

만약의 경우를 위해서 `interface`를 만드는 게 좋지 않겠냐고 생각할 수 있다. 개인적으로 여전히 **아니오**다.  
첫 번째로, "You aren't going to need it"(YAGNI) 라는 원칙을 믿는다. _필요할지도 몰라_ 라는 이유로 복잡성을 높일 이유는 없는데 , 일반적으로 **필요하지 않기** 때문이다.  
두 번째로 필요한 경우라도 전혀 문제 없다. 대부분의 IDE들은 기존의 class에서 method만 추출해서 `interface`를 만들수 있게 해주고, 모든 코드들을 그 `interface`를 사용하게끔 순식간에 만든다.

### 참고하면 좋은 자료
[JDK Dynamic Proxy와 CGLIB의 차이점은 무엇일까?](https://gmoon92.github.io/spring/aop/2019/04/20/jdk-dynamic-proxy-and-cglib.html)
[퍼사드 패턴](https://jusungpark.tistory.com/23)
[느슨한 결합 vs 긴밀한 결합](https://swk3169.tistory.com/185)
[How Mockito Works?](https://medium.com/@gorali/how-mockito-works-7d3a2c77da71)
[소프트웨어 개발 3대 원칙 : KISS,YAGNI,DRY](https://blog.naver.com/PostView.nhn?isHttpsRedirect=true&blogId=complusblog&logNo=221163007357&redirect=Dlog&widgetTypeCall=true&directAccess=false)

> 스프링 부트에 `interface`가 필요한가에 대해서는 당연히 **YES**지만 이 글에선 **`service`에 `interface`** 가 필요한지, 정확히 말하면 `service`의 구현체가 필요한지에 대해서 논하고 있습니다.

> 프로젝트를 시작하면서 Spring boot에서 구현체와 인터페이스를 구분해야하는지 고민이 많았는데 꽤나 자세하고 명쾌해서 도움이 되었습니다.

>소프트웨어공학 수업에서 배운 YAGNI를 실제로 보니까 반갑네요. 그냥 무지성으로 외웠는데..

```toc

```
