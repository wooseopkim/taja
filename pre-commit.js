`The "REAL" pre-commit hook is:
#!/bin/sh
echo Running tests
sbt test
npm run test
echo Running pre-commit hook
node ./pre-commit.js
Code=$?
echo "Exit code $Code"
exit $Code
`

const fs = require('fs')
const exec = require('child_process').execSync
const packageJson = require('./package.json')
delete packageJson.devDependencies.webpack
delete packageJson.scripts.build

const fastOpt = exec('sbt fastOptJS')
console.log(fastOpt.toString())

const fullOpt = exec('sbt fullOptJS')
console.log(fullOpt.toString())

const readme = fs.readFileSync('README.md').toString()

const sbtConfig = fs.readFileSync('build.sbt').toString()
const sbtVersion = sbtConfig.match(/version := \"([^"]+)\"/)[1]
packageJson['version'] = `${sbtVersion}-gen.${new Date().valueOf()}`

const webpackP = exec('npm run build')
console.log(webpackP.toString())

process.chdir('./npm')

fs.writeFileSync('README.md', readme)
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))

const npmPublish = exec('npm publish')
console.log(npmPublish.toString())