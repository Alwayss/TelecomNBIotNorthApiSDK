var should = require('should');
var fs = require('fs');
var TelecomNBNorthSDK = require('..');

var telecomNBNorthSDK = new TelecomNBNorthSDK({
  host: '180.101.147.89',
  port: 8743,
  cert: fs.readFileSync('./cert/outgoing.CertwithKey.pem'),
  passphrase: 'xxxxx',
  appId: 'xxxx',
  secret: 'xxx'
});

var deviceId = 'xxxxxxxx';

describe('TelecomNBNorthSDK', function() {
  describe('#init()', function() {
    it('should init without error', function(done) {
      telecomNBNorthSDK.init(function(err) {
        should.not.exist(err);
        done();
      })
    });
  });

  describe('#getDeviceCommands()', function(){
    it('err should be undefined, data should be array', function(done) {
      telecomNBNorthSDK.getDeviceCommands(deviceId, function(err, data) {
        should.not.exist(err);
        should(data).be.a.Array();
        done();
      })
    });
  });

  describe('#sendCommand()', function(){
    it('err should be undefined, data should be object', function(done) {
      telecomNBNorthSDK.sendCommand(function(err, data) {
        should.not.exist(err);
        data.should.be.a.Object();
        done();
      })
    });
  });
});