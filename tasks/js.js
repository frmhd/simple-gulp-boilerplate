"use strict";

const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const browserSync = require("browser-sync");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserify = require("gulp-browserify");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

module.exports = function(options) {

    return function() {
        return gulp.src('app/js/main.js')
          .pipe(babel({
            presets: ['es2015']
          }))
          .pipe(browserify({
            insertGlobals : true
          }))
          .pipe(gulpif(!isDevelopment, uglify()))
      		.pipe(gulp.dest('dist/js'));
    }
}
