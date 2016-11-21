// $( window ).scroll( function () {
//     var scrollMeasure = $(window).scrollTop();
//
//     if(scrollMeasure >= 20) {
//         $( '.menu-wrap' ).addClass( 'menu-wrap-scrolled' );
//
//     } else {
//         $( '.menu-wrap' ).removeClass( 'menu-wrap-scrolled' );
//     }
// } );

function myFunction() {
    var topnav = document.getElementById("my-top-nav");
    if (topnav.className === "topnav") {
        topnav.className += " responsive";
    } else {
        topnav.className = "topnav";
    }
}
