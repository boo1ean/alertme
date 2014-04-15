var snapshots = require('./services/snapshots');
var referee = require('./referee');

var defaultSnapshotIntervalMS = 1000;
var defaultCheckIntervalMS = 5000;

var snapshotInterval = null;
var checkInterval = null;

var watch = function(resources, snapshotIntervalMS, checkIntervalMS) {
	snapshotIntervalMS = snapshotIntervalMS || defaultSnapshotIntervalMS;
	checkIntervalMS = checkIntervalMS || defaultCheckIntervalMS;

	snapshotInterval = setInterval(snapshots.make.bind(null, resources), snapshotIntervalMS);
	checkInterval = setInterval(referee.judge, checkIntervalMS);
};

watch.stop = function() {
	clearInterval(snapshotInterval);
	clearInterval(checkInterval);
};

module.exports = watch;
