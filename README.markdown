#Online_mp4_duration [![Build Status](https://travis-ci.org/jeffry1829/online_mp4_duration.svg?branch=master)](https://travis-ci.org/jeffry1829/online_mp4_duration)  
This module can get online .mp4 file's duration  
##Usage  
```npm install online_mp4_duration```  
```var onlinemp4duration = require('online_mp4_duration');```  
```onlinemp4duration('http://example.com/instance.mp4', function(err, duration){})```  
##Notice  
1) this module won't check the url, you need to check user input yourself.  
2) I can't have good test .mp4 url, so there may be lots of bugs. Feel free to send PullRequest :D  