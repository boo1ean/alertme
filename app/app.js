var snapshots = require('./snapshots');
var cpu = require('./services/cpu');
var storage = require('./storage');
var diff = require('deep-diff').diff;
var Q = require('q');
var watch = require('./watch');

watch();
