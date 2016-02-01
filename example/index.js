var HBase = require('../index');

var config = {
  host: 'qihe2081',
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
