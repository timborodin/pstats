'use strict';

function tryToInstrumentQ (stats) {
	try {
		var Q = require('q');

		if (!Q.makePromise) {
			console.log('This version of Q is not supported.');
			return;
		}

		Q.makePromise.prototype.stats = function (name) {
			var start = Date.now();

			stats.increment(name + '.attempted');

			this
				.then( function () {
					stats.increment(name + '.succeeded');
				})
				.catch( function () {
					stats.increment(name + '.failed');
				})
				.finally( function () {
					stats.timing(name + '.duration', Date.now() - start);
				});

			return this;
		};
	} catch (error) {
		// Q not found.
	}
}

module.exports = function (stats) {
	if (!stats) {
		throw new Error('stats instance is expected.');
	}

	if ((typeof stats.increment !== 'function') || (typeof stats.timing !== 'function'))  {
		throw new Error('Expected stats instance with methods \'increment\' and \'timing\'.');
	}

	tryToInstrumentQ(stats);
};
