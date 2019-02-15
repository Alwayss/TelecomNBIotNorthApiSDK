var assert = require('assert');
var fs = require('fs');
var TelecomNBNorthSDK = require('..');

var telecomNBNorthSDK = new TelecomNBNorthSDK({
  host: '180.101.147.89',
  port: 8743,
  cert: fs.readFileSync('./cert/outgoing.CertwithKey.pem'),
  passphrase: '123456',
  appId: 'GnkVZrG3LL1f7xROKJe7wLTJNcEa',
  secret: '4nKWxW5z8ytateSfh2vXQ5FCXEAas'
});

var deviceId = '95dfbe0b-fa7c-4645-912d-c286cb68bbdc';

describe('TelecomNBNorthSDK', function() {
  describe('#init()', function() {
    it('err should be undefined', function() {
      telecomNBNorthSDK.init(function(err) {
        assert.ifError(err);
      })
    });
  });

  describe('#getDeviceCommands()', function(){
    it('err should be undefined, data should be array', function() {
      telecomNBNorthSDK.getDeviceCommands(deviceId, function(err, data) {
        assert.ifError(err);
        assert()
      })
    });
  });

  describe('#sendCommand()', function(){
    it('err should be undefined, data should be object', function() {
      telecomNBNorthSDK.sendCommand(function(err, data) {
        assert.ifError(err);
        assert()
      })
    });
  });
});