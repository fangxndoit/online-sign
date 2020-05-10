'use strict';

const e = React.createElement;
const useState = React.useState;
const useEffect = React.useEffect;

function Sign() {

  useEffect(() => $("#signature").jSignature(), []);

  function toBaseStr() {
    let datapair = $("#signature").jSignature("getData");
    console.log(datapair);
  }
  function reset() {
    $("#signature").jSignature("reset");
  }

  function fetchDate() {
    // Example POST method implementation:
    // postData('http://example.com/answer', { answer: 42 })
    //   .then(data => console.log(data)) // JSON from `response.json()` call
    //   .catch(error => console.error(error))
  }


  return (
    <div className="Sign">
      <div className="warp">
        <div className="title">
          <span className="title-txt">請使用正楷簽名</span>
          <div className="refresh">
            <img className="icon" src="./assets/refresh.png" alt srcset />
            <span className="refresh-btn" onClick={reset}>重置簽名</span>
          </div>
        </div>
        <div id="signature"></div>
        <div className="btn">
          <span className="btn-item" onClick={toBaseStr}>確認簽署</span>
        </div>
      </div>
    </div>
  )
}

const domContainer = document.querySelector('#sign');
ReactDOM.render(e(Sign), domContainer);
