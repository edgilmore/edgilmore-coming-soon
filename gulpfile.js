/**
 * Created by Edward on 2/12/2016.
 */
'use strict';
var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');

var config = {
    paths: {
        bootstrapSass:'./bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss',
        fontsFiles:['./bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*','./bower_components/font-awesome/fonts/*.*'],
        fontsDir: './fonts/',
        fontAwesomeSass:'./bower_components/font-awesome/scss/font-awesome.scss',
        styles:'./css/',
        javascript: './js/'
    }
};
gulp.task('clean:css', function () {
    return del(config.paths.styles);
});
gulp.task('clean:fonts', function() {
    return del(config.paths.fontsDir);
})
gulp.task('build:bootstrap',['clean:css', 'clean:fonts'], function() {
    return gulp.src(config.paths.bootstrapSass)
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

gulp.task('default',['build:bootstrap', 'build:font-awesome', 'move:fonts'], function () {

});