'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Close test mode');

        if ($.debug) {
            console.log('');
            console.log('> cleaner.debug.js <');
            console.log($.config.testMode.path);
            console.log('');
        }

        gulp.src($.config.testMode.path)
        .pipe($.plumber())
        .pipe($.replace(new RegExp('params.test=false;</script>', 'g'), '</script>'))
        .pipe(gulp.dest($.config.testMode.dest_path))
        .on('finish', function () {
            $.jobEnd('Close test mode');

            def.resolve();
        });
    });
};
