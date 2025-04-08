var gameData = {
  cn: 0,
  cnPerClick: 1,
  cnPerClickCost: 10
};

var autoClickers = 0;  // Track the number of auto clickers

function makeCupNoodles() {
  gameData.cn += gameData.cnPerClick;
  document.getElementById("cupNoodlesMade").innerHTML = gameData.cn + " Cup Noodles Made";
}

function buyAutoCNClicker() {
  // Check if the player can afford the auto clicker (optional, if you'd like to add a cost)
  var autoClickerCost = 10;  // Example cost for each auto clicker, adjust as needed

  if (gameData.cn >= autoClickerCost) {
      gameData.cn -= autoClickerCost;
      autoClickers++;  // Increment the auto clicker count

      document.getElementById("cupNoodlesMade").innerHTML = gameData.cn + " Cup Noodles Made";
      document.getElementById("autoClickerUpgrade").innerHTML = "Buy Auto Clicker (Currently " + autoClickers + " Auto Clickers) Cost: " + autoClickerCost + " Cup Noodles Made";

      // Restart the main game loop if auto clickers are being purchased for the first time
      if (autoClickers === 1) {
          startAutoClickerLoop();
      }
  }
}

function buyKettlePerClick() {
  if (gameData.cn >= gameData.cnPerClickCost) {
      gameData.cn -= gameData.cnPerClickCost;
      gameData.cnPerClick += 1;
      gameData.cnPerClickCost *= 2;
      document.getElementById("cupNoodlesMade").innerHTML = gameData.cn + " Cup Noodles Made";
      document.getElementById("perClickUpgrade").innerHTML = "Upgrade Kettle (Currently Level " + gameData.cnPerClick + ") Cost: " + gameData.cnPerClickCost + " Cup Noodles Made";
  }
}

// Start the main game loop to automatically make cup noodles based on the number of auto clickers
function startAutoClickerLoop() {
  mainGameLoop = window.setInterval(function() {
      gameData.cn += autoClickers * gameData.cnPerClick;  // Produce cup noodles based on the number of auto clickers
      document.getElementById("cupNoodlesMade").innerHTML = gameData.cn + " Cup Noodles Made";
  }, 1000);  // Adjust interval for how fast you want auto-clickers to work (every 1000 ms = 1 second)
}

// Reset Game Function
function resetGame() {
  // Reset the gameData object to its initial state
  gameData = {
      cn: 0,
      cnPerClick: 1,
      cnPerClickCost: 10
  };

  // Reset the auto clickers count
  autoClickers = 0;

  // Update the display
  document.getElementById("cupNoodlesMade").innerHTML = gameData.cn + " Cup Noodles Made";
  document.getElementById("perClickUpgrade").innerHTML = "Upgrade Kettle (Currently Level " + gameData.cnPerClick + ") Cost: " + gameData.cnPerClickCost + " Cup Noodles Made";
  document.getElementById("autoClickerUpgrade").innerHTML = "Buy Auto Clicker (Currently " + autoClickers + " Auto Clickers) Cost: 100 Cup Noodles Made";

  // Clear localStorage
  localStorage.removeItem("cnSave");

  // Stop the main game loop
  clearInterval(mainGameLoop);
  mainGameLoop = null;
}

// Main Game Loop (initially null until auto clickers are bought)
var mainGameLoop = null;

// Save Game Loop
var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("cnSave", JSON.stringify(gameData));
}, 15000);

// Load saved game data if available
var savegame = JSON.parse(localStorage.getItem("cnSave"));
if (savegame !== null) {
  gameData = savegame;
}

// Service Worker (optional, already in your code)
if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('sw.js')
  .then(() => console.log('Service Worker registered'))
  .catch(err => console.error('SW registration failed:', err));
}