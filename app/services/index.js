var Q = require('q');
var _ = require('lodash');

var services = {
	mem: require('./mem'),
	cpu: require('./cpu')
};

module.exports = function() {
	var data = {};

	return Q.all(_.map(services, function(service, name) {

		return service.stats().then(function(result) {
			data[name] = result;
		});

	})).then(function() {

		return data;

	});
};
