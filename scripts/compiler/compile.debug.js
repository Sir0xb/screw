'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Open test mode');

        if ($.debug) {
            console.log('');
            console.log('> compile.debug.js <');
            console.log($.config.testMode.path);
            console.log('');
        }

        gulp.src($.config.testMode.path)
        .pipe($.plumber())
        .pipe($.replace(new RegExp('</script>', 'g'), 'params.test=false;</script>'))
        .pipe(gulp.dest($.config.testMode.dest_path))
        .on('finish', function () {
            $.jobEnd('Open test mode');

            def.resolve();
        });
    });
};
