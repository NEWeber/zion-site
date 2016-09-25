var gulp           = require( 'gulp' );
var del            = require( 'del' );
var nunjucksRender = require( 'gulp-nunjucks-render' );
var sass           = require( 'gulp-sass' );

//Delete old files in target
gulp.task( 'clean', function () {
    return del( [
        'target/**/*'
    ] );
} );

//Compile nunjucks files, put in target
 gulp.task( 'nunjucks', function() {
     return gulp.src( 'pages/**/*.+(html|nunjucks)' )
     .pipe( nunjucksRender( {
         path: [ 'templates' ]
     } ) )
     .pipe( gulp.dest( 'target' ) )
 } );

//Compile sass, put in target/css
 gulp.task( 'sass', function() {
     return gulp.src( './sass/**/*.scss' )
     .pipe( sass().on( 'error', sass.logError ) )
     .pipe( gulp.dest( './target/css' ) );
 } );

 gulp.task( 'default', [ 'clean', 'nunjucks', 'sass' ] );
