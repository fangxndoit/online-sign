
'use strict';

var e = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;

function Succ() {
  return React.createElement(
    "div",
    { className: "succ" },
    React.createElement("img", { className: "icon", src: "./assets/image/success.png", alt: true, srcset: true }),
    React.createElement(
      "p",
      { className: "s-txt" },
      "\u60A8\u5DF2\u5B8C\u6210\u7DDA\u4E0A\u7C3D\u7D04"
    ),
    React.createElement(
      "p",
      { className: "s-txt" },
      "\u975E\u5E38\u611F\u8B1D\u60A8\u4FE1\u4EFB\u8207\u652F\u6301"
    )
  );
}

var domContainer = document.querySelector('#succ');
ReactDOM.render(e(Succ), domContainer);