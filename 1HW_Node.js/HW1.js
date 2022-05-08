var http = require('http')
var date_ob = new Date();
var name ='Suphanat Fakluang';
var Hours = date_ob.getHours();
var Minutes = date_ob.getMinutes();

http
.createServer(function (req, res) {

res.writeHead(200, { 'Content-Type': 'text/plain' })
res.end(name + ' Time at '+Hours+' : '+Minutes)
})
.listen(2337, '127.0.0.1')
console.log('Server running at http://127.0.0.1:2337/')
