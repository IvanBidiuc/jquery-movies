const gulp = require("gulp");
const include = require("gulp-include");
const sass = require("gulp-sass");
const uglifycss = require("gulp-uglifycss");

const style = () => {
  return gulp
    .src("./sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
};
const watch = () => {
  gulp.watch("./sass/*.scss", style);
};

const minify = () => {
  return gulp
    .src("./css/*.css")
    .pipe(uglifycss({ uglycomments: true }))
    .pipe(gulp.dest("./dist/"));
};

exports.scripts = () => {
  gulp
    .src("js/main.js")
    .pipe(include())
    .on("error", console.log)
    .pipe(gulp.dest("dist/js"));
};

exports.watch = watch;
exports.minify = minify;
exports.default = style;
