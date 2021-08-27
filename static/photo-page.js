const countdown = document.querySelector("#photo-countdown");
countdown.innerHTML = '10';
setTimeout(() => countdown.innerHTML = '9', 1000);
setTimeout(() => countdown.innerHTML = '8', 2000);
setTimeout(() => countdown.innerHTML = '7', 3000);
setTimeout(() => countdown.innerHTML = '6', 4000);
setTimeout(() => countdown.innerHTML = '5', 5000);
setTimeout(() => countdown.innerHTML = '4', 6000);
setTimeout(() => countdown.innerHTML = '3', 7000);
setTimeout(() => countdown.innerHTML = '2', 8000);
setTimeout(() => countdown.innerHTML = '1', 9000);
setTimeout(() => {
  xhttp.open("DELETE", "/api/photo", true);
  xhttp.addEventListener("load", () => window.location.href="/");
  xhttp.send();
}, 10000);

const xhttp = new XMLHttpRequest();
xhttp.open("GET", "/api/photo", true);
xhttp.addEventListener("load", () => {
  document.querySelector('#photo-preview').src = "data:image/png;base64," + xhttp.response;
});
xhttp.send();