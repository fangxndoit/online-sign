
'use strict';

const e = React.createElement;
const useState = React.useState;
const useEffect = React.useEffect;

function Home() {

  const [agree1, setAgree1] = useState(true)
  const [agree2, setAgree2] = useState(true)
  const [imgsrc, setImg] = useState('')
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [msg, setMsg] = useState('提示')


  useEffect(() => {
    let src = sessionStorage.getItem('datapair');
    let token = getUrlParam('token');
    if (token) {
      sessionStorage.setItem('token', token);
      fetchInit(token);
    }
    let agree1 = sessionStorage.getItem('agree1');
    let agree2 = sessionStorage.getItem('agree2');
    if (agree1 == 'false') {
      setAgree1(false)
    }
    if (agree2 == 'false') {
      setAgree2(false)
    }
    setImg(src)
  }, []);

  function setAgree(e) {
    if (e == '1') {
      let agree = !agree1;
      setAgree1(agree)
    } else {
      let agree = !agree2;
      setAgree2(agree)
    }
  }
  function toSign() {
    sessionStorage.setItem('agree1', agree1);
    sessionStorage.setItem('agree2', agree2);
    location.href = './sign.html'
  }

  function toUpload() {
    if (agree1 || agree2) {
      showToastFn('請先勾選協議')
      return;
    }
    if (!imgsrc) {
      showToastFn('請先签字')
      return;
    }
    setShowLoading(true)
    let fd = new FormData();
    let key = 'sign';
    let blob = dataURLtoBlob(imgsrc);
    let file = blobToFile(blob, key);
    fd.append("file", file);
    fetchSign(fd)
  }

  function loading() {
    return (
      <div className="mask" id="mask">
        <div class="donut"></div>
      </div>
    )
  }
  function toast() {
    return (
      <div className="toast toastAnimate">
        <span className="txt">{msg}</span>
      </div>
    )
  }
  function fetchInit(token) {
    fetch(window.g.api + '/electronic/agreement/queryInfo',
      {
        method: 'POST',
        headers: new Headers({
          'Authorization': token
        })
      }).then(res => res.json())
      .catch(error => {
        console.error(error)
        showToastFn('网络错误')
        setShowLoading(false)
      })
      .then(response => {
        setShowLoading(false)
        console.log(response)
        if (response.status == 'ERROR') {
          // if (response.message == 'token失效！') {
          //   showToastFn('该链接已失效')
          // }else if(response.message == '该协议已签署'){
          //   location.href = './success.html';
          // }
          showToastFn(response.message);
          if (response.message == '该协议已签署') {
            location.href = './success.html';
          }
        }
      })
  }
  function fetchSign(data) {
    // Example POST method implementation:
    fetch(window.g.api + '/electronic/agreement/updateStatus',
      {
        method: 'POST',
        body: data,
        headers: new Headers({
          'Authorization': sessionStorage.getItem('token')
        })
      }).then(res => res.json())
      // JSON from `response.json()` call
      .catch(error => {
        console.error(error)
        showToastFn('网络错误')
        setShowLoading(false)
      })
      .then(response => {
        setShowLoading(false)
        if (response.status == 'ERROR') {
          // if (response.message == 'token失效！') {
          //   showToastFn('该链接已失效')
          // }else{
          //   setShowToast(true);
          //   setMsg(response.message);
          // }
          showToastFn(response.message);
        } else {
          // sessionStorage.clear()
          showToastFn('签署协议成功');
          location.href = './success.html';
        }
      })
  }

  function toQuestion() {
    fetch(window.g.api + '/electronic/agreement/sendMail',
      {
        method: 'POST',
        headers: new Headers({
          'Authorization': sessionStorage.getItem('token')
        })
      }).then(res => res.json())
      .catch(error => {
        console.error(error)
        showToastFn('网络错误')
        setShowLoading(false)
      })
      .then(response => {
        setShowLoading(false)
        console.log(response)
        if (response.status == 'ERROR') {
          showToastFn(response.message);
        } else {
          showToastFn(response.message);
        }
      })
  }
  function showToastFn(msg) {
    setShowToast(true);
    setMsg(msg);
    var timer = setTimeout(function () {
      setShowToast(false);
      clearTimeout(timer);
    }, 2000)
  }

  function getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var param = window.location.search.substr(1).match(reg);
    if (param !== null) {
      return unescape(param[2]);
    } else {
      return '';
    }
  }

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  function dataURLtoFile(dataurl, filename) {
    //将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }



  return (
    <div className="home">
      {showToast ? toast() : null}
      {showLoading ? loading() : null}
      <p>以下為商戶入網協議及KYC協議，請貴司董事認真查閲並完成綫上簽約</p>
      <div className="agree">
        <label className="labelId" onClick={setAgree.bind(this, 1)}>
          {agree1 ? <span className="regular"></span> : null}
        </label>
        <a href={window.g.bindo} target="_blank" className="txt">Bindo Payment Services Agreement</a>
      </div>
      <div className="agree">
        <label className="labelId" onClick={setAgree.bind(this, 2)}>
          {agree2 ? <span className="regular"></span> : null}
        </label>
        <a href={window.g.kyc} target="_blank" className="txt">Merchant KYC infomation Form for Credit Card. Alipay and WeChat Pay Payment Application</a>
      </div>
      <div className="warp">
        <span className="txt">董事簽字:</span>
        {imgsrc ? <img src={imgsrc} className="signContent" onClick={toSign} /> : <span className="signContent" onClick={toSign}></span>}
      </div>
      <div className="btn">
        <span className="btn-item" onClick={toUpload} >同意協議</span>
      </div>
      <p class="point" onClick={toQuestion}>?⃝對協議有疑問</p>
    </div>
  )
}

const domContainer = document.querySelector('#home');
ReactDOM.render(e(Home), domContainer);