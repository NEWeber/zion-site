$( window ).scroll( function () {
    var scrollMeasure = $(window).scrollTop();

    if(scrollMeasure >= 20) {
        $( '.menu-wrap' ).addClass( 'menu-wrap-scrolled' );

    } else {
        $( '.menu-wrap' ).removeClass( 'menu-wrap-scrolled' );
    }
} );
