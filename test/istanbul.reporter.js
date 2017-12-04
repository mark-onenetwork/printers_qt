/* eslint-disable */

const instanbul = require('istanbul');
const MochaSpecReporter = require('mocha/lib/reporters/spec');

module.exports = function (runner) {
  const collector = new instanbul.Collector();
  const reporter = new instanbul.Reporter();
  reporter.addAll(['lcov', 'json']);
  new MochaSpecReporter(runner);

  runner.on('end', () => {
    collector.add(global.__coverage__);

    reporter.write(collector, true, () => {
      process.stdout.write('report generated');
    });
  });
};
