---
emoji: ๐
title: Spring Boot์์ interface๋ฅผ ์ฌ์ฉํด์ผ ํ ๊น? (Do I need an interface with Spring boot?)
date: '2021-07-15 00:00:00'
author: weasel
tags: Spring SpringBoot interface
categories: Spring
---
![](./spring-logo-9146a4d3298760c2e7e49595184e1975.svg)

> ๋ณธ ๊ธ์ [Do I need an interface with Spring boot?](https://dimitr.im/spring-interface)์ ๋ฒ์ญํ ๊ธ์๋๋ค.

> ์ ์ฐ์ฌ์ง ๊ธ์ ์ ๋ฆฌ ํ๋ ๊ฒธ ํ๊ธ๋ก ๊ณต์ ํ๊ณ  ์ถ์ด์ ๋ฒ์ญํ์ต๋๋ค.

## ๋ค์ด๊ฐ๋ฉด์

Spring boot๋ฅผ ์ฌ์ฉํ๋ค๋ณด๋ฉด, ์ข์ข `service` (`@Service` annotation์ ๋ถ์ธ bean)์ ์ฌ์ฉํ๊ฒ ๋๋ค. ์ธํฐ๋ท ์์ ๋ง์ ์์์์, ์ฌ๋๋ค์ด `service`๋ค์ ์ํด์ `interface`๋ฅผ ์ฌ์ฉํ๋ ๊ฑธ ๋ณผ ์ ์์๊ฒ์ด๋ค. ์๋ฅผ ๋ค์ด์ , ์ฐ๋ฆฌ๊ฐ todo ์ดํ๋ฆฌ์ผ์ด์์ ๋ง๋ ๋ค๊ณ  ํ ๋, `TodoService`๋ผ๋ `interface`์ `TodoServiceImpl`์ด๋ผ๋ ๊ตฌํ์ฒด๋ฅผ ๋ง๋ค๋๊ฐ ์๋ค.

์ด ํฌ์คํธ์์, ์ฐ๋ฆฌ๋ ์ ๊ทธ๋ฐ ๊ฒ์ ํ๋์ง์ ํ์ํ๊ฐ์ ๋ํด์ ์์๋ณผ ๊ฒ์ด๋ค.

## ์งง์ ๊ฒฐ๋ก ์
์งง์ ๊ฒฐ๋ก ์ ๊ฝค๋ ๊ฐ๋จํ๋ค. **`interface`๋ฅผ ๋ง๋ค ํ์๊ฐ ์๋ค.**  
`service`๋ฅผ ๋ง๋ ๋ค๊ณ  ํ๋ฉด, class์ ์์ฒด์ ์ด๋ฆ์ `TodoService`๋ผ๊ณ  ํ๊ณ  `autowire`๋ฅผ ํตํด์ bean๋ค์ ์ฃผ์ํ๋ฉด ๋๋ค.  
์๋ฅผ ๋ค์ด์ ์ด๋ฐ ์ฝ๋๊ฐ ์๋ค๊ณ  ํด๋ณด์.

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
์์ ์๋ ์์๋ `@Autowired`๋ฅผ ์ด์ฉํ field injection์ ์ฌ์ฉํ๋ ์์ฑ์ ์ฃผ์์ ์ฌ์ฉํ๋๊ฐ์ **์๋**ํ  ๊ฒ์ด๋ค.

## ๊ทธ๋ผ ์ ์ ๊ฒฝ์จ์ผํ ๊น?
๋ง์ฝ, ์ฐ๋ฆฌ๊ฐ ๊ทธ๊ฒ ํ์ํ์ง ์๋ค๋ฉด... ์ ๊ทธ๋ฐ ๋ฐฉ์(`inteface`๋ฅผ ์ด์ฉํ ๋ฐฉ์)์ ์ข์ข ์ฐ๊ณค ํ ๊น?  
์, ์ฒซ ๋ฒ์งธ ์ด์ ๋ ์ฌ์ค ์ข ์ญ์ฌ์ ์ธ๊ฒ์ด๋ค. ํ์ง๋ง ๊ทธ๊ฑธ ์ดํด๋ณด๊ธฐ ์ ์ , Spring์์ annotation์ด ์ด๋ป๊ฒ ์๋ํ๋์ง๋ฅผ ์ค๋ชํด์ผ๋ง ํ๋ค.

๋ง์ฝ `@Cacheable`๊ฐ์ annotation์ ์ฌ์ฉํ๋ค๊ณ  ํ๋ฉด, cache์์ ๊ฒฐ๊ณผ๋ฅผ ์ป์๊ฒ์ด๋ผ๊ณ  ์์ํ  ์ ์๋ค. Spring์์ ๊ทธ๊ฒ์ด ์๋๋๋ ๋ฐฉ์์ bean๋ค์ ์ํ proxy๋ฅผ ๋ง๋ค๊ณ  ๊ทธ proxy๋ค์ ํ์ํ ๋ก์ง์ ์ถ๊ฐํด์ฃผ๋๊ฒ์ด๋ค. ์๋ ์คํ๋ง์ JDK dynamic proxies๋ฅผ ์ฌ์ฉํ๋ค. ์ด dynamic proxies๋ ์ค์ง `interface`๋ค๋ง์ ์ํด์ ๋ง๋ค์ด์ก๊ณ , ์ด๊ฒ์ด ์์ ์๋ `interface`๋ฅผ ์์ฑํด์ค์ผ ํ๋ ์ด์ ๋ค.

๊ทธ๋ฌ๋, 10์ฌ ๋ ์ ๋ถํฐ , Spring์ด CGLIB proxying๋ ์ง์ํ๊ธฐ ์์ํ๋ค. ์ด proxy๋ค์ **๋ณ๋์** `interface`๋ฅผ ํ์๋ก ํ์ง ์๋๋ค. ์ฌ์ง์ด Spring 3.2 ๋ฒ์ ๋ถํฐ๋ CGLIB๊ฐ Spring์ ๋ด์ฅ๋์ด ์์ด์ ๋ณ๋๋ก ์ถ๊ฐํด์ค ํ์๋ ์๋ค.

## ๋์จํ ๊ฒฐํฉ
์๋ง ๋ ๋ฒ์งธ ์ด์ ๋ ๋ class ๊ฐ์ ๋์จํ ๊ฒฐํฉ์ ๋ง๋ค๊ธฐ ์ํด์ ์ผ ๊ฒ์ด๋ค. `interface`๋ฅผ ์ฌ์ฉํจ์ผ๋ก์จ, `service`์ ์์กดํ๋ class๋ ๋ ์ด์ `service`์ ๊ตฌํ์ ์์กดํ์ง ์๊ฒ ๋๋ค. ์ด๊ฒ์ด `service`๋ฅผ ๋๋ฆฝ์ ์ผ๋ก ์ฌ์ฉํ  ์ ์๊ฒ ํด์ค๋ค. ์๋ฅผ ๋ค์ด์ ์ด๋ฐ ์ฝ๋๊ฐ ์๋ค.

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
๊ทธ๋ฌ๋ ์์ ์์์์, ๊ฐ์ธ์ ์ธ ์๊ฒฌ์ผ๋ก `TodoFacade`์ `TodoServiceImpl`์ด ํจ๊ป ํ๋ค๊ณ  ์๊ฐํ๋ค. ์ฌ๊ธฐ์ `interface`๋ฅผ ์ถ๊ฐํ๋๊ฑด ์ถ๊ฐ์ ์ธ ๋ณต์ก๋๋ฅผ ๋๋ฆด ์ ์๋ค. ๊ฐ์ธ์ ์ผ๋ก, ๊ทธ๋งํ ๊ฐ์น๋ ์์ด ๋ณด์ธ๋ค.

## ์ฌ๋ฌ ๋ฐฉ์์ ๊ตฌํ
๋์จํ ๊ฒฐํฉ์ด ์ ์ฉํ ๋ถ๋ถ์ ์ฌ๋ฌ ๊ฐ์ง ๊ตฌํ์ฒด๋ฅผ ๊ฐ์ง ๋์ด๋ค. ์๋ฅผ ๋ค์ด์ TodoService๊ฐ ๋ ๊ฐ์ง ๊ตฌํ์ฒด๋ฅผ ๊ฐ์ง๋ค๊ณ  ํด๋ณด์. ํ๋๋ todo ๋ฆฌ์คํธ๋ฅผ ๋ฉ๋ชจ๋ฆฌ์์ ๊ฐ์ ธ์ค๋ ๊ฒ์ด๊ณ , ํ๋๋ DB์ ๊ฐ์ ๊ณณ์์ ๊ฐ์ ธ์ค๋ ๊ฒ์ด๋ค.
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
์ด๋ฐ ๊ฒฝ์ฐ์์  ๋์จํ ๊ฒฐํฉ์ด ๋งค์ฐ ์ ์ฉํ๋ฐ, `TodoFacade`๊ฐ todo๊ฐ ๋ฉ๋ชจ๋ฆฌ์ ์ ์ฅ๋์ด ์๋์ง DB์ ์ ์ฅ๋์ด ์๋์ง ์ ํ์ ์๊ธฐ ๋๋ฌธ์ด๋ค. ๊ทธ๊ฑด `Facade`์ ์ฑ์์ด ์๋๋ผ ์ดํ๋ฆฌ์ผ์ด์ ์ค์ ์ ์ฑ์์ด๋ค.

์ํ๋ ๊ฒ์ ๋ฐ๋ผ์ ๊ตฌํ๋ฐฉ์์ ๋ฌ๋ผ์ง๋ค. ๋ง์ฝ์ `TodoFacade`๊ฐ ๋ชจ๋  ๊ตฌํ์ฒด๋ฅผ ํธ์ถํด์ผ ํ๋ค๋ฉด, `collection`์ ์ฃผ์ํด์ผ ํ๋ค.
```java
@Component
public class TodoFacade {
    private List<TodoService> services;
    
    public TodoFacade(TodoService services) {
        this.services = services;
    }
}
```
๋ง์ฝ ๊ตฌํ์ฒด ์ค์ ํ๋๊ฐ 99%์ ์ํฉ์์ ์ฌ์ฉ๋๊ณ  ๋๋จธ์ง๋ค์ ์์ฃผ ํน์ํ ๊ฒฝ์ฐ์๋ง ์ฌ์ฉ๋๋ค๋ฉด, `@Primary`๋ฅผ ์ฌ์ฉํด๋ผ.
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
`@Primary`๋ฅผ ์ฌ์ฉํจ์ผ๋ก์จ, Spring container์๊ฒ `TodoService`์ ์์กด์ฑ ์ฃผ์์ ํด์ผํ ๋, ์ด ๊ตฌํ์ฒด๋ฅผ ์ฌ์ฉํ๋ผ๊ณ  ์๋ ค์ฃผ๋ ๊ฒ์ด๋ค. ๋ง์ฝ ๋ค๋ฅธ ๊ฑธ ์ฌ์ฉํด์ผ ํ๋ค๋ฉด, `@Qualifier`๋ฅผ ์ฌ์ฉํ๊ฑฐ๋ ํน์  ๊ตฌํ์ฒด๋ฅผ ์ฃผ์ํจ์ผ๋ก์จ **๋ช์์ ์ผ๋ก** ์ค์ ํด์ผ ํ๋ค. ๊ฐ์ธ์ ์ผ๋ก ๋ ์ด๋ฐ ๋ฐฉ์์ ๋ถ๋ฆฌ๋ `@Configuration` class์์ ์ฌ์ฉํ๋๋ฐ, ๊ทธ๋ ์ง ์์ผ๋ฉด , `TodoFacade`๋ฅผ ๋ ๋ค์ ๊ตฌํ์ฒด์ ๊ดํ ์ ๋ณด๋ค๋ก ์ค์ผ์ํค๊ธฐ ๋๋ฌธ์ด๋ค.

์์ ์ฝ๋๋ฅผ ๋ณด์.
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

## ์ ์ด์ ์ญ์ 
๋์จํ ๊ฒฐํฉ์ ๋ ๋ค๋ฅธ ๋ฐฉ์์ **IoC** ํน์ **์ ์ด์ ์ญ์ **์ด๋ค. ๊ฐ์ธ์ ์ผ๋ก ์๋ก์๊ฒ ์์กดํ๋ ์ฌ๋ฌ ๊ฐ์ง module์ ์ฌ์ฉํ  ๋ ์ ์ด์ ์ญ์ ์ด ์ ์ฉํ๋ค. ์๋ฅผ ๋ค์ด์ `OrderService`์ `CustomerService`๊ฐ ์๋ค๊ณ  ํด๋ณด์. Customer๋ ์์ ์ profile์ ์ญ์ ํ  ์ ์๊ณ  ๊ทธ๋ pending ์ํ์ order๋ค์ ์ทจ์๋์ด์ผ ํ๋ค. `interface` ์์ด ๊ตฌํํ๋ค๋ฉด, ์ด๋ฐ ๋ฐฉ์์ผ๋ก ํ ๊ฒ์ด๋ค.
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
์ด๋ ๊ฒ ํ๋ค๋ฉด, ์ํฉ์ ๋งค์ฐ ๋๋น ์ง ์ ์๋ค. ์ดํ๋ฆฌ์ผ์ด์ ๋ด๋ถ์ domain๋ค์ด ๋ชจ๋ ๊ฒฐํฉ๋๊ฒ ๋๊ณ , ๊ฒฐ๊ณผ์ ์ผ๋ก ๊ฐํ๊ฒ ๊ฒฐํฉ๋ ์ดํ๋ฆฌ์ผ์ด์์ ๋ง๋ค๊ฒ ๋ ๊ฒ์ด๋ค.

๊ทธ๋ฌ๋ ๋์ ์, `CustomerDeletionListener`๋ผ๋ `interface`๋ฅผ ๋ง๋ค ์ ์๋ค.
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
์์๋ฅผ ๋ณด๋ฉด, ์ ์ด์ ์ญ์ ์ด ์ผ์ด๋ ๊ฒ์ ๋ณผ ์ ์๋ค. ์ฒซ ๋ฒ์งธ ์์์์ ์ฐ๋ฆฌ๊ฐ `OrderService` ์์ ์๋ `cancelOrderForCustomer()`๋ฅผ ๋ฐ๊พธ๋ฉด, `CustomerService` ์ญ์ ๋ฐ๋์ด์ผ ํ๋ค. ์ด ๋ง์ `OrderService`๊ฐ ์ ์ด๋๊ณ  ์๋ค๋ ๊ฒ์ ๋งํ๋ค.

๋ ๋ฒ์งธ ์์์์๋ `OrderService`๊ฐ ์ ์ด๋๊ณ  ์์ง ์๋ค. ์ฐ๋ฆฌ๊ฐ `cancelOrderForCustomer()`๋ฅผ ๋ณํ์ํค๋ฉด, ๋ค๋ฅธ module์ ์ผ๋ถ์ธ ์ค์ง `OrderCustomerDeletionListener`๋ง ๋ฐ๋์ด์ผ ํ๋ค. ์ด๊ฒ์ `CustomerService`๊ฐ ์ ์ดํ๊ณ  ์์์ ๋งํ๋ค. ๋, ๋ `service`๋ค์ ๋์จํ๊ฒ ๊ฒฐํฉ๋์ด ์๊ธฐ ๋๋ฌธ์, ํ๋๊ฐ ๋ค๋ฅธ ํ๋์ ์ง์ ์ ์ผ๋ก ์์กดํ๊ณ  ์์ง ์๋ค.

๋น๋ก ๋ ๋ฒ์งธ ๋ฐฉ๋ฒ์ด ๋ณต์ก๋๋ฅผ ๋ ๋๋ฆฌ๊ธด ํ์ง๋ง (`class`์ `interface`๊ฐ ๊ฐ๊ฐ ํ๊ฐ์ฉ ๋์์ผ๋) domain๋ค์ด ์๋ก ๊ฒฐํฉ๋์ง ์๊ฒ ํด์ค๋ค. ๋ฆฌํฉํ ๋ง ํ๊ธฐ๊ฐ ์ฌ์์ง๋ ๊ฒ์ด๋ค. ์ด `listener`๋ `event-driven`ํ ๊ตฌ์กฐ๋ก ๋ฆฌํฉํ ๋ง ๋  ์ ์๋ค. domain-driven modular design์ด๋ MSA๊ฐ์ ๊ตฌ์กฐ๋ก ๋ฆฌํฉํ ๋งํ๊ธฐ ์ฝ๊ฒ ํด์ฃผ๋ ๊ฒ์ด๋ค.

## Test
๋ง์ง๋ง์ผ๋ก ๋งํ๊ณ  ์ถ์ ๊ฑด ํ์คํธ๋ค. ๋ช๋ช ์ฌ๋๋ค์ dummy ๊ตฌํ์ฒด๋ฅผ ๊ฐ์ง๊ธฐ ์ํด์ (์ฌ๋ฌ ๊ตฌํ์ฒด๋ฅผ ๊ฐ์ง ์ ์์ผ๋) `interface`๊ฐ ํ์ํ๋ค๊ณ  ์ฃผ์ฅํ๊ณค ํ๋ค. ํ์ง๋ง **Mockito**๊ฐ์ mocking ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ ์ด ๋ฌธ์ ๋ฅผ ํด๊ฒฐํด ์ค๋ค.

๋จ์ ํ์คํธ๋ฅผ ์์ฑํ  ๋, `MockitoExtension`์ ์ฌ์ฉํ  ์ ์๋ค.
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
์ด ๋ฐฉ๋ฒ์ `service`๊ฐ ๋ฌด์์ ํ๋์ง ๋ชฐ๋ผ๋ `facade`๋ฅผ ์ ์ ํ ํ์คํธํ  ์ ์๊ฒ ํด์ค๋ค. `Mockito.when()`์ ์ฌ์ฉํจ์ผ๋ก์จ `service` mock์ด ๋ฌด์์ ๋ฐํํ๊ฒ ํ๋์ง ์ ์ดํ  ์ ์๊ณ , `Mockito.verfiy()`๋ฅผ ์ฌ์ฉํจ์ผ๋ก์จ ํน์  method๊ฐ ํธ์ถ๋์๋์ง ํ์ธํ  ์ ์๋ค.
์์ ์ฝ๋๋ค.
```java
@Test
void findAll_shouldUseServicefindAllTodos() {
    Todo todo = new Todo();
    when(service.findAllTodos()).thenReturn(todo);
    assertThat(facade.findAll()).containsOnly(todo);
    verify(service).findAllTodos();
}
```
์ฌ์ง์ด Spring container๋ฅผ ํ์๋ก ํ๋ ํตํฉ ํ์คํธ๋ฅผ ์์ฑํ ๋๋,`@MockBean` annotation์ ์ด์ฉํด์ bean๋ค์ mockํ  ์ ์๋ค. ์ค์  ๊ตฌํ์ฒด๊ฐ ์๋ package๋ฅผ ํ์ํ์ง ์๊ฒ ํด๋ผ.
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
๊ทธ๋ฌ๋๊น ๋๋ถ๋ถ์ ๊ฒฝ์ฐ์์, ํ์คํธ ํ ๋ `interface`๋ ํ์ํ์ง ์๋ค.

## ๊ฒฐ๋ก 
๋ง์ฝ ๊ฐ์ธ์ ์ผ๋ก `interface`๋ฅผ `serivce`์ ์ฌ์ฉํด์ผ ํ๋๋ ์ง๋ฌธ์ ๋ฐ๋๋ค๋ฉด, ๋ด ๋๋ต์ **์๋์ค**๋ค. ์ ์ผํ ์์ธ๋ ์ ์ด์ ์ญ์ ์ ์ฌ์ฉํ๊ฑฐ๋ ์ฌ๋ฌ๊ฐ์ ๊ตฌํ์ฒด๋ฅผ ์ ๊ฒฝ์จ์ผ ํ๋ ๊ฒฝ์ฐ๋ค.

๋ง์ฝ์ ๊ฒฝ์ฐ๋ฅผ ์ํด์ `interface`๋ฅผ ๋ง๋๋ ๊ฒ ์ข์ง ์๊ฒ ๋๊ณ  ์๊ฐํ  ์ ์๋ค. ๊ฐ์ธ์ ์ผ๋ก ์ฌ์ ํ **์๋์ค**๋ค.  
์ฒซ ๋ฒ์งธ๋ก, "You aren't going to need it"(YAGNI) ๋ผ๋ ์์น์ ๋ฏฟ๋๋ค. _ํ์ํ ์ง๋ ๋ชฐ๋ผ_ ๋ผ๋ ์ด์ ๋ก ๋ณต์ก์ฑ์ ๋์ผ ์ด์ ๋ ์๋๋ฐ , ์ผ๋ฐ์ ์ผ๋ก **ํ์ํ์ง ์๊ธฐ** ๋๋ฌธ์ด๋ค.  
๋ ๋ฒ์งธ๋ก ํ์ํ ๊ฒฝ์ฐ๋ผ๋ ์ ํ ๋ฌธ์  ์๋ค. ๋๋ถ๋ถ์ IDE๋ค์ ๊ธฐ์กด์ class์์ method๋ง ์ถ์ถํด์ `interface`๋ฅผ ๋ง๋ค์ ์๊ฒ ํด์ฃผ๊ณ , ๋ชจ๋  ์ฝ๋๋ค์ ๊ทธ `interface`๋ฅผ ์ฌ์ฉํ๊ฒ๋ ์์๊ฐ์ ๋ง๋ ๋ค.

### ์ฐธ๊ณ ํ๋ฉด ์ข์ ์๋ฃ
[JDK Dynamic Proxy์ CGLIB์ ์ฐจ์ด์ ์ ๋ฌด์์ผ๊น?](https://gmoon92.github.io/spring/aop/2019/04/20/jdk-dynamic-proxy-and-cglib.html)
[ํผ์ฌ๋ ํจํด](https://jusungpark.tistory.com/23)
[๋์จํ ๊ฒฐํฉ vs ๊ธด๋ฐํ ๊ฒฐํฉ](https://swk3169.tistory.com/185)
[How Mockito Works?](https://medium.com/@gorali/how-mockito-works-7d3a2c77da71)
[์ํํธ์จ์ด ๊ฐ๋ฐ 3๋ ์์น : KISS,YAGNI,DRY](https://blog.naver.com/PostView.nhn?isHttpsRedirect=true&blogId=complusblog&logNo=221163007357&redirect=Dlog&widgetTypeCall=true&directAccess=false)

> ์คํ๋ง ๋ถํธ์ `interface`๊ฐ ํ์ํ๊ฐ์ ๋ํด์๋ ๋น์ฐํ **YES**์ง๋ง ์ด ๊ธ์์  **`service`์ `interface`** ๊ฐ ํ์ํ์ง, ์ ํํ ๋งํ๋ฉด `service`์ ๊ตฌํ์ฒด๊ฐ ํ์ํ์ง์ ๋ํด์ ๋ผํ๊ณ  ์์ต๋๋ค.

> ํ๋ก์ ํธ๋ฅผ ์์ํ๋ฉด์ Spring boot์์ ๊ตฌํ์ฒด์ ์ธํฐํ์ด์ค๋ฅผ ๊ตฌ๋ถํด์ผํ๋์ง ๊ณ ๋ฏผ์ด ๋ง์๋๋ฐ ๊ฝค๋ ์์ธํ๊ณ  ๋ช์พํด์ ๋์์ด ๋์์ต๋๋ค.

>์ํํธ์จ์ด๊ณตํ ์์์์ ๋ฐฐ์ด YAGNI๋ฅผ ์ค์ ๋ก ๋ณด๋๊น ๋ฐ๊ฐ๋ค์. ๊ทธ๋ฅ ๋ฌด์ง์ฑ์ผ๋ก ์ธ์ ๋๋ฐ..

```toc

```
