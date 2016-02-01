// var crypto = require('crypto');
// var name = 'I love Node.js';
// var hash = crypto.createHash('md5').update(name).digest("hex");
// console.log(hash);
'use strict';

var thrift = require('thrift');
var Q = require('q');
var HBase = require('./gen-nodejs/Hbase.js');
var HBaseTypes = require('./gen-nodejs/Hbase_types.js');

var Get = require('./get'),
  Put = require('./put'),
  Del = require('./del'),
  Inc = require('./inc'),
  Scan = require('./scan');

var Client = function(options) {
  if (!options.host || !options.port) {
    callback(true, 'host or port is none');
  }
  this.host = options.host || 'master';
  this.port = options.port || '9090';

  this.connection = thrift.createConnection(this.host, this.port, {
    transport: thrift.TBufferedTransport,
    protocol: thrift.TBinaryProtocol
  });
}

Client.create = function(options) {
  return new Client(options)
}

Client.prototype.getClient = function(callback) {
  var that = this;

  if (callback === undefined) {
    that.connectin.on('connect', function() {
      var _defer = Q.defer();
      var client = thrift.createClient(HBase, that.connection);
      console.log('connected');
      if (client !== null && client !== undefined) {
        _defer.resolve(true, client);
      } else {
        _defer.reject('error', client);
      }
      return _defer.promise;
    });
  } else {
    that.connectin.on('connect', function() {
      var client = thrift.createClient(HBase, that.connection);
      callback(true, err);
    });
  }

  that.connection.on('data', function(err, data) {
    if (err) { console.log('data error', err); }
  });

  that.connection.on('error', function(err) {
    if (err) { console.log('error', err) }
    callback(true, err);
  });

  that.connection.on('close', function() {
    console.log('close');
  });
}

Client.prototype.Get = function() { return new Get(row); }
Client.prototype.Put = function() { return new Put(row); }
Client.prototype.Del = function() { return new Del(row); }
Client.prototype.Inc = function() { return new Inc(row); }
Client.prototype.Scan = function() { return new Scan(); }

/**
 * [function description]
 * @param  {[type]}   table    [description]
 * @param  {[type]}   param    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Client.prototype.get = function(table, param, callback) {
  var that = this;
  // 处理参数
  if (!row) {
    callback(null, 'rowKey is null');
  }
  var query = {};
  query.row = row;
  var columns = [];
  if (param.familyList && param.familyList.length > 0) {
    _.each(param.familyList,function(ele,idx){
      columns.push(new HBaseTypes.TColumn(ele));
    });
    query.columns = columns;
  }

  var rowType = null;
  var columnType = null;

  var row = param.row;


  if (row != undefined && row != null && typeof row == 'string') {
    rowType = 1;
  } else {
    rowType = 2;
  }

  if (param.familyList && param.familyList.length == 1 && param.familyList.length > 1) {
    columnType = 1;
  } else {
    columnType = 2;
  }



  that.getClient(function(err, client) {
    if (err) {
      callback(null);
      return;
    }
    // 传入参数
    client.get(table, query.row, query.columns, null, function(err, data) {
      if (err) {
        callback(err.message.slice(0,120));
        // console.log('error:', err);
        return;
      }
      callback(null, data);
      // console.log('table data:', data);
      // for (var i = 0 ; i < data.length; i++) {
      //   console.log(data[i].value.toString());
      // }
      that.connection.end();
    });
  });
}

Client.prototype.getRow = function() {}
Client.prototype.put = function() {}
Client.prototype.putRow = function() {}
Client.prototype.Del = function() {}
Client.prototype.DelRow = function() {}
Client.prototype.inc = function() {}
Client.prototype.incRow = function() {}
Client.prototype.scan = function() {}
Client.prototype.scanRow = function() {}

module.exports = Client;
