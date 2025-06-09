document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.getElementById('join-form');
    joinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(joinForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('your-backend-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Account created successfully!');
            } else {
                alert('Error creating account.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
