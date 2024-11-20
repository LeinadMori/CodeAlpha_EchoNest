document.addEventListener("DOMContentLoaded", () => {
    // Function to fetch data and render UI
    const fetchDataAndRender = async () => {
        try {
            // Fetch favorites
            const favoritesResponse = await fetch("/api/library/favorites");
            const favorites = await favoritesResponse.json();
            const favoritesList = document.getElementById("favorites-list");
            favoritesList.innerHTML = favorites
                .map(
                    (favorite) =>
                        `<li><a href="#"><i class="fas fa-heart"></i> ${favorite.title}</a></li>`
                )
                .join("");

            // Fetch recently played
            const recentlyPlayedResponse = await fetch("/api/library/recently-played");
            const recentlyPlayed = await recentlyPlayedResponse.json();
            const recentlyPlayedList = document.getElementById("recently-played-list");
            recentlyPlayedList.innerHTML = recentlyPlayed
                .map(
                    (song) =>
                        `<li><a href="#"><i class="fas fa-history"></i> ${song.title}</a></li>`
                )
                .join("");

            // Fetch playlists
            const playlistsResponse = await fetch("/api/playlists");
            const playlists = await playlistsResponse.json();
            const playlistsList = document.getElementById("playlists-list");
            playlistsList.innerHTML = playlists
                .map(
                    (playlist) =>
                        `<li><a href="#"><i class="fas fa-guitar"></i> ${playlist.name}</a></li>`
                )
                .join("");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Call the function to fetch and render data
    fetchDataAndRender();
});



// Select the button and the dropdown menu
// Profile Dropdown in side-bar
const profileButton = document.querySelector('.profile-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Add click event listener to the button
profileButton.addEventListener('click', () => {
    // Toggle the display property
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

// Optional: Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.profile')) {
        dropdownMenu.style.display = 'none';
    }
});

// Profile Dropdown ends

// Profile dropdown menu
const menuLinks = document.querySelectorAll('.dropdown-menu a');
const pages = document.querySelectorAll('.page-content');

menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        
        // Get the target page ID from the data-page attribute
        const targetPage = event.target.getAttribute('data-page');

        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));

        // Show the selected page
        const targetContent = document.getElementById(targetPage);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Profile Dropdown menu ends

// repeat and reshufle button

class MusicPlayer {
    constructor() {
        this.repeatModes = ['none', 'one', 'all'];
        this.currentRepeatMode = 0;
        this.isShuffleActive = false;
        this.playlist = [
            { title: 'Bohemian Rhapsody', artist: 'Queen', src: 'path/to/bohemian.mp3' },
            { title: 'Stairway to Heaven', artist: 'Led Zeppelin', src: 'path/to/stairway.mp3' },
            { title: 'Hotel California', artist: 'Eagles', src: 'path/to/hotel.mp3' },
            // Add more tracks
        ];
        this.currentTrackIndex = 0;
        this.audioElement = new Audio();

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const repeatBtn = document.querySelector('.repeat-btn');
        const shuffleBtn = document.querySelector('.shuffle-btn');

        repeatBtn.addEventListener('click', () => this.cycleRepeatMode());
        shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    }

    cycleRepeatMode() {
        const repeatBtn = document.querySelector('.repeat-btn');
        
        // Cycle through repeat modes
        this.currentRepeatMode = (this.currentRepeatMode + 1) % this.repeatModes.length;

        // Update button appearance and state
        switch(this.repeatModes[this.currentRepeatMode]) {
            case 'none':
                repeatBtn.classList.remove('active');
                break;
            case 'one':
                repeatBtn.classList.add('active');
                repeatBtn.innerHTML = '<i class="fas fa-redo"></i> 1';
                break;
            case 'all':
                repeatBtn.classList.add('active');
                repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
                break;
        }

        console.log(`Repeat mode: ${this.repeatModes[this.currentRepeatMode]}`);
    }

    toggleShuffle() {
        const shuffleBtn = document.querySelector('.shuffle-btn');
        
        this.isShuffleActive = !this.isShuffleActive;
        
        if (this.isShuffleActive) {
            shuffleBtn.classList.add('active');
            this.shufflePlaylist();
        } else {
            shuffleBtn.classList.remove('active');
            this.resetPlaylist();
        }

        console.log(`Shuffle: ${this.isShuffleActive ? 'ON' : 'OFF'}`);
    }

    shufflePlaylist() {
        for (let i = this.playlist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.playlist[i], this.playlist[j]] = [this.playlist[j], this.playlist[i]];
        }
    }

    resetPlaylist() {
        // Implement original playlist order logic if needed
        // This is a placeholder and might need more sophisticated implementation
        this.playlist.sort((a, b) => a.title.localeCompare(b.title));
    }

    playNextTrack() {
        switch(this.repeatModes[this.currentRepeatMode]) {
            case 'none':
                // Normal progression
                this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
                break;
            case 'one':
                // Replay the same track
                break;
            case 'all':
                // Automatically move to next track, wrapping around
                this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
                break;
        }
        this.playCurrentTrack();
    }

    playCurrentTrack() {
        const currentTrack = this.playlist[this.currentTrackIndex];
        this.audioElement.src = currentTrack.src;
        this.audioElement.play();

        // Update UI with current track information
        document.querySelector('.song-info h2').textContent = currentTrack.title;
        document.querySelector('.song-info p').textContent = currentTrack.artist;
    }
}

// Initialize the music player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const musicPlayer = new MusicPlayer();
});

// play list button ends


document.getElementById("search-bar").addEventListener("input", function (event) {
    const query = event.target.value.toLowerCase(); // Get the search query
    const resultsList = document.getElementById("results-list");
    const searchResults = document.getElementById("search-results");
    const items = document.querySelectorAll(".search-item");
    let hasResults = false; // Track if there are any matches

    if (query.trim() === "") {
        searchResults.style.display = "none"; // Hide results if the query is empty
        return;
    }

    items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = ""; // Show matching items
            hasResults = true;
        } else {
            item.style.display = "none"; // Hide non-matching items
        }
    });

    // Show the results container only if there are matches
    searchResults.style.display = hasResults ? "block" : "none";

    // Update aria-live with results status
    if (!hasResults) {
        resultsList.innerHTML = "<li>No results found</li>";
    }
});
