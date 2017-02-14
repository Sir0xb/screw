'use strict';

import gulp         from 'gulp';
import L            from 'lodash';
import Plugins      from 'gulp-load-plugins';

import c_screw      from './configs/screw';

let $ = Plugins({
    pattern: ['gulp-*', 'gulp.*', 'q', 'chalk', 'dateformat', 'lodash'],
    lazy: true
});

let jobCache = {};

function workflow({ project = 'all', stage = 'screw', debug = false, taskFunc, test_mode = false }) {
    if (debug) {
        console.log('');
        console.log('> config.js - workflow <');
        console.log(`project: ${project}`);
        console.log(`stage: ${stage}`);
        console.log('');
    }

    if (['all', 'screw'].indexOf(project) == -1) {
        error('没有对应工程!');
        return false;
    } else {
        let honestArray = [];
        let tools = { debug, test_mode, cruiser, battleship, colorful, error, jobStart, jobEnd };
        switch (project) {
            case 'all':
            case 'screw':
                honestArray.push(taskFunc(gulp, L.extend({}, $, tools, { project: 'screw', config: c_screw(stage) })));
                break;
        }
        return battleship(honestArray);
    }
}

function cruiser(callback) {
	let def = $.q.defer();

    callback(def);

    return def.promise;
}

function battleship(honestArray = []) {
	let deferred = $.q.defer();

    $.q.all(honestArray)
    .then(function () {
        deferred.resolve();
    });

    return deferred.promise;
}

function colorful (word) {
    let message = '';
    Array.from(word, function (x, i) {
        message += $.chalk[['red', 'yellow', 'green', 'blue', 'magenta', 'cyan', 'gray'][i%7]](x);
    });
    console.info(`[${ $.chalk.gray($.dateformat(new Date(), 'H:MM:ss')) }] >>> ${ message } <<<`);
}

function jobStart(taskName) {
    let project = this.project || '';
    let startTime = new Date();
    jobCache[`${taskName}${project}`] = startTime;
    console.info(`[${ $.chalk.gray($.dateformat(startTime, 'H:MM:ss')) }] ${ $.chalk.red('Starting') } '${ $.chalk.green(taskName) }' ... ${ project != null ? ' ==> ' + $.chalk.yellow(project) : '' }`);
    return true;
}

function jobEnd(taskName) {
    let project = this.project || '';
	let startTime = jobCache[`${taskName}${project}`];
    if (startTime) {
        let endTime = new Date();
        console.info(`[${ $.chalk.gray($.dateformat(endTime, 'H:MM:ss')) }] ${ $.chalk.blue('Finished') } '${ $.chalk.green(taskName) }' in ${ $.chalk.magenta(endTime.getTime() - startTime.getTime() + ' ms') } ${ project != null ? ' ==> ' + $.chalk.yellow(project) : '' }`);
        return true;
    } else {
        error('脚本名称错误，请核对名称!');
        return false;
    }
}

function error(message) {
    console.log('');
    console.error(`>>> ${message} <<<`);
    console.log('');
}

L.extend(module.exports, $);
L.extend(module.exports, { workflow });
