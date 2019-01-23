const gulp = require('gulp');
// const path = require("path");
// Promise = require('bluebird');

// const rename = require('gulp-rename');
// const sass = require('gulp-sass');
// const prefixer = require('gulp-autoprefixer');
// const sourcemaps = require('gulp-sourcemaps');

// // const browserSync = require("browser-sync").create();

// const browserify = require('browserify');
// const babelify = require('babelify');
// const source = require('vinyl-source-stream');
// const buffer = require('vinyl-buffer'); 
// const uglify = require('gulp-uglify');
    
// const entryDIR = 'src';
// const outputDIR = 'dist';

// const javascriptFILES = ['script.js'];
// const javascriptDIR = 'js';

// const sassFILE = 'styles.scss';
// const sassDIR = 'scss';
// const stylesDIR = 'css';

const tasks = require('tasks');

gulp.task('js', tasks.js)

gulp.task('style', tasks.style);

gulp.task('watch', tasks.watch);

gulp.task('default', gulp.series('style', 'js'));