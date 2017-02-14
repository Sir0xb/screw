'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Clean html');

        if ($.debug) {
            console.log('');
            console.log('> cleaner.html.js <');
            console.log($.config.html.clean_paths);
            console.log('');
        }

        gulp.src($.config.html.clean_paths, {
            read: false
        })
        .pipe($.plumber())
        .pipe($.clean())
        .on("finish", function () {
            $.jobEnd('Clean html');

            def.resolve();
        });
    });
};
