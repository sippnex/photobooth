showLandingPage();

function onClickLandingPage() {
    showCountdownPage();
}

function showLandingPage() {
    document.querySelector('#landing-page').style.display = 'flex';
    document.querySelector('#countdown-page').style.display = 'none';
    document.querySelector('#photo-page').style.display = 'none';
    document.addEventListener('touchstart', onClickLandingPage);
}

function showCountdownPage() {
    document.removeEventListener('touchstart', onClickLandingPage)
    document.querySelector('#landing-page').style.display = 'none';
    document.querySelector('#countdown-page').style.display = 'flex';
    document.querySelector('#photo-page').style.display = 'none';
    document.querySelector("#countdown-flash").style.display = 'none';

    const ledOnRequest = new XMLHttpRequest();
    ledOnRequest.open("GET", "/api/led-on", true);
    ledOnRequest.send();

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
                        const takePhotoRequest = new XMLHttpRequest();
                        takePhotoRequest.open("GET", "/api/take-photo", true);
                        takePhotoRequest.onreadystatechange = () => {
                            if (takePhotoRequest.readyState == 4) {
                                showPhotoPage();
                                const ledOffRequest = new XMLHttpRequest();
                                ledOffRequest.open("GET", "/api/led-off", true);
                                ledOffRequest.send();
                            }
                        };
                        takePhotoRequest.send();
                    }
                }, 1000);
            })
            .catch(error => {
                console.error("Something went wrong!", error);
            });
    }
}

function showPhotoPage() {
    document.querySelector('#landing-page').style.display = 'none';
    document.querySelector('#countdown-page').style.display = 'none';
    document.querySelector('#photo-page').style.display = 'flex';
    document.querySelector('#photo-preview').src = '';
    document.querySelector('#photo-countdown').innerHTML = '10';

    const getPhotoRequest = new XMLHttpRequest();
    getPhotoRequest.open("GET", "/api/photo", true);
    getPhotoRequest.onreadystatechange = () => {
        if (getPhotoRequest.readyState == 4) {
            document.querySelector('#photo-preview').src = "data:image/png;base64," + getPhotoRequest.response;
            const countdownElement = document.querySelector("#photo-countdown");
            let countdown = 10;
            countdownElement.innerHTML = countdown;
            const interval = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    countdownElement.innerHTML = countdown;
                } else {
                    clearInterval(interval);
                    const deletePhotoRequest = new XMLHttpRequest();
                    deletePhotoRequest.open("DELETE", "/api/photo", true);
                    deletePhotoRequest.onreadystatechange = () => {
                        if (deletePhotoRequest.readyState == 4) {
                            showLandingPage();
                        }
                    };
                    deletePhotoRequest.send();
                }
            }, 1000);
        }
    };
    getPhotoRequest.send();
}