# 설치

Gradle을 사용하실 경우,

1. 루트 `build.gradle`에 다음을 추가합니다.
```gradle
allprojects {
    repositories {
        maven { url 'https://jitpack.io' }
    }
}
```

2. **앱 수준** 디펜던시를 추가합니다.
```gradle
dependencies {
    compile 'com.github.wooseopkim.taja:taja_2.11:2.0.0'
}
```

Maven, SBT, Leiningen을 사용하신다면 [JitPack](https://jitpack.io/#wooseopkim/taja)을 참고하세요.

# API

모든 메서드는 `public final class com.wooseopkim.taja.Taja`의 `static` 메서드입니다.

```java
/**
* 주어진 문자들 중 조합할 수 있는 문자들을 한글 음절로 조합합니다.
*
* NOTE: Java에서 이 메서드를 호출할 경우
* 1. WrappedString을 임포트하고(import scala.collection.immutable.WrappedString;)
* 2. Taja.group(new WrappedString("문자열"))을 호출합니다.
*
* @param keystrokes 문자의 집합
* @return 조합된 문자열
*/
String group(scala.collection.Traversable<Object> keystrokes)
```

```java
/**
* 주어진 문자들 중 한글 음절이 있을 경우 낱자로 분해합니다.
*
* NOTE: Java에서 이 메서드를 호출할 경우
* => String group(Traversable<Object> keystrokes)의 안내를 참고하세요.
*
* NOTE: 반환 값을 Java의 List로 변환하고자 할 경우
* Traversable<Object> t = Taja.ungroup(...)일 때,
* 1. JavaConversions를 임포트하고(import scala.collection.JavaConversions;)
* 2. List<String> l = JavaConversions.seqAsJavaList(t.toSeq());과 같이 변환합니다.
*
* @param chars 분해할 문자들
* @return 한글 음절이 모두 분해된 문자열
*/
Traversable<String> ungroup(Traversable<Object> chars)
```

```java
/**
* 주어진 문자들을 가능하다면 한글 음절로 조립합니다.
*
* 인자가 한글 음절을 형성하지 못한다면 인자를 단순히 이은 문자열을 반환합니다.
* 따라서 Taja.compose('a', 'b')는 "ab"를 반환합니다.
*
* @param initial 초성 문자
* @param middle 중성 문자
* @param fin 생략 가능, 종성 문자
* @return 조립된 문자(열)
*/
String compose(char initial, char middle)
String compose(char initial, char middle, char fin)
```

```java
/**
* 주어진 문자를 가능하다면 한글 초성, 중성, 종성으로 해체합니다. 한글이 아닐 경우
* 인자를 그대로 문자열로 반환합니다.
*
* @param c 해체할 문자
* @return 해체된 문자(열)
*/
String decompose(char c)
```

```java
boolean isHangul(char c) //=> char c가 한글인지의 진리값
```

```java
boolean isVowel(char c) //=> char c가 한글 모음인지의 진리값
```

```java
boolean isConsonant(char c) //=> char c가 한글 자음인지의 진리값
```

```java
boolean isSyllable(char c) //=> char c가 한글 음절인지의 진리값
```