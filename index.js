var http = require('http');
var urlp = require('url').parse;
// 36-44
function run(url, cb){
    var req = http.request(url, function(res){
        console.log('inininin');
        res.on('readable', function(){
            var chunk = readable.read(44);
        });
        req.end();
        console.log(res.headers);
        try{
            var buf = new Buffer(body, 'binary');
            var time_scale = buf.slice(36,40).readInt32BE();
            console.log('time_scale => '+time_scale);
            var duration = buf.slice(40,44).readInt32BE();
            console.log('duration => '+duration);
            var result = duration/time_scale;
            cb(null, result);
        }catch(err){
            cb(err);
        }
    });
    req.on('error', function(e){
        console.log('problem with request: '+e.message);
    });

}
module.exports = run;