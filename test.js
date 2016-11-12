var omd = require('./index.js');
omd('http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4', function(err,duration){
    if(!err){
        console.log(duration);
        console.log('should be 5sec');
    }else{
        console.log(err);
    }
});