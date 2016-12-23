`The "REAL" post-commit hook is:
#!/bin/sh
echo Running post-commit hook
node ./post-commit.js
Code=$?
echo "Exit code $Code"
exit $Code
`

const fs = require('fs')
const exec = require('child_process').execSync
const packageJson = require('./package.json')

const fastOpt = exec('sbt fastOptJS')
console.log(fastOpt.toString())

const readme = fs.readFileSync('README.md').toString()

const sbtConfig = fs.readFileSync('build.sbt').toString()
const sbtVersion = sbtConfig.match(/version := \"([^"]+)\"/)[1]
packageJson['version'] = `${sbtVersion}-gen.${new Date().valueOf()}`

process.chdir('./npm')

fs.writeFileSync('README.md', readme)
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))

const npmPublish = exec('npm publish')
console.log(npmPublish.toString())