var gulp           = require( 'gulp' );
var del            = require( 'del' );
var nunjucksRender = require( 'gulp-nunjucks-render' );

gulp.task( 'clean', function () {
    return del( [
        'target/**/*'
    ] );
} );

 gulp.task( 'nunjucks', function() {
     return gulp.src( 'pages/**/*.+(html|nunjucks)' )
     .pipe( nunjucksRender( {
         path: [ 'templates' ]
     } ) )
     .pipe( gulp.dest( 'target' ) )
 } );

 gulp.task( 'default', [ 'clean', 'nunjucks' ] );
