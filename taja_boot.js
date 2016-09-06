;(function(global) {
    if (typeof module === 'object' && module.exports) {
        module.exports = require('taja');
    } else {
        global['taja'] = Object.assign(taja(), {
            is: {
                hangul: x => taja.isHangul(x),
                syllable: x => taja.isSyllable(x),
                vowel: x => taja.isVowel(x),
                consonant: x => taja.isConsonant(x)
            }
        });
    }
})(this);