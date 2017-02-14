'use strict';

import cleaner_css	    from '../cleaner/cleaner.css';
import cleaner_link	    from '../cleaner/cleaner.link';
import cleaner_js	    from '../cleaner/cleaner.js';
import cleaner_html	    from '../cleaner/cleaner.html';
import cleaner_iframe   from '../cleaner/cleaner.iframe';
import cleaner_debug    from '../cleaner/cleaner.debug';
import cleaner_script   from '../cleaner/cleaner.script';

module.exports = function (gulp, $) {
    return $.q.fcall(function () {
        return $.jobStart('Task clean');
    }).then(function () {
        return $.battleship([
            cleaner_css(gulp, $),
            cleaner_link(gulp, $),
            cleaner_js(gulp, $),
            cleaner_html(gulp, $),
            cleaner_script(gulp, $),
            $.test_mode ? cleaner_debug(gulp, $) : true
        ]);
    }).then(function () {
        return cleaner_iframe(gulp, $);
    });
};

