var gulp           = require( 'gulp' );
var pump           = require('pump');
var del            = require( 'del' );
var nunjucksRender = require( 'gulp-nunjucks-render' );
var sass           = require( 'gulp-sass' );
var uglify         = require('gulp-uglify');
//TODO: change all tasks to use pump

//Delete old files in target
gulp.task( 'clean', function ( cb ) {
    return del( [
        'target/**/*'
    ] );
    cb( err );
} );

//Compile nunjucks files, put in target
gulp.task( 'nunjucks', [ 'clean' ], function() {
    return gulp.src( 'pages/**/*.+(html|nunjucks)' )
    .pipe( nunjucksRender( {
        path: [ 'templates' ]
    } ) )
    .pipe( gulp.dest( 'target' ) )
} );

//Compile sass, put in target/css
gulp.task( 'sass', [ 'clean' ], function() {
    return gulp.src( './sass/**/*.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( './target/css' ) );
} );

gulp.task( 'compress', [ 'clean' ], function ( cb ) {
    pump( [
        gulp.src( './js/*.js' ),
        uglify(),
        gulp.dest( './target/js' )
    ],
    cb
    );
} );

// checkout https://github.com/sindresorhus/gulp-imagemin for images
gulp.task( 'copy', [ 'clean' ], function() {
    gulp.src( './img/*' )
    .pipe( gulp.dest( './target/img' ) );
} );

gulp.task( 'default', [ 'clean', 'nunjucks', 'sass', 'compress', 'copy' ] );

gulp.task( 'watch', function() {
    gulp.watch( './sass/**/*.scss', [ 'sass' ] );
    gulp.watch( './js/*.js', [ 'compress' ] );
    gulp.watch( 'pages/**/*.+(html|nunjucks)', [ 'nunjucks' ] );
} );
