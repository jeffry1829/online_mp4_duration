var assert = require('assert');
var omd = require('./../index');
describe('online_mp4_duration', function(){
    describe('http', function(){
        it('should return 13.504sec', function(done){
            omd('http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4', function(err,duration){
                assert.equal(!err, true);
                assert.equal(duration, 13.504);
                done();
            });
        }).timeout(10000);
    });
    describe('https', function(){
        it('should be 203.91763333333333sec', function(done){
            omd('https://docs.google.com/uc?id=0B8NqhmxRdDloRl9JcWlFbWhpT1E', function(err, duration){
                assert.equal(!err, true);
                assert.equal(duration, 203.91763333333333);
                done();
            });
        }).timeout(10000);
    });
});
