'use strict';

module.exports = function (gulp, $) {
    return $.cruiser(function (def) {
        $.jobStart('Compile sass');

        if ($.debug) {
            console.log('');
            console.log('> compile.sass.js <');
            console.log($.config.sass.paths);
            console.log('');
        }

        $.rubySass($.config.sass.paths, {
            noCache   : true,
            sourcemap : true
        })
        .pipe($.plumber())
        .pipe($.base64({
            maxImageSize: $.config.sass.base64_size
        }))
        .pipe($.minifyCss())
        .pipe($.sourcemaps.write($.config.sass.map_path, {
            includeContent: false
        }))
        .pipe(gulp.dest($.config.sass.dest_path))
        .on("finish", function () {
            $.jobEnd('Compile sass');

            def.resolve();
        });
    });
};
