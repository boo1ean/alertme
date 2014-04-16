var stats = require('./services');
var storage = require('./storage');

var service = {
	make: function() {
		return stats().then(function(data) {
			return storage.save(data);
		});
	}
};

module.exports = service;
