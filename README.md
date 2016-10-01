
# Taja

Taja is a simple Hangul library in ScalaJS. <br />
[Demo Web Page](https://linterpreteur.github.io/taja/)

___

### Global object

In Scala, methods are available in `Taja` object. <br />
In JavaScript, methods are available in `taja` and `taja.is` object.

##### `compose(initial, middle, final)`
Composes given three letters into a single character block.

```scala
Taja.compose('ㅎ', 'ㅏ', 'ㄴ')
// returns "한"
```

```js
taja.compose('ㅎ', 'ㅏ', 'ㄴ');
// returns '한'
```

##### `decompose(char)`
Decomposes given character into individual letters.

```scala
Taja.decompose("많")
// returns "ㅁㅏㄴㅎ"
Taja.decompose("ㅟ")
// returns "ㅜㅣ"
```

```js
taja.decompose('많');
// returns 'ㅁㅏㄴㅎ'
taja.decompose('ㅟ');
// returns 'ㅜㅣ'
```

##### `group(keystrokes)`
Groups `Array` of keystrokes into Hangul `string`.

```scala
Taja.group("ㄴㅏㄹㅏㅅㅁㅏㄹㅆㅏㅁㅣ" /* : Traversable[Char] */)
// returns "나랏말싸미"
```

```js
taja.group('ㄴㅏㄹㅏㅅㅁㅏㄹㅆㅏㅁㅣ')
// returns '나랏말싸미'
```

##### `ungroup(str)`
Ungroups a `string` into an `Array` of `string`. Each character in the original `string` becomes one element in the result `Array`.

```scala
Taja.ungroup("옽ㅏ" /* : Traversable[Char] */)
// returns {"ㅁㅏㅅ", "ㅇㅣㅆ", "ㄴㅡㄴ", " ", "ㄱㅗ", "ㄱㅣ"}: Traversable[String]
```

```js
taja.ungroup('옽ㅏ');
// returns ['ㅇㅗㅌ', 'ㅏ']
```

##### `is.{hangul|syllable|consonant|vowel}(char)`
Returns `boolean` value.

```scala
Taja.isHangul('한')
// returns true
```

```js
taja.is.hangul('한');
// returns true
```

**NOTE**: The character may be classified as a consonant/vowel in some language, but unless `isHangul(char)`, the return value is `false`.

___

### Usage

##### Web
```html
<!-- built with Scala.js -->
<script src="./taja-opt.js"></script> <!-- or taja-fastopt.js -->

<!-- /js/src/main/scala/com/linterpreteur/taja/ -->
<!-- this should come after taja-[fast]opt.js -->
<script src="./taja-init.js"></script>
```
