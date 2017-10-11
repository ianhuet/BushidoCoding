// package vars
const pkg = require("./package.json");

// gulp
const gulp = require("gulp");

// load all plugins in "devDependencies" into the variable $
const plugin = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["devDependencies"]
});

const onError = (err) => {
  console.log(err);
};

const banner = [
  "/**",
  " * @project        <%= pkg.name %>",
  " * @author         <%= pkg.author %>",
  " *",
  " */",
  ""
].join("\n");

//
// var gulp        = require('gulp');
// var sass        = require('gulp-sass');
// var concatCss   = require('gulp-concat-css');
// var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
  return gulp.src('style/*.scss')
    .pipe(plugin.sass())
    .pipe(plugin.concatCss("style/style.css"))
    .pipe(gulp.dest(''))
    .pipe(plugin.browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  plugin.browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('watch', ['browserSync'], function(){
  gulp.watch("style/*.scss", ['sass']);
  gulp.watch("*.html").on('change', browserSync.reload);
});