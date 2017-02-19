const chai = require('chai')
const should = chai.should()
const taja = require('.')

module.exports = (describe, it) => {
  describe('taja', () => {
    it('should compose individual letters into a block', () => {
      const letters = ['ㅁ', 'ㅏ', 'ㅅ']
      const block = '맛'
      const composed = taja.compose.apply(undefined, letters)
      composed.should.equal(block)
    })

    it('should decompose a block into individual letters', () => {
      const letters = 'ㅇㅣㅆ'
      const block = '있'
      const decomposed = taja.decompose(block)
      letters.should.equal(decomposed)
    })

    it('should group keystrokes', () => {
      const keystrokes = 'ㅁㅏㅅㅇㅣㅆㄴㅡㄴ ㄱㅗㄱㅣ'
      const grouped = taja.group(keystrokes)
      const str = '맛있는 고기'
      grouped.should.equal(str)
    })

    it('should ungroup string', () => {
      const str = '맛있는 고기'
      const ungrouped = taja.ungroup(str)
      const keystrokes = ['ㅁㅏㅅ', 'ㅇㅣㅆ', 'ㄴㅡㄴ', ' ', 'ㄱㅗ', 'ㄱㅣ']
      ungrouped.join('/').should.equal(keystrokes.join('/'))
    })

    it('should detect keystroke pauses', () => {
      const keystrokes = ['ㅁㅏ', 'ㅅㅇㅣㅆㄴ', 'ㅡㄴㄱㅗㄱ', 'ㅣ']
      const grouped = keystrokes.map(x => taja.group(x)).join('')
      const cascaded = '맛있는 고기'
      const blocked = '마ㅅ있ㄴㅡㄴ곡ㅣ'
      grouped.should.not.equal(cascaded)
      grouped.should.equal(blocked)
    })

    it('should not wipe out information of the original form', () => {
      const str = 'ㅁㅏㅅ있는 고기'
      const ungrouped = taja.ungroup(str)
      const regrouped = ungrouped.map(x => taja.group(x)).join('')
      str.should.equal(regrouped)

      const keystrokes = 'ㅁㅏㅅㅇㅣㅆㄴㅡㄴ ㄱㅗㄱㅣ'
      const grouped = taja.group(keystrokes)
      const recovered = taja.ungroup(grouped) 
      keystrokes.should.equal(recovered.join(''))
    })

    it('should classify characters', () => {
      const ka = {
        value: '가',
        type: {
          hangul: true,
          syllable: true,
          consonant: false,
          vowel: false
        }
      }
      const k = {
        value: 'ㄱ',
        type: {
          hangul: true,
          syllable: false,
          consonant: true,
          vowel: false
        }
      }
      const a = {
        value: 'ㅏ',
        type: {
          hangul: true,
          syllable: false,
          consonant: false,
          vowel: true
        }
      }
      /*
      * 'z' is a consonant but since it is not Hangul,
      * taja.is.consonant('z') should return false.
      */
      const z = {
        value: 'z',
        type: {
          hangul: false,
          syllable: false,
          consonant: false,
          vowel: false
        }
      }

      new Array(ka, k, a, z).forEach(char => {
        Object.keys(char.type).forEach(type => {
          taja.is[type](char.value).should.equal(char.type[type])
        })
      })
    })

    it('should not contradict with the documentation', () => {
      taja.compose('ㅎ', 'ㅏ', 'ㄴ').should.equal('한')
      taja.decompose('많').should.equal('ㅁㅏㄴㅎ')
      taja.decompose('ㅟ').should.equal('ㅜㅣ')
      taja.group('ㄴㅏㄹㅏㅅㅁㅏㄹㅆㅏㅁㅣ').should.equal('나랏말싸미')
      taja.ungroup('옽ㅏ').join('/').should.equal('ㅇㅗㅌ/ㅏ')
    })
  })
}