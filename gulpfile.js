const child = require('child_process');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const Pngquant = require('imagemin-pngquant');
const siteRoot = '_site';


/*
|--------------------------------------------------------------------------
| Build Jekyll
|--------------------------------------------------------------------------
|
*/


gulp.task('jekyll', () => {
    const jekyll = child.exec('jekyll build --watch --incremental');
    const jekyllLogger = (buffer) => {
        buffer.toString()
            .split(/\n/)
            .forEach((message) => gutil.log('Jekyll: ' + message));
    };
    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});


/*
|--------------------------------------------------------------------------
| Serve Website
|--------------------------------------------------------------------------
|
*/


gulp.task('serve', () => {
    browserSync.init({
        files: [siteRoot + '/**'],
        port: 4000,
        server: {
            baseDir: siteRoot
        }
    });
});


/*
|--------------------------------------------------------------------------
| Minify Images
|--------------------------------------------------------------------------
|
*/


gulp.task('img', function () {
    return gulp.src('assets/img/**/*.{jpg,jpeg,png,gif}')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            /*imagemin.optipng({optimizationLevel: 5}),*/
            Pngquant({speed: 3, quality: 0-100}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('assets/img/'));
});


/*
|--------------------------------------------------------------------------
| Group Tasks
|--------------------------------------------------------------------------
|
*/


gulp.task('build', ['jekyll', 'serve']);