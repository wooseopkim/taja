package com.linterpreteur.taja

import org.scalatest.{FlatSpec, Matchers}

class TajaSpec extends FlatSpec with Matchers {

  it should "compose individual letters into a block" in {
    val letters = Array('ㅁ', 'ㅏ', 'ㅅ')
    val block = "맛"
    val composed = Taja.compose(letters(0), letters(1), letters(2))

    composed.toString should equal(block)
  }

  it should "put arguments sequentially in a string" in {
    val letters = Array('ㅁ', 'ㄱ', 'ㅅ')
    val block = "ㅁㄱㅅ"
    val composed = Taja.compose(letters(0), letters(1), letters(2))

    composed.toString should equal(block)
  }

  it should "group keystrokes" in {
    val keystrokes = "ㅁㅏㅅㅇㅣㅆㄴㅡㄴ ㄱㅗㅣㄱㅣ"
    val grouped = Taja.group(keystrokes)
    val string = "맛있는 괴기"

    grouped.toString should equal(string)
  }

  it should "ungroup a string" in {
    val string = "맛있는 고기"
    val ungrouped = Taja.ungroup(string)
    val keystrokes = Array("ㅁㅏㅅ", "ㅇㅣㅆ", "ㄴㅡㄴ", " ", "ㄱㅗ", "ㄱㅣ")

    ungrouped.mkString("/") should equal(keystrokes.mkString("/"))
  }

  it should "detect keystroke pauses" in {
    val keystrokes = Array("ㅁㅏ", "ㅅㅇㅣㅆㄴ", "ㅡㄴㄱㅗㄱ", "ㅣ")
    val grouped = keystrokes.map(Taja.group(_)).mkString
    val cascaded = "맛있는 고기"
    val blocked = "마ㅅ있ㄴㅡㄴ곡ㅣ"

    grouped should not equal cascaded
    grouped should equal(blocked)
  }

  it should "be able to recover the original form" in {
    val string = "ㅁㅏㅅ있는 고기"
    val ungrouped = Taja.ungroup(string)
    val regrouped = ungrouped.map(Taja.group(_))

    string should equal(regrouped.mkString)

    val keystrokes = "ㅁㅏㅅㅇㅣㅆㄴㅡㄴ ㄱㅗㄱㅣ"
    val grouped = Taja.group(keystrokes)
    val recovered = Taja.ungroup(grouped)

    keystrokes should equal(recovered.mkString)
  }

  it should "classify characters correctly" in {
    case class TypeData(hangul: Boolean, syllable: Boolean, consonant: Boolean, vowel: Boolean)
    case class Letter(value: Char, typeData: TypeData)

    val ka = Letter('가', TypeData(hangul = true, syllable = true, consonant = false, vowel = false))
    val k = Letter('ㄱ', TypeData(hangul = true, syllable = false, consonant = true, vowel = false))
    val a = Letter('ㅏ', TypeData(hangul = true, syllable = false, consonant = false, vowel = true))
    val z = Letter('z', TypeData(hangul = false, syllable = false, consonant = false, vowel = false))

    for (letter <- Array(ka, k, a, z)) {
      letter.typeData.hangul should equal(Taja.isHangul(letter.value))
      letter.typeData.syllable should equal(Taja.isSyllable(letter.value))
      letter.typeData.consonant should equal(Taja.isConsonant(letter.value))
      letter.typeData.vowel should equal(Taja.isVowel(letter.value))
    }
  }

  "The documentation" should "be in accordance with the actual code" in {
    Taja.compose('ㅎ', 'ㅏ', 'ㄴ') should equal("한")
    Taja.decompose('많') should equal("ㅁㅏㄴㅎ")
    Taja.decompose('ㅟ') should equal("ㅜㅣ")
    Taja.group("ㄴㅏㄹㅏㅅㅁㅏㄹㅆㅏㅁㅣ") should equal("나랏말싸미")
    Taja.ungroup("옽ㅏ").mkString("/") should equal("ㅇㅗㅌ/ㅏ")
  }

}