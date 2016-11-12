var http = require('http');
function run(url, cb){
    var req = http.request(url, function(res){
        res.on('readable', function(){
            var chunk = res.read(52);
            if(chunk === null) return;
            console.log(chunk);
            req.abort();
            try{
                var buf = new Buffer(chunk);
                var time_scale = buf.slice(44,48).readInt32BE();
                var duration = buf.slice(48,52).readInt32BE();
                var result = duration/time_scale;
                cb(null, result);
            }catch(err){
                cb(err);
            }
        });
    });
    req.end();
    req.on('error', function(e){
        console.log('problem with request: '+e.message);
    });
}
module.exports = run;