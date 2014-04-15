var snapshots = require('./services/snapshots');
var referee = require('./referee');
var allServices = Object.keys(require('./services'));

var defaultSnapshotIntervalMS = 1000;
var defaultCheckIntervalMS = 5000;

var snapshotInterval = null;
var checkInterval = null;

var watch = function(services, snapshotIntervalMS, checkIntervalMS) {
	services = services || allServices
	snapshotIntervalMS = snapshotIntervalMS || defaultSnapshotIntervalMS;
	checkIntervalMS = checkIntervalMS || defaultCheckIntervalMS;

	snapshots.use(services);

	snapshotInterval = setInterval(snapshots.make, snapshotIntervalMS);
	checkInterval = setInterval(referee.judge, checkIntervalMS);
};

watch.stop = function() {
	clearInterval(snapshotInterval);
	clearInterval(checkInterval);
};

module.exports = watch;
