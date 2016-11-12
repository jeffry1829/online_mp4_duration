var request = require('request');
var range = new require('http-range').Range('bytes', '36-44'); // i need to check the range...

function run(url, cb){
    var options = {
        url: url,
        headers: {
            'Content-type': 'application/octet-stream',
            'Range': range
        }
    };
    request(options, function(err, res, body){
        if(err){
            cb(err);
            return;
        }
        console.log(res.headers);
        try{
            var buf = new Buffer(body, 'binary');
            var time_scale = buf.slice(0,4).readInt32LE();
                console.log('time_scale => '+time_scale);
            var duration = buf.slice(4,8).readInt32LE();
                console.log('duration => '+duration);
            var result = duration/time_scale;
            cb(null, result);
        }catch(err){
            cb(err);
        }
    });
}
module.exports = run;