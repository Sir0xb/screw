'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Clean js');

        if ($.debug) {
            console.log('');
            console.log('> cleaner.js.js <');
            console.log($.config.js.clean_paths);
            console.log('');
        }

        gulp.src($.config.js.clean_paths, {
            read: false
        })
        .pipe($.plumber())
        .pipe($.clean())
        .on("finish", function () {
            $.jobEnd('Clean js');

            def.resolve();
        });
    });
};
