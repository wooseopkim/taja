package com.linterpreteur.taja

import scala.collection.mutable

object Taja {
  private val initials: Array[Char] = Array(
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
    'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
    'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  )
  private val middles: Array[Char] = Array(
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ',
    'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
    'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ',
    'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ',
    'ㅣ'
  )
  private val finals: Array[Option[Char]] = Array(None) ++ Array(
    'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ',
    'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ',
    'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ',
    'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
    'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ',
    'ㅍ', 'ㅎ'
  ).map(Some(_))

  private val consonants = (initials ++ finals.collect { case Some(c) => c }).toSet
  private val vowels = middles.toSet

  private val first = '가'
  private val last = '힣'

  private val keystrokes: Map[Char, String] = Map(
    'ㅘ' -> "ㅗㅏ",
    'ㅙ' -> "ㅗㅐ",
    'ㅚ' -> "ㅗㅣ",
    'ㅝ' -> "ㅜㅓ",
    'ㅞ' -> "ㅜㅔ",
    'ㅟ' -> "ㅜㅣ",
    'ㅢ' -> "ㅡㅣ",
    'ㄳ' -> "ㄱㅅ",
    'ㄵ' -> "ㄴㅈ",
    'ㄶ' -> "ㄴㅎ",
    'ㄺ' -> "ㄹㄱ",
    'ㄻ' -> "ㄹㅁ",
    'ㄼ' -> "ㄹㅂ",
    'ㄽ' -> "ㄹㅅ",
    'ㄾ' -> "ㄹㅌ",
    'ㄿ' -> "ㄹㅍ",
    'ㅀ' -> "ㄹㅎ",
    'ㅄ' -> "ㅂㅅ"
  )
  private val combinations: Map[String, Char] = keystrokes.map { case (key, value) => (value, key) }

  private def combinationsOf(a: Option[Char], b: Option[Char]): Option[Char] = (a, b) match {
    case (None, _) => None
    case (_, None) => None
    case (Some(x), Some(y)) => combinationsOf(x, y)
  }
  private def combinationsOf(a: Char, b: Char): Option[Char] = combinations.get(a.toString + b)

  private def unmerge(char: Option[Char]): String = char match {
    case Some(x) => unmerge(x)
    case None => ""
  }
  private def unmerge(char: Char) : String = keystrokes.getOrElse(char, char).toString
  private def merge(first: Option[Char], rest: Option[Char]*): String = merge((Seq(first) ++ rest).collect { case Some(x) => x }: _*)
  private def merge(chars: Char*): String = combinations.getOrElse(chars.mkString, chars).toString

  def compose(initial: Char, middle: Char): String = compose(Some(initial), Some(middle))
  def compose(initial: Option[Char], middle: Option[Char]): String = compose(initial, middle, None)
  def compose(initial: Char, middle: Char, fin: Char): String = compose(Some(initial), Some(middle), Some(fin))

  def compose(initial: Option[Char], middle: Option[Char], fin: Option[Char]): String = {
    if (initial.isEmpty || middle.isEmpty) {
      return initial.getOrElse("").toString + middle.getOrElse("") + fin.getOrElse("")
    }

    val initialIndex = initials.indexOf(initial.get)
    val middleIndex = middles.indexOf(middle.get)
    val finalIndex = finals.indexOf(fin)

    if (initialIndex == -1 || middleIndex == -1 || finalIndex == -1) {
      return initial.get.toString + middle.get + fin.getOrElse("")
    }

    val a = finals.length * middles.length * initialIndex
    val b = finals.length * middleIndex
    val c = finalIndex
    (first + a + b + c).toChar.toString
  }

  def decompose(char: Char): String = {
    if (isSyllable(Some(char))) {
      val code = char.toInt - first
      val initial = code / (finals.length * middles.length)
      val middle = code % (finals.length * middles.length) / finals.length
      val fin = code % finals.length
      unmerge(initials(initial)) + unmerge(middles(middle)) + unmerge(finals(fin))
    } else {
      unmerge(char)
    }
  }

  def group(keystrokes: Traversable[Char]): String = group(keystrokes.to[mutable.ListBuffer])

  private def group(keystrokes: mutable.ListBuffer[Char]): String = {
    val chars = keystrokes.map(Some(_))
    for (i <- chars.length - 1 to -1 by -1) {
      def a: Option[Char] = chars.applyOrElse(i, (_: Int) => None)
      def b: Option[Char] = chars.applyOrElse(i + 1, (_: Int) => None)
      def c: Option[Char] = chars.applyOrElse(i + 2, (_: Int) => None)

      if (combinationsOf(a, b).isEmpty && combinationsOf(b, c).isDefined) {
        val merged = merge(b, c)
        chars.remove(i + 1, 2)
        chars.insertAll(i + 1, merged.map(Some(_)))
      }

      if (isConsonant(a) && isVowel(b)) {
        if (isConsonant(c) && finals.contains(c)) {
          val composed = compose(a, b, c)
          chars.remove(i, 3)
          chars.insertAll(i, composed.map(Some(_)))
        } else {
          val composed = compose(a, b)
          chars.remove(i, 2)
          chars.insertAll(i, composed.map(Some(_)))
        }
      }
    }
    chars.collect { case Some(x) => x }.mkString
  }

  def ungroup(chars: Traversable[Char]): Traversable[String] = {
    chars.map(decompose)
  }

  def isSyllable(char: Char): Boolean = isSyllable(Some(char))
  def isSyllable(char: Option[Char]): Boolean = char match {
    case Some(c) => first <= c && c <= last
    case None => false
  }

  def isConsonant(char: Char): Boolean = isConsonant(Some(char))
  def isConsonant(char: Option[Char]): Boolean = char match {
    case Some(c) => consonants contains c
    case None => false
  }

  def isVowel(char: Char): Boolean = isVowel(Some(char))
  def isVowel(char: Option[Char]): Boolean = char match {
    case Some(c) => vowels contains c
    case None => false
  }

  def isHangul(char: Char): Boolean = isHangul(Some(char))
  def isHangul(char: Option[Char]): Boolean = isSyllable(char) || isConsonant(char) || isVowel(char)
}