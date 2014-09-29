'use strict';

var Q = require('q');

var statsMock = {
	increment: function (metric, value) {
		console.log('Counter metric ' + metric + ' is incremented by ' + ((value === undefined) ? 1 : value));
	},

	timing: function (metric, value) {
		console.log('Timing metric ' + metric + ' got new sample of ' + value);
	}
};

require('./index')(statsMock);

Q('Ok').stats('pstats.test.then');
Q.reject('Error').stats('pstats.test.catch');
Q.delay(10).stats('pstats.test.thenWithDelay');
