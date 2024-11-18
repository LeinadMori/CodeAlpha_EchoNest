document.getElementById('play-pause').addEventListener('click', function() {
    let playPauseButton = document.getElementById('play-pause');
    let icon = playPauseButton.querySelector('i');

    if (icon.classList.contains('fa-play')) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
});



let position = 0; // Initial position (in pixels)
const musicButtons = document.querySelector('.music-buttons');
const maxPosition = -(musicButtons.scrollWidth - musicButtons.offsetWidth);

function moveLeft() {
    position = Math.max(position - 100, maxPosition); // Limit movement to the left
    musicButtons.style.transform = `translateX(${position}px)`; // Apply transformation
}

function moveRight() {
    position = Math.min(position + 100, 0); // Limit movement to the right
    musicButtons.style.transform = `translateX(${position}px)`; // Apply transformation
}

// Toggle dropdown visibility on profile button click
document.querySelector('.profile-btn').addEventListener('click', function(event) {
    const menu = document.querySelector('.dropdown-menu');
    
    // Toggle display between block (show) and none (hide)
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }

    // Prevent click event from propagating to window (so it doesn't close immediately)
    event.stopPropagation();
});

// Close dropdown if the user clicks anywhere outside of the profile button or dropdown menu
window.addEventListener('click', function(event) {
    const menu = document.querySelector('.dropdown-menu');
    const profileBtn = document.querySelector('.profile-btn');
    
    // If the click was outside the profile button and dropdown menu, close the dropdown
    if (!profileBtn.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});






window.addEventListener('click', function(event) {
    const menu = document.querySelector('.dropdown-menu');
    const profileBtn = document.querySelector('.profile-btn');
    
    if (!profileBtn.contains(event.target)) {
        menu.style.display = 'none'; // Close the dropdown when clicking outside
    }
});

