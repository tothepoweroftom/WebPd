var _ = require('underscore')
  , helpers = require('../../helpers')

describe('dsp.line~', function() {

  afterEach(function() {
    Pd.stop()
    Pd.getDefaultPatch().objects = []
  })

  it('should have value 0 by default', function(done) {
    var line = new Pd.lib['line~']()
      , dac = new Pd.lib['dac~']()

    helpers.expectSamples(function() {
      line.o(0).connect(dac.i(0))
    }, [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], done)
  })

  it('should update value when sending a message to inlet 0', function(done) {
    var line = new Pd.lib['line~']()
      , dac = new Pd.lib['dac~']()

    helpers.expectSamples(function() {
      line.o(0).connect(dac.i(0))
      line.i(0).message(1345.99)
    }, [
      [1345.99, 1345.99, 1345.99, 1345.99, 1345.99, 1345.99, 1345.99, 1345.99, 1345.99, 1345.99],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], done)
  })

  it('should output a ramp when sending a list of numbers to inlet 0', function(done) {
    var line = new Pd.lib['line~']()
      , dac = new Pd.lib['dac~']()

    helpers.expectSamples(function() {
      line.o(0).connect(dac.i(0))
      line.i(0).message(441, 10)
    }, [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], done)
  })

})