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

var urlencodedParser = bodyParser.urlencoded({ extended: false });
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


app.post('/', urlencodedParser,function (req, res) {
    printfile();
    res.redirect(req.get('referer'));
});

app.post('/128B', urlencodedParser,function (req, res) {
    printfile128B();
    res.redirect(req.get('referer'));
});
app.post('/128M', urlencodedParser,function (req, res) {
    printfile128M();
    res.redirect(req.get('referer'));
});
app.post('/128MB', urlencodedParser,function (req, res) {
    printfile128MB();
    res.redirect(req.get('referer'));
});

try {
    openport = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'openport'
    });
}
catch (error) {
    console.log(error);
}


try {
    about = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'about'
    });
}
catch (error) {
    console.log(error);
}

try {
    sendcommand = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand'
    });
}
catch (error) {
    console.log(error);
}


try {
    clearbuffer = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'clearbuffer'
    });
}
catch (error) {
    console.log(error);
}


try {
    printerfont = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'printerfont'
    });
}
catch (error) {
    console.log(error);
}


try {
    barcode = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'barcode'
    });
}
catch (error) {
    console.log(error);
}



try {
    printlabel = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'printlabel'
    });
}
catch (error) {
    console.log(error);
}


try {
    closeport = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'closeport'
    });
}
catch (error) {
    console.log(error);
}

try {
    sendcommand_utf8 = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand_utf8'
    });
}
catch (error) {
    console.log(error);
}

try {
    sendcommand_binary = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand_binary'
    });
}
catch (error) {
    console.log(error);
}

try {
    windowsfont = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'windowsfont'
    });
}
catch (error) {
    console.log(error);
}


function printfile() {
    var label_variable = { quantity: '1', copy: '1' };
    openport('TSC TE244', true);  // ! 打点打印机TSC的名称
    // 30个字符打印效果
    clearbuffer('', true);
    [
        'CP-WSRMK', // 8个
        'CP-WSRMK-CP-0', // 13个
        'CP-WSRMK-8000A0095512312311111', // 30位
        '012312312312312312310123123123'
    ].forEach((item, index) => {
        if(item.length <= 8){
            sendcommand(`BARCODE 0,${index * 80},"128M",74, 0,0,3,3,"${item}"`, true)
        }else if(item.length >= 8 && item.length <=14){
            sendcommand(`BARCODE 0,${index * 80},"128M",74, 0,0,2,2,"${item}"`, true)
        }else{
            sendcommand(`BARCODE 0,${index * 80},"128M",74, 0,0,1,1,"${item}"`, true)
        }
    })
    printlabel(label_variable, true);
    closeport('', true);
}
function printfile128B() {
    var label_variable = { quantity: '1', copy: '1' };
    openport('TSC TE244', true);  // ! 打点打印机TSC的名称
    // 30个字符打印效果
    clearbuffer('', true);
    [
        'CP-WSRMK-8', // 10个
        'CP-WSRMK-8002222', // 16个
        'CP-WSRMK-8000A0095512312311111123123', // 36个
    ].forEach((item, index) => {
        if(item.length <= 10){
            sendcommand(`BARCODE 0,${index * 80},"128M",74, 0,0,3,3,"${item}"`, true)
        }else if(item.length >= 10 && item.length <=16){
            sendcommand(`BARCODE 0,${index * 80},"128M",74, 0,0,2,2,"${item}"`, true)
        }else{
            sendcommand(`BARCODE 0,${index * 80},"128M",74, 0,0,1,1,"${item}"`, true)
        }
    })
    printlabel(label_variable, true);
    closeport('', true);
}
function printfile128M() {
    let width = 433.154 + 3
    var label_variable = { quantity: '1', copy: '1' };
    openport('TSC TE244', true);  // ! 打点打印机TSC的名称
    let alignment = 2
    let X= 0
    // 30个字符打印效果
    clearbuffer('', true);
    [
        // `str$="WSRM56"`,  3倍大
        // `str$="WSRM56789"`, 2倍最小
        `str$="WSRM5678901234567890WSRM5678901234567"`,
        // `str$="WSRMK-8000WSRMK-8000WSRMK-adsfasd"`,
        // `str$="WSRMK-8"`,
        `PP=3`,
        `LC=${parseInt(X)}`,
        `BW=${parseInt(width)}`,
        `CW=BARCODEPIXEL(str$,"128M",PP,PP)`,
        `IF CW>(BW-50) THEN PP=3`,
        `CW=BARCODEPIXEL(str$,"128M",PP,PP)`,
        `IF CW>(BW-50) THEN PP=2`,
        `CW=BARCODEPIXEL(str$,"128M",PP,PP)`,
        `IF CW>(BW-50) THEN PP=1`,
        `CW=BARCODEPIXEL(str$,"128M",PP,PP)`,
        `RW=BW-CW`,
        `SW=RW/2`,
        `IF SW>=0 THEN LC=${alignment == 2 ? "LC+SW" : "LC+RW"}`,
        `BARCODE LC,0,"128M",74, 2,0,${'PP,PP'},str$`,
        'TEXT 0,200,\"0\",0,10,10,\"7423011\"',

    ].forEach((item, index) => {
        sendcommand(item, true);
    })
    printlabel(label_variable, true);
    closeport('', true);
}
function printfile128MB() {
    var label_variable = { quantity: '1', copy: '1' };
    openport('TSC TE244', true);  // ! 打点打印机TSC的名称
    clearbuffer('', true);
    [
        '0123456789123456789',
        'ASCDEFGHIJKLMNOPQRS',
        'abcdefghijklmnopqrstuvwxyz',
        'A-B-C-DHIJKLMNOPQRS',
    ].forEach((item, index) => {
        // sendcommand(`BARCODE 20,${index * 80},"128",74, 0,0,1,2,"${item}"`, true)
        sendcommand(`BARCODE 20,${index * 80},"128M",74, 0,0,1,3,"${item}"`, true)
    })
    printlabel(label_variable, true);
    closeport('', true);
}
