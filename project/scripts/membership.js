// membership.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('membership-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const queryString = new URLSearchParams(formData).toString();
        window.location.href = `thankyou.html?${queryString}`;
    });
});
