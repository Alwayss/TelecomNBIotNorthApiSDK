'use strict';
const https = require('https');
const querystring = require('querystring');

function TelecomNBNorthSDK(option) {
  var optType = Object.prototype.toString.call(option);
  if (optType !== "[object Object]") {
    throw new Error('option must be object');
  }

  if (!option.hasOwnProperty('cert') || !option.hasOwnProperty('passphrase')) {
    throw new Error('cert or passphrase can\'t be null');
  }

  if (!option.hasOwnProperty('appId') || !option.hasOwnProperty('secret')) {
    throw new Error('cert or passphrase can\'t be null');
  }

  this.option = {
    hostname: option.host || '180.101.147.89',
    port: option.port || 8743,
    key: option.cert,
    cert: option.cert,
    passphrase: option.passphrase,
    strictSSL: false,
    rejectUnauthorized: false
  };

  this.appId = option.appId;
  this.secret = option.secret;

  this.accessToken = null;
}

TelecomNBNorthSDK.prototype.init = function (cb) {
  var that = this;
  this.authorization(function (err, token) {
    if (err) return cb(err);
    that.accessToken = token;
    cb();
  })
};

TelecomNBNorthSDK.prototype.authorization = function (cb) {
  var auth = querystring.stringify({
    appId: this.appId,
    secret: this.secret
  });

  var requestOpts = deepCopy(this.option);
  requestOpts.path = '/iocm/app/sec/v1.1.0/login';
  requestOpts.method = 'POST';
  requestOpts.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': auth.length
  };

  request('post', requestOpts, auth, function (err, data) {
    if (err) return cb(err);
    var token = data['tokenType'] + ' ' + data['accessToken'];
    cb(null, token);
  });
};

TelecomNBNorthSDK.prototype.getDeviceComands = function (deviceId, cb) {
  var requestOpts = deepCopy(this.option);
  requestOpts.path = '/iocm/app/cmd/v1.4.0/deviceCommands';
  requestOpts.method = 'GET';
  requestOpts.headers = {
    'Content-Type': 'application/json',
    'app_key': this.appId,
    'Authorization': this.accessToken
  };

  request('get', requestOpts, function (err, data) {
    if (err) return cb(err);
    cb(null, data);
  });
};

TelecomNBNorthSDK.prototype.sendCommand = function (deviceId, serviceId, commandName, paras, cb) {
  if (paras) {
    var parasType = Object.prototype.toString.call(paras);
    if (parasType !== "[object Object]") {
      throw new Error('option must be object');
    }
  }
  var command = JSON.stringify({
    deviceId: deviceId,
    command: {
      serviceId: serviceId,
      method: commandName,
      paras: paras
    }
  });

  var requestOpts = deepCopy(this.option);
  requestOpts.path = '/iocm/app/cmd/v1.4.0/deviceCommands';
  requestOpts.method = 'POST';
  requestOpts.headers = {
    'Content-Type': 'application/json',
    'app_key': this.appId,
    'Authorization': this.accessToken
  };

  request('post', requestOpts, command, function (err, data) {
    if (err) return cb(err);
    cb(null, data);
  });
};

module.exports = TelecomNBNorthSDK;

function request(type, opts, body, cb) {
  type = type.toLowerCase();
  if (typeof body === "function") {
    cb = body;
  }

  var req = https.request(opts, function (res) {
    res.on('data', function (data) {
      data = JSON.parse(data.toString());
      if (res.statusCode === 200 || res.statusCode === 201) {
        cb(null, data);
      } else {
        var error = new Error();
        error.code = data['error_code'];
        error.message = data['error_desc'];
        cb(error);
      }
    });
  });

  if (type === "get") {
    req.end();
  } else if (type === "post") {
    req.write(body, function () {
      req.end();
    });
  }

  req.on('error', function (err) {
    throw err;
  });
}

function deepCopy(obj) {
  var _toString = Object.prototype.toString;

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime());
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    var flags = [];
    if (obj.global) {
      flags.push('g');
    }
    if (obj.multiline) {
      flags.push('m');
    }
    if (obj.ignoreCase) {
      flags.push('i');
    }

    return new RegExp(obj.source, flags.join(''));
  }

  var result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key]);
    }
  }

  return result;
}