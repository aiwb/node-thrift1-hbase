
/**
 * Created by rubinus on 14-10-20.
 */

"use strict";

/**
 * Module dependencies.
 */

var Client = require('./client');
var HBase = require('./gen-nodejs/Hbase.js');
var HBaseTypes = require('./gen-nodejs/Hbase_types.js');

exports.client = Client.create;
exports.HBase = HBase;
exports.HBaseTypes = HBaseTypes;
