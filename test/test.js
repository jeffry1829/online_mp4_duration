var assert = require('assert');
var omd = require('./../index');
describe('online_mp4_duration', function(){
    describe('http', function(){
        it('should return 13.504sec', function(done){
            omd({
                    url: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4',
                    full_scan: false
                }, function(err,duration){
                assert.equal(!err, true);
                assert.equal(duration, 13.504);
                done();
            });
        }).timeout(100000);
        it('should return no mp3 header found', function(done){
            omd({
                    url: 'http://electron.atom.io/docs/tutorial/quick-start/',
                    full_scan: true
                }, function(err,duration){
                assert.equal(err, 'no mp3 header found');
                done();
            });
        }).timeout(100000);
    });
    describe('https', function(){
        it('should be 203.91763333333333sec', function(done){
            omd({
                    url: 'https://docs.google.com/uc?id=0B8NqhmxRdDloRl9JcWlFbWhpT1E',
                    full_scan: false
                }, function(err, duration){
                assert.equal(!err, true);
                assert.equal(duration, 203.91763333333333);
                done();
            });
        }).timeout(100000);
    });
});
