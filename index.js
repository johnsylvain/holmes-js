/**
 * Holmes class
 * @class
 */
var Holmes = (function() {

  var instance;
  
  /**
   * Initializes a new instance of Holmes
   * @constructor Holmes
   */
  function Holmes() {
    if (typeof instance === 'object') {
      return instance;
    }

    instance = this;

    this.fingerprint = null;

    try {
      this.characteristics = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        colorDepth: screen.colorDepth,
        timezoneOffset: new Date().getTimezoneOffset(),
        hasLocalStorage: !!window.localStorage,
        hasSessionStorage: !!window.sessionStorage,
        plugins: Array.from(navigator.plugins).map(function(p) {
          var mimeTypes = Array.from(p).map(function(m) {
            return [m.type, m.suffixes].join('~');
          });
          return [p.name, p.description, mimeTypes].join('::');
        }).join('')
      }
    } catch (e) {
      // ignore
    }

    return instance;
  }
  
  /**
   * Gets browser fingerprint
   * @name Holmes#get
   */
  Holmes.prototype.get = function() {
    if (this.fingerprint) {
      return Promise.resolve(this.fingerprint);
    }

    var key = Object.keys(this.characteristics).reduce(function(str, cur) {
      return str + this.characteristics[cur];
    }.bind(this), '');

    this.fingerprint = this.hash(key, 256);

    instance = this;

    return Promise.resolve(this.fingerprint);
  }

  /**
   * Hashes string to 32bit Integer using Murmur Hash Algorithm
   * @name Holmes#hash
   * @param  {string} key ASCII string to be hashed
   * @param  {number} seed Positive integer
   * @return {number} 32-bit positive integer hash 
   */
  Holmes.prototype.hash = function (key, seed) {
    var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;
    
    remainder = key.length & 3; // key.length % 4
    bytes = key.length - remainder;
    h1 = seed;
    c1 = 0xcc9e2d51;
    c2 = 0x1b873593;
    i = 0;
    
    while (i < bytes) {
        k1 = 
          ((key.charCodeAt(i) & 0xff)) |
          ((key.charCodeAt(++i) & 0xff) << 8) |
          ((key.charCodeAt(++i) & 0xff) << 16) |
          ((key.charCodeAt(++i) & 0xff) << 24);
      ++i;
      
      k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;
  
      h1 ^= k1;
          h1 = (h1 << 13) | (h1 >>> 19);
      h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
      h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
    }
    
    k1 = 0;
    
    switch (remainder) {
      case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
      case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
      case 1: k1 ^= (key.charCodeAt(i) & 0xff);
      
      k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
      h1 ^= k1;
    }
    
    h1 ^= key.length;
  
    h1 ^= h1 >>> 16;
    h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
    h1 ^= h1 >>> 13;
    h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
    h1 ^= h1 >>> 16;
  
    return h1 >>> 0;
  }

  return Holmes;

})();

module.exports = Holmes;