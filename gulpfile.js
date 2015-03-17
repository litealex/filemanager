var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    copy = require('gulp-copy');

var htmlPath = './src/templates/*.html',
    lessPath = './src/less/*.less',
    jsPath = './src/js/*.js';




gulp.task('dev:watch', function () {
    gulp.watch(jsPath, ['dev:copy-js']);
    gulp.watch(htmlPath, ['dev:copy-html']);
    gulp.watch(lessPath, ['dev:less']);
});


gulp.task('dev', function () {
    gulp.run('dev:copy-js');
    gulp.run('dev:copy-html');
    gulp.run('dev:less');
});



gulp.task('dev:copy-js', function () {
    console.log('copy js: ' + Date().toString());
    gulp.src(jsPath)
        .pipe(concat('fm.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('dev:less', function () {
    console.log('copy less: ' + Date().toString());
    gulp.src(lessPath)
        .pipe(less())
        .pipe(concat('fm.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('dev:copy-img', function () {
});

gulp.task('dev:copy-html', function () {
    console.log('copy html' + Date().toString());
    gulp.src(htmlPath)
        .pipe(gulp.dest('./dist/templates'));
});