var http = require('http');
var urlp = require('url').parse;
var range = new require('http-range').Range('bytes', '-1024');
function run(url, cb){
    var req = http.request(url, function(res){
        var count = 0;
        res.on('readable', function(){
            var chunk = res.read();
            var offset;
            if(chunk === null) return;
            count+=chunk.length;
            if((offset = chunk.indexOf(new Buffer([0x6D, 0x76, 0x68, 0x64]))) !== -1){
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
            }else{
                if(count>1024){
                    req_tail(url, cb);
                }
            }
        });
    });
    req.end();
    req.on('error', function(e){
        console.log('problem with request: '+e.message);
    });
}
function req_tail(url, cb){
    var options = {
        hostname: urlp(url).hostname,
        port: urlp(url).port,
        path: urlp(url).path,
        method: 'GET',
        headers: {
            Range: range
        }
    };
    var req = http.request(options, function(res){
        if(res.statusCode !== 206){
            cb('can\'t get duration in an easy way...');
        }
        res.on('readable', function(){
            var chunk = res.read();
            var offset;
            count+=chunk.length;
            if(chunk === null) return;
            if((offset = chunk.indexOf(new Buffer([0x6D, 0x76, 0x68, 0x64]))) !== -1){
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
            }else{
                if(count > 1024){
                    cb('can\'t get duration in an easy way');
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