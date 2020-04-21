

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
