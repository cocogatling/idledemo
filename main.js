// Initial game data
var gameData = {
    music: 0,
    musicPerClick: 1,
    mps: 0,
    musicBoxes: 0 // Keep track of the number of music boxes
};

// Load saved game data from localStorage (if any)
var savedGame = JSON.parse(localStorage.getItem("musicSave"));
if (savedGame !== null) {
    console.log("Loaded game data:", savedGame);
    gameData = savedGame; // Load the saved data into the gameData object
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
    document.getElementById("musicMade").textContent = `${gameData.music} Music Made`;
    updateMusicBoxButton();  // Update button state whenever music changes
    saveGameData();  // Save the game state after every music increment
}

// Function to automatically generate music based on mps
function autoGenerateMusic() {
    gameData.music += gameData.mps;
    document.getElementById("musicMade").textContent = `${gameData.music} Music Made`;
    document.getElementById("musicAutoMade").textContent = `${gameData.mps} Mps`;
    document.getElementById("musicBoxesMade").textContent = `${gameData.musicBoxes} Music Boxes`;
    updateMusicBoxButton();  // Update button state whenever music changes
    saveGameData();  // Save the game state after auto generation
}

// Function to buy a music box (if enough music)
function musicBox() {
    if (gameData.music >= 10) {  // Ensure music is at least 10 before subtracting
        gameData.music -= 10;
        gameData.mps += 1;
        gameData.musicBoxes += 1;  // Increment the number of music boxes
        document.getElementById("musicMade").textContent = `${gameData.music} Music Made`;
        document.getElementById("musicAutoMade").textContent = `${gameData.mps} Mps`;
        document.getElementById("musicBoxesMade").textContent = `${gameData.musicBoxes} Music Boxes`;
        updateMusicBoxButton();  // Update button state after using music
        saveGameData();  // Save the game state after purchasing a music box
    }
}

// Periodically increase music every second
var mainGameLoop = window.setInterval(function() {
    autoGenerateMusic();
}, 1000);

// Periodically save the game data into localStorage every 15 seconds
var saveGameLoop = window.setInterval(saveGameData, 15000);

// Function to save the game state into localStorage
function saveGameData() {
    console.log("Saving game data:", gameData);  // Log the saved data for debugging
    localStorage.setItem("musicSave", JSON.stringify(gameData));  // Save the entire game data object
}

// Function to reset the game
function resetGame() {
    // Reset all game data to initial values
    gameData = {
        music: 0,
        musicPerClick: 1,
        mps: 0,
        musicBoxes: 0
    };

    // Update the webpage with reset values
    document.getElementById("musicMade").textContent = `${gameData.music} Music Made`;
    document.getElementById("musicAutoMade").textContent = `${gameData.mps} Mps`;
    document.getElementById("musicBoxesMade").textContent = `${gameData.musicBoxes} Music Boxes`;

    // Disable Music Box button if not enough music
    updateMusicBoxButton();

    // Clear saved data from localStorage
    localStorage.removeItem("musicSave");

    console.log("Game has been reset!");
}

// Add an event listener for the reset button
document.getElementById("resetButton").addEventListener("click", resetGame);