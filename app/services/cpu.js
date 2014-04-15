var exec = require('../exec');
var Q = require('q');

var commandNumberOfCores = '/bin/grep -c ^processor /proc/cpuinfo';
var commandLoadAverage = '/bin/cat /proc/loadavg | /usr/bin/awk \'{print $1","$2","$3}\''

var numberOfCores = null;

var getNumberOfCores = function() {

	// Best caching ever
	if (numberOfCores) {
		return Q(numberOfCores);
	}

	return exec(commandNumberOfCores).then(function(out) {
		numberOfCores = out - 0;
		return numberOfCores;
	});

};

var getAverageLoad = function() {
	return exec(commandLoadAverage).then(function(out) {
		return out.split(',').map(Number);
	});
};

var service = {
	stats: function() {
		return Q.all([
			getNumberOfCores(),
			getAverageLoad()
		]).spread(function(numberOfCores, load) {
			var data = {
				one: load[0] / numberOfCores * 100,
				five: load[1] / numberOfCores * 100,
				fifteen: load[2] / numberOfCores * 100
			};

			return data;
		});
	}
};

module.exports = service;
