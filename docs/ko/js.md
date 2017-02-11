# 설치

```bash
npm install --save taja
```

<https://www.npmjs.com/package/taja>에서 npm 패키지를 확인할 수 있습니다.  
설치가 끝난 후 코드에서 다음과 같이 임포트합니다.

```js
import * as taja from 'taja'
```

혹은 ES2015 미만일 경우,

```js
var taja = require('taja')
```

npm 없이 브라우저에서 바로 사용할 수도 있습니다.

```html
<script src="//unpkg.com/taja/dist.js"></src>
```

# API

```ts
/*
* 주어진 문자들 중 조합할 수 있는 문자들을 한글 음절로 조합합니다.
*/
taja.group(keystrokes: string): string
```

```ts
/*
* 주어진 문자들 중 한글 음절이 있을 경우 낱자로 분해합니다.
*/
taja.ungroup(chars: string): Array<string>
```

```ts
/*
* 주어진 문자들을 가능하다면 한글 음절로 조립합니다.
*
* NOTE: 각 인자는 길이가 1일 것을 상정합니다.
*/
taja.compose(initial: string, middle: string, final?: string): string
```

```ts
/**
* 주어진 문자를 가능하다면 한글 초성, 중성, 종성으로 해체합니다. 한글이 아닐 경우
* 인자를 그대로 문자열로 반환합니다.
*/
taja.decompose(char: string): string
```

이하 함수는 `taja.is.something(char)` 형태로 이용할 수 있습니다.

```ts
taja.is.hangul(char: string): boolean //=> char이 한글인지의 진리값
```

```ts
taja.is.vowel(char: string): boolean //=> char이 한글 모음인지의 진리값
```

```ts
taja.is.consonant(char: string): boolean //=> char이 한글 자음인지의 진리값
```

```ts
taja.is.syllable(char: string): boolean //=> char이 한글 음절인지의 진리값
```