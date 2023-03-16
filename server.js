'use strict';

var edge = require('edge-js');
var express = require('express');
var bodyParser = require('body-parser');
const util = require('util');

var app = express();


var about;
var openport;
var sendcommand;
var clearbuffer;
var printerfont;
var barcode;
var printlabel;
var closeport;
var sendcommand_utf8;
var sendcommand_binary;
var windowsfont;

var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('./'));


app.listen(8888, function () {
    console.log("Server Start!!");
})


app.get('/test_get', function (req, res) {
    console.log('GET Function Test!!');

});


app.post('/', urlencodedParser, function (req, res) {
    printfile();
    res.redirect(req.get('referer'));
});


app.post('/128B', urlencodedParser, function (req, res) {
    printfile128B();
    res.redirect(req.get('referer'));
});


try {
    openport = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'openport'
    });
} catch (error) {
    console.log(error);
}


try {
    about = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'about'
    });
} catch (error) {
    console.log(error);
}

try {
    sendcommand = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand'
    });
} catch (error) {
    console.log(error);
}


try {
    clearbuffer = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'clearbuffer'
    });
} catch (error) {
    console.log(error);
}


try {
    printerfont = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'printerfont'
    });
} catch (error) {
    console.log(error);
}


try {
    barcode = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'barcode'
    });
} catch (error) {
    console.log(error);
}


try {
    printlabel = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'printlabel'
    });
} catch (error) {
    console.log(error);
}


try {
    closeport = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'closeport'
    });
} catch (error) {
    console.log(error);
}

try {
    sendcommand_utf8 = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand_utf8'
    });
} catch (error) {
    console.log(error);
}

try {
    sendcommand_binary = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand_binary'
    });
} catch (error) {
    console.log(error);
}

try {
    windowsfont = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'windowsfont'
    });
} catch (error) {
    console.log(error);
}


function printfile() {
    var font_variable = {x: '50', y: '50', fonttype: '3', rotation: '0', xmul: '1', ymul: '1', text: 'Font Test'}
    var windowsfont_variable = {
        x: 50,
        y: 250,
        fontheight: 64,
        rotation: 0,
        fontstyle: 0,
        fontunderline: 0,
        szFaceName: 'Arial',
        content: 'Windowsfont Test'
    }
    var barcode_variable = {
        x: '50',
        y: '100',
        type: '128',
        height: '70',
        readable: '0',
        rotation: '0',
        narrow: '3',
        wide: '1',
        code: '123456'
    }
    var label_variable = {quantity: '1', copy: '1'};

    openport('TSC TE244', true);

    clearbuffer('', true);
 /*   sendcommand(`TEXT 0,0,"0",0,12,12,"1234567890-0"`, true);
    sendcommand(`TEXT 0,40,"0",0,12,12,"1234567890-1"`, true);
    sendcommand(`TEXT 0,80,"0",0,12,12,"1234567890-2"`, true);
    sendcommand(`TEXT 0,120,"0",0,12,12,"1234567890-3"`, true);
    sendcommand(`TEXT 0,270,"0",0,12,12,"1234567890-4"`, true);
    sendcommand(`TEXT 0,180,"0",0,12,12,"1234567890-4"`, true);
    sendcommand(`TEXT 0,200,"0",0,12,12,"1234567890-5"`, true);
    // sendcommand(`TEXT 100,250,"0",0,12,12,"1234567890-6"`, true);
    // sendcommand(`TEXT 0,280,"0",0,12,12,"1234567890-6.1"`, true);
    sendcommand(`TEXT 0,290,"0",0,12,12,"1234567890-6.2"`, true);*/

    // sendcommand(`BARCODE 20,10,"128M",70,1,0,2,2,"CP-OXL-0232A00858"`, true);

    // sendcommand(`TEXT 0,0,"0",0,12,12,"1-1 0 M"`, true);
    // sendcommand(`BARCODE 100,50,"128",70,1,0,1,1,"CP-OXL-0208-CP-CP"`, true);
    // sendcommand(`BARCODE 50,150,"128M",70,0,0,2,2,"CP-OXL-0232A00858"`, true);
    // sendcommand(`BARCODE 100,150,"128M",70,1,0,1,1,"CP-OXL-0208-CP-CP"`, true);

    sendcommand(`BARCODE 5,10,"128",50,1,0,2,2,"230307000161"`, true);
    sendcommand(`BARCODE 5,100,"128",50,1,0,2,2,"230307000161"`, true);
    sendcommand(`BARCODE 5,190,"128",50,1,0,3,3,"230307000161"`, true);
    sendcommand(`BARCODE 5,250,"128",50,1,0,4,4,"230307000161"`, true);

    // sendcommand(`BARCODE 5,50,"128M",50,1,0,2,2,"230307000162"`, true);
    // sendcommand(`BARCODE 5,150,"128M",50,1,0,3,3,"230307000162"`, true);

    // sendcommand(`BARCODE 5,50,"EAN128",50,1,0,2,2,"230307000163"`, true);
    // sendcommand(`BARCODE 5,150,"EAN128",50,1,0,3,3,"230307000163"`, true);

    // sendcommand(`BARCODE 5,50,"93",50,1,0,2,2,"230307000163"`, true);
    // sendcommand(`BARCODE 5,150,"93",50,1,0,3,3,"230307000163"`, true);


    /*sendcommand(`TEXT 0,0,"0",0,12,12,"2-2 0 M"`, true);
    sendcommand(`BARCODE 20,10,"128",70,1,0,2,2,"CP-OXL-0232A008581"`, true);
    // sendcommand(`BARCODE 50,150,"128M",70,0,0,2,2,"CP-OXL-0232A00858"`, true);
    sendcommand(`BARCODE 20,150,"128M",70,1,0,2,2,"210-000-2A00858M1"`, true);*/


    printlabel(label_variable, true);

    //var selftest_command = 'SELFTEST\r\n';
    //var arr = [];
    //for (var i = 0; i < selftest_command.length; ++i)
    //    arr.push(selftest_command.charCodeAt(i));
    //var selftest_command_buffer = new Uint8Array(arr);
    //sendcommand_binary(selftest_command_buffer, true);

    closeport('', true);
}

function printfile128B() {
    var font_variable = {x: '50', y: '50', fonttype: '3', rotation: '0', xmul: '1', ymul: '1', text: 'Font Test'}
    var windowsfont_variable = {
        x: 20,
        y: 100,
        fontheight: 64,
        rotation: 0,
        fontstyle: 3,
        fontunderline: 0,
        szFaceName: 'Arial',
        content: '达摩克利斯之剑'
    }
    var barcode_variable = {
        x: '50',
        y: '100',
        type: '128',
        height: '70',
        readable: '0',
        rotation: '0',
        narrow: '3',
        wide: '1',
        code: '123456'
    }
    var label_variable = {quantity: '1', copy: '1'};

    openport('TSC TE244', true);
    clearbuffer('', true);
    windowsfont(windowsfont_variable, true);
    // sendcommand(`SIZE 1.07, 1.07`, true);
    // sendcommand(`SIZE 2.33, 1.54`, true);
    // sendcommand(`BOX 0, 0, 480, 320, 10`, true);
    // sendcommand(`BOX 0, 0, 480, 320, 20`, true);
    // sendcommand(`TEXT 80,80,"0",0,12,12,""`, true);
    // sendcommand(`TEXT 80,450,"0",0,12,12,"test edit"`, true);
    printlabel(label_variable, true);
    closeport('', true);
}
