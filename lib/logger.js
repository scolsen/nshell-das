/**
 * Created by scottolsen on 3/6/17.
 */
const fs = require('fs');
const cwd = process.cwd();
const path = require('path');

let date = new Date();

function logWrite(message, tag, clr){
    let today = 'logs/log' + date.getFullYear() + date.getMonth() + date.getDay() + ".txt";
    let temp = 'logs/tmp' + date.getFullYear() + date.getMonth() + date.getDay() + ".txt";
    let logfile = path.join(cwd, today);
    let tmpfile = path.join(cwd, temp);
    if(clr == true){
        fs.writeFile(tmpfile, "<" + tag + ">" + date.getTime() + ": " + message + "</" + tag + ">" + "\n", function(err, data){
            if(err){
                console.log('Log file does not exist! Creating...');
                fs.writeFile(tmpfile, function(err, data){
                    if(err){
                        console.log("could not write logfile");
                    }
                    fs.writeFile(tmpfile, "<" + tag + ">" + date.getTime() + ": " + message + "</" + tag + ">" + "\n");
                });
            }
        });
    } else {
        fs.appendFile(tmpfile, "<" + tag + ">" + date.getTime() + ": " + message + "</" + tag + ">" + "\n", function(err, data){
            if(err){
                console.log('Log file does not exist! Creating...');
                fs.writeFile(tmpfile, function(err, data){
                    if(err){
                        console.log("could not write logfile");
                    }
                    fs.appendFile(tmpfile, "<" + tag + ">" + date.getTime() + ": " + message + "</" + tag + ">" + "\n");
                });
            }
        });
    }
    fs.appendFile(logfile, "<" + tag + ">" + date.getTime() + ": " + message + "</" + tag + ">" + "\n", function(err, data){
        if(err){
            console.log('Log file does not exist! Creating...');
            fs.writeFile(logfile, function(err, data){
                if(err){
                    console.log("could not write logfile");
                }
                fs.appendFile(logfile, "<" + tag + ">" + date.getTime() + ": " + message + "</" + tag + ">" + "\n");
            });
        }
    });
}

exports.logWrite = logWrite;