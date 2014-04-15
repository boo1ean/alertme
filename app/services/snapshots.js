var memory = require('./memory');
var storage = require('../storage');

var service = {
	make: function() {
		return memory.stats().then(function(data) {
			return storage.save(data);
		});
	}
};

module.exports = service;
