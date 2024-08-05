

const imgCoverEl = document.getElementById("cover");
const musicTitleEl = document.getElementById("music-title");
const musicArtistEl = document.getElementById("music-artist");
const songSliderEl = document.getElementById("slider");
const playerProgressEl = document.getElementById("player-progress");
const progressEl = document.getElementById("progress");
const currTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("song-duration");
const previousEl = document.getElementById("prev");
const playbtnEl = document.getElementById("play");
const nextEl = document.getElementById("next");

// Song data
const songs = [
    {
        path: "C:\\Users\\Swarangi\\Downloads\\LYRICAL_ Kaise Hua _ Kabir Singh _ Shahid K, Kiara A, Sandeep V _ Vishal Mishra, Manoj Muntashir.mp3",
        displayName: "Kaise Hua",
        artist: "Vishal Mishra",
        cover: "C:\\Users\\Swarangi\\Pictures\\channels4_profile.jpg",
    },
    {
        path: "C:\\Users\\Swarangi\\Downloads\\Koi Mujhko Aise mila hai jaise banjare ko ghar_ kisi sayar ki gajal _ arijit singh new song2023.mp3",
        displayName: "Koi Mujhko Aise Mila",
        artist: "Arjit Singh",
        cover: "C:\\Users\\Swarangi\\Pictures\\arijit.jpg",
    },
    {
        path: "C:\\Users\\Swarangi\\Downloads\\Tu Mera Hero_TR3Ifjpf7W8.mp3",
        displayName: "Tu Mera Hero",
        artist: "Mika Singh",
        cover: "C:\\Users\\Swarangi\\Pictures\\Mika-Singhe.jpg",
    },
    {
        path: "C:\\Users\\Swarangi\\Downloads\\Audio _ Hai Junoon _ Full Song _ New York _ KK _ Pritam _ Sandeep Shrivastava__hEgNwyHlAU.mp3",
        displayName: "Hai Junoon",
        artist: "KK",
        cover: "C:\\Users\\Swarangi\\Pictures\\images1.jpg",
    },
];

const music = new Audio();
let musicIndex = 0;
let isPlaying = false;

// Play/Pause functionality
function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playbtnEl.classList.replace("fa-play", "fa-pause");
    playbtnEl.setAttribute("title", "Pause");
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playbtnEl.classList.replace("fa-pause", "fa-play");
    playbtnEl.setAttribute("title", "Play");
    music.pause();
}

// Load and update music
function loadMusic(song) {
    music.src = song.path;
    musicTitleEl.textContent = song.displayName;
    musicArtistEl.textContent = song.artist;
    imgCoverEl.src = song.cover;
    music.addEventListener('loadeddata', () => {
        durationEl.textContent = formatTime(music.duration);
        songSliderEl.max = music.duration;
    });
}

// Change music track
function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();  // Auto play the next or previous song
}

// Update progress and slider
function updateProgress() {
    const { currentTime, duration } = music;
    progressEl.style.width = `${(currentTime / duration) * 100}%`;
    currTimeEl.textContent = formatTime(currentTime);
    songSliderEl.value = currentTime;
}

// Format time as MM:SS
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// Seek functionality
function seek(event) {
    const { value } = event.target;
    music.currentTime = value;
}

// Handle end of track
function handleEnd() {
    changeMusic(1);  // Move to the next song when the current one ends
}

// Initialize
function init() {
    playbtnEl.addEventListener("click", togglePlay);
    previousEl.addEventListener("click", () => changeMusic(-1));
    nextEl.addEventListener("click", () => changeMusic(1));
    songSliderEl.addEventListener("input", seek);
    music.addEventListener("timeupdate", updateProgress);
    music.addEventListener("ended", handleEnd);
    loadMusic(songs[musicIndex]);
}

document.addEventListener("DOMContentLoaded", init);