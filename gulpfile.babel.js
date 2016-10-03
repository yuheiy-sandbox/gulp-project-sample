'use strict'

import gulp from 'gulp'
import browserSync from 'browser-sync'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'

const server = browserSync.create()

const js = () =>
  gulp.src('src/js/**/*.js', {since: gulp.lastRun(js)})
    .pipe(babel())
    .pipe(gulp.dest('.tmp/js'))
    .pipe(server.stream({match: '**/*.js'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))

const html = () =>
  gulp.src('src/html/**/*.html', {since: gulp.lastRun(html)})
    .pipe(gulp.dest('.tmp'))
    .pipe(server.stream({match: '**/*.html'}))
    .pipe(gulp.dest('dist'))

const serve = done => {
  server.init({
    server: ['.tmp']
  })

  done()
}

const watch = () => {
  gulp.watch('src/js/**/*.js', js)
  gulp.watch('src/html/**/*.html', html)
}

export default gulp.series(
  gulp.parallel(js, html),
  serve,
  watch
)

export const build = gulp.parallel(js, html)
