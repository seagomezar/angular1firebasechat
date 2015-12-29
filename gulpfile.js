var gulp = require('gulp'),
	usemin = require('gulp-usemin'),
	minifyCSS = require('gulp-minify-css'),
	concatCss = require('gulp-concat-css'),
	concatJs = require('gulp-concat'),
  notify = require('gulp-notify'),
	uglify = require('gulp-uglify'),
	minifyHTML = require('gulp-minify-html'),
	clean = require('gulp-rimraf'),
	imagemin = require('gulp-imagemin'),
	serve = require('gulp-serve'),
	ngAnnotate = require('gulp-ng-annotate'),
	eslint = require('gulp-eslint')
	browserSync = require('browser-sync').create();

gulp.task('main', function()
{
  gulp.src(['app/index.html'])
	.pipe(usemin({
			css: [minifyCSS(), 'concat'],
			vendorJs: [ngAnnotate(), uglify(), 'concat'],
			ownJs: [ngAnnotate(), uglify(), 'concat']
	}))
	.pipe(gulp.dest('dist'));
});

gulp.task('views', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src(['app/templates/*.html'])
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('clean', function() {
    return gulp.src(['dist/**/*.*','dist/**/**/*.*','dist/*.*','dist/*'], { read: false })
           .pipe(clean({ force: true }));
});
gulp.task('build', ['main','views']);

gulp.task('success', ['clean'], function() {
  gulp.start('build');
});

gulp.task('default',['lint'],function(){
	gulp.start('success');
});

gulp.task('serve', function (){
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/views/*.html',
    'app/scripts/*.js',
    'app/scripts/**/*.js',
    'bower_components/*',
		'app/css/*.css',
  ]).on('change', browserSync.reload);
  gulp.watch('bower.json');
});

gulp.task('serve:dist', function (){
  gulp.start('default');
  browserSync.init({
    notify: false,
    port: 3000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('lint', function () {
    return gulp.src(['app/scripts/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
