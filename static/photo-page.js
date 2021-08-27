const xhttp1 = new XMLHttpRequest();
xhttp1.open("GET", "/api/photo", true);
xhttp1.onreadystatechange = () => {
  if (xhttp1.readyState == 4) {
    document.querySelector('#photo-preview').src = "data:image/png;base64," + xhttp1.response;
    const countdownElement = document.querySelector("#photo-countdown");
    let countdown = 10;
    countdownElement.innerHTML = countdown;
    const interval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        countdownElement.innerHTML = countdown;
      } else {
        clearInterval(interval);
        const xhttp2 = new XMLHttpRequest();
        xhttp2.open("DELETE", "/api/photo", true);
        xhttp2.onreadystatechange = () => {
          if (xhttp2.readyState == 4) {
            window.location.href = "/";
          }
        };
        xhttp2.send();
      }
    }, 1000);
  }
};
xhttp1.send();