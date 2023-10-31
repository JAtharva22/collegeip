const fs = require('fs');

fs.writeFile('example.txt', 'Updated content', (err) => {
  if (err) throw err;
  console.log('File content updated.');
});
