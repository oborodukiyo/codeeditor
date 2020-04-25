
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
</html>`;

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
    style.innerHTML = cssDOM.innerText.replace(/\s+/g, "");
    result.window.document.head.appendChild(style);

    // Store entire code
    localStorage.setItem('currentHTML', document.getElementById('target-html').innerText);
    localStorage.setItem('currentCSS', document.getElementById('target-css').innerText);
}

function clearall(){
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
</html>`;
    var cssDOM = document.getElementById('target-css');
    cssDOM.innerText = "";
    runner();
}

window.addEventListener('load', function () {
    document.getElementById('target-html').innerText = localStorage.getItem('currentHTML');
    document.getElementById('target-css').innerText = localStorage.getItem('currentCSS');
    runner();
});


$(function(){
    window.onresize = resize;
    resize();
});

function resize(){
 $('#right').css({
    "width":$('#runner').outerWidth() - $('#left').outerWidth()- $('#resizeH').outerWidth() - 4 + "px"
 });
 $('#target-html').css({
     "height":299 - $('.windowfor').outerHeight() + "px"});
 $('#target-css').css({
     "height":299 - $('.windowfor').outerHeight() + "px"});
}


jQuery.resizable = function (resizerID, VerOrHor){
    jQuery('#' + resizerID).bind('mousedown', function(e){
        var start = e.pageY;
        if (VerOrHor == 'H') start = e.pageX;
        jQuery('#workbench').bind('mouseup', function(){
            jQuery('#workbench').unbind('mousemove');
            jQuery('#workbench').unbind('mouseup');
        });
        jQuery('#workbench').bind("mousemove", function(e){
            var end = e.pageX;
            if (VerOrHor == 'V') end = e.pageY;
            if (VerOrHor == 'V') {
                let hh = jQuery('#target-html').outerHeight();
                let ch = jQuery('#target-css').outerHeight();
                jQuery('#target-html').outerHeight(hh + (end - start));
                jQuery('#target-css').outerHeight(ch - (end - start));
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