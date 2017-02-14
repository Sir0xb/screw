'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Make link');

        if ($.debug) {
            console.log('');
            console.log('> compile.link.js <');
            console.log($.config.link.paths);
            console.log('');
        }

        gulp.src($.config.link.paths)
        .pipe($.plumber())
        .pipe($.revCollector())
        .pipe(gulp.dest($.config.link.dest_path))
        .on('finish', function () {
            $.jobEnd('Make link');

            def.resolve();
        });
    });
};
