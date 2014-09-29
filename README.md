Including this module will apply a patch to Q library that will extend promises with *stats* method. 


```javascript
var StatsD = require('node-statsd').StatsD;
var statsClient = new StatsD({prefix: 'project.'});

require('pstats')(statsClient);

longAsyncOperation()
    .then(anotherLongAsyncOperation)
    .stats('operations.xxx');
```

This will send following stats to graphite:
```
Counters:
    project.operations.xxx.attempted +1
    project.operations.xxx.succeeded +1
    or
    project.operations.xxx.failed +1
Timing:
    project.operations.xxx.duration dt
```

Start time is the moment when your promise chain is being constructed (stats method called). 