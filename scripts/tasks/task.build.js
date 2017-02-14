'use strict';

import cleaner_css	    from '../cleaner/cleaner.css';
import cleaner_link	    from '../cleaner/cleaner.link';
import cleaner_js	    from '../cleaner/cleaner.js';
import cleaner_html	    from '../cleaner/cleaner.html';
import cleaner_iframe   from '../cleaner/cleaner.iframe';
import cleaner_debug    from '../cleaner/cleaner.debug';
import cleaner_script   from '../cleaner/cleaner.script';

import compile_iframe   from '../compiler/compile.iframe';
import compile_css      from '../compiler/compile.css';
import compile_link     from '../compiler/compile.link';
import compile_js       from '../compiler/compile.js';
import compile_html     from '../compiler/compile.html';
import compile_debug    from '../compiler/compile.debug';
import compile_config   from '../compiler/compile.config';
import compile_script   from '../compiler/compile.script';

module.exports = function(gulp, $) {
	return $.q.fcall(function () {
        return $.jobStart('Task build');
    }).then(function () {
        return $.battleship([
            cleaner_css(gulp, $),
            cleaner_link(gulp, $),
            cleaner_js(gulp, $),
            cleaner_html(gulp, $),
            cleaner_script(gulp, $),
            $.test_mode ? cleaner_debug(gulp, $) : true
        ]);
    // }).then(function () {
    //     return cleaner_iframe(gulp, $);
    // }).then(function () {
    //     return compile_iframe(gulp, $);
    }).then(function () {
        return $.battleship([
            $.q.fcall(function () {
                return compile_css(gulp, $);
            }).then(function () {
                return compile_link(gulp, $);
            }),
            $.q.fcall(function () {
                return compile_js(gulp, $);
            }).then(function () {
                return compile_html(gulp, $)
            }).then(function() {
                return compile_config(gulp, $);
            }).then(function() {
                return compile_script(gulp, $);
            }),
            $.test_mode ? compile_debug(gulp, $) : true
        ]);
    }).then(function () {
        return $.jobEnd('Task build');
    });
};
