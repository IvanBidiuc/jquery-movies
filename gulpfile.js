const gulp = require("gulp");
const include = require("gulp-include");
const inject = require("gulp-inject");
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
    .pipe(gulp.dest("./css/"));
};

const scripts = async (done) => {
  return gulp
    .src("./js/*.js")
    .pipe(include())
    .on("error", console.log)
    .pipe(gulp.dest("dist/js"));
};

const injectHTML = async () => {
  return gulp
    .src("./*.html")
    .pipe(
      inject(gulp.src(["./partials/meta.html"]), {
        starttag: "<!-- inject:meta:{{ext}} -->",
        transform: function (filePath, file) {
          return file.contents.toString("utf8");
        },
      })
    )
    .pipe(
      inject(gulp.src(["./partials/scripts.html"]), {
        starttag: "<!-- inject:scripts:{{ext}} -->",
        transform: function (filePath, file) {
          return file.contents.toString("utf8");
        },
      })
    )
    .pipe(
      inject(gulp.src(["./partials/footer.html"]), {
        starttag: "<!-- inject:footer:{{ext}} -->",
        transform: function (filePath, file) {
          return file.contents.toString("utf8");
        },
      })
    )
    .pipe(gulp.dest("./"));
};

exports.scripts = scripts;
exports.watch = watch;
exports.minify = minify;
exports.default = injectHTML;
