/* test-runner.js */
 
'use strict';
const fs = require('fs');
 
/*
// Get all test specification files from directory
var testFiles = fs.readdirSync(__dirname + '/specs');
 
// Setup-code - Do this one time before any test suite started  
var randomNumber = Math.random();
 
// Require all the tests and supply with the same random number
testFiles.forEach(function (file) {
  require('./specs/' + file)(randomNumber)
});
*/
const path = require('path')
const getDirectories = srcPath => fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())
var routes = getDirectories(__dirname + '/../routes')

routes.forEach(function (dir) {
  
    if (fs.existsSync(__dirname + '/../routes/' + dir + '/test.js')) {
        require(__dirname + '/../routes/' + dir + '/test')
    }
});
