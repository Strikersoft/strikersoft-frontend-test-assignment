'use strict';

const path = require('path');

// Module delete (https://www.npmjs.com/package/delete)
// Remove generated css and js files to escape side-effects
const del = require('delete');

// Settings
const publicFolder = 'public';
const filesToDelete = ['style.css', 'bundle.js'];

const pathsToFiles = filesToDelete.map(function(file) {
  return path.join(__dirname, '../', publicFolder, file);
});

del(pathsToFiles, function(err) {
  if (err) { console.log(err); }

  const deletedFiles = filesToDelete.map(function(file) {
    return publicFolder + '/' + file;
  }).join(', ');

  console.log(('Successfully deletedFiles: ' + deletedFiles));
});
