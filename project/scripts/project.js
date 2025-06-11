document.addEventListener('DOMContentLoaded', () => {
    loadCarousel();
    setupNavigation();
    handleFormSubmission();
    setupEventModals();
    loadEvents(); // Add this line to load events dynamically
});

function loadCarousel() {
    const carousel = document.querySelector('.carousel');

    fetch('data/highlights.json')
        .then(response => response.json())
        .then(data => {
            data.highlights.forEach(highlight => {
                const item = document.createElement('div');
                item.className = 'carousel-item';

                const img = document.createElement('img');
                img.src = highlight.image;
                img.alt = highlight.title;

                const title = document.createElement('h3');
                title.textContent = highlight.title;

                const description = document.createElement('p');
                description.textContent = highlight.description;

                item.appendChild(img);
                item.appendChild(title);
                item.appendChild(description);

                carousel.appendChild(item);
            });
        })
        .catch(error => console.error('Error loading carousel:', error));
}

function setupNavigation() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('nav ul');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

function handleFormSubmission() {
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log('Form Data:', data);
        // Display form data on a new page or modal
    });
}

// Load developer information dynamically
function loadDeveloperInfo() {
    const developerInfo = document.getElementById('developer-info');
    const developerName = 'Derick Shanana';
    const course = 'WDD 231 at BYU-Idaho';
    const lastModified = document.lastModified;
    const videoDemo = '  <p><a href="https://www.loom.com/share/d5d3b156956644dfab00221cc82a476b?sid=730ae936-dfd9-4b5e-98af-49112c3497d6" target="_blank" rel="noopener">🎥 Watch Project Demo Video</a></p>';
    
    developerInfo.innerHTML = `
        <p>Developed by: ${developerName}</p>
        <p>Course: ${course}</p>
        <p>Last Modified: ${lastModified}</p>
        <p>Video Demo: ${videoDemo}</p>
    `;
}

// Call the function to load developer information when the page loads
window.addEventListener('DOMContentLoaded', loadDeveloperInfo);


function setupEventModals() {
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach(item => {
        item.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <h2>${item.dataset.title}</h2>
                    <p>${item.dataset.description}</p>
                </div>
            `;
            document.body.appendChild(modal);

            const closeButton = modal.querySelector('.close-button');
            closeButton.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
    });
}

