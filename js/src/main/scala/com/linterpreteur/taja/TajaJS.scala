package com.linterpreteur.taja

import scala.scalajs.js.Array
import scala.scalajs.js.JSConverters._
import scala.scalajs.js.annotation.JSExport

@JSExport("taja")
object TajaJS {

  implicit def str2char(str: String): Char = str.charAt(0)

  @JSExport
  def compose(initial: String, middle: String): String = Taja.compose(initial, middle)

  @JSExport
  def compose(initial: String, middle: String, fin: String): String = Taja.compose(initial, middle, fin)

  @JSExport
  def decompose(char: String): String = Taja.decompose(char)

  @JSExport
  def group(string: String): String = Taja.group(string)

  @JSExport
  def ungroup(string: String): Array[String] = Taja.ungroup(string).toJSArray

  @JSExport
  def isHangul(char: String): Boolean = Taja.isHangul(char)

  @JSExport
  def isSyllable(char: String): Boolean = Taja.isSyllable(char)

  @JSExport
  def isConsonant(char: String): Boolean = Taja.isConsonant(char)

  @JSExport
  def isVowel(char: String): Boolean = Taja.isVowel(char)
}