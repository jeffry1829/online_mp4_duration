var omd = require('./index.js');
omd('http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4', function(err,duration){
    if(!err){
        console.log(duration);
    }else{
        console.log(err);
    }
});

omd('https://redirector.googlevideo.com/videoplayback?requiressl=yes&id=711dc9ca524b6eeb&itag=22&source=webdrive&ttl=transient&app=explorer&ip=2a01:4f8:191:9296:e4c5:2ba3:901d:3260&ipbits=32&expire=1480523193&sparams=requiressl%2Cid%2Citag%2Csource%2Cttl%2Cip%2Cipbits%2Cexpire&signature=8CCD3079013D77561D2374CB5B76A2136E66A51.49AF1CF9A25B93F0DDA74F5E14449E6999EC5B52&key=ck2&mm=31&mn=sn-4g57kn66&ms=au&mt=1480508687&mv=m&nh=IgpwcjAxLmZyYTE2KgkxMjcuMC4wLjE&pl=40', function(err, duration){
    if(!err){
        console.log(duration);
    }else{
        console.log(err);
    }
});