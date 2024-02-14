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
        document.getElementById('celebrationGIF').style.display = 'block'; // Show the GIF
        document.querySelectorAll('.random-gif').forEach(gif => gif.remove()); 
        occupiedAreas = []; 
    });

    let occupiedAreas = [];

// Function to update occupied areas with buttons' positions
function updateOccupiedAreas() {
    occupiedAreas = []; // Reset the array to update the positions
    const buttons = [document.getElementById('yesBtn'), document.getElementById('noBtn')];
    buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        occupiedAreas.push({
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom
        });
    });
}

// Function to check if a new position is valid (not overlapping with occupied areas)
function isValidPosition(x, y, width, height) {
    return !occupiedAreas.some(area => {
        return x < area.right && x + width > area.left && y < area.bottom && y + height > area.top;
    });
}
a

    // No button playful behavior
    noBtn.addEventListener('mouseover', function () {
        const x = Math.random() * (window.innerWidth - this.clientWidth);
        const y = Math.random() * (window.innerHeight - this.clientHeight);
        this.style.position = 'fixed';
        this.style.left = x + 'px';
        this.style.top = y + 'px';
        updateOccupiedAreas(); // Update the occupied areas with current positions
    
        let img = document.createElement('img');
        img.src = 'https://media.giphy.com/media/sXv0vaA4331Ti/giphy.gif';
        img.style.width = '100px';
        img.onload = function() {
            let attempts = 0;
            let positionFound = false;
            while (attempts < 100 && !positionFound) {
                let randomX = Math.floor(Math.random() * (window.innerWidth - this.width));
                let randomY = Math.floor(Math.random() * (window.innerHeight - this.height));
                
                if (isValidPosition(randomX, randomY, this.width, this.height)) {
                    img.style.position = 'absolute';
                    img.style.left = `${randomX}px`;
                    img.style.top = `${randomY}px`;
                    document.body.appendChild(img);
    
                    // Add this GIF's area to the occupied areas
                    occupiedAreas.push({
                        top: randomY,
                        left: randomX,
                        right: randomX + this.width,
                        bottom: randomY + this.height
                    });
                    positionFound = true;
                }
                attempts++;
            }
        };
        img.classList.add('random-gif');
    });
});
