---
emoji: ๐
title: Spring MVC - HandlerMapping์ ๋์๋ฐฉ์ ์ดํดํ๊ธฐ 1ํธ
date: '2021-06-09 00:00:00'
author: weasel
tags: Spring handlerMapping
categories: Spring
---
![](./image.png)

>๊ธ์ด ๋งค์ฐ ๋ณต์กํ๊ณ  ๊น๋๋ค. ์ํด ๋ถํ๋๋ฆฝ๋๋ค.

>ํ๋ฆฐ ์ ๋ณด๋ ์ดํด๊ฐ ๊ฐ์ง ์๋ ๋ถ๋ถ์ ๋๊ธ ๋จ๊ฒจ์ฃผ์๋ฉด ์ฐธ๊ณ ํ๊ฒ ์ต๋๋ค.

### HandlerMapping์ ์ญํ 
Spring MVC์ ๋ํด์ ๊ณต๋ถํ๋ ์ค, `HandlerMapping`์ด request๋ฅผ ์ฒ๋ฆฌํ๊ธฐ์ ์ ์ ํ handler๋ฅผ ์ฐพ์์จ๋ค๋ ์ค๋ช์ ๋ค์๋ค.
์ข ๋ ์ฐพ์๋ณด๋ _`HandlerMapping`์ **request์ URL๊ณผ ๋งค์นญ๋๋ handler**๋ฅผ ์ ํํ๋ ์ญํ ์ ์ํํ๋ค_ ๋ ๊ฒ์ ๋ณด์๋ค. 

request์ URL๋ง ๋ณด๊ณ  ์ด๋ป๊ฒ ์ฐพ์์จ๋ค๋ ๊ฒ์ผ๊น? ๊ทธ๋ฆฌ๊ณ  _์ฐพ์์ง_ handler๋ method์ธ๋ฐ ์ด๋ ํ ๋ฐฉ์์ผ๋ก ๊ฐ์ ธ์จ๋ค๋ ๊ฒ์ผ๊น?

ํ๊ฐ์ง๋ง ๊ธฐ์ตํ๊ณ  ๊ฐ์. 
**HandlerMapping์ ์ํ๋ handler๋ฅผ ์ฐพ์์ค๋ ์ญํ ์ ์ํํ๋ค.**

