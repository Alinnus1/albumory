const fs = require('fs');
const path = require('path');

async function getAll() {
  return JSON.parse(
    await fs.promises.readFile(path.join(__dirname, 'data', 'Albums.json'), {
      encoding: 'utf8'
    })
  );
}

async function writeAll(albums) {
  await fs.promises.writeFile(path.join(__dirname, 'data', 'Albums.json'), JSON.stringify(albums));
}

module.exports.getAll = getAll;
module.exports.writeAll = writeAll;