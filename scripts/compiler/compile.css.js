'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Compile css');

        if ($.debug) {
            console.log('');
            console.log('> compile.css.js <');
            console.log($.config.css.paths);
            console.log('');
        }

        gulp.src($.config.css.paths)
        .pipe($.plumber())
        .pipe($.rev())
        .pipe(gulp.dest($.config.css.dest_path))
        .pipe($.rev.manifest())
        .pipe(gulp.dest($.config.css.dest_path))
        .on('finish', function () {
            $.jobEnd('Compile css');

            def.resolve();
        });
    });
};
