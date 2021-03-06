---
emoji: ๐
title: Spring MVC - HandlerMapping์ ๋์๋ฐฉ์ ์ดํดํ๊ธฐ 2ํธ
date: '2021-11-05 00:00:00'
author: weasel
tags: Spring handlerMapping
categories: Spring
---
![](./image.png)

### MappingRegistry
`MappingRegistry`๋ ์๊น ์ดํด๋ณธ `AbstractHandlerMethodMapping`์ ๋ด๋ถ ํด๋์ค๋ค. `MappingRegistry`๋ **handler method์ ๋ํ ๋ชจ๋  mapping์ ์ ์ง ๊ด๋ฆฌ**ํ๊ณ  **`lookup`์ ์ํํ๋ method**๋ฅผ ๊ฐ์ง๊ณ  ์๊ณ  ๋์์ฑ์ ๊ฐ์ง ์ ๊ทผ์ ๊ฐ๋ฅํ๊ฒ ํด์ฃผ๋ ๋ ์ง์คํธ๋ฆฌ๋ค.
>A registry that maintains all mappings to handler methods, exposing methods to perform lookups and providing concurrent access.
Package-private for testing purposes.

๊ฐ์ฅ ์ค์ํ ๋ถ๋ถ์ด **handler method์ ๋ํ ๋ชจ๋  mapping์ ์ ์ง ๊ด๋ฆฌ**ํ๊ณ  **`lookup`์ ์ํํ๋ method**๋ฅผ ๊ฐ์ง๊ณ  ์๋ค๋ ๊ฒ์ด๋ค.

```java
class MappingRegistry {
  private final Map<T, MappingRegistration<T>> registry = new HashMap<>();

  private final Map<T, HandlerMethod> mappingLookup = new LinkedHashMap<>();

  private final MultiValueMap<String, T> urlLookup = new LinkedMultiValueMap<>();

  private final Map<String, List<HandlerMethod>> nameLookup = new ConcurrentHashMap<>();

  private final Map<HandlerMethod, CorsConfiguration> corsLookup = new ConcurrentHashMap<>();

  private final ReentrantReadWriteLock readWriteLock = new ReentrantReadWriteLock();
  ...
  ...
  
  // methods
}
```
`MappingRegistry` ์์์ `Map` ์๋ฃ๊ตฌ์กฐ๋ฅผ ๊ฐ์ง ๋ฉค๋ฒ ๋ณ์๋ค์ด ์๋ค. ๊ทธ ์ค์์`LinkedMultiValueMap`์ด๋ผ๋ ์๋ฃ๊ตฌ์กฐ๋ฅผ ์ฌ์ฉํ๋ค. ์ด๊ฑด ํ๊ฐ์ key์ ์ฌ๋ฌ value๋ค์ ์ ์ฅํ๋ `MultiValueMap`์ `LinkedHashMap`์ผ๋ก ๊ฐ์ผ ์๋ฃ๊ตฌ์กฐ๋ก Spring์ด ๋ง๋  ์๋ฃ๊ตฌ์กฐ๋ค.

`urlLookup`์ `LinkedMultiValueMap`์ ์๋ฃ๊ตฌ์กฐ์ธ๋ฐ, key๋ `url`์ ๊ฐ์ง๊ณ , value๋ `RequestMappingInfo`๋ฅผ ๊ฐ์ง๋ค. `LinkedMultiValueMap`์ ์ฐ๋ ์ด์ ๋ ํ๋์ `url`์ ์ฌ๋ฌ handlerMethod๋ค์ ๋ํ ์ ๋ณด๊ฐ ๋ด๊ธฐ๊ธฐ ๋๋ฌธ์ด๋ค.

์๋ฅผ ๋ค์ด `"/app/user"`๋ผ๋ `url` ์๋ user์ ๋ํ ์ ๋ณด๋ฅผ ์กฐํํ๋ `GET`,user๋ฅผ ์ถ๊ฐํ๋ `POST`๊ฐ ๋งคํ๋ ๋, ์๋์ฒ๋ผ `RequestMappingInfo`๊ฐ ๋ค์ด๊ฐ๋ ๊ฒ์ด๋ค.
```javascript
key : "/app/user/ 
value : [GET /app/user,POST /app/user]
```

์์ ๊ฐ์ ๊ตฌ์กฐ๋ฅผ ํตํด `MappingRegistry`๋ `url`์ ํด๋นํ๋ handlerMethod๋ฅผ ๊ตฌ๋ณํ  ์ ์๊ฒ ๋๋ค. ์ฝ๋๋ก ๋ณด์.

