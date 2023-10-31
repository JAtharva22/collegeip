const fs = require('fs');

fs.appendFile('new_example.txt', '\nAppended content', (err) => {
  if (err) throw err;
  console.log('Data appended to file.');
});
