
# TajaJS

TajaJS is a simple Hangul library in JavaScript. <br />
[Demo Web Page](https://linterpreteur.github.io/taja.js/)

### taja.compose(initial, middle, final)
Composes given three letters into a single character block.

```js
taja.compose('ㅎ', 'ㅏ', 'ㄴ');
// returns '한'
```

### taja.decompose(char)
Decomposes given character into individual letters.
```js
taja.decompose('많');
// returns 'ㅁㅏㄴㅎ'
taja.decompose('ㅟ');
// returns 'ㅜㅣ'
```

### taja.group(keystrokes)
Groups `Array` of keystrokes into Hangul `string`.
```js
taja.group('ㄴㅏㄹㅏㅅㅁㅏㄹㅆㅏㅁㅣ');
// returns '나랏말싸미'
```

### taja.ungroup(str)
Ungroups a `string` into an `Array` of `string`. Each character in the original `string` becomes one element in the result `Array`.
```js
taja.ungroup('옽ㅏ');
// returns ['ㅇㅗㅌ', 'ㅏ']
```

### taja.is.{hangul|syllable|consonant|vowel}(char)
Returns `boolean` value.

**NOTE**: It may be classified as a consonant/vowel in some language, but if it is not Hangul, the return value is `false`.

### npm
`npm install taja`

### browser
`<script src="taja.js"></script>`
