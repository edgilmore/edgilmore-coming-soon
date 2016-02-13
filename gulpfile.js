/**
 * Created by Edward on 2/12/2016.
 */
'use strict';
var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var bundle = require('gulp-bundle-assets');

var config = {
    paths: {
        vendorSassFile:'./sass/vendor.scss',
        fontsFiles:['./bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*','./bower_components/font-awesome/fonts/*.*'],
        fontsDir: './fonts/',
        fontAwesomeSass:'./bower_components/font-awesome/scss/font-awesome.scss',
        styles:'./css/',
        stylesVendorDir: './css/vendor/',
        javascript: './js/',
        jsVendorDir: './js/vendor/',
        temp: './temp/',
        vegasOverlays: './bower_components/vegas/dist/overlays/',
        images: './images/'
    }
};
gulp.task('clean:css', function () {
    return del(config.paths.styles);
});
gulp.task('clean:fonts', function() {
    return del(config.paths.fontsDir);
});
gulp.task('build:vendor-css', function() {
     return gulp.src(config.paths.vendorSassFile)
        .pipe(sass({outputStyle: 'extended'}).on('error', sass.logError))
        .pipe(gulp.dest(config.paths.styles));
});
gulp.task('build:font-awesome', function() {
    return gulp.src(config.paths.fontAwesomeSass)
        .pipe(sass({outputStyle: 'extended'}).on('error', sass.logError))
        .pipe(gulp.dest(config.paths.styles));
});
gulp.task('move:fonts', function () {
    return gulp.src(config.paths.fontsFiles)
        .pipe(gulp.dest(config.paths.fontsDir));
});
gulp.task('move:vegas-overlays', function () {
    return gulp.src(config.paths.vegasOverlays)
        .pipe(gulp.dest(config.paths.images));
});
gulp.task('default',['build:vendor-css', 'build:font-awesome', 'move:fonts', 'move:vegas-overlays'], function () {

});