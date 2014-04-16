var bus = require('./bus');

var referee = {
	judge: function(events, it) {
		for (var i in events) {
			if (eval(events[i].condition)) {
				bus.emit(events[i].name, it);
			}
		}
	}
};

module.exports = referee;
