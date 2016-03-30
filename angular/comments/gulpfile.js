//plugins

var gulp = require('gulp'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jade = require('gulp-jade'),
    svgmin = require('gulp-svgmin'),
    connect = require('gulp-connect'),
    ts = require('gulp-typescript'),
    prefixer = require('gulp-autoprefixer');

//paths

var path = {
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        ts: 'src/js/**/*.ts',
        css: 'src/css/*.scss',
        img: 'src/images/**/*.*',
        font: 'src/font/**/*.*',
        jade: 'src/jade/**/*.*'
    },
    build: {
        html: '',
        js: 'js/', //В стилях и скриптах нам понадобятся только main файлы
        css: 'css/',
        img: 'images/',
        font: 'font/',
        jade: ''
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.scss',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        ts: 'src/js/**/*.ts',
        jade: 'src/**/*.jade'
    },
    clean: ''
};

//tasks
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}


gulp.task('html:build', function(){
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});
gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});
gulp.task('jade:build', function(){
   gulp.src(path.src.jade)
       .pipe(jade({
           pretty: true
       }))
       .on('error', handleError)
       .pipe(gulp.dest(path.build.jade))
       .pipe(connect.reload())
});
gulp.task('js:build', function(){
    gulp.src(path.src.js)
        .pipe(rigger())
        .on('error', handleError)
        .pipe(sourcemaps.init())
        .on('error', handleError)
        .pipe(uglify())
        .on('error', handleError)
        .pipe(gulp.dest(path.build.js))
        .on('error', handleError)
        .pipe(connect.reload())
});

gulp.task('ts:build', function() {
    gulp.src(path.src.ts)
        .pipe(ts)
        .pipe(gulp.dest(path.src.ts))
        .on('error', handleError)
});

gulp.task('style:build', function() {
    gulp.src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', handleError)
        .pipe(prefixer('last 15 versions'))
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload())
});

gulp.task('img:build', function() {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(connect.reload())
});
gulp.task('font:build', function() {
        gulp.src(path.src.font)
        .pipe(gulp.dest(path.build.font))
});

gulp.task('watch', function() {
    gulp.watch([path.watch.jade], function (event, cb) {
        gulp.start('jade:build');

    });
    gulp.watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');

    });
    gulp.watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');

    });
    gulp.watch([path.watch.css], function (event, cb) {
        gulp.start('style:build')

    });
    gulp.watch([path.watch.img], function (event, cb) {
        gulp.start('img:build');
    });
    gulp.watch([path.watch.ts], function(event, cb) {
        gulp.start('ts:build')
    })
});
gulp.task('default', ['watch']);