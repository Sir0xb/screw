'use strict';

module.exports = function(gulp, $) {
    return $.q.fcall(function() {
        return $.jobStart('Inject base_config');
    }).then(function() {
        return $.cruiser(function(def) {
            if ($.debug) {
                console.log('');
                console.log('> compile.config.js step1 <');
                console.log($.config.inject.paths);
                console.log('');
            }

            gulp.src($.config.inject.paths)
            .pipe($.plumber())
            .pipe($.concat($.config.inject.newName))
            //.pipe($.replace(/"js\/lib\/(\S*)"/g, 'require.changePath("lib/$1", modules)'))
            .pipe($.replace(/"js\/tools\/(\S*)"/g, 'require.changePath("tools/$1", modules)'))
            .pipe($.replace(/"js\/components\/(\S*)"/g, 'require.changePath("components/$1", modules)'))
            .pipe(gulp.dest($.config.inject.dest_path))
            .on('finish', function() {
                def.resolve();
            });
        });
    }).then(function() {
        return $.cruiser(function(def) {
            if ($.debug) {
                console.log('');
                console.log('> compile.config.js step2 <');
                console.log(`${$.config.inject.tools_path}${$.config.inject.newName}`);
                console.log('');
            }

            gulp.src(`${$.config.inject.tools_path}${$.config.inject.newName}`)
            .pipe($.plumber())
            .pipe($.jshint())
            .pipe($.uglify({
                managle: false
            }))
            .pipe($.rev())
            .pipe(gulp.dest($.config.inject.tools_path))
            .pipe($.rev.manifest())
            .pipe(gulp.dest($.config.inject.tools_path))
            .on('finish', function() {
                def.resolve();
            });
        });
    }).then(function() {
        return $.jobEnd('Inject base_config');
    });
};
