import sbt.Keys._

name := "Taja"

scalaVersion in ThisBuild := "2.11.8"

lazy val root = (project in file(".")).
  aggregate(jvm, js).
  settings(
    publish := {},
    publishLocal := {}
  )

lazy val cross = crossProject.in(file(".")).
  settings(
    name := "Taja",

    version := "1.1.0",

    resolvers += "Artima Maven Repository" at "http://repo.artima.com/releases",

    libraryDependencies += "org.scalactic" %% "scalactic" % "3.0.0",
    libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.0" % "test"
  )

lazy val jvm = cross.jvm
lazy val js = cross.js.enablePlugins(ScalaJSPlugin)