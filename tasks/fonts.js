"use strict";

const gulp = require("gulp");
const newer = require("gulp-newer");

module.exports = function(options) {

    return function() {
        return gulp.src(options.src, {since: gulp.lastRun("fonts")})
            .pipe(newer(options.newer))
            .pipe(gulp.dest(options.dest));
    }
}
