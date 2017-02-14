'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Make script');

        if ($.debug) {
            console.log('');
            console.log('> compile.script.js <');
            console.log($.config.script.paths);
            console.log('');
        }

        gulp.src($.config.script.paths)
        .pipe($.plumber())
        .pipe($.replace(/base_config.js/g, 'base_config.min.js'))
        .pipe($.revCollector())
        .pipe(gulp.dest($.config.script.dest_path))
        .on('finish', function () {
            $.jobEnd('Make script');

            def.resolve();
        });
    });
};
