'use strict';

const ghPages = require('gh-pages');
const path = require('path');
const config = {
  message: 'Publish Strikersoft Test Assignment'
};

ghPages.publish(path.join(__dirname, '../', 'public'), config, function(err) {
  if (err) { console.log(err); }
  console.log('Successfully Deployed to Github Pages');
});
