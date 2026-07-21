const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');

const gulpSass = require('gulp-sass');
const dartSass = require('sass');
const sassCompiler = gulpSass(dartSass);

const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const rsync = require('rsyncwrapper');
const fs = require('fs');

function customPlumber(errTitle) {
    return plumber({
        errorHandler: notify.onError({
            title: errTitle || 'Error running Gulp',
            message: 'Error: <%= error.message %>',
            sound: 'Glass'
        })
    });
}

// Compile nunjucks files, put in target
function nunjucks() {
    return gulp.src(['pages/**/*.nunjucks', '!pages/staff.nunjucks'])
        .pipe(customPlumber('Nunjucks Error'))
        .pipe(nunjucksRender({
            path: ['templates']
        }))
        .pipe(gulp.dest('target'))
        .pipe(browserSync.stream());
}

// Compile sass, put in target/css
function styles() {
    return gulp.src(['sass/**/*.scss', '!sass/styles-staff.scss'])
        .pipe(customPlumber('SASS Error'))
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./target/css'))
        .pipe(browserSync.stream());
}

function compress() {
    return gulp.src('./js/*.js')
        .pipe(customPlumber('JS Error'))
        .pipe(uglify())
        .pipe(gulp.dest('./target/js'))
        .pipe(browserSync.stream());
}

// Copy images
function copy() {
    return gulp.src([
        'img/*',
        '!img/church.jpeg',
        '!img/pastor.jpeg',
        '!img/organist.jpeg',
        '!img/deacon.jpeg'
    ])
        .pipe(customPlumber('Copy Error'))
        .pipe(gulp.dest('./target/img'))
        .pipe(browserSync.stream());
}

const build = gulp.series(nunjucks, styles, compress, copy);

function serve(done) {
    browserSync.init({
        server: {
            baseDir: 'target'
        }
    });

    done();
}

function watchFiles() {
    gulp.watch('./sass/**/*.scss', styles);
    gulp.watch('./js/*.js', compress);
    gulp.watch(['pages/**/*.nunjucks', 'templates/**/*.nunjucks'], nunjucks);
}

function deploySite(done) {
    const creds = JSON.parse(fs.readFileSync('./secrets.json'));

    rsync({
        src: 'target/',
        dest: creds.username,
        privateKey: creds.keyPath,
        ssh: true,
        recursive: true
    }, function (error) {
        if (error) {
            console.log(error.message);
            done(error);
            return;
        }

        console.log('Uploaded to site successfully');
        done();
    });
}

exports.nunjucks = nunjucks;
exports.sass = styles;
exports.compress = compress;
exports.copy = copy;
exports.default = build;
exports.watch = gulp.series(build, serve, watchFiles);
exports.deploy = gulp.series(build, deploySite);

