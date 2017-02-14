'use strict';

module.exports = function(stage) {
    let base = "./";

    return {
        sass: {
            watch_paths: [
                `${base}/public/styles/**/*.scss`
            ],

            clean_paths: [
                `${base}/public/styles/*.css`,
                `${base}/public/styles/maps/*.map`,
                `${base}/public/styles/maps`
            ],

            paths: [
                `${base}/public/styles/*.scss`
            ],
            base64_size: 1024,
            map_path: 'maps',
            dest_path: `${base}/public/styles/`
        },
        css: {
            clean_paths: [
                `${base}/public/css/*-*.css`,
                `${base}/public/css/rev-manifest.json`
            ],

            paths: [
                `${base}/public/css/*.css`,
                `!${base}/public/css/*-*.css`
            ],
            map_path: 'maps',
            dest_path: `${base}/public/css/`
        },
        link: {
            clean_paths: [
                `${base}/WEB-INF/livecast/layout/links*.ftl`
            ],
            pattern: /(main|app|wechat)(\S*).css/,
            reset_name: '$1.css',

            paths: [
                `${base}/public/css/rev-manifest.json`,
                `${base}/WEB-INF/livecast/layout/links*.ftl`
            ],

            dest_path: `${base}/WEB-INF/livecast/layout/`
        },
        js: {
            clean_paths: [
                `${base}/public/js/**/*-*.min.js`,
                `${base}/public/js/rev-manifest.json`,
                `${base}/public/js/apps/rev-manifest.json`,
                `${base}/public/js/apps/base_config.min.js`
            ],

            paths: [
                `${base}/public/js/**/*.js`,
                `!${base}/public/js/**/*.min.js`,
                `!${base}/public/js/apps/*.js`
            ],
            manifest_path: `../../${base}/public/js/rev-manifest.json`,
            minifest_cwd: `../../${base}/public/js/`,

            dest_path: `${base}/public/js/`
        },
        script: {
            clean_paths: [
                `${base}/WEB-INF/livecast/layout/scripts.ftl`
            ],
            pattern: /base_config(\S*).js/,
            reset_name: 'base_config.js',

            paths: [
                `${base}/public/js/apps/rev-manifest.json`,
                `${base}/WEB-INF/livecast/layout/scripts.ftl`
            ],

            dest_path: `${base}/WEB-INF/livecast/layout/`
        },
        html: {
            clean_paths: [
                `${base}/public/js/**/*-*.html`,
                `!${base}/public/js/**/ko-*.html`
            ],

            paths: [
                `${base}/public/js/**/*.html`,
                `!${base}/public/js/**/*-*.html`
            ],
            manifest_path: `../../${base}/public/js/rev-manifest.json`,
            minifest_cwd: `../../${base}/public/js/`,

            dest_path: `${base}/public/js/`
        },
        iframe: {
            paths: [
                `${base}/public/js/apps/**/*.html`
            ],

            make_key: 'police',
            dest_path: `${base}/public/js/apps/`
        },
        testMode: {
            path: `${base}/WEB-INF/livecast/layout/data.ftl`,
            dest_path: `${base}/WEB-INF/livecast/layout/`
        },
        inject: {
            paths: [
                `${base}/public/js/rev-manifest.json`,
                `${base}/public/js/apps/base_config.js`
            ],
            tools_path: `${base}/public/js/apps/`,
            newName: 'base_config.min.js',
            dest_path: `${base}/public/js/apps/`
        }
    };
};
