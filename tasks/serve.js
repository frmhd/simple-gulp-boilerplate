"use strict";

const browserSync = require("browser-sync").create();

const config = {
    server: "./dist",
    tunnel: false,
    host: "localhost",
    port: 3000,
    logPrefix: "simple-gulp",
    reloadOnRestart: true,
    open: false
};

module.exports = function(options) {

    return function() {
        browserSync.init(config);
        browserSync.watch('dist/**/*').on('change', browserSync.reload);
    }
}
