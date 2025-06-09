// contact.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const confirmationText = document.getElementById('confirmation-text');

    let ticketNumber = 7005;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Increment the ticket number
        ticketNumber++;

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Display confirmation message
        confirmationText.innerHTML = `Thank you, ${name}. Your message has been recorded with ticket number TK${ticketNumber}. You will be contacted soon by one of our agents.`;
        confirmationMessage.style.display = 'block';

        // Optionally, clear the form fields
        form.reset();
    });
});
