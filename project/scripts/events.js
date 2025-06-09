document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
});

function loadEvents() {
    fetch('data/events.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const eventsList = document.getElementById('events-list');
            data.events.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.classList.add('event-item');
                
                const eventTitle = document.createElement('h3');
                eventTitle.textContent = event.title;
                
                const eventDate = document.createElement('p');
                eventDate.textContent = `Date: ${event.date}`;
                
                const eventTime = document.createElement('p');
                eventTime.textContent = `Time: ${event.time}`;
                
                const eventLocation = document.createElement('p');
                eventLocation.textContent = `Location: ${event.location}`;
                
                const eventDescription = document.createElement('p');
                eventDescription.textContent = event.description;
                
                eventItem.appendChild(eventTitle);
                eventItem.appendChild(eventDate);
                eventItem.appendChild(eventTime);
                eventItem.appendChild(eventLocation);
                eventItem.appendChild(eventDescription);
                
                eventsList.appendChild(eventItem);
            });
        })
        .catch(error => console.error('Error fetching events:', error));
}
