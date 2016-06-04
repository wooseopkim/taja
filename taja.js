;(function(root) {
    'use strict';
    const reverse = array => new (function() {
        array.forEach((v, i) => { this[v] = i; });
    })();
    const initials = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
        'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
        'ㅆ', 'ㅇ' , 'ㅈ', 'ㅉ', 'ㅊ',
        'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    const initialIndices = reverse(initials);
    const middles = [
        'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ',
        'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
        'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ',
        'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ',
        'ㅣ'
    ];
    const middleIndices = reverse(middles);
    const finals = [
        '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ',
        'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
        'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ',
        'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
        'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ',
        'ㅌ', 'ㅍ', 'ㅎ'
    ];
    const finalIndices = reverse(finals);
    const consonants = new Set(initials.concat(finals).filter(x => x));
    const vowels = new Set(middles);
    const first = '가'.charCodeAt(0);
    const last = '힣'.charCodeAt(0);
    const keystrokesOf = {
        'ㅘ': 'ㅗㅏ',
        'ㅙ': 'ㅗㅐ',
        'ㅚ': 'ㅗㅣ',
        'ㅝ': 'ㅜㅓ',
        'ㅞ': 'ㅜㅔ',
        'ㅟ': 'ㅜㅣ',
        'ㅢ': 'ㅡㅣ',
        'ㄳ': 'ㄱㅅ',
        'ㄵ': 'ㄴㅈ',
        'ㄶ': 'ㄴㅎ',
        'ㄺ': 'ㄹㄱ',
        'ㄻ': 'ㄹㅁ',
        'ㄼ': 'ㄹㅂ',
        'ㄽ': 'ㄹㅅ',
        'ㄾ': 'ㄹㅌ',
        'ㄿ': 'ㄹㅍ',
        'ㅀ': 'ㄹㅎ',
        'ㅄ': 'ㅂㅅ'
    };
    const combinationOf = new (function(source) {
        Object.keys(source).forEach(key => { this[source[key]] = key });
    })(keystrokesOf);

    function unmerge(char) {
        return keystrokesOf[char] || char;
    }
    function merge(str) {
        return combinationOf[str] || str;
    }

    function compose(initial, middle, final) {
        let a = initialIndices[initial];
        let b = middleIndices[middle];
        let c = finalIndices[final || ''];
        if (a == null || b == null || c == null) {
            return initial + middle + final;
        }
        initial = finals.length * middles.length * a;
        middle = finals.length * b;
        final = c;
        return String.fromCharCode(first + initial + middle + final);
    }
    function group(keystrokes) {
        for (let i = keystrokes.length - 1; i >= -1; i--) {
            let a = keystrokes[i];
            let b = keystrokes[i + 1];
            let c = keystrokes[i + 2];
            if (!combinationOf[a + b] && combinationOf[b + c]) {
                keystrokes.splice(i + 1, 2, merge(b + c));
                b = keystrokes[i + 1];
                c = keystrokes[i + 2];
            }
            if (isConsonant(a) && isVowel(b)) {
                if (!isConsonant(c)) {
                    keystrokes.splice(i, 2, compose(a, b));
                } else {
                    keystrokes.splice(i, 3, compose(a, b, c));
                }
            }
        }
        return keystrokes.join('');
    }

    function decompose(char) {
        if (isSyllable(char)) {
            let code = char.charCodeAt(0) - first;
            let initial = parseInt(code / (finals.length * middles.length));
            let middle = parseInt(code % (finals.length * middles.length) / finals.length);
            let final = code % finals.length;
            initial = unmerge(initials[initial]);
            middle = unmerge(middles[middle]);
            final = unmerge(finals[final]);
            return initial + middle + final;
        } else {
            return unmerge(char);
        }
    }
    function ungroup(str) {
        return Array.prototype.map.call(str, char => decompose(char));
    }

    function isHangul(char) {
        return isSyllable(char) || isConsonant(char) || isVowel(char);
    }
    function isSyllable(char) {
        let code = char.charCodeAt(0);
        return first <= code && code <= last;
    }
    function isConsonant(char) {
        return consonants.has(char);
    }
    function isVowel(char) {
        return vowels.has(char);
    }

    const taja = {
        compose: compose,
        decompose: decompose,
        group: group,
        ungroup: ungroup,
        is: {
            hangul: isHangul,
            syllable: isSyllable,
            consonant: isConsonant,
            vowel: isVowel
        }
    };
    
    if (typeof define === 'function' && define.amd) {
        define(function() { return taja; });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = taja;
    } else {
        root['taja'] = taja;
    }
})(this);