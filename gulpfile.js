var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var connect = require('connect');
var static = require('serve-static');

function httpServer(options) {
  connect()
      .use(static('.', {'index': [options.indexFile]}))
      .listen(options.port);

  console.log('Listening on port ' + options.port);
};

gulp.task('devel', function() {
  var localServerOptions = {
    port: 9090,
    indexFile: 'index-devel.html'
  }

  httpServer(localServerOptions);
});

gulp.task('templates', function() {
  return gulp.src('partials/*.html')
      .pipe(plugins.angularTemplatecache('templates.js', {module: 'devminutes'}))
      .pipe(gulp.dest('js/'));
});

gulp.task('build', function() {
  return gulp.src('./index-devel.html')
      .pipe(plugins.rename('./index.html'))
      .pipe(gulp.dest('.'))
      .pipe(plugins.usemin({
        css: [plugins.minifyCss(), 'concat'],
        js: [plugins.uglify(), plugins.rev()],
        ng: [plugins.ngAnnotate(), plugins.uglify(), plugins.rev()]
      }))
      .pipe(gulp.dest('.'));
});

gulp.task('build-run', ['build'], function() {
  var localServerOptions = {
    port: 9090,
    indexFile: 'index.html'
  }

  httpServer(localServerOptions);
});