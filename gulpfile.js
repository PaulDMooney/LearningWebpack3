const gulp = require('gulp')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')
webpackConfig.watch = true

gulp.task("default", function() {
    return gulp.src('./src/index.js')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest('build/'));
});