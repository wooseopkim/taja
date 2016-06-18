'use strict';
const chai = require('chai');
const should = chai.should();
const taja = require('./taja');

describe('taja', function() {
    it('should compose individual letters into a block', function() {
        const letters = ['ㅁ', 'ㅏ', 'ㅅ'];
        const block = '맛';
        const composed = taja.compose.apply(undefined, letters);
        composed.should.equal(block);
    });
    it('should decompose a block into individual letters', function() {
        const letters = 'ㅇㅣㅆ';
        const block = '있';
        const decomposed = taja.decompose(block);
        letters.should.equal(decomposed);
    });
    it('should group keystrokes', function() {
        const keystrokes = 'ㅁㅏㅅㅇㅣㅆㄴㅡㄴ ㄱㅗㄱㅣ';
        const grouped = taja.group(keystrokes);
        const str = '맛있는 고기';
        grouped.should.equal(str);
    });
    it('should ungroup string', function() {
        const str = '맛있는 고기';
        const ungrouped = taja.ungroup(str);
        const keystrokes = ['ㅁㅏㅅ', 'ㅇㅣㅆ', 'ㄴㅡㄴ', ' ', 'ㄱㅗ', 'ㄱㅣ'];
        ungrouped.join('/').should.equal(keystrokes.join('/'));
    });
    it('should detect keystroke pauses', function() {
        const keystrokes = ['ㅁㅏ', 'ㅅㅇㅣㅆㄴ', 'ㅡㄴㄱㅗㄱ', 'ㅣ'];
        const grouped = keystrokes.map(x => taja.group(x)).join('');
        const cascaded = '맛있는 고기';
        const blocked = '마ㅅ있ㄴㅡㄴ곡ㅣ';
        grouped.should.not.equal(cascaded);
        grouped.should.equal(blocked);
    });
    it('should not wipe out information of the original form', function() {
        const str = 'ㅁㅏㅅ있는 고기';
        const ungrouped = taja.ungroup(str);
        const regrouped = ungrouped.map(x => taja.group(x)).join('');
        str.should.equal(regrouped);
        
        const keystrokes = 'ㅁㅏㅅㅇㅣㅆㄴㅡㄴ ㄱㅗㄱㅣ';
        const grouped = taja.group(keystrokes);
        const recovered = taja.ungroup(grouped); 
        keystrokes.should.equal(recovered.join(''));
    });
    it('should classify characters', function() {
        const ka = {
            value: '가',
            type: {
                hangul: true,
                syllable: true,
                consonant: false,
                vowel: false
            }
        };
        const k = {
            value: 'ㄱ',
            type: {
                hangul: true,
                syllable: false,
                consonant: true,
                vowel: false
            }
        };
        const a = {
            value: 'ㅏ',
            type: {
                hangul: true,
                syllable: false,
                consonant: false,
                vowel: true
            }
        };
        const z = {
            value: 'z',
            type: {
                hangul: false,
                syllable: false,
                /*
                * 'z' is a consonant but since it is not Hangul,
                * taja.is.consonant('z') should return false.
                */
                consonant: false,
                vowel: false
            }
        };
        [ka, k, a, z].forEach(char => {
            const types = Object.keys(char.type);
            types.forEach(type => {
                taja.is[type](char.value).should.equal(char.type[type]);
            });
        });
    });
    it('should not contradict with the documentation', function() {
        taja.compose('ㅎ', 'ㅏ', 'ㄴ').should.equal('한');
        taja.decompose('많').should.equal('ㅁㅏㄴㅎ');
        taja.decompose('ㅟ').should.equal('ㅜㅣ');
        taja.group('ㄴㅏㄹㅏㅅㅁㅏㄹㅆㅏㅁㅣ').should.equal('나랏말싸미');
        taja.ungroup('옽ㅏ').join('/').should.equal('ㅇㅗㅌ/ㅏ');
    });
});