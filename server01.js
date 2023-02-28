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
var usbprintername

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
    sendcommand(`TEXT 10,20,"0",0,12,12,"111111"`, true);
    printlabel(label_variable, true);
    closeport('', true);
}
function printfile128B() {
    let width = 433.154 + 3
    var label_variable = { quantity: '1', copy: '1' };
    openport('TSC TE244', true);  // ! 打点打印机TSC的名称

    let alignment = 1
    // 30个字符打印效果
    // OUT “DPI = “;GETSETTING$(“SYSTEM”,”INFORMATION”,”DPI”)
    clearbuffer('', true);
    let str = "hello world2"
    let str2 = "w"
    let fontsize = '14'
    let arr = [
        `dot$="8"`,
        `str$="${str}"`,
        `str1$="${str2}"`,
        `font$="0"`,
        `fontsize=${fontsize}`,
        `DPI$=GETSETTING$("SYSTEM","INFORMATION","DPI")`,  // 字符串内容
        `F=100`,
        `G=2`,
        `H=F*G`,
        `I$=STR$(H)`,
        `DPI2=VAL(DPI$)`,
        // `IF DPI$+0=203 THEN dot$="11.8"`,
        `strWidth=TEXTPIXEL(str1$,font$,fontsize)`,
        // `TEXT 10,40,font$,0,fontsize,fontsize,str$`
        `TEXT 10,50,\"0\",0,fontsize,fontsize,\"444444444444444\"`,
        // `TEXT 10,203,\"0\",0,12,12,str$`,

        // `TEXT 50,DPI2,"0",0,12,12,"22222"`,
        // `TEXT 50,150,"0",0,12,12,I$`

        // `TEXT 10,DPI$,\"0\",0,12,12,str$`,
        // `TEXT 10,DPI2$,\"0\",0,12,12,str1$`,

        // GETSETTING$ 获取内容位字符串内容
        // `TEXT 50,200,\"0\",0,12,12,DPI2$`,

        // GETSETTING$ 获取内容位字符串内容
        `TEXT 50,200,\"0\",0,12,12,DPI$`,


        // 运算符号计算
        /*
        `TEXT 50,50,"0",0,12,12,F$`,
        `TEXT 50,80,"0",0,12,12,G$`,
        `TEXT 50,100,"0",0,12,12,H`,
        `TEXT 50,150,"0",0,12,12,I$`,
        */


        // `TEXT 10,140,\"0\",0,12,12,dot$`,
        // `TEXT 10,140,\"0\",0,12,12,DPI2$`,

    ]
    arr.forEach((item, index) => {
        sendcommand(item, true);
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
