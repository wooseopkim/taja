
# TajaJS

TajaJS is a simple Hangul library in JavaScript.

### taja.compose(initial, middle, final)
Composes given three letters into a single character block.

```js
taja.compose('ㅎ', 'ㅏ', 'ㄴ');
// returns '한'
```

### taja.decompose(char)
Decomposes given character into individual letters.
```js
taja.uncompose('많');
// returns 'ㅁㅏㄴㅎ'
taja.uncompose('ㅟ');
// returns 'ㅜㅣ'
```

### taja.group(keystrokes)
Groups `Array` of keystrokes into Hangul `string`.
```js
taja.group(Array.from('ㄴㅏㄹㅏㅅㅁㅏㄹㅆㅏㅁㅣ'));
// returns '나랏말싸미'
```

### taja.ungroup(str)
Ungroups a `string` into an `Array` of `string`. Each character in the original `string` becomes one element in the result `Array`.
```js
taja.ungroup('옽ㅏ');
// returns ['ㅇㅗㅌ', 'ㅏ']
```

### taja.is.hangul(char)
### taja.is.syllable(char)
### taja.is.consonant(char)
### taja.is.vowel(char)
Returns truth value.

**NOTE**: It may be classified as a consonant/vowel in some language, but if it is not Hangul, the return value is `false`.

### node
`npm install taja`

### browser
`<script src="taja.js"></script>`