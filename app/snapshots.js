var stats = require('./services');
var storage = require('./storage');

var service = {
	make: function() {
		return stats().then(function() {
			return storage.save();
		});
	}
};

module.exports = service;