```java
protected HandlerMethod lookupHandlerMethod(String lookupPath, HttpServletRequest request) throws Exception {
  List<Match> matches = new ArrayList<>();
  List<T> directPathMatches = this.mappingRegistry.getMappingsByUrl(lookupPath);
  if (directPathMatches != null) {
    addMatchingMappings(directPathMatches, matches, request);
  }
  ...
  ...
  if (!matches.isEmpty()) {
    ...
    ...
    matches.sort(comparator);
    Match bestMatch = matches.get(0);
    ...
    ...
    request.setAttribute(BEST_MATCHING_HANDLER_ATTRIBUTE, bestMatch.handlerMethod);
    handleMatch(bestMatch.mapping, lookupPath, request);
    return bestMatch.handlerMethod;
  }

```
์๋ ์๊น ์ ๊น ์ธ๊ธํ `lookupHandlerMethod`์ด๋ค. _**์ ์ ํ `handlerMethod`๋ฅผ ๊ฐ์ ธ์จ ํ return ํ๋ค**_ ๊ณ  ํ๋๋ฐ ๊ทธ ๊ณผ์ ์ด ๋ด๊ฒจ์๋ค. 
๊ธธ๋ค๊ณ  ๊ฒ๋จน์ง ๋ง๊ณ  ํ์ค์ฉ ๋ณด์. (_match๋๋ ๊ฒ์ด ์๊ฑฐ๋, 2๊ฐ ์ด์์ธ ๊ฒฝ์ฐ๋ ์ ์ธํจ_)

```java
List<Match> matches = new ArrayList<>();
```
`match`๋ฅผ ๋ด๋ `matches`๋ผ๋ ๋ฆฌ์คํธ๊ฐ ์๋ค.
```java 
List<T> directPathMatches = this.mappingRegistry.getMappingsByUrl(lookupPath);

```
ํ์ฌ `url`์ mapping๋๋ handler method๋ค์ `RequestMappingInfo`๋ค์ `getMappingsByUrl`๋ก ๊ฐ์ ธ์จ ํ `directPathMatches`์ ์ ์ฅํ๋ค. ์๋ฅผ ๋ค์ด `url`์ด `/app/user`์ด๋ฉด `directPathMatches`์๋ `[GET /app/user, POST /app/user]` ์ ๊ฐ์ ์ ๋ณด๊ฐ ๋ค์ด์ค๋ ๊ฒ์ด๋ค.

```java
if (directPathMatches != null) {
    addMatchingMappings(directPathMatches, matches, request);
}
```
๊ทธ ํ `[GET /app/user, POST /app/user]` ์ค์์ request ์ ๋ณด์ ์ผ์นํ๋ ๊ฒ๋ค์ `addMatchingMappings`์ ํตํด์ `matches`์ ์ถ๊ฐํ๋ค.

```java
matches.sort(comparator);
Match bestMatch = matches.get(0);
```
`matches`๋ค์ ์ฐ์ ์์์ ๋ง๊ฒ๋ ์ ๋ ฌํ๊ณ , request์ ๊ฐ์ฅ ์ผ์นํ๋ 0๋ฒ์งธ `match`๋ฅผ `bestMatch`์ ์ ์ฅํ๋ค.

```java
request.setAttribute(BEST_MATCHING_HANDLER_ATTRIBUTE, bestMatch.handlerMethod);
handleMatch(bestMatch.mapping, lookupPath, request);
return bestMatch.handlerMethod;
```
`bestMatch`์ ๋ฉค๋ฒ์ธ `handlerMethod`๋ฅผ returnํด์ ์ต์ข์ ์ผ๋ก ์ ํฉํ handler method๋ฅผ ์ฐพ๊ฒ ๋๋ค.

```java
private class Match {

  private final T mapping;

  private final HandlerMethod handlerMethod;

}
```
### Reflection
์ด์  ๋ง์ง๋ง ๊ถ๊ธ์ฆ๋ง์ด ๋จ์๋ค.

### ์ถ์ฒ 
[MappingReigstry javadoc](https://docs.spring.io/spring-framework/docs/4.3.2.RELEASE_to_4.3.3.RELEASE/Spring%20Framework%204.3.3.RELEASE/org/springframework/web/servlet/handler/AbstractHandlerMethodMapping.MappingRegistry.html)
[LinkedMultiValueMap javadoc](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/LinkedMultiValueMap.html)

```toc

```
