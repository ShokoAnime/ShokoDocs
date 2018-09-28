let gulp = require('gulp');
let browserSync = require('browser-sync');
let cp = require('child_process');
let jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

let messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

//From https://github.com/soulroll/jekyll-bootstrap-4

/**
 * Build the Jekyll website
 */

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn(jekyll, ['build', '--incremental'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll and reload the page
 */

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for the jekyll-build task, then start the server
 */

gulp.task('browser-sync', ['jekyll-build'], function () {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */

gulp.task('watch', function () {
    gulp.watch(['assets/css/*', 'assets/js/*', '*.html', '_layouts/*.html', '_data/*', '_includes/*', 'desktop/*', 'myanime3/*', 'server/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` compile
 * the jekyll site, launch BrowserSync & watch files.
 */

gulp.task('default', ['browser-sync', 'watch']);