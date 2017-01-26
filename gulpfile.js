const gulp = require('gulp');
const browserSync = require('browser-sync');
const run = require('gulp-run');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');

const appSync = browserSync.create();
const testSync = browserSync.create();


gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/spec'));
});


gulp.task('watch', () => {
  gulp.watch(
    [
      'controllers/**/*.js',
      'src/**/*.js',
      'src/**/*.html',
      'gulpfile.js'
    ],
    appSync.reload);
  gulp.watch(['jasmine/**/*', 'src/**/*.js'], testSync.reload);

  gulp.watch(
    [
      'src/inverted-index.js',
      'jasmine/spec/inverted-index-test.js'
    ],
    ['scripts']);
});

gulp.task('serveApp', () => {
  appSync.init({
    server: {
      baseDir: './',
      index: 'src/index.html'
    },
    port: process.env.PORT || 8000,
    ui: false,
    ghostMode: false,
    open: false
  });
});

gulp.task('serveTest', () => {
  testSync.init({
    server: {
      baseDir: ['./src', './jasmine'],
      index: 'SpecRunner.html'
    },
    port: 8080,
    ui: false,
    ghostMode: false,
    open: false
  });
});

gulp.task('test', () => {
  run('node_modules/karma/bin/karma start karma.conf.js --single-run').exec();
});

gulp.task('default', ['serveApp', 'scripts', 'watch', 'serveTest']);
