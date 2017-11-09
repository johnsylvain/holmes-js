# Holmes
[![Travis](https://img.shields.io/travis/johnsylvain/holmes-js.svg)]()
[![npm](https://img.shields.io/npm/v/holmes-js.svg)]()
[![API Stability](https://img.shields.io/badge/stability-experimental-orange.svg)]()
> Anonymous browser fingerprinting

### What is browser fingerprinting?
Browser fingerprinting is the capability of a site to identify or
re-identify a visiting user, user agent or device via configuration settings or
other observable characteristics.

## Features
- Promise based API
- Singleton design pattern
  - Improves speed for usage in large applications

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
import Holmes from 'holmes-js';

const holmes = new Holmes();

// return unique browser fingerprint as 32-bit Integer
const fingerprint = await holmes.get();

// reset holmes instance
const newHolmes = holmes.reset();
```

## Contributing
You can request a new feature by submitting an issue. If you would like to implement a new feature feel free to issue a Pull Request.

## License
holmes-js is protected under the [MIT License](https://choosealicense.com/licenses/mit/)