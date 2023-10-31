const fs = require('fs');

fs.unlink('new_example.txt', (err) => {
  if (err) throw err;
  console.log('File deleted.');
});
