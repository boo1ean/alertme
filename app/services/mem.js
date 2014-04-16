var exec = require('../exec');

var command = '/usr/bin/free -tmo | /usr/bin/tail -n+2 | /usr/bin/awk \'{print $2","$3-$6-$7","$4+$6+$7}\'';

var service = {
	stats: function() {
		return exec(command).then(function(out) {
			out = out.split('\n').filter(Boolean).map(function(row) {
				return row.split(',').map(Number);
			});

			var data = {
				memory: {
					total: out[0][0],
					used: out[0][1],
					free: out[0][2]
				},

				swap: {
					total: out[1][0],
					used: out[1][1],
					free: out[1][2]
				},

				total: {
					total: out[2][0],
					used: out[2][1],
					free: out[2][2]
				}
			};

			return data;
		});
	}
};


module.exports = service;
