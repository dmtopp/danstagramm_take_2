var gulp        = require('gulp'),
    tap         = require('gulp-tap'),
    fs          = require('fs'),
    browserify  = require('browserify'),
    buffer      = require('gulp-buffer'),
    gutil       = require('gulp-util'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat');

gulp.task('bundle', function(){
  return gulp.src(['./public/js/angular/**/*.js']) // grab all the angular files
    .pipe(concat('./production-app.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function(){
  console.log('Gulp is watching for changes to files in ./public/js/angular');
  gulp.watch(['./public/js/**/*.js'], ['bundle']);
});

gulp.task('default', ['bundle']);
