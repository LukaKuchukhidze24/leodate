document.getElementById('yesBtn').addEventListener('click', function() {
    document.querySelector('.invitation').style.display = 'none'; // Hide the invitation
    document.getElementById('celebrationGIF').style.display = 'block'; // Show the GIF
});


document.getElementById('noBtn').addEventListener('mouseover', function() {
    const x = Math.random() * (window.innerWidth - this.clientWidth);
    const y = Math.random() * (window.innerHeight - this.clientHeight);
    this.style.position = 'fixed';
    this.style.left = x + 'px';
    this.style.top = y + 'px';
});
