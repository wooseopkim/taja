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

All methods are declared under `object com.wooseopkim.taja.Taja`.

```scala
/**
* Groups sequence of characters into possible Hangul blocks.
*
* @param keystrokes collection of characters
* @return grouped string
*/
group(keystrokes: Traversable[Char]): String
```

```scala
/**
* Breaks all Hangul syllables into letters in given string if any.
*
* @param chars source string
* @return string with all Hangul blocks decomposed
*/
ungroup(chars: Traversable[Char]): Traversable[String]
```

```scala
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
compose(initial: Char, middle: Char)
compose(initial: Char, middle: Char, fin: Char): String
compose(initial: Option[Char], middle: Option[Char])
compose(initial: Option[Char], middle: Option[Char], fin: Option[Char]): String
```

```scala
/**
* Breaks given character into Hangul letters if possible, otherwise return
* the argument itself as String.
*
* @param c character to decompose
* @return decomposed string
*/
decompose(char: Char): String
```

```scala
isHangul(char: Char): Boolean
isHangul(char: Option[Char]): Boolean
//=> Whether or not char c is Hangul
```

```scala
isVowel(char: Char): Boolean
isVowel(char: Option[Char]): Boolean
//=> Whether or not char c is a Hangul vowel
```

```scala
isConsonant(char: Char): Boolean
isConsonant(char: Option[Char]): Boolean
//=> Whether or not char c is a Hangul consonant
```

```scala
isSyllable(char: Char): Boolean
isSyllable(char: Option[Char]): Boolean
//=> Whether or not char c is a Hangul syllable block
```