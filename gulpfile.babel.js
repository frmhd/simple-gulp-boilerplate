"use strict";

const gulp = require("gulp");
const shell = require("gulp-shell");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);

        return task(callback);
    });
}

lazyRequireTask("pug", "./tasks/pug", {
    src: ["app/**/*.pug", "!app/blocks/**/*.pug"]
});

lazyRequireTask("styles", "./tasks/styles", {
    src: "app/styles/main.styl"
});

lazyRequireTask("js", "./tasks/js", {
    src: "app/js/main.js"
});

lazyRequireTask("fonts", "./tasks/fonts", {
    src: "app/fonts/**",
    newer: "dist/fonts/",
    dest: "dist/fonts/"
});

lazyRequireTask("images", "./tasks/images", {
    src: "app/images/**",
    dest: "dist/images/"
});

lazyRequireTask("clean", "./tasks/clean", {
    build: "dist"
});

lazyRequireTask("watch", "./tasks/watch", {
    src: {
        styles: "**/static/styles/**/*.styl",
        fonts: "app/fonts/**/*.*"
    }
});

lazyRequireTask("serve", "./tasks/serve");

lazyRequireTask("watch", "./tasks/watch");

lazyRequireTask("build", "./tasks/build");

gulp.task("build",
    gulp.series("clean", gulp.parallel("pug", "styles", "fonts", "js"))
);

gulp.task("start",
    gulp.series("pug", "styles", "fonts", "js", gulp.parallel("serve", "watch")));