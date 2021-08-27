const xhttp = new XMLHttpRequest();
xhttp.open("GET", "/api/photo", true);
xhttp.addEventListener("load", () => {
  document.querySelector('#photo-preview').src = "data:image/png;base64," + xhttp.response;
});
xhttp.send();

const countdownElement = document.querySelector("#photo-countdown");
let countdown = 10;
countdownElement.innerHTML = countdown;
setInterval(() => {
  countdown--;
  if (countdown > 0) {
    countdownElement.innerHTML = countdown;
  } else {
    xhttp.open("DELETE", "/api/photo", true);
    xhttp.addEventListener("load", () => window.location.href="/");
    xhttp.send();
  }
}, 1000);