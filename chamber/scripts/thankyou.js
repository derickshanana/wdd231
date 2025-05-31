document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const formData = {
        'first-name': urlParams.get('first-name'),
        'last-name': urlParams.get('last-name'),
        'email': urlParams.get('email'),
        'phone': urlParams.get('phone'),
        'business': urlParams.get('business'),
        'membership': urlParams.get('membership'),
        'description': urlParams.get('description'),
        'timestamp': urlParams.get('timestamp')
    };

    document.getElementById('first-name').textContent = formData['first-name'];
    document.getElementById('last-name').textContent = formData['last-name'];
    document.getElementById('email').textContent = formData['email'];
    document.getElementById('phone').textContent = formData['phone'];
    document.getElementById('business').textContent = formData['business'];
    document.getElementById('membership').textContent = formData['membership'];
    document.getElementById('description').textContent = formData['description'];
    document.getElementById('timestamp').textContent = new Date(formData['timestamp']).toLocaleString();
});

