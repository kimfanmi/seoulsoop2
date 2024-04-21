const { createId, checkPass } = require('./security/user');

console.log(createId('tester','123123'));

// checkPass('ssadmin','1234').then(result=>{
//   console.log(result);
// })
