/**
 * Created by scolsen on 2/15/17.
 * nshell Globals.
 */
const path = require('path');
global.shellRoot = path.resolve(__dirname);
global.bigshell = require(shellRoot + '/lib');
global.ps1 = "nshell* ";
global.currentProc = null;