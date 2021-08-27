const preview = document.querySelector("#countdown-preview");
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      preview.srcObject = stream;
      const countdown = document.querySelector("#countdown-text");
      countdown.innerHTML = '5';
      setTimeout(() => countdown.innerHTML = '4', 1000);
      setTimeout(() => countdown.innerHTML = '3', 2000);
      setTimeout(() => {
        countdown.innerHTML = '2';
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/api/led-on", true);
        xhttp.send();
      }, 3000);
      setTimeout(() => countdown.innerHTML = '1', 4000);
      setTimeout(() => {
        countdown.innerHTML = '';
        stream.getTracks().forEach(track => {
          track.stop();
        });
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/api/take-photo", true);
        xhttp.addEventListener("load", () => {
          var xhttp = new XMLHttpRequest();
          xhttp.open("GET", "/api/led-off", true);
          xhttp.addEventListener("load", () => window.location.href="photo-page");
          xhttp.send();
        });
        xhttp.send();
      }, 5000);
    })
    .catch(error => {
      console.error("Something went wrong!", error);
    });
}