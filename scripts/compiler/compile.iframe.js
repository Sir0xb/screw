'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Make iframe');

        if ($.debug) {
            console.log('');
            console.log('> compile.iframe.js <');
            console.log($.config.iframe.paths);
            console.log('');
        }

        gulp.src($.config.iframe.paths)
        .pipe($.plumber())
        .pipe($.replace(new RegExp(`<iframe (\\s*${$.config.iframe.make_key}\\s*)+`, 'g'), `<iframe ${$.config.iframe.make_key} `))
        .pipe(gulp.dest($.config.iframe.dest_path))
        .on('finish', function () {
            $.jobEnd('Make iframe');

            def.resolve();
        });
    });
};
