const crypto = require('crypto');
const requestBody = JSON.stringify({ Token: '123xyz', GameId: '2', ProductFamily: '1' });
const passKey = 'Pwd123';
const concatenatedString = requestBody + passKey;
const hash = crypto.createHash('md5').update(concatenatedString).digest('hex').toUpperCase();
console.log('Generated Hash:', hash);
