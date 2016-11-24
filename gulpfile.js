var gulp           = require( 'gulp' );
var pump           = require('pump');
var del            = require( 'del' );
var nunjucksRender = require( 'gulp-nunjucks-render' );
var sass           = require( 'gulp-sass' );
var uglify         = require('gulp-uglify');
//TODO: change all tasks to use pump

//Compile nunjucks files, put in target
gulp.task( 'nunjucks', function( cb ) {
    pump( [
        gulp.src( 'pages/**/*.nunjucks' ),
        nunjucksRender( {
            path: [ 'templates' ]
        } ),
        gulp.dest( 'target' )
    ],
    cb
    );
} );

//Compile sass, put in target/css
gulp.task( 'sass', function( cb ) {
    pump( [
        gulp.src( './sass/**/*.scss'),
        sass().on( 'error', sass.logError ),
        gulp.dest( './target/css' )
    ],
    cb
    );
} );

gulp.task( 'compress', function ( cb ) {
    pump( [
        gulp.src( './js/*.js' ),
        uglify(),
        gulp.dest( './target/js' )
    ],
    cb
    );
} );

// checkout https://github.com/sindresorhus/gulp-imagemin for images
gulp.task( 'copy', function() {
    gulp.src( './img/*' )
    .pipe( gulp.dest( './target/img' ) );
} );

gulp.task( 'default', [ 'nunjucks', 'sass', 'compress', 'copy' ] );

gulp.task( 'watch', function() {
    gulp.watch( './sass/**/*.scss', [ 'sass' ] );
    gulp.watch( './js/*.js', [ 'compress' ] );
    gulp.watch( ['pages/**/*.nunjucks', 'templates/**/*.nunjucks'], [ 'nunjucks' ] );
} );
