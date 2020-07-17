'use strict';

var e = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;

function Sign() {

  useEffect(function () {
    return $("#signature").jSignature();
  }, []);

  function toBaseStr() {
    var datapair = $("#signature").jSignature("getData");
    sessionStorage.setItem('datapair', datapair);
    location.href = './home.html';
  }
  function reset() {
    $("#signature").jSignature("reset");
  }

  return React.createElement(
    "div",
    { className: "Sign" },
    React.createElement(
      "div",
      { className: "warp" },
      React.createElement(
        "div",
        { className: "title" },
        React.createElement(
          "span",
          { className: "title-txt" },
          "\u8ACB\u4F7F\u7528\u6B63\u6977\u7C3D\u540D"
        ),
        React.createElement(
          "div",
          { className: "refresh" },
          React.createElement("img", { className: "icon", src: "./assets/image/refresh.png", alt: true, srcset: true }),
          React.createElement(
            "span",
            { className: "refresh-btn", onClick: reset },
            "\u91CD\u7F6E\u7C3D\u540D"
          )
        )
      ),
      React.createElement("div", { id: "signature" }),
      React.createElement(
        "div",
        { className: "btn" },
        React.createElement(
          "span",
          { className: "btn-item", onClick: toBaseStr },
          "\u78BA\u8A8D\u7C3D\u7F72"
        )
      )
    )
  );
}

var domContainer = document.querySelector('#sign');
ReactDOM.render(e(Sign), domContainer);