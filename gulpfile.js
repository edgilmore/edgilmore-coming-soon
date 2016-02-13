/**
 * Created by Edward on 2/12/2016.
 */
'use strict';
var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var bundle = require('gulp-bundle-assets');
var runSequence = require('run-sequence');

var config = {
    bundle:{
        configFile: './config/bundle.config.js'
    },
    paths: {
        vendorSassFile:'./sass/vendor/vendor.scss',
        fontsFiles:['./bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*','./bower_components/font-awesome/fonts/*.*'],
        fontsDir: './fonts/',
        fontAwesomeSass:'./bower_components/font-awesome/scss/font-awesome.scss',
        styles:'./css/',
        vendor: './vendor/',
        javascript: './js/',
        temp: './temp/',
        vegasOverlays: './bower_components/vegas/dist/overlays/*.*',
        images: './image/'
    }
};
gulp.task('clean:temp', function () {
    return del(config.paths.temp);
});
gulp.task('clean:css', function () {
    return del(config.paths.styles);
});
gulp.task('clean:fonts', function() {
    return del(config.paths.fontsDir);
});
gulp.task('clean:vendor', function () {
    return del(config.paths.vendor);
});
gulp.task('clean', ['clean:temp','clean:vendor','clean:fonts','clean:css'], function () {
});
gulp.task('build:vendor-css', function() {
     return gulp.src(config.paths.vendorSassFile)
        .pipe(sass({outputStyle: 'extended'}).on('error', sass.logError))
        .pipe(gulp.dest(config.paths.temp));
});
gulp.task('move:fonts', function () {
    return gulp.src(config.paths.fontsFiles)
        .pipe(gulp.dest(config.paths.fontsDir));
});
gulp.task('move:vegas-overlays', function () {
    return gulp.src(config.paths.vegasOverlays)
        .pipe(gulp.dest(config.paths.images + 'overlays/'));
});
gulp.task('build:bundle',['build:vendor-css'], function () {
    return gulp.src(config.bundle.configFile)
        .pipe(bundle())
        .pipe(bundle.results(config.paths.temp))
        .pipe(gulp.dest(config.paths.temp));
});
gulp.task('move:bundled-js-vendor', function () {
    return gulp.src(config.paths.temp + 'vendor*.js')
        .pipe(gulp.dest(config.paths.vendor));
});
gulp.task('move:bundled-css-vendor', function () {
    return gulp.src(config.paths.temp + 'vendor*.css')
        .pipe(gulp.dest(config.paths.vendor));
});
gulp.task('move:bundle-json', function () {
    return gulp.src(config.paths.temp + 'bundle.result.json')
        .pipe(gulp.dest('./'));
});
gulp.task('move:bundled-files', ['move:bundled-css-vendor','move:bundled-js-vendor','move:fonts','move:vegas-overlays', 'move:bundle-json'], function () {
});
gulp.task('default', function (cb) {
    runSequence(['clean','build:bundle'],['move:bundled-files'],['clean:temp'], cb);
});