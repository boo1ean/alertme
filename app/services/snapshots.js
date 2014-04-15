var services = require('./');
var storage = require('../storage');
var _ = require('lodash');
var Q = require('q');

// TODO keep list of all services

var service = {
	make: function() {
		var data = {};

		return Q.all(_.map(services, function(service, name) {
			return service.stats().then(function(result) {
				data[name] = result;
			});
		})).then(function() {
			return storage.save(data);
		});
	},

	use: function(servicesToUse) {
		services = _.pick(services, servicesToUse);
	}
};

module.exports = service;
