document.addEventListener('DOMContentLoaded', () => {
    const spotlightContainer = document.getElementById('spotlight-members');
    const members = [
        // JSON data of members
    ];

    const qualifiedMembers = members.filter(member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver');
    const randomMembers = shuffleArray(qualifiedMembers).slice(0, 3);

    randomMembers.forEach(member => {
        const memberHTML = `
            <div class="member-spotlight">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
            </div>
        `;
        spotlightContainer.innerHTML += memberHTML;
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

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

