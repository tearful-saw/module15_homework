const wsUri = "wss://echo.websocket.org/";

function pageLoaded() {
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  const geoBtn = document.querySelector(".btn_geo");
  
  let socket = new WebSocket(wsUri);
  
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  }
  
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }
  
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  }
  
  sendBtn.addEventListener("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }
  
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }

  geoBtn.addEventListener("click", getLocation);

  function getLocation() {
    if ("geolocation" in navigator)
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    else {
      writeOutut("Ваш браузер не поддерживает функцию определения местоположения")
    }
  }

  function locationSuccess(data) {
    let link = `https://yandex.ru/maps/?pt=30.335429,59.944869&z=18&l=map`;
    return link
  }

  function locationError() {
    writeOutut("При определении местоположения произошла ошибка")
  }

  function writeOutut(message) {
    output.innerHTML = `<p>${message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);