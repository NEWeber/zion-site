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

var submenus = document.getElementsByClassName( 'more' );
var numSubmenus = submenus.length;
for( var counter = 0; counter < numSubmenus; counter++ ) {
    var bind = function() {
        var currentElem = submenus[ counter ];
        currentElem.onclick = function () {
            var currentDisplay = document.getElementById( 'display' );
            if ( currentDisplay ) {
                currentDisplay.removeAttribute( 'id' );
            }
            currentElem.setAttribute( 'id', 'display');
        }
    }();
}
