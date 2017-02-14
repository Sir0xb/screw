'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Recovery link');

        if ($.debug) {
            console.log('');
            console.log('> cleaner.link.js <');
            console.log($.config.link.clean_paths);
            console.log('');
        }

        gulp.src($.config.link.clean_paths)
        .pipe($.replace($.config.link.pattern, $.config.link.reset_name))
        .pipe(gulp.dest($.config.link.dest_path))
        .on('finish', function () {
            $.jobEnd('Recovery link');

            def.resolve();
        });
    });
};
