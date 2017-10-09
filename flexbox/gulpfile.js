
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var concatCss   = require('gulp-concat-css');
var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
  return gulp.src('style/*.scss')
    .pipe(sass())
    .pipe(concatCss("style/style.css"))
    .pipe(gulp.dest(''))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('watch', ['browserSync'], function(){
  gulp.watch('style/*.scss', ['sass']);
});