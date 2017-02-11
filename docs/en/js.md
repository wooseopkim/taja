# How to install

```bash
npm install --save taja
```

You can see the npm package at <https://www.npmjs.com/package/taja>.  
After you install the module, import it in the code:

```js
import * as taja from 'taja'
```

or, if you're not using ES2015+,

```js
var taja = require('taja')
```

You can also use it directly on browsers without npm dependency.

```html
<script src="//unpkg.com/taja/dist.js"></src>
```

# API

```ts
/*
* Groups sequence of characters into possible Hangul blocks.
*/
taja.group(keystrokes: string): string
```

```ts
/*
* Breaks all Hangul syllables into letters in given string if any.
*/
taja.ungroup(chars: string): Array<string>
```

```ts
/*
* Tries to compose given letters into a possible Hangul block.
*
* NOTE: Each argument is supposed to have length of 1.
*/
taja.compose(initial: string, middle: string, final?: string): string
```

```ts
/**
* Breaks given character into Hangul letters if possible, otherwise return
* the argument itself as String.
*/
taja.decompose(char: string): string
```

Note that functions below are available in form of `taja.is.something(char)`.

```ts
taja.is.hangul(char: string): boolean //=> Whether or not char is Hangul
```

```ts
taja.is.vowel(char: string): boolean //=> Whether or not char is a Hangul vowel
```

```ts
taja.is.consonant(char: string): boolean //=> Whether or not char is a Hangul consonant
```

```ts
taja.is.syllable(char: string): boolean //=> Whether or not char is a Hangul syllable block
```