document.addEventListener("DOMContentLoaded", () => {
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');
    const memberGrid = document.querySelector('.member-grid');
    const memberList = document.querySelector('.member-list');
    const eventsList = document.getElementById('events-list');
    const weatherInfo = document.getElementById('weather-info');
    const forecastInfo = document.getElementById('forecast-info');
    const footerDevelopmentInfo = document.querySelector('.development-info');

    // WakaTime API Key and location
    const WAKATIME_API_KEY = 'waka_4dcfc009-b1b8-49ec-ba37-9c79ed955932';
    const latitude = -20.14;
    const longitude = 28.59;

    // Function to fetch and display data (members, events, weather)
    async function fetchData() {
        try {
            const response = await fetch('data/data.json'); // Adjust path to your JSON data
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log('Fetched data:', data);
            displayMembers(data.members, 7); // Display all 7 members for directory.html
            displayEvents(data.events);
            await fetchWeather(); // Fetch weather data from WakaTime API
            displaySpotlightMembers(data.members); // Display 3 random members for index.html
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to fetch weather data from WakaTime API
    async function fetchWeather() {
        try {
            const response = await fetch(`https://api.wakatime.com/v1/weather?lat=${latitude}&lon=${longitude}&key=${WAKATIME_API_KEY}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const weatherData = await response.json();
            console.log('Fetched weather data:', weatherData);
            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Weather data currently unavailable';
        }
    }

    // Function to display members in grid or list view
    function displayMembers(members, count) {
        memberGrid.innerHTML = '';
        memberList.innerHTML = '';

        const selectedMembers = members.slice(0, count); // Get the specified number of members

        selectedMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.tagLine}</p>
                <p>Address: ${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p>URL: <a href="${member.url}" target="_blank">${member.url}</a></p>
            `;

            const memberListItem = document.createElement('li');
            memberListItem.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.membership_level}</p>
                <p>${member.tagLine}</p>
                <p>Address: ${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p>URL: <a href="${member.url}" target="_blank">${member.url}</a></p>
            `;

            memberGrid.appendChild(memberCard);
            memberList.appendChild(memberListItem);
        });

        toggleView('grid');
    }

    // Function to display events
    function displayEvents(events) {
        eventsList.innerHTML = ''; // Clear previous content

        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerHTML = `
                <h3>${event.name}</h3>
                <p>Date: ${event.date}</p>
                <p>Location: ${event.location}</p>
                <p>Description: ${event.description}</p>
            `;
            eventsList.appendChild(eventDiv);
        });
    }

    // Function to display current weather and forecast
    function displayWeather(weatherData) {
        weatherInfo.innerHTML = `
            <p>Temperature: ${weatherData.current.temp}°C</p>
            <p>Condition: ${weatherData.current.weather[0].description}</p>
        `;

        forecastInfo.innerHTML = weatherData.daily.slice(0, 3).map(day => `
            <p>${new Date(day.dt * 1000).toLocaleDateString()}: ${day.temp.day}°C, ${day.weather[0].description}</p>
        `).join('');
    }

    // Function to display spotlight members on index.html
    function displaySpotlightMembers(members) {
        const spotlightSection = document.getElementById('spotlight-members');
        spotlightSection.innerHTML = ''; // Clear previous content

        // Filter members with gold or silver membership levels
        const filteredMembers = members.filter(member => member.level === 'Gold' || member.level === 'Silver');

        // Shuffle and pick 3 random members
        const selectedMembers = filteredMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

        selectedMembers.forEach(member => {
            const spotlightCard = document.createElement('div');
            spotlightCard.className = 'spotlight-card';
            spotlightCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.membership_level}</p>
                <p>${member.tagLine}</p>
                <p>Address: ${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p>URL: <a href="${member.url}" target="_blank">${member.url}</a></p>
            `;
            spotlightSection.appendChild(spotlightCard);
        });
    }

    // Function to toggle between grid and list view
    function toggleView(view) {
        if (view === 'grid') {
            memberGrid.style.display = 'grid';
            memberList.style.display = 'none';
        } else {
            memberGrid.style.display = 'none';
            memberList.style.display = 'block';
        }
    }

    // Event listeners for view toggle buttons
    gridViewButton.addEventListener('click', () => toggleView('grid'));
    listViewButton.addEventListener('click', () => toggleView('list'));

    // Display the current year and last modified date in the footer
    footerDevelopmentInfo.innerHTML = `
        <p>Developer: Derick Shanana</p>
        <p>Course: WDD 231</p>
        <p>Last Modified: ${document.lastModified}</p>
        <p>&copy; ${new Date().getFullYear()}</p>
    `;

    // Fetch and display members, events, and weather on page load
    fetchData();
});
