let captchaText = "";

document.addEventListener('DOMContentLoaded', function() {
    generateCaptcha();

    // Focus on the CAPTCHA input field
    document.getElementById('captcha-input').focus();

    // Handle CAPTCHA submission
    document.getElementById('captcha-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        validateCaptcha();
    });

    // Handle 'Enter' key for submission
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default 'Enter' key action (e.g., form submission)
            validateCaptcha();
        }
    });
});

function generateCaptcha() {
    const canvas = document.getElementById('captcha');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    captchaText = '';
    const charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lengthOtp = 4;

    for (let i = 0; i < lengthOtp; i++) {
        const char = charsArray[Math.floor(Math.random() * charsArray.length)];
        captchaText += char;
    }

    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    for (let i = 0; i < captchaText.length; i++) {
        const x = 20 + i * 30;
        const y = Math.floor(Math.random() * 20) + 40;
        const angle = Math.random() * 0.2 - 0.1;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillText(captchaText[i], 0, 0);
        ctx.restore();
    }

    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.stroke();
    }
}

function validateCaptcha() {
    const userInput = document.getElementById('captcha-input').value;
    const status = document.getElementById('captcha-status');

    if (userInput === captchaText) {
        status.innerText = "CAPTCHA matched!";
        status.style.color = "green";
        playSound();
        enterFullscreen();
        showMainContent();
    } else {
        status.innerText = "CAPTCHA did not match!";
        status.style.color = "red";
        generateCaptcha();
    }
}

function playSound() {
    const audio = new Audio('img/audio.mp'); // Replace with your audio file
    audio.play();
}

function enterFullscreen() {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
    } else if (docEl.mozRequestFullScreen) { /* Firefox */
        docEl.mozRequestFullScreen();
    } else if (docEl.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) { /* IE/Edge */
        docEl.msRequestFullscreen();
    }
}

function showMainContent() {
    const captchaContainer = document.getElementById('captcha-container');
    const mainContent = document.getElementById('main-content');

    if (captchaContainer) {
        captchaContainer.style.display = 'none';
        console.log('Captcha container hidden.');
    } else {
        console.error('Element with ID "captcha-container" not found.');
    }

    if (mainContent) {
        mainContent.style.display = 'block';
        console.log('Main content displayed.');
    } else {
        console.error('Element with ID "main-content" not found.');
    }
}

window.onload = generateCaptcha;
