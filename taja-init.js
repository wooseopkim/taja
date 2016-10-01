;(function(global) {
    global['taja'] = Object.assign(global['taja'](), {
        is: {
            hangul: x => global['taja']['isHangul'](x),
            syllable: x => global['taja']['isSyllable'](x),
            vowel: x => global['taja']['isVowel'](x),
            consonant: x => global['taja']['isConsonant'](x)
        }
    });
})(this);