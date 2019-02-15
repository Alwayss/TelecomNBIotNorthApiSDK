# TelecomNBIotNorthSDK

this module aim to simplify the development process

## Installation

```
$ npm install telecomnbiotnorthsdk --save
```

> <sub>Requires nodejs >= 0.10.x</sub>

## API

<a name="connect"></a>
### new TelecomNBNorthSDK(options)
specified and options and returns a instance.

The `options` argument is:

  * `host`: telecom iot platform host (default `180.101.147.89`)
  * `port`: telecom iot platform port (default `8743`)
  * `cert`: `fs.readFileSync('outgoing.CertwithKey.pem')`, outgoing.CertwithKey.pem
            is generated by outgoing.CertwithKey.pkcs12
  * `passphrase`: the password of outgoing.CertwithKey.pem

