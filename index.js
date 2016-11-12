var http = require('http');
function run(url, cb){
    var req = http.request(url, function(res){
        res.on('readable', function(){
            var chunk = res.read();
            if(chunk === null) return;
            var offset;
            if(offset = chunk.indexOf(new Buffer([0x6D, 0x76, 0x68, 0x64])) !== -1){
                req.abort();
                try{
                    var buf = new Buffer(chunk);
                    var time_scale = buf.slice(offset+16,offset+20).readInt32BE();
                    var duration = buf.slice(offset+20,offset+24).readInt32BE();
                    var result = duration/time_scale;
                    cb(null, result);
                }catch(err){
                    cb(err);
                }
            }
        });
    });
    req.end();
    req.on('error', function(e){
        console.log('problem with request: '+e.message);
    });
}
module.exports = run;