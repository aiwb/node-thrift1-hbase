var HBase = require('../index');

var config = {
  host: 'xxx.xxx.xxx.xxx',
  prot: 9090
};

var hbase = HBase.client(config);

hbase.getClient(function(err, client) {
  console.log(client);
});

var client = hbase.getClient();

// client.then(function() {
//   console.log('error');
// });

console.log('client', client);
