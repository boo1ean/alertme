var fs = require('q-io/fs');

var storagePath = __dirname + '/../storage/'
var resolvePath = function(filename) {
	return storagePath + filename;
};

var storage = {
	save: function(snapshot) {
		var now = new Date().getTime();
		var filePath = resolvePath(now);

		return fs.write(filePath, JSON.stringify(snapshot));
	}
};

module.exports = storage;
