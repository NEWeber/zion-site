var gulp           = require( 'gulp' );
var pump           = require( 'pump' );
//TODO: remove del if it's not needed later
var del            = require( 'del' );
var nunjucksRender = require( 'gulp-nunjucks-render' );
var sass           = require( 'gulp-sass' );
var uglify         = require( 'gulp-uglify' );
var notify         = require( 'gulp-notify' );
var plumber        = require( 'gulp-plumber' );

function customerPlumber( errTitle ) {
    return plumber( {
        errorHandler: notify.onError( {
            title: errTitle || "Error running Gulp",
            message: "Error: <%= error.message %>",
            sound: 'Glass'
        } )
    } );
}

//Compile nunjucks files, put in target
gulp.task( 'nunjucks', function( cb ) {
    pump( [
        gulp.src( 'pages/**/*.nunjucks' ),
        customerPlumber( 'Nunjucks Error' ),
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
        customerPlumber( 'SASS Error' ),
        sass().on( 'error', sass.logError ),
        gulp.dest( './target/css' )
    ],
    cb
    );
} );

gulp.task( 'compress', function ( cb ) {
    pump( [
        gulp.src( './js/*.js' ),
        customerPlumber( 'JS Error' ),
        uglify(),
        gulp.dest( './target/js' )
    ],
    cb
    );
} );

// checkout https://github.com/sindresorhus/gulp-imagemin for images
gulp.task( 'copy', function( cb ) {
    pump  ( [
        gulp.src( './img/*' ),
        customerPlumber( 'Copy Error' ),
        gulp.dest( './target/img' )
    ],
    cb
    );
} );

gulp.task( 'default', [ 'nunjucks', 'sass', 'compress', 'copy' ] );

gulp.task( 'watch', function() {
    gulp.watch( './sass/**/*.scss', [ 'sass' ] );
    gulp.watch( './js/*.js', [ 'compress' ] );
    gulp.watch( ['pages/**/*.nunjucks', 'templates/**/*.nunjucks'], [ 'nunjucks' ] );
} );
