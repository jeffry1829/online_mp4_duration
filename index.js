var http_anc = require('follow-redirects').http;
var https_anc = require('follow-redirects').https;
var urlp = require('url').parse;
var Range = require('http-range').Range;
var range = new Range('bytes', '-10240');
function run(obj, cb){ // req-tail
    var url = obj.url;
    var full_scan = obj.full_scan;

    var options = {
        hostname: urlp(url).hostname,
        port: urlp(url).port,
        path: urlp(url).path,
        method: 'GET',
        headers: {
            Range: range
        }
    };

    var http;
    var protocol = urlp(url).protocol;
    if(protocol === 'https:'){
        http = https_anc;
    }else if(protocol === 'http:'){
        http = http_anc;
    }else{
        cb('it seems that the url is not http nor https');
    }
    
    var req = http.request(options, function(res){
        if(res.statusCode !== 206){
            req.abort();
            req_head(http, url, full_scan, cb);
            return;
        }
        
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
                if(count >= 10240){
                    req_head(http, url, full_scan, cb);
                    req.abort();
                    return;
                }
            }
        });
    });

    req.end();
    req.on('error', function(e){
        console.log('problem with request: '+e.message);
    });
}
function req_head(http, url, full_scan, cb){
    var req = http.request(url, function(res){
        var count = 0;
        res.on('readable', function(){
            var chunk = res.read();
            var offset;
            if(chunk === null){
                cb('no mp3 header found');
                req.abort();
                return;
            }
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
                if(count >= 10240 && !full_scan){
                    cb('can\'t get duration in an easy way(no mp3 header found)');
                    req.abort();
                    return;
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