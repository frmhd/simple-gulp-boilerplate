"use strict";

const gulp = require("gulp");
const gulpif = require("gulp-if");
const browserSync = require("browser-sync");
const merge = require("merge-stream");
const pug = require("gulp-pug");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

module.exports = function(options) {

    return function() {
        return gulp.src(options.src)
            .pipe(plumber({
                errorHandler: notify.onError({
                    "title": "Pug build failed",
                    "sound": false
                })
            }))
            .pipe(pug())
            .pipe(gulp.dest("dist/"));
    }
}
