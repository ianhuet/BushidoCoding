// package vars
const pkg = require("./package.json");

// gulp
const gulp = require("gulp");

// load all plugins
var plugin = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', '*'],
  replaceString: /\bgulp[\-.]/
});




gulp.task('sass', function(){
  return gulp.src('style/*.scss')
    .pipe(plugin.plumber({ errorHandler: function(err) {
      plugin.notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.toString()
      })(err);
    }}))
    .pipe(plugin.sass())
    .pipe(plugin.concatCss("style/style.css"))
    .pipe(gulp.dest(''))
    .pipe(plugin.browserSync.reload({
      stream: true
    }));
});

gulp.task('html', function(){
  return gulp.src('*.html')
    .pipe(plugin.plumber({ errorHandler: function(err) {
      plugin.notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.toString()
      })(err);
    }}))
    .pipe(plugin.browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  plugin.browserSync.create();
  plugin.browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('watch', ['browserSync'], function(){
  gulp.watch("style/*.scss", ['sass']);
  gulp.watch("*.html", ['html']);
});