### Spring MVC Request flow
`HandlerMapping`์ ์ญํ ์ ๋ํด์ ์ดํด๋ณด๊ธฐ ์ ์ Spring MVC์์ request๊ฐ ์ด๋ ํ ์์๋ก ์ฒ๋ฆฌ๋๋์ง ๋จผ์  ๋ณด์์ผ ํ๋ค.
![์ฒ๋ฆฌ ์์](https://images.velog.io/images/hsw0194/post/8e1df081-c5d5-4c7c-8a33-699b3d6f6e9e/image.png)

1. ๋จผ์  `front-controller`์ ์ญํ ์ ํ๋ `DispatcherServlet`์ด request๋ฅผ ๋ฐ๋๋ค.
2. **`DispatcherServlet`์ ์ ์ ํ controller๋ฅผ ์ ํํ๋ ์ผ์ `HandlerMapping`์๊ฒ ์์ฒญํ๋ค.**
3. **`HandlerMapping`์ ์ ํฉํ controller๋ฅผ ์ ํํ๋ค.**
3. `DispatcherServlet`์ ์ ํ๋ controller์ ๋น์ฆ๋์ค ๋ก์ง ์คํ ์์์ `HandlerAdapter`์๊ฒ ์์ํ๋ค.
4. `HandlerAdpater`๊ฐ controller์ ๋น์ฆ๋์ค ๋ก์ง์ ํธ์ถํ๊ณ  ๊ฒฐ๊ณผ๋ฅผ `ModelAndView` ๊ฐ์ฒด์ ๋ด์์ `DispatcherServlet`์ด ์๊ฒ returnํ๋ค.
5. `DispatcherServlet`์ด `ViewResolver`๋ฅผ ์ด์ฉํ์ฌ ๊ฒฐ๊ณผ๋ฅผ ๋ณด์ฌ์ค View๋ฅผ ๊ฐ์ ธ์จ๋ค.
6. View ๊ฐ์ฒด์๊ฒ `DispatcherServlet`์ด ์๋ต ๊ฒฐ๊ณผ ์์ฑ์ ์์ฒญํ๋ค.

์ด ๊ธด ๊ณผ์  ์์์ ์ด ๊ธ์์ ์ดํด๋ณผ ๊ณผ์ ์ 2,3๋ฒ์ด๋ค. Request flow ์์๋๋ก `HandlerMapping`์ ๋ํด์ ์์๋ณผ ๊ฒ์ด๋ค.

### DispatcherServlet
๋จผ์  `DispatcherServlet`์์ ๋ถํฐ ์ถ๋ฐํด์ผํ๋ค. ์์๊ตฌ์กฐ๋ถํฐ ๋ณด๋ฉด,
```java
public class DispatcherServlet extends FrameworkServlet
			โ
public abstract class FrameworkServlet extends HttpServletBean implements ApplicationContextAware
			โ
public abstract class HttpServletBean extends HttpServlet
			โ
public abstract class HttpServlet extends GenericServlet
```
์ด๋ ๊ฒ ์์๊ตฌ์กฐ๋ฅผ ํตํด `DispatcherServlet`์ ๊ฒฐ๊ตญ `HttpServlet`์ ์์ํจ์ ์ ์ ์๋ค. 
๊ทธ๋ ๊ธฐ ๋๋ฌธ์ `DispatcherServlet`๋ `Servlet`์ ์๋ช์ฃผ๊ธฐ์ ๋น์ทํ๊ฒ ํ๋ฌ๊ฐ์ ์ ์ ์๋ค. (`init(),doGet(),doPost(),service() ๋ฑ๋ฑ`)

์ค์ ๋ก ๋๋ฒ๊น์ ํด๋ณด๋ฉด, `doService`๊ฐ ํธ์ถ๋๋ค. ๊ทธ ํ `DispatcherServlet`์ `front-controller` ์ญํ ์ ํ๊ธฐ ๋๋ฌธ์ `doDispatch`๋ฅผ ํธ์ถํ๋ค.
```java
protected void doService(HttpServletRequest request, HttpServletResponse response) throws Exception {
...
...
	try {
	doDispatch(request, response);
	}
...
...
}
```
`doDispatch`์ javadoc์ ๋ณด๋ฉด Servlet์ `HandlerMapping`์ ์์๋๋ก ์ฒ๋ฆฌํ์ฌ handler๋ฅผ ๊ฐ์ ธ์จ๋ค๊ณ  ๋์ด์๋ค.

>Process the actual dispatching to the handler. The handler will be obtained by applying the servlet's HandlerMappings in order. The HandlerAdapter will be obtained by querying the servlet's installed HandlerAdapters to find the first that supports the handler class.

`doDispatch`์ ์ค์  ์ฝ๋๋ฅผ ๋ณด๋ฉด ์๋์ฒ๋ผ request์ ๋ํด์ handler๋ฅผ ๊ฐ์ ธ์ค๋ `getHandler` ํจ์๋ฅผ ํธ์ถํ๊ณ  ์๋ค.
```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
...
...
	try {
	...
        // Determine handler for the current request.
	mappedHandler = getHandler(processedRequest);
	...
...
...
```
`getHandler` ํจ์๋ `DispatcherServlet`์ method๋ก ์๋์ ๊ฐ๋ค. ์ด๊ฒ ์ค์ ๋ก ์ ์ ํ handler๋ฅผ ๊ฐ์ ธ์ค๋ ๋ฐฉ์์ธ๋ฐ ์ ํ ๊ฐ์ด ์์จ๋ค. ํ๋ํ๋ ํ์ดํด๋ณด์.
```java
@Nullable
protected HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception {
  if (this.handlerMappings != null) {
    for (HandlerMapping mapping : this.handlerMappings) {
      HandlerExecutionChain handler = mapping.getHandler(request);
      if (handler != null) {
        return handler;
      }
    }
  }
  return null;
}
```

>`DispathcerServlet`์ ์ฒ์ `init`๋๋ ๊ณผ์ ์์ ์ฌ๋ฌ๊ฐ์ง `handlerMapping`๋ค์ ๋ฑ๋กํ๊ณ  `List`๋ฅผ ํตํด `handlerMappings`๋ผ๋ ์ด๋ฆ์ผ๋ก ๊ด๋ฆฌํ๊ณ  ์๋ค. `handelrMappings`์์๋ ์ฌ๋ฌ๊ฐ์ง `handlerMapping`๋ค์ด ๋ฑ๋ก๋์ด ์๋ ๊ฒ์ด๋ค. 

๊ทธ๋ฌ๋ฏ๋ก ์๋ ์ฝ๋๋ _`DispatcherServlet` ์์ `handlerMapping`๋ค์ด ๋ฑ๋ก๋์๋ค๋ฉด_ ์ด๋ผ๋ ๋ป์ด๋ค.
```java
if(this.handlerMappings!=null)
```

๋ฑ๋ก๋์ด์๋ `HandlerMapping`๋ค์ loop ํ๋ฉด์
```java
for(HandlerMapping mapping : this.handlerMappings){

```

**`HandlerMapping`๋ค์๊ฒ request์ ๋ง๋ handler๋ฅผ ๊ฐ์ ธ์ค๊ฒํ๊ณ ,๊ฐ์ ธ์๋ค๋ฉด ๊ทธ handler๋ฅผ return**ํ๋๊ฒ์ด๋ค.
```java
  HandlerExecutionChain handler=mapping.getHandler(request);
  if (handler!=null)
    return handler;
```

ํต์ฌ ๋ถ๋ถ์ **`HandlerMapping`์๊ฒ request์ ๋ง๋ handler๋ฅผ ๊ฐ์ ธ์ค๋** ๋ถ๋ถ์ด๋ค. ์ด๊ฒ ๊ถ๊ธํด์ ์ด ๋จผ ๊ธธ์ ๋์์จ ๊ฒ์ด๋ค.

`DispatcherServlet`๋ถ๋ถ์ ๋ด์ฉ์ ์ ๋ฆฌํ์๋ฉด,
1.`doService`์ด ํธ์ถ๋๋ค.
2.`doService`๋ด์์ `doDispatch`๊ฐ ํธ์ถ๋๋ค.
3.`doDispatch`๋ด์์ `getHandler`๊ฐ ํธ์ถ๋๋ค.
4.`getHandler`๋ด์์ ๋ฑ๋ก๋ `HandlerMapping` ์ค์์ request์ ๊ฑธ๋ง๋ handler๋ฅผ ๊ฐ์ ธ์จ๋ค.

>์ด์  ๊ฑฐ์ ๋ค์๋ค.


### HandlerMapping์ด handler๋ฅผ ๊ฐ์ ธ์ค๋ ๊ณผ์ 
`HandlerMapping`์ `interface`๋ก ํจ์์ ์ ์ธ๋ถ๋ง ๊ฐ์ง๊ณ  ์๋ค.
```java
public interface HandlerMapping {
	HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception;
}
```
์ค์ ๋ก handler๋ฅผ ๊ฐ์ ธ์ค๋ `getHandler`๋ ์ถ์ ํด๋์ค์ธ `AbstractHandlerMapping`์ ์ ์๋์ด ์๋ค.
์ฐ๋ฆฌ๊ฐ ํํ ์๋ `RequestMappingHandlerMapping,SimpleUrlHandlerMapping` ๊ฐ์ ๊ฒ๋ค์ ๋ถ๋ชจ(_๋ฐ๋ก ์๋จ๊ณ๋ ์๋์ง๋ง_)๊ฐ `AbstratHandlerMapping`์ด๋ค.

์๋๋ `AbstractHandlerMapping`์ `getHandler` ์ฝ๋์ด๋ค. 
`getHandlerInternal`์ ํตํด์ handler์ ์ฐพ์์ค๊ณ , `HandlerExecutionChain`์ returnํ๋๋ฐ,์ฐ๋ฆฌ๊ฐ ์ํ๋๊ฑด handler๋ฅผ ์ฐพ์์ค๋ ๋ฐฉ์์ด๋ฏ๋ก `getHandlerInternal`์ ๋ด์ผ๊ฒ ๋ค.
> `HandlerExecutionChain`์ ๊ฐ๋จํ๊ฒ handler์ handler interceptor๋ค์ ๋ชจ์๋์ ๊ฒ์ด๋ค.
>Handler execution chain, consisting of handler object and any handler interceptors. 

```java
public final HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception {
  Object handler = getHandlerInternal(request);
  ...
  HandlerExecutionChain executionChain = getHandlerExecutionChain(handler, request);
  ...
  return executionChain;
}
```

`getHandlerInternal`์ `AbstractHandlerMapping`์ ์์ํ `AbstractHandlerMethodMapping`์ ์ ์๋์ด ์๋ค. 
`AbstractHandlerMethodMapping`์ ๋ณต์กํ์ง๋ง ์ด๋ฐ ๊ตฌ์กฐ๋ฅผ ๊ฐ์ง๊ณ  ์๋ค.
![](https://images.velog.io/images/hsw0194/post/3753e0fe-6506-4414-9ee4-c41dc849a312/image.png)

์๋๋ `getHandlerInternal`์ ์ฝ๋๋ค. ์ด๋ฒ์๋ ์ฐจ๊ทผ์ฐจ๊ทผ ์ดํด๋ณด์.
```java
public abstract class AbstractHandlerMethodMapping<T> extends AbstractHandlerMapping {
...
...
// Look up a handler method for the given request.
protected HandlerMethod getHandlerInternal(HttpServletRequest request) throws Exception {
  String lookupPath = getUrlPathHelper().getLookupPathForRequest(request);
  this.mappingRegistry.acquireReadLock();
  try {
    HandlerMethod handlerMethod = lookupHandlerMethod(lookupPath, request);
    return (handlerMethod != null ? handlerMethod.createWithResolvedBean() : null);
    }
  finally {
    this.mappingRegistry.releaseReadLock();
  }
}
...
...
}
```
๋จผ์  javadoc์ ๋ณด๋ฉด _์ฃผ์ด์ง request์ ๋ํ handler method๋ฅผ ์ฐพ์ต๋๋ค._ ๋ผ๊ณ  ๋์ด์๋ค. ๋์์๋ฆฌ์ ํต์ฌ์ ์ธ ๋ถ๋ถ์ธ๊ฒ์ด๋ค.
>Look up a handler method for the given request.

`lookupPath`๋ ํ์ฌ servlet mapping ์์์์ ๊ฒ์๊ฒฝ๋ก์ธ๋ฐ, request ์์ฒญ์ ๋ถ์ํด์ ์ป์ ์ ์๋ค. ๊ทธ๋ฆฌ๊ณ  **`mappingRegistry`์ ๋ํ ReadLock์ ๊ฐ์ ธ์ค๊ณ  ์๋ค.**
```java
String lookupPath = getUrlPathHelper().getLookupPathForRequest(request);
this.mappingRegistry.acquireReadLock();
```

`lookupPath`๋ฅผ ๋ฐํ์ผ๋ก `lookupHandlerMethod`๋ฅผ ํตํด์ **์ ์ ํ `handlerMethod`๋ฅผ ๊ฐ์ ธ์จ ํ return ํ๋ค**, ์ด `handlerMethod`๊ฐ ๋ฐ๋ก ์ฐ๋ฆฌ๊ฐ ์ง์  Controller ์์ ์ ์ํ ํจ์์ธ๊ฒ์ด๋ค.

```java
try {
  HandlerMethod handlerMethod = lookupHandlerMethod(lookupPath, request);
  return (handlerMethod != null ? handlerMethod.createWithResolvedBean() : null);
}
```


์ ๋ฆฌํด๋ณด์๋ฉด, `DispatcherServlet` ํจ์ ์์์ `handlerMapping`์ด ์ฌ๋ฌ ๊ณผ์ ์ ๊ฑฐ์ณ์ **์ ์ ํ `handlerMethod`** ๋ฅผ ๊ฐ์ ธ์จ๋ค๋๊ฒ์ ์ ์ ์๋ค.

![](https://images.velog.io/images/hsw0194/post/96c33f73-1c61-47c2-920f-965fdadc0bff/Untitled%20Diagram%20(1).jpg)

**๊ทธ๋ฌ๋ ๊ถ๊ธ์ฆ์ด ๋ ๋จ์์๋ค. url์ ํด๋นํ๋ ์ ์ ํ method๋ฅผ ๊ตฌ๋ณํ๋ ๋ฐฉ๋ฒ๊ณผ, method๋ฅผ ๊ฐ์ ธ์ค๋ ๊ฒ์ด ์ฌ์ ํ ๊ถ๊ธํ๋ค.**
๊ฐ๊ฐ **MappingRegistry**์ **Reflection**์ด ๋ต์ด๋ค.

๋๋จธ์ง ๊ถ๊ธ์ฆ์ 2ํธ์์ ๋ง์  ๋ค๋ฃจ๋๋ก ํ๋ค.

### ์ถ์ฒ
[Interceptor ์ฌ์ฉ๋ฒ](https://bgpark.tistory.com/72) : Request flow์ ๋ํด์ ์ ์ ๋ฆฌ๋์ด ์์๋ค.
[AbstractHandlerMethodMapping javadoc](https://docs.spring.io/spring-framework/docs/4.3.2.RELEASE_to_4.3.3.RELEASE/Spring%20Framework%204.3.3.RELEASE/org/springframework/web/servlet/handler/AbstractHandlerMethodMapping.html)
[MappingReigstry javadoc](https://docs.spring.io/spring-framework/docs/4.3.2.RELEASE_to_4.3.3.RELEASE/Spring%20Framework%204.3.3.RELEASE/org/springframework/web/servlet/handler/AbstractHandlerMethodMapping.MappingRegistry.html)
[LinkedMultiValueMap javadoc](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/LinkedMultiValueMap.html)

```toc

```
