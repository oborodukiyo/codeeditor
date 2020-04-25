

// Find HTML Window
var htmlDOM = document.getElementById('target-html');
htmlDOM.innerText = `<!doctype html>
<html lang="ja">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
    <h1>Hello, world!</h1>
    </body>
</html>`

function runner() {
    // Find iframe
    var ifr = document.getElementById('result');
    result = ifr.contentWindow;

    // Add HTML elements to iframe
    result.window.document.firstChild.innerHTML = htmlDOM.innerText;

    // Find CSS Window
    var cssDOM = document.getElementById('target-css');

    // Reflect CSS
    let style = document.createElement('style');
    style.innerHTML = cssDOM.innerText;
    result.window.document.head.appendChild(style);
}


$(function(){
    window.onresize = resize;
    resize();
});

function resize(){
 $('#right').css({
    "width":$('#runner').outerWidth() - $('#left').outerWidth()- $('#resizeH').outerWidth() - 4 + "px"
 });
}

jQuery.resizable = function (resizerID, VerOrHor){
    jQuery('#' + resizerID).bind('mousedown', function(e){
        var start = e.pageY;
        if (VerOrHor == 'H') start = e.pageX;
        jQuery('#runner').bind('mouseup', function(){
            jQuery('#runner').unbind('mousemove');
            jQuery('#runner').unbind('mouseup');
        });
        jQuery('#runner').bind("mousemove", function(e){
            var end = e.pageX;
            if (VerOrHor == 'V') end = e.pageY;
            if (VerOrHor == 'V') {
                jQuery('#target-html').outerHeight(jQuery('#target-html').outerHeight() + (end - start));
                jQuery('#target-css').outerHeight(jQuery('#target-css').outerHeight() - (end - start));
            } else {
                let lw = jQuery('#left').outerWidth();
                let rw = jQuery('#right').outerWidth();
                jQuery('#left').outerWidth(lw + (end - start));
                jQuery('#right').outerWidth(rw - (end - start));

                document.getElementById('widthtag').innerText = jQuery('#right').outerWidth() + "px";
            }
            start = end;
        });
    });
}

jQuery.resizable('resizeH', "H");
jQuery.resizable('resizeV', "V");

// $('#result').draggable({
//     start: function(){
//         // Temporarily disable mouse events for IFRAME for smooth dragging
//         $('#result iframe').css('pointer-events', 'none');
//     },
//     stop: function(){
//         // Re-enable mouse events for IFRAME
//         $('#result iframe').css('pointer-events', 'auto');
//     }
// });