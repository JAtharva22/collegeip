const fs = require('fs');

fs.rename('example.txt', 'new_example.txt', (err) => {
  if (err) throw err;
  console.log('File renamed.');
});
