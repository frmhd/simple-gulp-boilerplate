"use strict";

const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const browserSync = require("browser-sync");
const stylus = require("gulp-stylus");
const merge = require('merge-stream');
const postcss = require("gulp-postcss");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const cleanCSS = require("gulp-clean-css");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

module.exports = function(options) {

    return function() {
        return gulp.src(options.src)
            .pipe(plumber({
                errorHandler: notify.onError({
                    "title": "Styles build failed",
                    "sound": false
                })
            }))
            .pipe(gulpif(isDevelopment, sourcemaps.init()))
            .pipe(stylus())
            .pipe(postcss([
                require('autoprefixer')({
                    browsers: ['last 10 versions'],
                    cascade: false
                })
            ]))
            .pipe(gulpif(isDevelopment, sourcemaps.write()))
            .pipe(gulpif(!isDevelopment, cleanCSS()))
            .pipe(gulp.dest("dist/styles"))
            .pipe(browserSync.stream());
    }
}
