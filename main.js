var gameData = {
    music: 0,
    musicPerClick: 1,
    mps: 0
}

const musicBoxButton = document.getElementById("musicBoxButton");
musicBoxButton.disabled = true;
musicBoxButton.style.backgroundColor = "grey";

// Function to check and update the Music Box button state
function updateMusicBoxButton() {
    const musicBoxButton = document.getElementById("musicBoxButton");
    if (gameData.music < 10) {
        musicBoxButton.disabled = true;
        musicBoxButton.style.backgroundColor = "grey";
    } else {
        musicBoxButton.disabled = false;
        musicBoxButton.style.backgroundColor = ""; // Optional: reset the button color
    }
}

function makeMusic() {
    gameData.music += gameData.musicPerClick;
    document.getElementById("musicMade").textContent = `${gameData.music} Music Made`;
    updateMusicBoxButton();  // Call to update button state whenever music changes
}

function musicBox() {
    if (gameData.music >= 10) {  // Ensure music is at least 10 before subtracting
        gameData.music -= 10;
        gameData.mps += 1;
        document.getElementById("musicMade").textContent = `${gameData.music} Music Made`;
        document.getElementById("musicAutoMade").textContent = `${gameData.mps} Mps`;
        updateMusicBoxButton();  // Call to update button state after using the music
    }
}

// Function to increase music automatically
function autoGenerateMusic() {
    gameData.music += gameData.mps;
    document.getElementById("musicMade").textContent = `${gameData.music} Music Made`;
    updateMusicBoxButton();  // Call to update button state whenever music changes
}

// Set an interval to increase music every second based on mps
setInterval(autoGenerateMusic, 1000); // Every 1000 milliseconds (1 second)