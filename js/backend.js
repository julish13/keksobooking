'use strict';

(function () {
  const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;
  const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;

  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;


  let errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };


  let setXhrListeners = function (xhr, onLoad, onError) {
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };


  let load = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    setXhrListeners(xhr, onLoad, onError);
    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  };

  let save = function (data, onLoad, onError) {
    const xhr = new XMLHttpRequest();
    setXhrListeners(xhr, onLoad, onError);
    xhr.open(`POST`, URL_SAVE);
    xhr.send(data);
  };

  let announcements = [];


  let createAnnouncementsArray = function (data) {
    for (let i = 0; i < data.length; i++) {
      announcements[i] = data[i];
    }
  };


  window.backend = {
    load,
    save,
    errorHandler,
    createAnnouncementsArray,
    announcements
  };
})();

