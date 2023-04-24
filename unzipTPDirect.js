const path = require('path');
const fs = require('fs');
const unzipper = require('unzipper');

console.log('unzip...');
fs.createReadStream(path.join(__dirname, 'ios/TPDirect.xcframework.zip'))
  .pipe(unzipper.Extract({ path: path.join(__dirname, 'ios') }))
  .on('finish', () => {
    console.log('unzip done!');
  });
