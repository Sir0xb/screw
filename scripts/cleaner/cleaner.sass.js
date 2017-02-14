'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Clean sass');

        if ($.debug) {
            console.log('');
            console.log('> cleaner.sass.js <');
            console.log($.config.sass.clean_paths);
            console.log('');
        }

        gulp.src($.config.sass.clean_paths, {
            read: false
        })
        .pipe($.plumber())
        .pipe($.clean())
        .on("finish", function () {
            $.jobEnd('Clean sass');

            def.resolve();
        });
    });
};
