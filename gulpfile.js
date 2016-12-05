var gulp = require('gulp');
var compass = require('gulp-compass');
//var path = require('path');

// Gulp Sass(Compass) Task 
gulp.task('compass', function() {
  gulp.src('./scss/{,*/}*.{scss,sass}')
    .pipe(compass({
      config_file: './config.rb',
      sass: './scss',      
      css: './assets/css'
    }))  
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('default', ['compass'], function () {
  gulp.watch('./scss/{,*/}*.{scss,sass}', ['compass'])
});

