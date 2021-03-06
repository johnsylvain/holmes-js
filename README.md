# Holmes
[![Travis](https://img.shields.io/travis/johnsylvain/holmes-js.svg)](https://travis-ci.org/johnsylvain/holmes-js)
[![npm](https://img.shields.io/npm/v/holmes-js.svg)](https://npmjs-org/package/holmes-js)
[![API Stability](https://img.shields.io/badge/stability-experimental-orange.svg)](https://nodejs.org/api/documentation.html#documentation_stability_index)
> Anonymous browser fingerprinting

### What is browser fingerprinting?
Browser fingerprinting is the capability of a site to identify or
re-identify a visiting user, user agent or device via configuration settings or
other observable characteristics.

## Features
- Persist fingerprint through sessions
- Singleton design pattern
  - Improves speed in large applications
  - Removes inconsistencies during browser sessions

## Usage

### Installation
```bash
# yarn
yarn add holmes-js

# npm
npm install holmes-js --save
```

### Example
```js
import Holmes from 'holmes-js'

const holmes = new Holmes()

// return unique browser fingerprint as 32-bit Integer
const fingerprint = holmes.get()

// reset holmes instance
const newHolmes = holmes.reset()
```

## Contributing
You can request a new feature by submitting an issue. If you would like to implement a new feature feel free to issue a Pull Request.

## License
holmes-js is protected under the [MIT License](https://choosealicense.com/licenses/mit/)