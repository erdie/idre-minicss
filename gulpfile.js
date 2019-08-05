const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// compile sass into css and auto inject into browser
function style() {
    return gulp.src('src/sass/style.sass') 
    //.pipe(sass().on('error', sass.logError))
    .pipe(sass())
    //.pipe(sass({outputStyle: 'compressed'})) //compile minify
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}

//move the javascript files into src/js folder
function copyjs() {
    return gulp.src('node_modules/chart.js/dist/Chart.min.js')
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
}

//run web server and watch
function watch() {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
    gulp.watch(['src/sass/*.sass', 'src/sass/pages/*.sass', 'src/sass/components/*.sass'], style);
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/*.js').on('change', browserSync.reload);
}

exports.copyjs = copyjs;
exports.style = style;
exports.watch = watch;

