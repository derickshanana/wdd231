document.getElementById('timestamp').value = new Date().toISOString();

        const modal = document.getElementById("membership-modal");
        const btn = document.getElementById("learn-more");
        const span = document.getElementsByClassName("close")[0];

        btn.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        const cards = document.querySelectorAll('.membership-cards .card');
        cards.forEach(card => {
            card.style.transition = "all 0.5s ease-in-out";
            card.addEventListener('mouseover', () => {
                card.style.opacity = "0.8";
                card.style.transform = "scale(1.05)";
            });
            card.addEventListener('mouseout', () => {
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
            });

        });