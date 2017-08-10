'use strict'

const path = require('path')
const assert = require('assert')

describe('nock-back-mocha', () => {
  it('dangles nockDone on the currentTest', (done) => {
    const nockBackMocha = require('..')(path.resolve(__dirname, 'fixtures'))
    const mochaContext = {
      currentTest: {
        fullTitle() { return 'current test title' },
      },
    }
    nockBackMocha.beforeEach.call(mochaContext, (err) => {
      assert(typeof mochaContext.currentTest.nockDone, 'function', 'nockDone must be set by beforeEach')
      done(err)
    })
  })

  it('runs only on filtered test', (done) => {
    function filter() {
      return false
    }
    const nockBackMocha = require('..')(path.resolve(__dirname, 'fixtures'), filter)
    const mochaContext = {
      currentTest: {
        fullTitle() { return 'current test title' },
      },
    }

    nockBackMocha.beforeEach.call(mochaContext, (err) => {
      assert.equal(typeof mochaContext.currentTest.nockDone, 'undefined', 'nockDone must be set by beforeEach')
      done(err)
    })
  })

  it('throws if file path is used more than once', (done) => {
    const nockBackMocha = require('..')(path.resolve(__dirname, 'fixtures'))
    const mochaContext = {
      currentTest: {
        fullTitle() { return 'current test title' },
      },
    }
    nockBackMocha.beforeEach.call(mochaContext, () => {
      nockBackMocha.beforeEach.call(mochaContext, (err) => {
        assert(err && err.message === 'nock-back-mocha does not support multiple tests with the same name. current test title.json cannot be reused.')
        done()
      })
    })
  })
})
