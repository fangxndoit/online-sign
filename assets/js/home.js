
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var e = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;

function Home() {
  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      agree1 = _useState2[0],
      setAgree1 = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      agree2 = _useState4[0],
      setAgree2 = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      imgsrc = _useState6[0],
      setImg = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showLoading = _useState8[0],
      setShowLoading = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      showToast = _useState10[0],
      setShowToast = _useState10[1];

  var _useState11 = useState('提示'),
      _useState12 = _slicedToArray(_useState11, 2),
      msg = _useState12[0],
      setMsg = _useState12[1];

  useEffect(function () {
    var src = sessionStorage.getItem('datapair');
    var token = getUrlParam('token');
    if (token) {
      sessionStorage.setItem('token', token);
      fetchInit(token);
    }
    var agree1 = sessionStorage.getItem('agree1');
    var agree2 = sessionStorage.getItem('agree2');
    if (agree1 == 'false') {
      setAgree1(false);
    }
    if (agree2 == 'false') {
      setAgree2(false);
    }
    setImg(src);
  }, []);

  function setAgree(e) {
    if (e == '1') {
      var agree = !agree1;
      setAgree1(agree);
    } else {
      var _agree = !agree2;
      setAgree2(_agree);
    }
  }
  function toSign() {
    sessionStorage.setItem('agree1', agree1);
    sessionStorage.setItem('agree2', agree2);
    location.href = './sign.html';
  }

  function toUpload() {
    if (agree1 || agree2) {
      showToastFn('請先勾選協議');
      return;
    }
    if (!imgsrc) {
      showToastFn('請先签字');
      return;
    }
    setShowLoading(true);
    var fd = new FormData();
    var key = 'sign';
    var blob = dataURLtoBlob(imgsrc);
    var file = blobToFile(blob, key);
    fd.append("file", file);
    fetchSign(fd);
  }

  function loading() {
    return React.createElement(
      'div',
      { className: 'mask', id: 'mask' },
      React.createElement('div', { 'class': 'donut' })
    );
  }
  function toast() {
    return React.createElement(
      'div',
      { className: 'toast toastAnimate' },
      React.createElement(
        'span',
        { className: 'txt' },
        msg
      )
    );
  }
  function fetchInit(token) {
    fetch(window.g.api + '/electronic/agreement/queryInfo', {
      method: 'POST',
      headers: new Headers({
        'Authorization': token
      })
    }).then(function (res) {
      return res.json();
    }).catch(function (error) {
      console.error(error);
      showToastFn('网络错误');
      setShowLoading(false);
    }).then(function (response) {
      setShowLoading(false);
      console.log(response);
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
    });
  }
  function fetchSign(data) {
    // Example POST method implementation:
    fetch(window.g.api + '/electronic/agreement/updateStatus', {
      method: 'POST',
      body: data,
      headers: new Headers({
        'Authorization': sessionStorage.getItem('token')
      })
    }).then(function (res) {
      return res.json();
    })
    // JSON from `response.json()` call
    .catch(function (error) {
      console.error(error);
      showToastFn('网络错误');
      setShowLoading(false);
    }).then(function (response) {
      setShowLoading(false);
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
    });
  }

  function toQuestion() {
    fetch(window.g.api + '/electronic/agreement/sendMail', {
      method: 'POST',
      headers: new Headers({
        'Authorization': sessionStorage.getItem('token')
      })
    }).then(function (res) {
      return res.json();
    }).catch(function (error) {
      console.error(error);
      showToastFn('网络错误');
      setShowLoading(false);
    }).then(function (response) {
      setShowLoading(false);
      console.log(response);
      if (response.status == 'ERROR') {
        showToastFn(response.message);
      } else {
        showToastFn(response.message);
      }
    });
  }
  function showToastFn(msg) {
    setShowToast(true);
    setMsg(msg);
    var timer = setTimeout(function () {
      setShowToast(false);
      clearTimeout(timer);
    }, 2000);
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
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  return React.createElement(
    'div',
    { className: 'home' },
    showToast ? toast() : null,
    showLoading ? loading() : null,
    React.createElement(
      'p',
      null,
      '\u4EE5\u4E0B\u70BA\u5546\u6236\u5165\u7DB2\u5354\u8B70\u53CAKYC\u5354\u8B70\uFF0C\u8ACB\u8CB4\u53F8\u8463\u4E8B\u8A8D\u771F\u67E5\u95B2\u4E26\u5B8C\u6210\u7DAB\u4E0A\u7C3D\u7D04'
    ),
    React.createElement(
      'div',
      { className: 'agree' },
      React.createElement(
        'label',
        { className: 'labelId', onClick: setAgree.bind(this, 1) },
        agree1 ? React.createElement('span', { className: 'regular' }) : null
      ),
      React.createElement(
        'a',
        { href: window.g.bindo, target: '_blank', className: 'txt' },
        'Bindo Payment Services Agreement'
      )
    ),
    React.createElement(
      'div',
      { className: 'agree' },
      React.createElement(
        'label',
        { className: 'labelId', onClick: setAgree.bind(this, 2) },
        agree2 ? React.createElement('span', { className: 'regular' }) : null
      ),
      React.createElement(
        'a',
        { href: window.g.kyc, target: '_blank', className: 'txt' },
        'Merchant KYC infomation Form for Credit Card. Alipay and WeChat Pay Payment Application'
      )
    ),
    React.createElement(
      'div',
      { className: 'warp' },
      React.createElement(
        'span',
        { className: 'txt' },
        '\u8463\u4E8B\u7C3D\u5B57:'
      ),
      imgsrc ? React.createElement('img', { src: imgsrc, className: 'signContent', onClick: toSign }) : React.createElement('span', { className: 'signContent', onClick: toSign })
    ),
    React.createElement(
      'div',
      { className: 'btn' },
      React.createElement(
        'span',
        { className: 'btn-item', onClick: toUpload },
        '\u540C\u610F\u5354\u8B70'
      )
    ),
    React.createElement(
      'p',
      { 'class': 'point', onClick: toQuestion },
      '?\u20DD\u5C0D\u5354\u8B70\u6709\u7591\u554F'
    )
  );
}

var domContainer = document.querySelector('#home');
ReactDOM.render(e(Home), domContainer);