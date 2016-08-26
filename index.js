'use strict';

var path = require('path');
var defaultsDeep = require('lodash.defaultsdeep');
var imagemin = require('gulp-imagemin');

module.exports = function (gulp, gulpConfig) {

  gulpConfig = gulpConfig || { basePath: '.' };

  // Merge default config with gulp config.
  var defaultConfig = {
    imageOptimization: {
      src: path.join('images_originals', '*'),
      dest: 'images'
    }
  };

  var config = defaultsDeep(gulpConfig, defaultConfig).imageOptimization;

  gulp.task('image-optimization', function () {
    return gulp.src(path.join(gulpConfig.basePath, config.src))
      .pipe(imagemin())
      .pipe(gulp.dest(path.join(gulpConfig.basePath, config.dest)));
  });
  gulp.task('image-optimization-watch', ['image-optimization'], function () {
    gulp.watch(path.join(gulpConfig.basePath, config.src), ['image-optimization'])
  });
};
