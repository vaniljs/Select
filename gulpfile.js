var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    pugCompile = require('gulp-pug');

sass.compiler = require('node-sass');

gulp.task('clean', async function () {
    del.sync('dist')
});

gulp.task('pug', function () {
    return gulp.src('src/*.pug')
        .pipe(pugCompile({pretty: true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('javascript', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('src/*.pug', gulp.parallel('pug'));
    gulp.watch('src/scss/*.sass', gulp.parallel('sass'));
    gulp.watch('src/js/*.js', gulp.parallel('javascript'))
});

gulp.task('build', gulp.series('clean', 'pug', 'sass', 'javascript'));
gulp.task('default', gulp.parallel('pug', 'sass', 'javascript', 'browser-sync', 'watch'));