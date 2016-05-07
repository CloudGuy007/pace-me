'use strict';

var del = require('del');
var gulp = require('gulp');
// var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var gulpUtil = require('gulp-util');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var flatten = require('gulp-flatten');
var sass = require('gulp-sass');

gulp.task('clean', function(cb) {
    del(['public/**/*']).then(paths => cb())
});

gulp.task('jsprod', ['clean'], function(cb) {
    gulp.src(['client/*.js','client/app/**/*.js', 'client/components/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(ngAnnotate())
        .pipe(babel({
        presets: ['es2015']
    }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js'));
    cb()
})

gulp.task('jsdev', ['clean'], function(cb) {
    gulp.src(['client/*.js','client/app/**/*.js', 'client/components/**/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('public/js'));
    cb();
});

gulp.task('images', ['clean'], function(cb){
  gulp.src(['client/app/**/*.png', 'client/app/**/*.jpg'])
    .pipe(gulp.dest('public/img'));
    cb();
})

gulp.task('assets', ['clean'], function(cb) {
    gulp.src('client/assets/**/*')
        .pipe(gulp.dest('public/assets'));
    cb();
})


gulp.task('bower', ['clean'], function(cb) {
    gulp.src(['client/bower_components/**/*', '!client/bower_components/bootstrap/node_modules/**/*'])
        .pipe(gulp.dest('public/bower_components'));
    cb();
})

gulp.task('css', ['clean'], function(cb) {
    gulp.src('client/**/*.scss')
    	.pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('public/css'));
    cb();
})

gulp.task('partials', ['clean'], function(cb) {
    gulp.src(['client/**/*.html', 'client/components/**/*.html'])
        .pipe(flatten())
        .pipe(gulp.dest('public/html'));
    cb();
})

gulp.task('index', ['clean'], function(cb) {
    gulp.src('views/index.ejs')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('public'));
    cb();
})

gulp.task('statics', ['assets', 'bower', 'css', 'partials', 'index', 'images']);

gulp.task('watch', ['clean', 'jsdev', 'statics'], function() {
    gulp.watch(['client/**/*', '!client/bower_components/**/*'], ['default']);
    gulp.watch('views/index.ejs', ['default']);
});

gulp.task('development', ['clean', 'jsdev', 'statics', 'watch']);
gulp.task('production', ['clean', 'jsprod', 'statics']);

gulp.task('default', [process.env.NODE_ENV === 'development' ? 'development' : 'production']);
