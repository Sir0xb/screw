'use strict';

import express from 'express';
import cookie  from 'cookie-parser';
import parser  from 'body-parser';
import session from 'express-session';

import FileStreamRotator from 'file-stream-rotator';

import morgan from 'morgan';
import flash  from 'connect-flash';
import swig   from 'swig';
import fs     from 'fs';

import Config from './config';
import route  from './app/routes';

// 日志配置
// let logDirectory = `${__dirname}/log`;
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// let accessLogStream = FileStreamRotator.getStream({
//     filename  : `${logDirectory}/access-%DATE%.log`,
//     frequency : 'daily',
//     verbose   : false
// });

let app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('port', process.env.PORT || Config.PORT);
app.set('views',  `${__dirname}/app/views`);
app.use(express.static(`${__dirname}/public`));

app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(flash());
app.use(cookie());
app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));
app.use(session({
    secret              : "screw",
    resave              : false,
    saveUninitialized   : true,
    cookie              : { maxAge: 1000 * 60 * 60 * 24 * 30 }
}));
// app.use(morgan('combined', { stream: accessLogStream }));

app.listen(app.get("port"), function () {
    return console.log(`The server is running! port => ${ app.get('port') }`);
});

route(app);
