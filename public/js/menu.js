

    let isClosed = false;    
function myMenu(){
    let trigger = $('.hamburger')
    trigger.click(function () {
        hamburger_cross();
    });
    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
}
function hamburger_cross() {
    let trigger = $('.hamburger')
    let overlay = $('.overlay')
    if (isClosed == true) {
    overlay.hide();
    trigger.removeClass('is-open');
    trigger.addClass('is-closed');
    isClosed = false;
    } else {
    overlay.show();
    trigger.removeClass('is-closed');
    trigger.addClass('is-open');
    isClosed = true;
    }
    
}