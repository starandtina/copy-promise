# copy-promise

> Filesystem copy method as promises.


## Getting started

### Node.js

```
$ npm install --save copy-promise
```

```js
var copyPromise = require('copy-promise');
copyPromise.copy('/tmp/myfile', '/tmp/myotherfile').then(() => {}); // return the promise
```

## License

MIT © Khalil Zhang
