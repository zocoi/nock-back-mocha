'use strict'

const nock = require('nock')
const sanitize = require('sanitize-filename')

module.exports = (fixtures) => {
  const filenames = []
  return {
    beforeEach(done) {
      const fullTitle = this.currentTest.fullTitle()
      const filename = sanitize(`${fullTitle}.json`)
      // make sure we're not reusing the nock file
      if (filenames.indexOf(filename) !== -1) {
        return done(new Error(`nock-back-mocha does not support multiple tests with the same name. ${filename} cannot be reused.`))
      }
      filenames.push(filename)

      const previousFixtures = nock.back.fixtures
      nock.back.fixtures = fixtures

      nock.back(filename, (nockDone) => {
        this.currentTest.nockDone = () => {
          nockDone()
          nock.back.fixtures = previousFixtures
        }
        done()
      })
    },
    afterEach() {
      if (this.currentTest.nockDone) {
        this.currentTest.nockDone()
      }
    },
  }
}
