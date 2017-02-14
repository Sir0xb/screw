'use strict';

import gulp		from 'gulp';
import Config   from './scripts/config';
import tk_build from './scripts/tasks/task.build';
import tk_clean from './scripts/tasks/task.clean';
import tk_watch from './scripts/tasks/task.watch';
import tk_sass	from './scripts/tasks/task.sass';

let project = 'all';
let stage = 'local';
let debug = false;
let argv = process.argv;
argv.forEach(function(arg, index) {
	switch (arg) {
		case '--project':
		case '--p':
		case '-project':
		case '-p':
			project = argv[index + 1];
			break;
		case '--stage':
		case '--s':
		case '-stage':
		case '-s':
			stage = argv[index + 1];
			break;
		case '--debug':
		case '--d':
		case '-debug':
		case '-d':
			debug = argv[index + 1];
			break;
	}
});

gulp.task('build', function() {
	return Config.workflow({ project, stage, debug, taskFunc: tk_build });
});

gulp.task('clean', function() {
	return Config.workflow({ project, stage, debug, taskFunc: tk_clean });
});

gulp.task('local_build', function() {
	return Config.workflow({ project, stage, debug, taskFunc: tk_build, test_mode: true });
});

gulp.task('local_clean', function() {
	return Config.workflow({ project, stage, debug, taskFunc: tk_clean, test_mode: true });
});

gulp.task('watch', ['default'], function() {
	return Config.workflow({ project, stage, debug, taskFunc: tk_watch });
});

gulp.task('default', function () {
	return Config.workflow({ project, stage, debug, taskFunc: tk_sass });
});
