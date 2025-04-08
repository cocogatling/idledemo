// Initial game data
var gameData = {
    music: 0,
    musicPerClick: 1,
    mps: 0,
    musicBoxes: 0, // Keep track of the number of music boxes
    lastTick: Date.now()
};

function update(id, content) {
    document.getElementById(id).innerHTML = content;
  }

// Load saved game data from localStorage (if any)
var savedGame = JSON.parse(localStorage.getItem("musicSave"));
if (savedGame !== null) {
    console.log("Loaded game data:", savedGame);
    gameData = savedGame;

    const now = Date.now();
    const offlineTime = (now - gameData.lastTick) / 1000; // in seconds
    const offlineGain = gameData.mps * offlineTime;
    gameData.music += offlineGain;
    gameData.lastTick = now;

    if (offlineGain > 0) {
        // Format time away
        const seconds = Math.floor(offlineTime % 60);
        const minutes = Math.floor((offlineTime / 60) % 60);
        const hours = Math.floor(offlineTime / 3600);
        const timeAway =
            (hours > 0 ? `${hours}h ` : "") +
            (minutes > 0 ? `${minutes}m ` : "") +
            `${seconds}s`;

        alert(`You were away for ${timeAway} and gained ${format(Math.floor(offlineGain))} music!`);
    }

    update("musicMade", `${format(gameData.music)} Music Made`);
    update("musicAutoMade", `${format(gameData.mps)} Mps`);
    update("musicBoxesMade", `${format(gameData.musicBoxes)} Music Boxes`);
    updateMusicBoxButton();
} else {
    console.log("No saved game data found.");
}

// Update music made and music box states on the webpage
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

// Function to increase music made
function makeMusic() {
    gameData.music += gameData.musicPerClick;
    update("musicMade", `${format(gameData.music)} Music Made`);
    updateMusicBoxButton();
    saveGameData();
}

// Function to automatically generate music based on mps
function autoGenerateMusic() {
    gameData.music += gameData.mps;
    update("musicMade", `${format(gameData.music)} Music Made`);
    update("musicAutoMade", `${format(gameData.mps)} Mps`);
    update("musicBoxesMade", `${format(gameData.musicBoxes)} Music Boxes`);
    updateMusicBoxButton();
    saveGameData();
}

// Function to buy a music box (if enough music)
function musicBox() {
    if (gameData.music >= 10) {
        gameData.music -= 10;
        gameData.mps += 1;
        gameData.musicBoxes += 1;
        update("musicMade", `${format(gameData.music)} Music Made`);
        update("musicAutoMade", `${format(gameData.mps)} Mps`);
        update("musicBoxesMade", `${format(gameData.musicBoxes)} Music Boxes`);
        updateMusicBoxButton();
        saveGameData();
    }
}

// Periodically increase music every second
var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now() // Don't forget to update lastTick.
    autoGenerateMusic();
}, 1000);

// Periodically save the game data into localStorage every 15 seconds
var saveGameLoop = window.setInterval(saveGameData, 15000);

// Function to save the game state into localStorage
function saveGameData() {
    console.log("Saving game data:", gameData);  // Log the saved data for debugging
    localStorage.setItem("musicSave", JSON.stringify(gameData));  // Save the entire game data object
}

function format(number) {
    return number.toLocaleString("en-US");
  }

// Function to reset the game
function resetGame() {
    gameData = {
        music: 0,
        musicPerClick: 1,
        mps: 0,
        musicBoxes: 0
    };

    update("musicMade", `${format(gameData.music)} Music Made`);
    update("musicAutoMade", `${format(gameData.mps)} Mps`);
    update("musicBoxesMade", `${format(gameData.musicBoxes)} Music Boxes`);
    updateMusicBoxButton();
    localStorage.removeItem("musicSave");
    console.log("Game has been reset!");
}

// Add an event listener for the reset button
document.getElementById("resetButton").addEventListener("click", resetGame);