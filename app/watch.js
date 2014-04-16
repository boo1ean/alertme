var snapshots = require('./snapshots');
var stats = require('./services');
var referee = require('./referee');
var _ = require('lodash');

var snapshotInterval = null;
var checkInterval = null;

var defaults = {
	snapshots: false,
	check: true,
	snapshotIntervalMS: 1000,
	checkIntervalMS: 5000,
	events: []
};

var watch = function(options) {
	options = _.defaults(options, defaults);

	if (options.snapshots) {
		snapshotInterval = setInterval(snapshots.make, options.snapshotIntervalMS);
	}

	if (options.check) {
		checkInterval = setInterval(function() {
			stats().then(function(snapshot) {
				referee.judge(options.events, snapshot);
			});
		}, options.checkIntervalMS);
	}
};

watch.stop = function() {
	clearInterval(snapshotInterval);
	clearInterval(checkInterval);
};

module.exports = watch;
