 'use strict';
 
 module.exports = function(gulp, $) {
 	return gulp.watch($.config.sass.watch_paths, ['default']);
 };
