// Toggle navigation on small screens
const hamBtn = document.getElementById('hamburgerBtn');
const navMenu = document.querySelector('nav ul');

hamBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamBtn.classList.toggle('open');
});

// Highlight active link (wayfinding)
const currentPage = location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    if (link.getAttribute("href").includes(currentPage)) {
        link.classList.add("active");
    }
});
