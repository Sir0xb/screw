'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Clean css');

        if ($.debug) {
            console.log('');
            console.log('> cleaner.css.js <');
            console.log($.config.css.clean_paths);
            console.log('');
        }
        
        gulp.src($.config.css.clean_paths, {
            read: false
        })
        .pipe($.plumber())
        .pipe($.clean())
        .on("finish", function () {
            $.jobEnd('Clean css');

            def.resolve();
        });
    });
};
