document.addEventListener("DOMContentLoaded", function () {
    // Visitor message using localStorage
    const visitorMessage = document.getElementById("visitor-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = new Date().toISOString();

    if (lastVisit) {
        const daysSinceLastVisit = Math.floor((new Date(currentVisit) - new Date(lastVisit)) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit < 1) {
            visitorMessage.textContent = "Welcome back! You last visited today.";
        } else if (daysSinceLastVisit === 1) {
            visitorMessage.textContent = "Welcome back! You last visited yesterday.";
        } else {
            visitorMessage.textContent = `Welcome back! You last visited ${daysSinceLastVisit} days ago.`;
        }
    } else {
        visitorMessage.textContent = "Welcome! This is your first visit.";
    }

    // Load continuous calendar
    const calendarElement = document.getElementById('calendar');
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    const createCalendar = (year, month) => {
        const calendar = document.createElement('table');
        const header = document.createElement('tr');
        const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        daysOfWeek.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            header.appendChild(th);
        });
        calendar.appendChild(header);
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let row = document.createElement('tr');
        for (let i = 0; i < firstDay; i++) {
            row.appendChild(document.createElement('td'));
        }
        for (let day = 1; day <= daysInMonth; day++) {
            if (row.children.length === 7) {
                calendar.appendChild(row);
                row = document.createElement('tr');
            }
            const cell = document.createElement('td');
            cell.textContent = day;
            row.appendChild(cell);
        }
        calendar.appendChild(row);
        
        return calendar;
    };

    calendarElement.appendChild(createCalendar(currentYear, currentMonth));

    localStorage.setItem("lastVisit", currentVisit);

    // Lazy loading for images
    const lazyloadImages = document.querySelectorAll("img.lazyload");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                image.classList.remove("lazyload");
                observer.unobserve(image);
            }
        });
    });

    lazyloadImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Fetch and display events
    fetch('data/events.json')
        .then(response => response.json())
        .then(data => {
            const eventsList = document.getElementById('events-list');
            data.events.forEach(event => {
                const listItem = document.createElement('li');
                listItem.textContent = `${event.date}: ${event.name}`;
                eventsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching events:', error));

    // Developer and last modified info in the footer
    const developmentInfo = document.querySelector(".development-info");
    const lastModifiedDate = new Date(document.lastModified).toLocaleDateString();
    const lastModifiedTime = new Date(document.lastModified).toLocaleTimeString();
    developmentInfo.textContent = `Developed by Derick Shanana. Course: WDD 231. Last updated on ${lastModifiedDate} at ${lastModifiedTime}.`;
});
