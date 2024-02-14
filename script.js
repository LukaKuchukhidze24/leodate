document.addEventListener('DOMContentLoaded', function () {
    var greeting = document.getElementById('greeting');
    var container = document.querySelector('.container');
    var envelope = document.getElementById('envelope');
    var invitation = document.querySelector('.invitation');
    var yesBtn = document.getElementById('yesBtn');
    var noBtn = document.getElementById('noBtn');

    // Initially hide the envelope container and invitation
    container.style.display = 'none';
    invitation.style.display = 'none';

    // After a delay, hide the greeting and show the envelope container
    setTimeout(function () {
        greeting.style.display = 'none';
        container.style.display = 'flex'; // Adjust as needed to match your layout
    }, 3000); // Delay for the greeting display

    // Envelope open event listener
    document.getElementById('open').addEventListener('click', function () {
        envelope.classList.toggle('open');
        envelope.classList.toggle('close');

        // Hide the envelope and container, then show the invitation after animation
        setTimeout(function () {
            container.style.display = 'none'; // Hide the envelope container
            invitation.style.display = 'flex'; // Show the invitation
        }, 2000); // Adjust this timing based on your envelope animation duration
    });

    // Yes button event listener
    yesBtn.addEventListener('click', function () {
        invitation.style.display = 'none'; // Hide the invitation
        document.getElementById('celebrationGIF').style.display = 'block'; // Show the celebration GIF

        // Remove all .random-gif elements from the page
        document.querySelectorAll('.random-gif').forEach(function (gif) {
            gif.remove();
        });
        occupiedAreas = [];
        // Reset the occupied areas to ensure a fresh start for positioning elements

    });

    // Initialize the occupied areas array
    let occupiedAreas = [];

    // Update occupied areas with the positions of buttons and GIFs
    function updateOccupiedAreas(reset = false) {
        if (reset) {
            occupiedAreas = [];
        }
        const elements = [document.getElementById('yesBtn'), document.getElementById('noBtn')];
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            occupiedAreas.push({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                right: rect.right + window.scrollX,
                bottom: rect.bottom + window.scrollY
            });
        });
    }

    // Check if a new position is valid (not overlapping with occupied areas)
    function isValidPosition(x, y, width, height) {
        return !occupiedAreas.some(area => {
            return x < area.right && x + width > area.left && y < area.bottom && y + height > area.top;
        });
    }

    noBtn.addEventListener('mouseover', function () {
        moveNoButton(this);
        displayNewGif();
    });

    function moveNoButton(button) {
        let attempts = 0;
        let newPositionFound = false;
        while (!newPositionFound && attempts < 100) {
            let newX = Math.random() * (window.innerWidth - button.offsetWidth);
            let newY = Math.random() * (window.innerHeight - button.offsetHeight);
            if (isValidPosition(newX, newY, button.offsetWidth, button.offsetHeight)) {
                button.style.position = 'fixed';
                button.style.left = `${newX}px`;
                button.style.top = `${newY}px`;
                newPositionFound = true;
                updateOccupiedAreas(); // Update occupied areas after moving the button
            }
            attempts++;
        }
    }

    function displayNewGif() {
        let img = document.createElement('img');
        img.src = 'https://media.giphy.com/media/sXv0vaA4331Ti/giphy.gif';
        img.style.width = '100px';
        img.style.position = 'absolute';
        document.body.appendChild(img); // Temporarily add the img to calculate dimensions

        let attempts = 0;
        let positionFound = false;
        while (attempts < 100 && !positionFound) {
            let randomX = Math.random() * (window.innerWidth - img.width);
            let randomY = Math.random() * (window.innerHeight - img.height);
            if (isValidPosition(randomX, randomY, img.width, img.height)) {
                img.style.left = `${randomX}px`;
                img.style.top = `${randomY}px`;
                positionFound = true;

                // Add this GIF's area to the occupied areas
                occupiedAreas.push({
                    top: randomY,
                    left: randomX,
                    right: randomX + img.width,
                    bottom: randomY + img.height
                });
            }
            attempts++;
        }

        if (!positionFound) {
            document.body.removeChild(img);
        }
    }
});
