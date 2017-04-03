"use strict";

const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");

module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe(imagemin())
            .pipe(rename({dirname: ''}))
            .pipe(gulp.dest(options.dest));
    }
}
