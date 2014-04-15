var exec = require('child_process').exec,
    Q = require('q');

module.exports = function(command) {
	var deferred = Q.defer();

	exec(command, function(err, stdout, stderr) {
		if (err) {
			return deferred.reject(err, stdout, stderr);
		}

		deferred.resolve(stdout, stderr);
	});

	return deferred.promise;
};
