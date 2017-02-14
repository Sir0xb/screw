'use strict';

import path from 'path';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Compile js');

        if ($.debug) {
            console.log('');
            console.log('> compile.js.js <');
            console.log($.config.js.paths);
            console.log('');
        }

        gulp.src($.config.js.paths)
        .pipe($.plumber())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.jshint())
        .pipe($.rename({
            extname: '.min.js'
        }))
        .pipe($.uglify({
            managle: false
        }))
        .pipe($.rev())
        .pipe(gulp.dest($.config.js.dest_path))
        .pipe($.rev.manifest({
            path  : path.join(__dirname, $.config.js.manifest_path),
            cwd   : path.join(__dirname, $.config.js.minifest_cwd),
            merge : true
        }))
        .pipe(gulp.dest($.config.js.dest_path))
        .on('finish', function () {
            $.jobEnd('Compile js');

            def.resolve();
        });
    });
};
