// last-visit.js

document.addEventListener('DOMContentLoaded', function() {
    const lastVisitMessage = document.getElementById('last-visit-message');
    const lastVisitText = document.getElementById('last-visit-text');

    // Get the last visit date from localStorage
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    const currentDate = new Date();

    // Format the current date to a readable string
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedCurrentDate = currentDate.toLocaleDateString(undefined, options);

    // Check if there's a last visit date stored
    if (lastVisitDate) {
        const lastVisit = new Date(lastVisitDate);
        const formattedLastVisitDate = lastVisit.toLocaleDateString(undefined, options);
        const timeDifference = currentDate - lastVisit;
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        // Display the message based on the time difference
        let message = `Welcome back! Your last visit was on ${formattedLastVisitDate}.`;
        if (daysDifference < 1) {
            message = `Welcome back! You visited us earlier today.`;
        } else if (daysDifference === 1) {
            message = `Welcome back! You visited us yesterday.`;
        }

        lastVisitText.textContent = message;
        lastVisitMessage.style.display = 'block';
    } else {
        // First time visit message
        lastVisitText.textContent = 'Welcome! This is your first visit to GrowLocal Community Gardens.';
        lastVisitMessage.style.display = 'block';
    }

    // Store the current visit date in localStorage
    localStorage.setItem('lastVisitDate', currentDate);
});
