"use strict";

const gulp = require("gulp");
const remember = require("gulp-remember");
const browserSync = require('browser-sync');

module.exports = function(options) {
    return function() {
        gulp.watch("app/**/*.pcss", gulp.series("styles")).on("unlink", function(filepath){
            remember.forget("styles", path.resolve(filepath));
        });
        gulp.watch(["app/blocks/**/*.js", "app/js/**/*.js"], gulp.series("js"));
        gulp.watch("app/fonts/**/*.*", gulp.series("fonts"));
        gulp.watch("app/images/**/*.*", gulp.series("images"));
        gulp.watch("app/**/*.pug", gulp.series("pug"));
    }
}
