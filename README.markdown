#Online_mp4_duration  
This module can get online .mp4 file's duration  
##Usage  
```npm install online_mp4_duration  
var onlinemp4duration = require('online_mp4_duration');  
onlinemp4duration('http://example.com/instance.mp4', function(err, duration){})```  
##Notice  
The url need to return .mp4 file DIRECTLY   
For example, you shouldn't input a url which return 302  
  
and this module won't check the url, you need to check user input yourself.