const { sign, verify } = require('./security/jwt');


console.log(sign('ssadmin2'))

console.log(verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNzYWRtaW4yIiwiaWF0IjoxNzA0MTE5Mzg1fQ.EEMfbUynH_IQWJ2Ql1GyATdK51661TJHqX62_4F8kZM'))