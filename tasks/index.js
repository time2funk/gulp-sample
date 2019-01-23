const gulp = require('gulp');
const path = require("path");
Promise = require('bluebird');

const rename = require('gulp-rename');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// const browserSync = require("browser-sync").create();

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer'); 
const uglify = require('gulp-uglify');
    
const entryDIR = 'src';
const outputDIR = 'dist';

const javascriptFILES = ['script.js'];
const javascriptDIR = 'js';

const sassFILE = 'styles.scss';
const sassDIR = 'scss';
const stylesDIR = 'css';


module.exports = {
    js,
    style,
    watch
};
const js = function() {
    const out_path = path.join(__dirname, outputDIR, javascriptDIR);

    let output = '';

    return Promise.map( javascriptFILES, async itemName => {
        const item = path.join(__dirname, entryDIR, javascriptDIR, itemName);
        output += item + '\n';
        
        await browserify({
            entries: [item]
        })
        .transform( babelify, { presets: ['@babel/env']})
        .bundle()
        .pipe( source( item))
        .pipe( rename({
            extname: '.min.js'
        }))
        .pipe( buffer())
        .pipe( sourcemaps.init({
            loadMaps: true
        }))
        .pipe( uglify())
        .pipe( sourcemaps.write( './'))
        .pipe( gulp.dest( out_path));
    })
    .then(function() {
        console.log('output', output);
    });   
};

const style = function () {
    const in_path = path.join(__dirname, entryDIR, sassDIR);
    const out_path = path.join(__dirname, outputDIR, stylesDIR);
    const file_path = `${in_path}/${sassFILE}`;

    // console.log(in_path);
    // console.log(out_path);
    console.log('file', file_path);

    return gulp.src( file_path)
        .pipe( sourcemaps.init())
        .pipe( sass( {
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on( "error", console.error.bind(console))
        .pipe( prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe( rename( { 
            suffix: '.min',
            extname: '.css'
        }))
        .pipe( sourcemaps.write('./'))
        .pipe( gulp.dest( out_path));
};

const watch = async function () {
    const js_path = path.join(__dirname, entryDIR, javascriptDIR);
    const style_path = path.join(__dirname, entryDIR, sassDIR);
    
    console.log(js_path);
    console.log(style_path);
    
    gulp.watch( js_path, gulp.series('js'));
    gulp.watch( style_path, gulp.series('style'));
};


// const browserWatch = gulp.parallel( function() {
//     const js_path = path.join(__dirname, entryDIR, javascriptDIR);
//     const style_path = path.join(__dirname, entryDIR, sassDIR);
    
//     console.log(js_path);
//     console.log(style_path);
    
//     gulp.watch( js_path, gulp.series('js'));
//     gulp.watch( style_path, gulp.series('style'));
// }, browserSync));

