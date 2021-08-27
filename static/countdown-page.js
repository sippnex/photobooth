const preview = document.querySelector("#countdown-preview");
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      preview.srcObject = stream;
      const countdownElement = document.querySelector("#countdown-text");
      let countdown = 5;
      countdownElement.innerHTML = countdown;
      setInterval(() => {
        countdown--;
        if (countdown > 0) {
          countdownElement.innerHTML = countdown;
          if (countdown === 3) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "/api/led-on", true);
            xhttp.send();
          }
        } else {
          countdownElement.innerHTML = '';
          document.querySelector("#countdown-flash").style.display = 'initial';
          var xhttp = new XMLHttpRequest();
          xhttp.open("GET", "/api/take-photo", true);
          xhttp.addEventListener("load", () => {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "/api/led-off", true);
            xhttp.addEventListener("load", () => window.location.href = "photo-page");
            xhttp.send();
          });
          xhttp.send();
        }
      }, 1000);
    })
    .catch(error => {
      console.error("Something went wrong!", error);
    });
}