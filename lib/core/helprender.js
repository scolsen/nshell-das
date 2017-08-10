/**
 * Created by scolsen on 2/7/17.
 * helper function for rendering process helps.
 */
const fs = require('fs');

function renderhelp(inputfile, output){
    console.log(shellRoot);
    console.log(inputfile);
    if (inputfile.match(/.*help\.json/) == null) {
        inputfile = inputfile + '/help.json'
    }
    let content = parsehelp(inputfile);
    if(typeof output === "undefined"){
        let hstring = content.process + "\n" + content.description + "\n";
        for(let key in content.options){
                hstring = hstring + key + "\n";
                for (let n in content.options[key]){
                    hstring = hstring + "\t" + n + ": " + content.options[key][n] + "\n";
                }
        }
        hstring = hstring +content.returns;
        const buf = Buffer.from(hstring, 'utf8');
        console.log(buf.toString());
    }

}

function parsehelp(inputfile){
    let data = fs.readFileSync(inputfile);
    return JSON.parse(data);
}

exports.renderhelp = renderhelp;