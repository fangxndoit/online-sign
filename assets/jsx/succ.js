
'use strict';

const e = React.createElement;
const useState = React.useState;
const useEffect = React.useEffect;

function Succ(){
  return (
    <div className="succ">
      <img className="icon" src="./assets/image/success.png" alt srcset />
      <p className="s-txt">您已完成線上簽約</p>
      <p className="s-txt">非常感謝您信任與支持</p>
    </div>
  )
}

const domContainer = document.querySelector('#succ');
ReactDOM.render(e(Succ), domContainer);