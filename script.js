"use strict";

/* =========================
   ELEMENTS
========================= */

const screens = document.querySelectorAll(".screen");
const popupOverlays = document.querySelectorAll(".popup-overlay");

const startButton = document.getElementById("startButton");
const backToLandingButton = document.getElementById("backToLanding");

const popupOpenButtons = document.querySelectorAll("[data-popup]");
const popupCloseButtons = document.querySelectorAll(".popup-close");

const modeButtons = document.querySelectorAll(".mode-card[data-mode]");

/* =========================
   SCREEN NAVIGATION
========================= */

function showScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });
}

/* =========================
   START POPUP
========================= */

const startPopup = document.getElementById("startPopup");
const closeStartPopupButton = document.getElementById(
  "closeStartPopupButton"
);

const startTabButtons = document.querySelectorAll("[data-start-tab]");
const startPanels = document.querySelectorAll(".start-panel");

const previousModeButton = document.getElementById(
  "previousModeButton"
);

const nextModeButton = document.getElementById(
  "nextModeButton"
);

const selectedModeIcon = document.getElementById(
  "selectedModeIcon"
);

const selectedModeName = document.getElementById(
  "selectedModeName"
);

const selectedModeDescription = document.getElementById(
  "selectedModeDescription"
);

const playNewGameButton = document.getElementById(
  "playNewGameButton"
);

const continueGameButton = document.getElementById(
  "continueGameButton"
);

const playChallengeButton = document.getElementById(
  "playChallengeButton"
);

const savedProgressCard = document.getElementById(
  "savedProgressCard"
);

const noSavedProgressMessage = document.getElementById(
  "noSavedProgressMessage"
);

const savedDay = document.getElementById("savedDay");
const savedHealth = document.getElementById("savedHealth");
const savedScore = document.getElementById("savedScore");

/* =========================
   MODE DATA
========================= */

const gameModes = [
  {
    id: "normal",
    name: "Normal",
    icon:
      "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/start%20pop%20up/normal%20icon.png",
    description:
      "Kondisi awal stabil dan cocok untuk pemain baru."
  },
  {
    id: "kemarau",
    name: "Kemarau",
    icon:
      "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/start%20pop%20up/terik%20icon.png",
    description:
      "Air lebih cepat berkurang dan tanaman membutuhkan perhatian ekstra."
  },
  {
    id: "hujan",
    name: "Hujan",
    icon:
      "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/start%20pop%20up/hujan%20icon.png",
    description:
      "Volume air meningkat dan keseimbangan nutrisi harus dijaga."
  }
];

let selectedModeIndex = 0;

/* =========================
   OPEN / CLOSE START POPUP
========================= */

function openStartPopup() {
  startPopup.classList.add("show");
  startPopup.setAttribute("aria-hidden", "false");

  loadSavedProgressPreview();
}

function closeStartPopup() {
  startPopup.classList.remove("show");
  startPopup.setAttribute("aria-hidden", "true");
}

startButton.addEventListener("click", openStartPopup);

closeStartPopupButton.addEventListener(
  "click",
  closeStartPopup
);

startPopup.addEventListener("click", (event) => {
  if (event.target === startPopup) {
    closeStartPopup();
  }
});

/* =========================
   START TAB
========================= */

function activateStartTab(tabName) {
  startTabButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.startTab === tabName
    );
  });

  startPanels.forEach((panel) => {
    const isActive =
      (tabName === "new" && panel.id === "newGamePanel") ||
      (tabName === "continue" && panel.id === "continuePanel") ||
      (tabName === "challenge" && panel.id === "challengePanel");

    panel.classList.toggle("active", isActive);
  });

  if (tabName === "continue") {
    loadSavedProgressPreview();
  }
}

startTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateStartTab(button.dataset.startTab);
  });
});

/* =========================
   MODE CAROUSEL
========================= */

function renderSelectedMode() {
  const selectedMode = gameModes[selectedModeIndex];

  selectedModeName.textContent = selectedMode.name;
  selectedModeIcon.src = selectedMode.icon;
  selectedModeIcon.alt = `Mode ${selectedMode.name}`;
  selectedModeDescription.textContent =
    selectedMode.description;
}

function changeMode(direction) {
  selectedModeIndex =
    (selectedModeIndex + direction + gameModes.length) %
    gameModes.length;

  renderSelectedMode();
}

previousModeButton.addEventListener("click", () => {
  changeMode(-1);
});

nextModeButton.addEventListener("click", () => {
  changeMode(1);
});

renderSelectedMode();

/* =========================
   GAME STATE
========================= */

function createNewGameState(mode) {
  return {
    version: 1,
    mode: mode.id,
    modeName: mode.name,
    gameType: "normal",
    day: 1,
    score: 0,
    plantHealth: 100,
    water: mode.id === "kemarau" ? 45 : mode.id === "hujan" ? 95 : 70,
    nutrient: 70,
    fixes: 1,
    currentChallenge: null,
    harvestStatus: "belumPanen",
    updatedAt: new Date().toISOString()
  };
}

function saveGameProgress(gameState) {
  localStorage.setItem(
    "hydroadapt-game-progress",
    JSON.stringify(gameState)
  );
}

function getSavedGameProgress() {
  const rawProgress = localStorage.getItem(
    "hydroadapt-game-progress"
  );

  if (!rawProgress) {
    return null;
  }

  try {
    return JSON.parse(rawProgress);
  } catch (error) {
    console.warn("Progress game tidak dapat dibaca.", error);
    return null;
  }
}

