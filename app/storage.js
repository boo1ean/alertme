var fs = require('q-io/fs');
var Q = require('q');

var storagePath = __dirname + '/../storage/'
var resolvePath = function(filename) {
	return storagePath + filename;
};

var totalRecords = 0;

var storage = {
	save: function(snapshot) {
		var filePath = resolvePath(totalRecords++);
		return fs.write(filePath, JSON.stringify(snapshot));
	},

	get: function(index) {
		var filePath = resolvePath(index);
		return fs.read(filePath).then(function(out) {
			return JSON.parse(out);
		});
	},

	last: function() {
		return storage.get(totalRecords - 1);
	},

	lastTwo: function() {
		if (totalRecords < 2) {
			throw new Error('Not enough snapshots');
		}

		var deferred = Q.defer();

		Q.all([
			storage.get(totalRecords - 2),
			storage.get(totalRecords - 1)
		]).then(function(results) {
			deferred.resolve(results[0], results[1]);
		}, function() {
			deferred.reject(arguments);
		});

		return deferred.promise;
	}
};

module.exports = storage;
