'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync'),
    svgSprite = require('gulp-svg-sprite'),
    replace = require('gulp-replace');

const svgConfig = {
    mode: {
        symbol: {
            dest: '.',
            bust: false,
            sprite: 'src/assets/icons/sprite.svg',
            prefix: '.svg-icon-',
            dimensions: '%s',
            example: {
                dest: 'public/icons.html'
            }
        }
    }
};

const styles = () => {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(prefix(['last 30 versions', 'ie 7', '> 1%']))
        .pipe(gulp.dest('public/css'))
};

const templates = () => {
    return gulp.src('src/templates/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('public'))
};

const icons = () => {
    return gulp.src('src/assets/icons/templates/*.svg', {cwd: ''})
        .pipe(replace(/fill="none"/g, 'svg-properitie-unfill'))
        .pipe(replace(/fill=\".+?\"/g, 'fill="currentColor"'))
        .pipe(replace(/svg-properitie-unfill/g, 'fill="none"'))
        .pipe(replace(/stroke=\".+?\"/g, 'stroke="currentColor"'))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite(svgConfig)).on('error', function (error) {
            /* Do some awesome error handling ... */
        })
        .pipe(gulp.dest('.'));
}

const scripts = () => {
    return (
      gulp
        .src(["src/assets/js/**/*"])
        .pipe(gulp.dest("public/js/"))
    );
}

const watchFiles = () => {
    gulp.watch('src/templates/**/*.pug', gulp.series(templates, done => {
        browserSync.reload();
        done();
    }));

    gulp.watch('src/assets/scss/**/*.scss', gulp.series(styles, done => {
        browserSync.reload();
        done();
    }));

    gulp.watch('src/assets/icons/**/*.svg', gulp.series(icons, done => {
        browserSync.reload();
        done();
    }));

    gulp.watch('src/assets/js/**/*', gulp.series(scripts, done => {
        browserSync.reload();
        done();
    }));

    browserSync.init({server: ["./", 'public/']});
};
const fonts = ()=>{
    return gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('public/fonts'));
}
const images = ()=>{
    return gulp.src('src/assets/images/**/*')
        .pipe(gulp.dest('public/images'));
}
const css = ()=>{
    return gulp.src('src/assets/css/**/*')
        .pipe(gulp.dest('public/css'));
}

exports.default = gulp.series(templates, styles, icons, scripts, fonts, images, css, watchFiles);
