
  // client.getTableNames(function(err,data) {
  //   if (err) {
  //     console.log('get table names error:', err);
  //   } else {
  //     console.log('hbase tables:', data);
  //     for(var i = 0; i < data.length; i++) {
  //       console.log(data[i].toString());
  //     // for (var value in data[i]) {
  //     //   console.log(value);
  //     // }
  //     }
  //   }
  //   connection.end();
  // });

  // client.getColumnDescriptors('spiderweb', function(err, data) {
  // 	if (err) {
		// console.log('get columnDescriptor names error:', err);
	// } else {
		// console.log('hbase columnDescriptor:', data);
	// }
  //   connection.end();
  // });

//  client.getTableRegions('spiderweb', function(err, data) {
//   	if (err) {
// 		console.log('get table regions names error:', err);
// 	} else {
// 		console.log('hbase table regions :', data);
// 	}
//     connection.end();
//   });

//     var mutations = [
//         new HBaseTypes.Mutation({column: 'webdata:md5', value: 'jlaksdjflasjdf'}),
//         new HBaseTypes.Mutation({column: 'webdata:url', value: 'http://www.mogujie.com/'}),
//         new HBaseTypes.Mutation({column: 'webdata:html', value: '<!doctype><html><head><title>title</title></head><body>body</body></html>'})
//     ];

//    client.mutateRow('spiderweb', 'test1', mutations, null, function(err, data) {
//            if (err) {
//                 console.log(err)
//            } else {
//                 console.log('success');
//                 console.log(data)
//            }
//            connection.end();
//    });