/* =========================
   GAME NAVIGATION PLACEHOLDER
========================= */

function enterGame(gameState) {
  closeStartPopup();

  /*
   * Nanti bagian ini diganti menjadi:
   * showScreen("starterPackScreen");
   * atau showScreen("dailyGameScreen");
   */

  console.log("Masuk game dengan state:", gameState);

  alert(
    `Game dimulai\nMode: ${gameState.modeName ?? "Tantangan"}\nHari: ${gameState.day}`
  );
}

/* =========================
   NEW GAME
========================= */

playNewGameButton.addEventListener("click", () => {
  const selectedMode = gameModes[selectedModeIndex];
  const newGameState = createNewGameState(selectedMode);

  saveGameProgress(newGameState);
  enterGame(newGameState);
});

/* =========================
   CONTINUE GAME
========================= */

function loadSavedProgressPreview() {
  const progress = getSavedGameProgress();

  if (!progress) {
    savedProgressCard.style.display = "none";
    noSavedProgressMessage.style.display = "block";

    continueGameButton.disabled = true;
    continueGameButton.style.opacity = "0.45";
    continueGameButton.style.cursor = "not-allowed";

    return;
  }

  savedProgressCard.style.display = "grid";
  noSavedProgressMessage.style.display = "none";

  savedDay.textContent = progress.day ?? 1;
  savedHealth.textContent = `${progress.plantHealth ?? 100}%`;
  savedScore.textContent = progress.score ?? 0;

  continueGameButton.disabled = false;
  continueGameButton.style.opacity = "1";
  continueGameButton.style.cursor = "pointer";
}

continueGameButton.addEventListener("click", () => {
  const savedProgress = getSavedGameProgress();

  if (!savedProgress) {
    return;
  }

  enterGame(savedProgress);
});

/* =========================
   CHALLENGE GAME
========================= */

const randomChallenges = [
  "kemarau",
  "hujan",
  "pancaroba",
  "pipaBocor",
  "pompaRusak",
  "tanamanMenguning",
  "hama"
];

function getRandomChallenge() {
  const randomIndex = Math.floor(
    Math.random() * randomChallenges.length
  );

  return randomChallenges[randomIndex];
}

playChallengeButton.addEventListener("click", () => {
  const challengeState = {
    version: 1,
    gameType: "challenge",
    mode: "random",
    modeName: "Tantangan",
    day: 1,
    score: 0,
    plantHealth: 100,
    water: 70,
    nutrient: 70,
    fixes: 1,
    currentChallenge: getRandomChallenge(),
    harvestStatus: "belumPanen",
    updatedAt: new Date().toISOString()
  };

  /*
   * Mode tantangan dibuat terpisah supaya tidak menimpa
   * progress game normal.
   */
  localStorage.setItem(
    "hydroadapt-challenge-progress",
    JSON.stringify(challengeState)
  );

  enterGame(challengeState);
});

backToLandingButton.addEventListener("click", () => {
  showScreen("landingScreen");
});

/* =========================
   POPUP FUNCTIONS
========================= */

function openPopup(popupId) {
  const popup = document.getElementById(popupId);

  if (!popup) {
    console.warn(`Popup dengan id "${popupId}" tidak ditemukan.`);
    return;
  }

  popup.classList.add("show");
  popup.setAttribute("aria-hidden", "false");
}

function closePopup(popup) {
  popup.classList.remove("show");
  popup.setAttribute("aria-hidden", "true");
}

popupOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popupId = button.dataset.popup;
    openPopup(popupId);
  });
});

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup-overlay");

    if (popup) {
      closePopup(popup);
    }
  });
});

popupOverlays.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  popupOverlays.forEach((popup) => {
    if (popup.classList.contains("show")) {
      closePopup(popup);
    }
  });
});

/* =========================
   MODE SELECTION
========================= */

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedMode = button.dataset.mode;

    localStorage.setItem("hydroadapt-mode", selectedMode);

    alert(
      `Mode ${selectedMode} dipilih. Selanjutnya akan masuk ke Starter Pack.`
    );
  });
});

/* =========================
   SETTINGS
========================= */

const musicToggle = document.getElementById("musicToggle");
const soundToggle = document.getElementById("soundToggle");
const volumeRange = document.getElementById("volumeRange");

function saveSettings() {
  const settings = {
    musicEnabled: musicToggle.checked,
    soundEnabled: soundToggle.checked,
    volume: Number(volumeRange.value)
  };

  localStorage.setItem(
    "hydroadapt-settings",
    JSON.stringify(settings)
  );
}

function loadSettings() {
  const savedSettings = localStorage.getItem("hydroadapt-settings");

  if (!savedSettings) {
    return;
  }

  try {
    const settings = JSON.parse(savedSettings);

    musicToggle.checked = settings.musicEnabled ?? true;
    soundToggle.checked = settings.soundEnabled ?? true;
    volumeRange.value = settings.volume ?? 70;
  } catch (error) {
    console.warn("Pengaturan tersimpan tidak dapat dibaca.", error);
  }
}

musicToggle.addEventListener("change", saveSettings);
soundToggle.addEventListener("change", saveSettings);
volumeRange.addEventListener("input", saveSettings);

loadSettings();