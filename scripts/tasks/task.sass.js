'use strict';

import sass_cleaner from '../cleaner/cleaner.sass';
import sass_compile from '../compiler/compile.sass';

module.exports = function (gulp, $) {
    return $.q.fcall(function () {
        return $.jobStart('SASS');
    }).then(function () {
        return sass_cleaner(gulp, $);
    }).then(function () {
        return sass_compile(gulp, $);
    }).then(function () {
        return $.jobEnd('SASS');
    });
};
