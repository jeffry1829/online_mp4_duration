var request = require('request');
var range = new require('http-range').Range('bytes', '28-36'); // i need to check the range...

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
            console.log(err);
            return;
        }
        var buf = new Buffer(body, 'binary');
        var time_scale = buf.slice(0,4).readInt32BE();
        var duration = buf.slice(4,8).readInt32BE();
        var result = duration/time_scale;
        console.log('time in sec => '+result);
        cb(result);
    });
}