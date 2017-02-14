'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Recovery script');

        if ($.debug) {
            console.log('');
            console.log('> cleaner.script.js <');
            console.log($.config.script.clean_paths);
            console.log('');
        }

        gulp.src($.config.script.clean_paths)
        .pipe($.replace($.config.script.pattern, $.config.script.reset_name))
        .pipe(gulp.dest($.config.script.dest_path))
        .on('finish', function () {
            $.jobEnd('Recovery script');

            def.resolve();
        });
    });
};
