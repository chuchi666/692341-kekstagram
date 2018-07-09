'use strict';

(function () {

  var STATUS_OK = 200;
  var REQUEST_TIMEOUT = 10000;

  var getData = function (onLoad, onError) {
    var URL_GET = 'https://js.dump.academy/kekstagram/data';
    request('GET', URL_GET, onLoad, onError);
  };

  var postData = function (data, onLoad, onError) {
    var URL_POST = 'https://js.dump.academy/kekstagram';
    request('POST', URL_POST, onLoad, onError, data);
  };

  var request = function (method, url, onLoad, onError, data) {

    var xhr = new XMLHttpRequest();

    if (method === 'GET') {
      xhr.responseType = 'json';
    }

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;

    xhr.open(method, url);
    if (method === 'POST') {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    postData: postData,
    getData: getData
  };
})();
