const xhttp = new XMLHttpRequest();
xhttp.open("GET", "/api/photo", true);
xhttp.addEventListener("load", () => {
  document.querySelector('#photo-preview').src = "data:image/png;base64," + xhttp.response;
});
xhttp.send();

setTimeout(() => {
  xhttp.open("DELETE", "/api/photo", true);
  xhttp.addEventListener("load", () => window.location.href="/");
  xhttp.send();
}, 8000);