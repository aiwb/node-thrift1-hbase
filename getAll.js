var thrift = require('thrift'),
HBase = require('../../gen-nodejs/THBaseService'),
HBaseTypes = require('../../gen-nodejs/Hbase_types');

var connection = thrift.createConnection('10.15.5.120',2181,{ transport: thrift.TBufferedTransport,protocol:thrift.TBinaryProtocol });

connection.on('connect',function(){
  console.log('connected');
  var client = thrift.createClient(HBase,connection);
    client.getTableNames(function(err,data){
    if(err)
        console.log('there was an error:',err);
    else
        console.log('hbase tables:',data);
    });
});

connection.on('error',function(err){
    console.log('error',err);
});
