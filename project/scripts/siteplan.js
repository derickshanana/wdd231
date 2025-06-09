document.addEventListener('DOMContentLoaded', function() {
    const lastModified = document.getElementById('last-modified');
    const date = new Date(document.lastModified);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    lastModified.textContent = date.toLocaleDateString('en-US', options);
});
