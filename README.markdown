# Online_mp4_duration [![Build Status](https://travis-ci.org/jeffry1829/online_mp4_duration.svg?branch=master)](https://travis-ci.org/jeffry1829/online_mp4_duration)  
This module can get online .mp4 file's duration  
## Usage  
<code>$npm install online_mp4_duration</code>  
<code>var onlinemp4duration = require('online_mp4_duration');  
onlinemp4duration({url: 'http://example.com/instance.mp4', full_scan: true/false}, function(err, duration){})</code>  
full_scan enables you to decide whether it will scan through whole mp3 file if there's no metadata in the first 1MB and the last 1MB  
## Notice  
1) this module won't check the url, you need to check user input yourself.  
2) I can't have good test .mp4 url, so there may be lots of bugs. Feel free to send PullRequest :D  
