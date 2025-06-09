// thankyou.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const formData = {
        'first-name': urlParams.get('first-name'),
        'last-name': urlParams.get('last-name'),
        'email': urlParams.get('email'),
        'phone': urlParams.get('phone'),
        'garden': urlParams.get('garden'),
        'timestamp': new Date().toLocaleString()
    };

    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            document.getElementById(key).textContent = formData[key];
        }
    }
});
