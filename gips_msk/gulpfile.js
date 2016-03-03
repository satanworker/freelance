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
    prefixer = require('gulp-autoprefixer');

//paths

var path = {
    src: {
        html: 'src/*.html',
        js: 'src/js/app.js',
        css: 'src/css/app.scss',
        img: 'src/img/**/*.*',
        font: 'src/font/**/*.*',
        jade: 'src/jade/**/*.*'
    },
    build: {
        html: '',
        js: 'js/', //В стилях и скриптах нам понадобятся только main файлы
        css: 'css/',
        img: 'img/',
        font: 'font/',
        jade: ''
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
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
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload())
});

gulp.task('style:build', function() {
    gulp.src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', handleError)
        .pipe(prefixer())
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
});
gulp.task('default', ['connect', 'watch']);