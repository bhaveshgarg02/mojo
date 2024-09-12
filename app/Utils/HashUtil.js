// app/Utils/HashUtil.js

'use strict';

const crypto = require('crypto');

class HashUtil {
    // Function to encode and generate MD5 hash
    static encode(requestBody, passKey) {
        // Convert the request body to a JSON string
        const requestBodyString = JSON.stringify(requestBody);
        // Concatenate the JSON string with passKey
        const concatenatedString = requestBodyString + passKey;
        // Create MD5 hash
        const hash = crypto.createHash('md5').update(concatenatedString, 'utf8').digest('hex').toUpperCase();
        console.log('Generated Hash:', hash); // For debugging
        return hash;
    }

    // Function to validate the hash
    static decode(requestBody, receivedHash, passKey) {
        // Generate hash based on requestBody and passKey
        const generatedHash = this.encode(requestBody, passKey);
        console.log('Generated Hash for Validation:', generatedHash); // For debugging
        console.log('Received Hash:', receivedHash); // For debugging
        // Compare generated hash with received hash
        return generatedHash === receivedHash;
    }
}

module.exports = HashUtil;
