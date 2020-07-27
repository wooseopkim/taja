# How to install

If you are using Gradle,

1. Add this to your root `build.gradle`
```gradle
allprojects {
    repositories {
        maven { url 'https://jitpack.io' }
    }
}
```

2. Add the **app level** dependency
```gradle
dependencies {
    compile 'com.github.wooseopkim.taja:taja_2.11:2.0.0'
}
```

If you use Maven, SBT, or Leiningen, please follow [JitPack instructions](https://jitpack.io/#wooseopkim/taja).

# API

All methods are `static` and declared under `public final class com.wooseopkim.taja.Taja`.

```java
/**
* Groups sequence of characters into possible Hangul blocks.
*
* NOTE: How to call this method from Java
* 1. import scala.collection.immutable.WrappedString;
* 2. Call Taja.group(new WrappedString("some string"))
*
* @param keystrokes collection of characters
* @return grouped string
*/
String group(scala.collection.Traversable<Object> keystrokes)
```

```java
/**
* Breaks all Hangul syllables into letters in given string if any.
*
* NOTE: How to call this method from Java
* => Please see String group(Traversable<Object> keystrokes)
*
* NOTE: How to convert the return value to Java List
* When Traversable<Object> t = Taja.ungroup(...),
* 1. import scala.collection.JavaConversions;
* 2. List<String> l = JavaConversions.seqAsJavaList(t.toSeq());
*
* @param chars source string
* @return string with all Hangul blocks decomposed
*/
Traversable<String> ungroup(Traversable<Object> chars)
```

```java
/**
* Tries to compose given letters into a possible Hangul block.
*
* Returns a simple sequence of the characters if arguments don't
* form up a valid Hangul block. i.e., Taja.compose('a', 'b') returns "ab".
*
* @param initial character for initial position
* @param middle character for middle position
* @param fin optional; character for final position
* @return composed string
*/
String compose(char initial, char middle)
String compose(char initial, char middle, char fin)
```

```java
/**
* Breaks given character into Hangul letters if possible, otherwise return
* the argument itself as String.
*
* @param c character to decompose
* @return decomposed string
*/
String decompose(char c)
```

```java
boolean isHangul(char c) //=> Whether or not char c is Hangul
```

```java
boolean isVowel(char c) //=> Whether or not char c is a Hangul vowel
```

```java
boolean isConsonant(char c) //=> Whether or not char c is a Hangul consonant
```

```java
boolean isSyllable(char c) //=> Whether or not char c is a Hangul syllable block
```