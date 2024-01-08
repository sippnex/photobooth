const xhttp1 = new XMLHttpRequest();
xhttp1.open("GET", "/api/led-on", true);
xhttp1.send();
const preview = document.querySelector("#countdown-preview");
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      preview.srcObject = stream;
      const countdownElement = document.querySelector("#countdown-text");
      let countdown = 5;
      countdownElement.innerHTML = countdown;
      const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          countdownElement.innerHTML = countdown;
        } else {
          clearInterval(interval);
          countdownElement.innerHTML = '';
          document.querySelector("#countdown-flash").style.display = 'initial';
          const xhttp2 = new XMLHttpRequest();
          xhttp2.open("GET", "/api/take-photo", true);
          xhttp2.onreadystatechange = () => {
            if (xhttp2.readyState == 4) {
              const xhttp3 = new XMLHttpRequest();
              xhttp3.open("GET", "/api/led-off", true);
              xhttp3.onreadystatechange = () => {
                if (xhttp3.readyState == 4) {
                  window.location.href = "photo-page"
                }
              };
              xhttp3.send();
            }
          };
          xhttp2.send();
        }
      }, 1000);
    })
    .catch(error => {
      console.error("Something went wrong!", error);
    });
}
