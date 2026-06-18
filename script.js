"use strict";

/* ==================================================
   KONSTANTA & ASET
================================================== */

const STORAGE_KEY = "hydroadapt-game-progress";
const SETTINGS_KEY = "hydroadapt-settings";
const CHALLENGE_KEY = "hydroadapt-challenge-progress";
const SOWING_DURATION_MS = 5000;
const SOWING_PUZZLE_LIMIT_MS = 100000;
const RACIK_BLACK_MATCH_LIMIT = 2;
const PUZZLE_TILE_COUNT = 16;
const WIN_DAY = 15;
const DAILY_BASE_WATER_USE = 70;
const DAILY_WATER_USE_PER_PLANT = 35;
const DAILY_BASE_NUTRIENT_USE = 90;
const DAILY_NUTRIENT_USE_PER_PLANT = 30;
const PLANT_DEATH_STRESS_DAYS = 2;

const gameModes = [
  {
    id: "normal",
    name: "Normal",
    icon: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/start%20pop%20up/normal%20icon.png",
    description: "Kondisi awal stabil dan cocok untuk pemain baru."
  },
  {
    id: "kemarau",
    name: "Kemarau",
    icon: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/start%20pop%20up/terik%20icon.png",
    description: "Air lebih cepat berkurang dan tanaman membutuhkan perhatian ekstra."
  },
  {
    id: "hujan",
    name: "Hujan",
    icon: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/start%20pop%20up/hujan%20icon.png",
    description: "Volume air meningkat dan keseimbangan nutrisi harus dijaga."
  }
];

const mainModeSettings = {
  normal: {
    className: "mode-normal",
    weatherIcon: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/main%20page/normal.png",
    weatherAlt: "Cuaca normal"
  },
  hujan: {
    className: "mode-hujan",
    weatherIcon: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/main%20page/hujan.png",
    weatherAlt: "Cuaca hujan"
  },
  kemarau: {
    className: "mode-kemarau",
    weatherIcon: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/main%20page/kemarau.png",
    weatherAlt: "Cuaca kemarau"
  }
};

const plantAssets = {
  seed: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/zoom%20tanaman/benih.png",
  seedlingGreen: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/zoom%20tanaman/bibit%20hijau.png",
  seedlingYellow: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/zoom%20tanaman/bibit%20kuning.png",
  vegetableGreen: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/zoom%20tanaman/sayur%20hijau.png",
  vegetableYellow: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/zoom%20tanaman/sayur%20kuning.png",
  notification: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/main%20page/notif%20benih.png"
};

const plantCatalog = {
  bokchoy: { id: "bokchoy", name: "Bok choy" },
  sawi: { id: "sawi", name: "Sawi" },
  bayam: { id: "bayam", name: "Bayam" },
  selada: { id: "selada", name: "Selada" }
};

const plantTypes = ["bokchoy", "sawi", "bayam", "selada"];

const harvestAssets = {
  success: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/main/panen%20pop%20up/Panen%20Berhasil.png",
  fail: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/main/panen%20pop%20up/Panen%20Gagal.png"
};


const sowingPuzzleImages = [
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p1.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p2.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p3.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p4.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p5.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p6.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p7.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p8.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p9.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p10.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p11.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p12.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p13.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p14.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p15.png",
  "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/nyemai/p16.png"
];

const resourceAssets = {
  seed: plantAssets.seed,
  seedling: plantAssets.seedlingGreen,
  fix: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/hadiah%2C%20sda%2C%20pause/fix.png",
  vitamin: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/zoom%20tandon/botol%20berisi.png"
};

const pipeAssets = {
  elbow: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/tiki%20taka/Union.png",
  straight: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/tiki%20taka/Rectangle%20264.png"
};

/*
 * Arah dasar aset:
 * - straight pada 0° dianggap horizontal.
 * - elbow pada 0° dianggap menghubungkan kanan dan bawah.
 * Jalur selesai membentuk pola ular dari kiri atas sampai kanan bawah.
 */
const PIPE_GRID_COLUMNS = 7;
const PIPE_GRID_ROWS = 4;

const PIPE_SOLUTION_PATH = [
  { col: 0, row: 0 },
  { col: 1, row: 0 },
  { col: 2, row: 0 },
  { col: 2, row: 1 },
  { col: 3, row: 1 },
  { col: 4, row: 1 },
  { col: 4, row: 2 },
  { col: 5, row: 2 },
  { col: 6, row: 2 }
];

/*
 * Pipe puzzle menggunakan grid 7 x 4 sesuai latar.
 * Jalur solusi dibuat tetap agar visual puzzle dan validasi selalu sama.
 * Arah dasar asset:
 * - straight 0° = vertikal, 90° = horizontal.
 * - elbow 0° = atas + kanan (menghubungkan atas dan kanan).
 */
let pipePuzzleSolution = [];

function buildPipeSolutionFromPath(path) {
  const opposite = { right: "left", left: "right", up: "down", down: "up" };

  function getDir(from, to) {
    const dc = to.col - from.col;
    const dr = to.row - from.row;
    if (dc === 1) return "right";
    if (dc === -1) return "left";
    if (dr === 1) return "down";
    if (dr === -1) return "up";
    return "right";
  }

  function getPipeInfo(inDir, outDir) {
    if ((inDir === "left" && outDir === "right") || (inDir === "right" && outDir === "left")) {
      return { type: "straight", solvedRotation: 90 };
    }
    if ((inDir === "up" && outDir === "down") || (inDir === "down" && outDir === "up")) {
      return { type: "straight", solvedRotation: 0 };
    }

    const combo = `${inDir}-${outDir}`;
    const elbowMap = {
      "left-down": 180,
      "down-left": 180,
      "left-up": 90,
      "up-left": 90,
      "right-down": 270,
      "down-right": 270,
      "right-up": 0,
      "up-right": 0
    };

    return { type: "elbow", solvedRotation: elbowMap[combo] ?? 0 };
  }

  return path.map((pos, index) => {
    const previous = path[index - 1];
    const next = path[index + 1];
    const inDir = previous ? opposite[getDir(previous, pos)] : "left";
    const outDir = next ? getDir(pos, next) : "right";

    return {
      cell: pos.row * PIPE_GRID_COLUMNS + pos.col,
      ...getPipeInfo(inDir, outDir)
    };
  });
}

function generateRandomPipePuzzle() {
  return buildPipeSolutionFromPath(PIPE_SOLUTION_PATH);

  const cols = PIPE_GRID_COLUMNS;
  const rows = PIPE_GRID_ROWS;
  const startRow = Math.floor(Math.random() * rows);
  const endRow = Math.floor(Math.random() * rows);

  /* Build path from (0, startRow) to (cols-1, endRow) using simple random walk */
  const path = [];
  let curCol = 0;
  let curRow = startRow;
  path.push({ col: curCol, row: curRow });

  while (curCol < cols - 1) {
    /* Decide: go right, or go up/down then right */
    const remaining = cols - 1 - curCol;
    const rowDiff = endRow - curRow;

    if (remaining <= 1 && curRow !== endRow) {
      /* Must adjust row first */
      curRow += rowDiff > 0 ? 1 : -1;
      path.push({ col: curCol, row: curRow });
    } else if (Math.random() < 0.5 && curRow !== endRow) {
      /* Move vertically */
      const dir = rowDiff > 0 ? 1 : -1;
      curRow += dir;
      path.push({ col: curCol, row: curRow });
    } else if (Math.random() < 0.35 && curRow > 0 && curRow === endRow) {
      /* Random vertical detour up */
      curRow -= 1;
      path.push({ col: curCol, row: curRow });
    } else if (Math.random() < 0.35 && curRow < rows - 1 && curRow === endRow) {
      /* Random vertical detour down */
      curRow += 1;
      path.push({ col: curCol, row: curRow });
    } else {
      /* Move right */
      curCol += 1;
      path.push({ col: curCol, row: curRow });
    }
  }

  /* Ensure we end at endRow */
  while (curRow !== endRow) {
    curRow += endRow > curRow ? 1 : -1;
    path.push({ col: curCol, row: curRow });
  }

  /* Remove consecutive duplicates */
  const cleanPath = [path[0]];
  for (let i = 1; i < path.length; i++) {
    if (path[i].col !== path[i-1].col || path[i].row !== path[i-1].row) {
      cleanPath.push(path[i]);
    }
  }

  /* Convert path to pipe tiles with directions */
  const directions = {
    right: { dc: 1, dr: 0 },
    left:  { dc: -1, dr: 0 },
    down:  { dc: 0, dr: 1 },
    up:    { dc: 0, dr: -1 }
  };

  function getDir(from, to) {
    const dc = to.col - from.col;
    const dr = to.row - from.row;
    if (dc === 1) return "right";
    if (dc === -1) return "left";
    if (dr === 1) return "down";
    if (dr === -1) return "up";
    return "right";
  }

  /* Opposite direction */
  const opposite = { right: "left", left: "right", up: "down", down: "up" };

  /* Determine type and rotation for each path segment */
  function getPipeInfo(inDir, outDir) {
    /* straight: same axis */
    if ((inDir === "left" && outDir === "right") || (inDir === "right" && outDir === "left")) {
      return { type: "straight", solvedRotation: 90 };
    }
    if ((inDir === "up" && outDir === "down") || (inDir === "down" && outDir === "up")) {
      return { type: "straight", solvedRotation: 0 };
    }

    /* elbow: base 0° connects up+right */
    const combo = inDir + "-" + outDir;
    const elbowMap = {
      "left-down": 180, "down-left": 180,
      "left-up": 90,    "up-left": 90,
      "right-down": 270, "down-right": 270,
      "right-up": 0,    "up-right": 0
    };
    return { type: "elbow", solvedRotation: elbowMap[combo] ?? 0 };
  }

  const solution = [];

  for (let i = 0; i < cleanPath.length; i++) {
    const pos = cleanPath[i];
    const cell = pos.row * cols + pos.col;

    let inDir, outDir;

    if (i === 0) {
      /* First tile: entry from left */
      inDir = "left";
      outDir = getDir(cleanPath[i], cleanPath[i + 1]);
    } else if (i === cleanPath.length - 1) {
      /* Last tile: exit to right */
      inDir = opposite[getDir(cleanPath[i - 1], cleanPath[i])];
      outDir = "right";
    } else {
      inDir = opposite[getDir(cleanPath[i - 1], cleanPath[i])];
      outDir = getDir(cleanPath[i], cleanPath[i + 1]);
    }

    const pipeInfo = getPipeInfo(inDir, outDir);
    solution.push({ cell, ...pipeInfo });
  }

  return solution;
}


const randomChallenges = [
  "kemarau",
  "hujan",
  "pancaroba",
  "pipaBocor",
  "pompaRusak",
  "tanamanMenguning",
  "hama"
];

/* ==================================================
   ELEMENT
================================================== */

const screens = document.querySelectorAll(".screen");
const popupOverlays = document.querySelectorAll(".popup-overlay");
const popupOpenButtons = document.querySelectorAll("[data-popup]");
const popupCloseButtons = document.querySelectorAll(".popup-close");

const startButton = document.getElementById("startButton");
const startPopup = document.getElementById("startPopup");
const closeStartPopupButton = document.getElementById("closeStartPopupButton");
const startTabButtons = document.querySelectorAll("[data-start-tab]");
const startPanels = document.querySelectorAll(".start-panel");
const previousModeButton = document.getElementById("previousModeButton");
const nextModeButton = document.getElementById("nextModeButton");
const selectedModeIcon = document.getElementById("selectedModeIcon");
const selectedModeName = document.getElementById("selectedModeName");
const selectedModeDescription = document.getElementById("selectedModeDescription");
const playNewGameButton = document.getElementById("playNewGameButton");
const continueGameButton = document.getElementById("continueGameButton");
const playChallengeButton = document.getElementById("playChallengeButton");
const savedProgressCard = document.getElementById("savedProgressCard");
const noSavedProgressMessage = document.getElementById("noSavedProgressMessage");
const savedDay = document.getElementById("savedDay");
const savedHealth = document.getElementById("savedHealth");
const savedScore = document.getElementById("savedScore");

const mainGameScreen = document.getElementById("mainGameScreen");
const mainUserInitial = document.getElementById("mainUserInitial");
const mainUserName = document.getElementById("mainUserName");
const mainDayValue = document.getElementById("mainDayValue");
const mainFixValue = document.getElementById("mainFixValue");
const mainWeatherIcon = document.getElementById("mainWeatherIcon");
const seedlingNotification = document.getElementById("seedlingNotification");
const mainPumpWarning = document.getElementById("mainPumpWarning");
const mainPlantSlots = document.querySelectorAll("#mainPlantSlots .plant-slot");
const openZoomPlantButton = document.getElementById("openZoomPlantButton");
const openZoomTankButton = document.getElementById("openZoomTankButton");
const panelButton = document.getElementById("panelButton");
const wellButton = document.getElementById("wellButton");
const resourceButton = document.getElementById("resourceButton");
const nextDayButton = document.getElementById("nextDayButton");
const pauseGameButton = document.getElementById("pauseGameButton");

const zoomPlantScreen = document.getElementById("zoomPlantScreen");
const backFromZoomButton = document.getElementById("backFromZoomButton");
const harvestZoomButton = document.getElementById("harvestZoomButton");
const zoomInventoryGrid = document.getElementById("zoomInventoryGrid");
const zoomInventoryTabButtons = document.querySelectorAll("[data-zoom-tab]");
const sowSeedButton = document.getElementById("sowSeedButton");
const zoomPlantSlotButtons = document.querySelectorAll(".zoom-plant-slot");


const zoomTankScreen = document.getElementById("zoomTankScreen");
const backFromTankButton = document.getElementById("backFromTankButton");
const tankMeterFill = document.getElementById("tankMeterFill");
const tankMeterValue = document.getElementById("tankMeterValue");
const tankPanelButton = document.getElementById("tankPanelButton");
const vitaminButton = document.getElementById("vitaminButton");
const vitaminBottleImage = document.getElementById("vitaminBottleImage");
const vitaminBottleCount = document.getElementById("vitaminBottleCount");
const fillTankButton = document.getElementById("fillTankButton");
const pumpRepairButton = document.getElementById("pumpRepairButton");
const tankPumpWarning = document.getElementById("tankPumpWarning");

const controlPanelPopup = document.getElementById("controlPanelPopup");
const closeControlPanelButton = document.getElementById("closeControlPanelButton");
const controlPhValue = document.getElementById("controlPhValue");
const controlPhFill = document.getElementById("controlPhFill");
const controlPhStatus = document.getElementById("controlPhStatus");
const controlPpmValue = document.getElementById("controlPpmValue");
const controlPpmFill = document.getElementById("controlPpmFill");
const controlPpmStatus = document.getElementById("controlPpmStatus");
const controlVolumeValue = document.getElementById("controlVolumeValue");
const controlVolumeFill = document.getElementById("controlVolumeFill");
const controlVolumeStatus = document.getElementById("controlVolumeStatus");

const sowingGamePopup = document.getElementById("sowingGamePopup");
const closeSowingGameButton = document.getElementById("closeSowingGameButton");
const sowingPuzzleTimer = document.getElementById("sowingPuzzleTimer");
const sowingPuzzleBoard = document.getElementById("sowingPuzzleBoard");
const sowingPuzzleMessage = document.getElementById("sowingPuzzleMessage");

const vitaminChallengePopup = document.getElementById("vitaminChallengePopup");
const closeVitaminChallengeButton = document.getElementById("closeVitaminChallengeButton");
const racikCardGrid = document.getElementById("racikCardGrid");
const racikBlackMatchCount = document.getElementById("racikBlackMatchCount");
const racikGameMessage = document.getElementById("racikGameMessage");

const crimpingGamePopup = document.getElementById("crimpingGamePopup");
const crimpingGameShell = document.getElementById("crimpingGameShell");
const closeCrimpingGameButton = document.getElementById("closeCrimpingGameButton");
const crimpingCableSvg = document.getElementById("crimpingCableSvg");
const crimpingWrongCount = document.getElementById("crimpingWrongCount");
const crimpingGameMessage = document.getElementById("crimpingGameMessage");
const cableLeftEndpoints = document.querySelectorAll(".cable-endpoint-left");
const cableRightEndpoints = document.querySelectorAll(".cable-endpoint-right");

const pausePopup = document.getElementById("pausePopup");
const pauseSettingsButton = document.getElementById("pauseSettingsButton");
const restartGameButton = document.getElementById("restartGameButton");
const resumeGameButton = document.getElementById("resumeGameButton");
const saveAndExitButton = document.getElementById("saveAndExitButton");

const initialGrantPopup = document.getElementById("initialGrantPopup");
const initialGrantItems = document.getElementById("initialGrantItems");
const initialGrantStartButton = document.getElementById("initialGrantStartButton");
const resourcePopup = document.getElementById("resourcePopup");
const closeResourcePopupButton = document.getElementById("closeResourcePopupButton");
const resourceGrid = document.getElementById("resourceGrid");
const resourceEmptyMessage = document.getElementById("resourceEmptyMessage");
const rewardPopup = document.getElementById("rewardPopup");
const rewardMessage = document.getElementById("rewardMessage");
const rewardContinueButton = document.getElementById("rewardContinueButton");
const rewardItemIcon = document.getElementById("rewardItemIcon");
const rewardItemCount = document.getElementById("rewardItemCount");
const rewardItemLabel = document.getElementById("rewardItemLabel");

const mainPipeWarningButton = document.getElementById("mainPipeWarningButton");
const zoomPipeWarningButton = document.getElementById("zoomPipeWarningButton");
const pipeGamePopup = document.getElementById("pipeGamePopup");
const closePipeGameButton = document.getElementById("closePipeGameButton");
const pipePuzzleGrid = document.getElementById("pipePuzzleGrid");
const pipeGameMessage = document.getElementById("pipeGameMessage");

const gameOverPopup = document.getElementById("gameOverPopup");
const gameOverMessage = document.getElementById("gameOverMessage");
const gameOverRestartButton = document.getElementById("gameOverRestartButton");
const gameOverExitButton = document.getElementById("gameOverExitButton");

const harvestResultPopup = document.getElementById("harvestResultPopup");
const harvestResultImage = document.getElementById("harvestResultImage");
const harvestResultMessage = document.getElementById("harvestResultMessage");
const harvestResultCloseButton = document.getElementById("harvestResultCloseButton");
const harvestRestartButton = document.getElementById("harvestRestartButton");

const gameInfoPopup = document.getElementById("gameInfoPopup");
const gameInfoTitle = document.getElementById("gameInfoTitle");
const gameInfoText = document.getElementById("gameInfoText");
const closeGameInfoButton = document.getElementById("closeGameInfoButton");

const musicToggle = document.getElementById("musicToggle");
const soundToggle = document.getElementById("soundToggle");
const volumeRange = document.getElementById("volumeRange");

const profilePlantCount = document.getElementById("profilePlantCount");
const profileHarvestCount = document.getElementById("profileHarvestCount");
const profileScore = document.getElementById("profileScore");

/* ==================================================
   STATE LOKAL
================================================== */

let selectedModeIndex = 0;
let currentGameState = null;
let activeZoomTab = "seed";
let selectedSeedId = "bokchoy";
let selectedSeedlingId = null;
let draggedSeedlingId = null;
let sowingTimeoutId = null;
let sowingCountdownId = null;
let sowingPuzzleOrder = [];
let sowingPuzzlePlantId = null;
let sowingPuzzleSelectedIndex = null;
let sowingPuzzleDraggedIndex = null;
let sowingPuzzleDeadline = 0;
let sowingPuzzleTimerId = null;
let sowingPuzzleResolved = false;

let racikDeck = [];
let racikOpenIndexes = [];
let racikMatchedIndexes = new Set();
let racikMatchedTypes = new Set();
let racikBlackMatches = 0;
let racikBusy = false;

let crimpingWrongAttempts = 0;
let crimpingConnectedColors = new Set();
let crimpingActiveDrag = null;

let pipePuzzleRotations = [];
let pipePuzzleLocked = false;
let pipeCompletionTimeoutId = null;
let rewardContinueAction = null;

/* ==================================================
   SCREEN NAVIGATION
================================================== */

function showScreen(screenId) {
  const target = document.getElementById(screenId);

  if (!target || !target.classList.contains("screen")) {
    console.error(`Screen "${screenId}" tidak ditemukan.`);
    return;
  }

  screens.forEach((screen) => {
    screen.classList.remove("active");
    screen.setAttribute("aria-hidden", "true");
  });

  target.classList.add("active");
  target.setAttribute("aria-hidden", "false");
}

/* ==================================================
   POPUP UMUM
================================================== */

function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (!popup) return;

  if (popupId === "profilePopup") {
    renderProfileStats();
  }

  popup.classList.add("show");
  popup.setAttribute("aria-hidden", "false");
}

function closePopup(popup) {
  if (!popup) return;
  popup.classList.remove("show");
  popup.setAttribute("aria-hidden", "true");
}

popupOpenButtons.forEach((button) => {
  button.addEventListener("click", () => openPopup(button.dataset.popup));
});

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => closePopup(button.closest(".popup-overlay")));
});

popupOverlays.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) closePopup(popup);
  });
});

/* ==================================================
   START POPUP & MODE
================================================== */

function openStartPopup() {
  loadSavedProgressPreview();
  startPopup.classList.add("show");
  startPopup.setAttribute("aria-hidden", "false");
}

function closeStartPopup() {
  closePopup(startPopup);
}

function activateStartTab(tabName) {
  startTabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.startTab === tabName);
  });

  startPanels.forEach((panel) => {
    const isActive =
      (tabName === "new" && panel.id === "newGamePanel") ||
      (tabName === "continue" && panel.id === "continuePanel") ||
      (tabName === "challenge" && panel.id === "challengePanel");

    panel.classList.toggle("active", isActive);
  });

  if (tabName === "continue") loadSavedProgressPreview();
}

function renderSelectedMode() {
  const mode = gameModes[selectedModeIndex];
  selectedModeName.textContent = mode.name;
  selectedModeIcon.src = mode.icon;
  selectedModeIcon.alt = `Mode ${mode.name}`;
  selectedModeDescription.textContent = mode.description;
}

function changeMode(direction) {
  selectedModeIndex = (selectedModeIndex + direction + gameModes.length) % gameModes.length;
  renderSelectedMode();
}

startButton.addEventListener("click", openStartPopup);
closeStartPopupButton.addEventListener("click", closeStartPopup);
startPopup.addEventListener("click", (event) => {
  if (event.target === startPopup) closeStartPopup();
});

startTabButtons.forEach((button) => {
  button.addEventListener("click", () => activateStartTab(button.dataset.startTab));
});

previousModeButton.addEventListener("click", () => changeMode(-1));
nextModeButton.addEventListener("click", () => changeMode(1));

/* ==================================================
   GAME STATE
================================================== */

function normalizeGameMode(mode) {
  return mode === "hujan" || mode === "kemarau" ? mode : "normal";
}

function generateRandomSeeds() {
  /* Distribusi 4 benih random (minimum 3 jenis berbeda) ke 4 jenis tanaman */
  const totalSeeds = 4;
  const seeds = { bokchoy: 0, sawi: 0, bayam: 0, selada: 0 };

  /* Pastikan minimal 3 jenis tanaman mendapat benih */
  const shuffled = shuffleArray([...plantTypes]);
  const minTypes = 3;
  for (let i = 0; i < minTypes; i++) {
    seeds[shuffled[i]] += 1;
  }

  /* Sisa benih didistribusikan random */
  const remaining = totalSeeds - minTypes;
  for (let i = 0; i < remaining; i++) {
    const randomPlant = plantTypes[Math.floor(Math.random() * plantTypes.length)];
    seeds[randomPlant] += 1;
  }

  return seeds;
}

function createNewGameState(mode) {
  const initialSeeds = generateRandomSeeds();
  return {
    version: 7,
    userName: "Cipunk",
    mode: normalizeGameMode(mode.id),
    modeName: mode.name,
    gameType: "normal",
    day: 1,
    score: 0,
    harvestCount: 0,
    plantHealth: 100,
    water: mode.id === "kemarau" ? 45 : mode.id === "hujan" ? 95 : 70,
    nutrient: 70,
    ph: mode.id === "hujan" ? 6.4 : mode.id === "kemarau" ? 5.8 : 6.0,
    ppm: mode.id === "hujan" ? 850 : mode.id === "kemarau" ? 1450 : 1200,
    volumeLiters: mode.id === "hujan" ? 1100 : mode.id === "kemarau" ? 450 : 800,
    vitaminBottles: 0,
    fixes: 4,
    seeds: initialSeeds,
    seedlings: {
      bokchoy: 0,
      sawi: 0,
      bayam: 0,
      selada: 0
    },
    plantedSlots: {},
    sowing: null,
    pumpDamaged: false,
    pipeDamaged: false,
    pipeWarningPosition: "center",
    initialGrantClaimed: false,
    currentChallenge: null,
    harvestStatus: "belumPanen",
    lastSeedRewardDay: 1,
    updatedAt: new Date().toISOString()
  };
}

function ensureGameStateShape(gameState) {
  const source = gameState && typeof gameState === "object" ? gameState : {};

  const fixed = {
    version: 7,
    userName: source.userName || "Cipunk",
    mode: normalizeGameMode(source.mode),
    modeName: source.modeName || "Normal",
    gameType: source.gameType || "normal",
    day: Number(source.day) || 1,
    score: Number(source.score) || 0,
    harvestCount: Number(source.harvestCount) || 0,
    plantHealth: Number(source.plantHealth) || 100,
    water: Number.isFinite(Number(source.water)) ? Number(source.water) : 70,
    nutrient: Number.isFinite(Number(source.nutrient)) ? Number(source.nutrient) : 70,
    ph: Number.isFinite(Number(source.ph))
      ? Number(source.ph)
      : source.mode === "hujan"
        ? 6.4
        : source.mode === "kemarau"
          ? 5.8
          : 6.0,
    ppm: Number.isFinite(Number(source.ppm))
      ? Number(source.ppm)
      : source.mode === "hujan"
        ? 850
        : source.mode === "kemarau"
          ? 1450
          : 1200,
    volumeLiters: Number.isFinite(Number(source.volumeLiters))
      ? Number(source.volumeLiters)
      : source.mode === "hujan"
        ? 1100
        : source.mode === "kemarau"
          ? 450
          : 800,
    vitaminBottles: Math.max(0, Number(source.vitaminBottles) || 0),
    fixes: Number.isFinite(Number(source.fixes))
      ? Math.max(0, Number(source.fixes))
      : 4,
    lastSeedRewardDay: Number(source.lastSeedRewardDay) || 1,
    seeds: {
      bokchoy: Number(source.seeds?.bokchoy) || 0,
      sawi: Number(source.seeds?.sawi) || 0,
      bayam: Number(source.seeds?.bayam) || 0,
      selada: Number(source.seeds?.selada) || 0
    },
    seedlings: {
      bokchoy: Number(source.seedlings?.bokchoy) || 0,
      sawi: Number(source.seedlings?.sawi) || 0,
      bayam: Number(source.seedlings?.bayam) || 0,
      selada: Number(source.seedlings?.selada) || 0
    },
    plantedSlots: source.plantedSlots && typeof source.plantedSlots === "object" ? source.plantedSlots : {},
    sowing: source.sowing && typeof source.sowing === "object" ? source.sowing : null,
    pumpDamaged: Boolean(source.pumpDamaged),
    pipeDamaged: Boolean(source.pipeDamaged),
    problemsSolved: Number(source.problemsSolved) || 0,
    pipeWarningPosition: ["left", "center", "right"].includes(source.pipeWarningPosition)
      ? source.pipeWarningPosition
      : "center",
    initialGrantClaimed: source.initialGrantClaimed === undefined
      ? true
      : Boolean(source.initialGrantClaimed),
    currentChallenge: source.currentChallenge || null,
    harvestStatus: source.harvestStatus || "belumPanen",
    updatedAt: source.updatedAt || new Date().toISOString()
  };

  Object.values(fixed.plantedSlots).forEach((planted) => {
    planted.stage = planted.stage === "mature" ? "mature" : "seedling";
    planted.condition = planted.condition === "yellow" ? "yellow" : "green";
    planted.ageDays = Math.max(0, Number(planted.ageDays) || 0);
    planted.stressDays = Math.max(0, Number(planted.stressDays) || 0);
  });

  /* Migrasi progress lama yang hanya punya readySeedlings. */
  if (!source.seedlings && Number(source.readySeedlings) > 0) {
    fixed.seedlings.bokchoy = Number(source.readySeedlings);
  }

  return fixed;
}

function saveGameProgress(gameState) {
  const normalized = ensureGameStateShape(gameState);
  normalized.updatedAt = new Date().toISOString();
  currentGameState = normalized;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

function getSavedGameProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return ensureGameStateShape(JSON.parse(raw));
  } catch (error) {
    console.warn("Progress game tidak dapat dibaca.", error);
    return null;
  }
}

function getTotalSeedlings(gameState = currentGameState) {
  return Object.values(gameState?.seedlings || {}).reduce(
    (total, count) => total + Math.max(0, Number(count) || 0),
    0
  );
}

function getPlantedCount(gameState = currentGameState) {
  return Object.keys(gameState?.plantedSlots || {}).length;
}

function getFirstAvailableSeed() {
  return Object.keys(currentGameState?.seeds || {}).find(
    (plantId) => Number(currentGameState.seeds[plantId]) > 0
  ) || null;
}

function getFirstAvailableSeedling() {
  return Object.keys(currentGameState?.seedlings || {}).find(
    (plantId) => Number(currentGameState.seedlings[plantId]) > 0
  ) || null;
}

/* ==================================================
   RENDER MAIN GAME
================================================== */

function applyModeClass(element, mode) {
  const normalizedMode = normalizeGameMode(mode);
  const modeSetting = mainModeSettings[normalizedMode];

  element.classList.remove("mode-normal", "mode-hujan", "mode-kemarau");
  element.classList.add(modeSetting.className);

  return modeSetting;
}

function getPlantImage(planted) {
  const isYellow = planted.condition === "yellow";

  if (planted.stage === "mature") {
    return isYellow ? plantAssets.vegetableYellow : plantAssets.vegetableGreen;
  }

  return isYellow ? plantAssets.seedlingYellow : plantAssets.seedlingGreen;
}

function renderSeedlingNotification() {
  seedlingNotification.innerHTML = "";

  if (!currentGameState) return;

  const totalSeedlings = getTotalSeedlings();
  const isLoading = Boolean(currentGameState.sowing);

  if (!isLoading && totalSeedlings === 0) return;

  if (isLoading) {
    const loadingItem = document.createElement("div");
    loadingItem.className = "seedling-loading-item";
    loadingItem.innerHTML = '<div class="seedling-loading-spinner" aria-label="Menyemai benih"></div>';
    seedlingNotification.appendChild(loadingItem);
  }

  const visibleIcons = Math.min(totalSeedlings, 2);

  for (let index = 0; index < visibleIcons; index += 1) {
    const item = document.createElement("div");
    item.className = "seedling-ready-item";
    item.innerHTML = `<img src="${plantAssets.notification}" alt="Bibit siap ditanam" />`;
    seedlingNotification.appendChild(item);
  }

  const remaining = totalSeedlings - visibleIcons;

  if (remaining > 0) {
    const badge = document.createElement("div");
    badge.className = "seedling-extra-badge";
    badge.textContent = `+${remaining}`;
    seedlingNotification.appendChild(badge);
  }
}

function renderMainPlantSlots() {
  mainPlantSlots.forEach((slot) => {
    const planted = currentGameState?.plantedSlots?.[slot.dataset.slot];
    slot.innerHTML = "";

    if (!planted) return;

    const image = document.createElement("img");
    image.className = "main-slot-plant";
    image.src = getPlantImage(planted);
    image.alt = plantCatalog[planted.plantId]?.name || "Tanaman";
    slot.appendChild(image);
  });
}

function renderPumpWarnings() {
  const damaged = Boolean(currentGameState?.pumpDamaged);

  if (mainPumpWarning) mainPumpWarning.hidden = !damaged;
  if (tankPumpWarning) tankPumpWarning.hidden = !damaged;
  if (pumpRepairButton) {
    pumpRepairButton.classList.toggle("damaged", damaged);
    pumpRepairButton.setAttribute(
      "aria-label",
      damaged ? "Perbaiki pompa rusak" : "Pompa dalam kondisi normal"
    );
  }
}

function renderPipeWarnings() {
  const damaged = Boolean(currentGameState?.pipeDamaged);

  if (mainPipeWarningButton) {
    mainPipeWarningButton.hidden = !damaged;
    mainPipeWarningButton.setAttribute("aria-hidden", damaged ? "false" : "true");
  }

  if (zoomPipeWarningButton) {
    zoomPipeWarningButton.hidden = !damaged;
    zoomPipeWarningButton.setAttribute("aria-hidden", damaged ? "false" : "true");
    zoomPipeWarningButton.classList.remove("position-left", "position-center", "position-right");
    zoomPipeWarningButton.classList.add(`position-${currentGameState?.pipeWarningPosition || "center"}`);
  }
}

function renderMainGame(gameState) {
  currentGameState = ensureGameStateShape(gameState);
  const modeSetting = applyModeClass(mainGameScreen, currentGameState.mode);
  const userName = currentGameState.userName.trim() || "Cipunk";

  mainUserName.textContent = userName;
  mainUserInitial.textContent = userName.charAt(0).toUpperCase();
  mainDayValue.textContent = currentGameState.day;
  mainFixValue.textContent = currentGameState.fixes;
  mainWeatherIcon.src = modeSetting.weatherIcon;
  mainWeatherIcon.alt = modeSetting.weatherAlt;

  renderSeedlingNotification();
  renderMainPlantSlots();
  renderPumpWarnings();
  renderPipeWarnings();
  resumeSowingIfNeeded();
}

function enterGame(gameState) {
  closeStartPopup();
  currentGameState = ensureGameStateShape(gameState);
  saveGameProgress(currentGameState);
  renderMainGame(currentGameState);
  showScreen("mainGameScreen");

  if (!currentGameState.initialGrantClaimed) {
    renderInitialGrantItems();
    initialGrantPopup.classList.add("show");
    initialGrantPopup.setAttribute("aria-hidden", "false");
    return;
  }

  if (currentGameState.day >= WIN_DAY && currentGameState.harvestStatus !== "berhasilPanen") {
    window.setTimeout(showFinalHarvestVictory, 0);
  }
}

/* ==================================================
   RENDER ZOOM & INVENTORY
================================================== */

function renderZoomPlantSlots() {
  zoomPlantSlotButtons.forEach((slotButton) => {
    const planted = currentGameState?.plantedSlots?.[slotButton.dataset.slot];
    slotButton.innerHTML = "";

    if (!planted) return;

    const image = document.createElement("img");
    image.className = "zoom-slot-plant";
    image.src = getPlantImage(planted);
    image.alt = plantCatalog[planted.plantId]?.name || "Tanaman";
    slotButton.appendChild(image);
  });
}

function renderZoomInventory() {
  zoomInventoryGrid.innerHTML = "";

  if (!currentGameState) return;

  const source = activeZoomTab === "seed" ? currentGameState.seeds : currentGameState.seedlings;
  const availableItems = Object.entries(source).filter(([, count]) => Number(count) > 0);

  sowSeedButton.hidden = activeZoomTab !== "seed";

  if (availableItems.length === 0) {
    zoomInventoryGrid.innerHTML = `
      <div class="inventory-empty">
        Tidak ada ${activeZoomTab === "seed" ? "benih" : "bibit"}.
      </div>
    `;
    return;
  }

  availableItems.forEach(([plantId, count]) => {
    const plant = plantCatalog[plantId];
    if (!plant) return;

    const item = document.createElement("button");
    item.type = "button";
    item.className = "inventory-item";
    item.dataset.plantId = plantId;

    const selected = activeZoomTab === "seed"
      ? selectedSeedId === plantId
      : selectedSeedlingId === plantId;

    if (selected) item.classList.add("selected");

    const imageSource = activeZoomTab === "seed" ? plantAssets.seed : plantAssets.seedlingGreen;

    item.innerHTML = `
      ${count > 1 ? `<span class="inventory-count">${count}</span>` : ""}
      <img src="${imageSource}" alt="${plant.name}" />
      <strong>${plant.name}</strong>
    `;

    if (activeZoomTab === "seedling") {
      item.draggable = true;

      item.addEventListener("dragstart", (event) => {
        draggedSeedlingId = plantId;
        item.classList.add("dragging");
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", plantId);
      });

      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
        draggedSeedlingId = null;
      });
    }

    item.addEventListener("click", () => {
      if (activeZoomTab === "seed") {
        selectedSeedId = plantId;
      } else {
        selectedSeedlingId = plantId;
      }
      renderZoomInventory();
    });

    zoomInventoryGrid.appendChild(item);
  });
}

function renderZoomPlantPage() {
  if (!currentGameState) return;

  applyModeClass(zoomPlantScreen, currentGameState.mode);
  renderZoomPlantSlots();
  renderZoomInventory();
  renderPipeWarnings();
  updateSowButton();
}

function openZoomPlantPage() {
  const saved = getSavedGameProgress();
  currentGameState = ensureGameStateShape(saved || currentGameState || createNewGameState(gameModes[0]));
  renderZoomPlantPage();
  showScreen("zoomPlantScreen");
}

openZoomPlantButton.addEventListener("click", openZoomPlantPage);


/* ==================================================
   ZOOM TANDON & KONTROL NUTRISI
================================================== */

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getParameterStatus(type, rawValue) {
  const value = Number(rawValue);

  if (type === "ph") {
    if (value < 5.0 || value > 7.0) {
      return { level: "danger", color: "#ef453d", icon: "☹" };
    }

    if (value < 5.5 || value > 6.5) {
      return { level: "warning", color: "#f4c900", icon: "😐" };
    }

    return { level: "good", color: "#8fc66f", icon: "😊" };
  }

  if (type === "ppm") {
    if (value < 800 || value > 1600) {
      return { level: "danger", color: "#ef453d", icon: "☹" };
    }

    if (value < 1050 || value > 1400) {
      return { level: "warning", color: "#f4c900", icon: "😐" };
    }

    return { level: "good", color: "#8fc66f", icon: "😊" };
  }

  if (value < 350 || value > 1100) {
    return { level: "danger", color: "#ef453d", icon: "☹" };
  }

  if (value < 500 || value > 1000) {
    return { level: "warning", color: "#f4c900", icon: "😐" };
  }

  return { level: "good", color: "#8fc66f", icon: "😊" };
}

function getParameterPercent(type, rawValue) {
  const value = Number(rawValue);

  if (type === "ph") {
    return clamp(((value - 4) / (8 - 4)) * 100, 0, 100);
  }

  if (type === "ppm") {
    return clamp(((value - 200) / (1800 - 200)) * 100, 0, 100);
  }

  return clamp(((value - 200) / (1200 - 200)) * 100, 0, 100);
}

function setControlReading(type, valueElement, fillElement, statusElement, value, label) {
  const status = getParameterStatus(type, value);
  const percent = getParameterPercent(type, value);

  valueElement.textContent = label;
  valueElement.style.background = status.color;
  fillElement.style.width = `${percent}%`;
  fillElement.style.background = status.color;
  statusElement.textContent = status.icon;
  statusElement.style.color = status.color;
}

function renderControlPanel() {
  if (!currentGameState) return;

  setControlReading(
    "ph",
    controlPhValue,
    controlPhFill,
    controlPhStatus,
    currentGameState.ph,
    currentGameState.ph.toFixed(1).replace(".", ",")
  );

  setControlReading(
    "ppm",
    controlPpmValue,
    controlPpmFill,
    controlPpmStatus,
    currentGameState.ppm,
    String(Math.round(currentGameState.ppm))
  );

  setControlReading(
    "volume",
    controlVolumeValue,
    controlVolumeFill,
    controlVolumeStatus,
    currentGameState.volumeLiters,
    `${(currentGameState.volumeLiters / 100).toFixed(2).replace(".", ",")} L`
  );
}

function openControlPanel() {
  const saved = getSavedGameProgress();
  currentGameState = ensureGameStateShape(
    saved || currentGameState || createNewGameState(gameModes[0])
  );

  renderControlPanel();
  controlPanelPopup.classList.add("show");
  controlPanelPopup.setAttribute("aria-hidden", "false");
}

function closeControlPanel() {
  controlPanelPopup.classList.remove("show");
  controlPanelPopup.setAttribute("aria-hidden", "true");
}

function renderZoomTankPage() {
  if (!currentGameState) return;

  applyModeClass(zoomTankScreen, currentGameState.mode);

  const ppmStatus = getParameterStatus("ppm", currentGameState.ppm);
  const meterPercent = getParameterPercent("ppm", currentGameState.ppm);

  tankMeterFill.style.height = `${meterPercent}%`;
  tankMeterFill.style.background = ppmStatus.color;
  tankMeterValue.textContent = String(Math.round(currentGameState.ppm));
  tankMeterValue.style.bottom = `calc(${meterPercent}% - 18px)`;
  tankMeterValue.style.background = ppmStatus.color;

  const hasVitamin = currentGameState.vitaminBottles > 0;

  vitaminBottleImage.src = hasVitamin
    ? "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/zoom%20tandon/botol%20berisi.png"
    : "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/zoom%20tandon/botol%20kosong.png";

  vitaminBottleImage.alt = hasVitamin
    ? "Botol vitamin berisi"
    : "Botol vitamin kosong";

  vitaminBottleCount.textContent = `${currentGameState.vitaminBottles} botol`;
  fillTankButton.disabled = !hasVitamin;
  fillTankButton.classList.toggle("disabled", !hasVitamin);
  renderPumpWarnings();
}

function openZoomTankPage() {
  const saved = getSavedGameProgress();

  currentGameState = ensureGameStateShape(
    saved || currentGameState || createNewGameState(gameModes[0])
  );

  renderZoomTankPage();
  showScreen("zoomTankScreen");
}

function shuffleArray(values) {
  const result = [...values];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

/* ==================================================
   MODAL AWAL, SUMBER DAYA, DAN HADIAH
================================================== */

function closeInitialGrant() {
  initialGrantPopup.classList.remove("show");
  initialGrantPopup.setAttribute("aria-hidden", "true");
}

function renderInitialGrantItems() {
  if (!initialGrantItems || !currentGameState) return;
  initialGrantItems.innerHTML = "";

  /* Show each seed type the player received */
  Object.entries(currentGameState.seeds).forEach(([plantId, count]) => {
    if (count > 0) {
      const card = document.createElement("div");
      card.className = "grant-item-card";
      card.innerHTML = `
        <img class="grant-card-background" src="https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/hadiah%2C%20sda%2C%20pause/Rectangle%20243.png" alt="" />
        <img class="grant-item-icon" src="${plantAssets.seed}" alt="Benih ${plantCatalog[plantId]?.name || plantId}" />
        <strong>${count}</strong>
        <span>Benih ${plantCatalog[plantId]?.name || plantId}</span>
      `;
      initialGrantItems.appendChild(card);
    }
  });

  /* Show fix count */
  const fixCard = document.createElement("div");
  fixCard.className = "grant-item-card";
  fixCard.innerHTML = `
    <img class="grant-card-background" src="https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/hadiah%2C%20sda%2C%20pause/Rectangle%20243.png" alt="" />
    <img class="grant-item-icon" src="${resourceAssets.fix}" alt="Fix" />
    <strong>${currentGameState.fixes}</strong>
    <span>Fix</span>
  `;
  initialGrantItems.appendChild(fixCard);
}

function renderResourcePopup() {
  resourceGrid.innerHTML = "";
  if (!currentGameState) return;

  const items = [];

  Object.entries(currentGameState.seeds).forEach(([plantId, count]) => {
    if (count > 0) {
      items.push({
        label: `Benih ${plantCatalog[plantId]?.name || plantId}`,
        count,
        image: resourceAssets.seed
      });
    }
  });

  Object.entries(currentGameState.seedlings).forEach(([plantId, count]) => {
    if (count > 0) {
      items.push({
        label: `Bibit ${plantCatalog[plantId]?.name || plantId}`,
        count,
        image: resourceAssets.seedling
      });
    }
  });

  /* Always show Fix even if 0 so player can track */
  items.push({ label: "Fix", count: currentGameState.fixes, image: resourceAssets.fix });

  if (currentGameState.vitaminBottles > 0) {
    items.push({
      label: "Vitamin",
      count: currentGameState.vitaminBottles,
      image: resourceAssets.vitamin
    });
  }

  resourceEmptyMessage.hidden = items.length > 0;

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "resource-item";
    card.innerHTML = `
      <strong class="resource-item-count">${item.count}</strong>
      <img src="${item.image}" alt="${item.label}" />
      <span>${item.label}</span>
    `;
    resourceGrid.appendChild(card);
  });
}

function openResourcePopup() {
  renderResourcePopup();
  resourcePopup.classList.add("show");
  resourcePopup.setAttribute("aria-hidden", "false");
}

function closeResourcePopup() {
  resourcePopup.classList.remove("show");
  resourcePopup.setAttribute("aria-hidden", "true");
}

function consumeFixForGame(gameName) {
  if (!currentGameState) return false;

  if (currentGameState.fixes <= 0) {
    checkGameOver();
    return false;
  }

  currentGameState.fixes -= 1;
  saveGameProgress(currentGameState);
  renderMainGame(currentGameState);
  return true;
}

/* Check if game over: fix=0 and active damage exists */
function checkGameOver() {
  if (!currentGameState) return false;

  const hasDamage = currentGameState.pipeDamaged || currentGameState.pumpDamaged;

  if (currentGameState.fixes <= 0 && hasDamage) {
    showGameOver("Fix habis dan masih ada kerusakan yang harus diperbaiki. Permainan berakhir.");
    return true;
  }

  if (currentGameState.fixes <= 0) {
    openGameInfo(
      "Fix Habis",
      "Kamu kehabisan Fix. Dapatkan Fix dari hadiah hari berikutnya atau selesaikan tantangan."
    );
    return true;
  }

  return false;
}

function showGameOver(message) {
  if (gameOverMessage) gameOverMessage.textContent = message;

  const goHarvestVal = document.getElementById("goHarvestVal");
  const goHarvestBar = document.getElementById("goHarvestBar");
  const goHealthVal = document.getElementById("goHealthVal");
  const goHealthBar = document.getElementById("goHealthBar");
  const goIssueVal = document.getElementById("goIssueVal");
  const goIssueBar = document.getElementById("goIssueBar");

  const hCount = currentGameState.harvestCount || 0;
  const hHealth = currentGameState.plantHealth || 0;
  const hIssues = currentGameState.problemsSolved || 0;

  if (goHarvestVal) goHarvestVal.textContent = `${hCount}/24`;
  if (goHarvestBar) goHarvestBar.style.width = `${Math.min(100, (hCount / 24) * 100)}%`;

  if (goHealthVal) goHealthVal.textContent = `${hHealth}%`;
  if (goHealthBar) goHealthBar.style.width = `${hHealth}%`;

  if (goIssueVal) goIssueVal.textContent = `${hIssues}/12`;
  if (goIssueBar) goIssueBar.style.width = `${Math.min(100, (hIssues / 12) * 100)}%`;

  gameOverPopup.classList.add("show");
  gameOverPopup.setAttribute("aria-hidden", "false");
}

function closeGameOver() {
  gameOverPopup.classList.remove("show");
  gameOverPopup.setAttribute("aria-hidden", "true");
}

function showReward(type, rewardName, count, message, onContinue = null) {
  /* type: "fix" or "seed" */
  if (type === "seed") {
    rewardItemIcon.src = plantAssets.seed;
    rewardItemIcon.alt = rewardName;
  } else {
    rewardItemIcon.src = resourceAssets.fix;
    rewardItemIcon.alt = "Fix";
  }
  rewardItemCount.textContent = `+${count}`;
  rewardItemLabel.textContent = rewardName;

  rewardMessage.textContent = message;
  rewardContinueAction = typeof onContinue === "function" ? onContinue : null;
  rewardPopup.classList.add("show");
  rewardPopup.setAttribute("aria-hidden", "false");
}

function showFixReward(message, onContinue = null) {
  currentGameState.fixes += 1;
  currentGameState.score += 25;
  saveGameProgress(currentGameState);
  renderMainGame(currentGameState);

  showReward("fix", "Fix", 1, message, onContinue);
}

function showSeedReward(plantId, message, onContinue = null) {
  currentGameState.seeds[plantId] = (Number(currentGameState.seeds[plantId]) || 0) + 1;
  currentGameState.score += 15;
  saveGameProgress(currentGameState);
  renderMainGame(currentGameState);

  const plantName = `Benih ${plantCatalog[plantId]?.name || plantId}`;
  showReward("seed", plantName, 1, message, onContinue);
}

/* Mixed reward: randomly give fix or seed based on game context */
function showMixedReward(gameName, onContinue = null) {
  /* Decide: give seed every 3 days or if fix is plentiful, otherwise fix */
  const daysSinceLastSeed = currentGameState.day - (currentGameState.lastSeedRewardDay || 1);
  const shouldGiveSeed = daysSinceLastSeed >= 3 || (currentGameState.fixes >= 3 && Math.random() < 0.4);

  if (shouldGiveSeed) {
    const randomPlant = plantTypes[Math.floor(Math.random() * plantTypes.length)];
    currentGameState.lastSeedRewardDay = currentGameState.day;
    showSeedReward(
      randomPlant,
      `${gameName} berhasil. Kamu memperoleh 1 Benih ${plantCatalog[randomPlant]?.name || randomPlant}.`,
      onContinue
    );
  } else {
    showFixReward(
      `${gameName} berhasil. Kamu memperoleh hadiah 1 Fix.`,
      onContinue
    );
  }
}

function closeRewardPopup() {
  rewardPopup.classList.remove("show");
  rewardPopup.setAttribute("aria-hidden", "true");
  const action = rewardContinueAction;
  rewardContinueAction = null;
  if (action) action();
}

function showHarvestResult(success, message, options = {}) {
  const shell = harvestResultPopup.querySelector(".harvest-result-shell");
  const statBg = harvestResultPopup.querySelector(".panen-stat-bg");
  harvestResultPopup.dataset.finalResult = options.final ? "true" : "false";

  if (success) {
    if (harvestResultImage) harvestResultImage.src = "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/main/panen%20pop%20up/berhasil_layout.png";
    if (shell) {
      shell.classList.remove("fail-state");
      shell.classList.remove("harvest-fail");
    }
  } else {
    if (harvestResultImage) harvestResultImage.src = "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/main/panen%20pop%20up/gagal_layout.png";
    if (shell) {
      shell.classList.add("fail-state");
      shell.classList.add("harvest-fail");
    }
  }
  
  if (statBg) statBg.src = "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/main/panen%20pop%20up/statistik_new.png";

  if (harvestResultMessage) {
    const normalizedMessage = String(message || "").trim();
    harvestResultMessage.textContent = normalizedMessage;
    harvestResultMessage.hidden = normalizedMessage.length === 0;
  }

  const hHarvestVal = document.getElementById("hvHarvestVal");
  const hHarvestBar = document.getElementById("hvHarvestBar");
  const hHealthVal = document.getElementById("hvHealthVal");
  const hHealthBar = document.getElementById("hvHealthBar");
  const hIssueVal = document.getElementById("hvIssueVal");
  const hIssueBar = document.getElementById("hvIssueBar");

  const hCount = currentGameState.harvestCount || 0;
  const hHealth = currentGameState.plantHealth || 0;
  const hIssues = currentGameState.problemsSolved || 0;

  if (hHarvestVal) hHarvestVal.textContent = `${hCount}/24`;
  if (hHarvestBar) hHarvestBar.style.width = `${Math.min(100, (hCount / 24) * 100)}%`;

  if (hHealthVal) hHealthVal.textContent = `${hHealth}%`;
  if (hHealthBar) hHealthBar.style.width = `${hHealth}%`;

  if (hIssueVal) hIssueVal.textContent = `${hIssues}/12`;
  if (hIssueBar) hIssueBar.style.width = `${Math.min(100, (hIssues / 12) * 100)}%`;

  harvestResultPopup.classList.add("show");
  harvestResultPopup.setAttribute("aria-hidden", "false");
}

function closeHarvestResult() {
  harvestResultPopup.classList.remove("show");
  harvestResultPopup.setAttribute("aria-hidden", "true");

  if (harvestResultPopup.dataset.finalResult === "true") {
    harvestResultPopup.dataset.finalResult = "false";
    showScreen("landingScreen");
    loadSavedProgressPreview();
  }
}

function showFinalHarvestVictory() {
  if (!currentGameState || currentGameState.harvestStatus === "berhasilPanen") return;

  currentGameState.harvestStatus = "berhasilPanen";
  currentGameState.score += 300;
  saveGameProgress(currentGameState);
  renderMainGame(currentGameState);

  showHarvestResult(true, "", { final: true });
}

initialGrantStartButton.addEventListener("click", () => {
  if (!currentGameState) return;
  currentGameState.initialGrantClaimed = true;
  saveGameProgress(currentGameState);
  closeInitialGrant();
});

closeResourcePopupButton.addEventListener("click", closeResourcePopup);
resourcePopup.addEventListener("click", (event) => {
  if (event.target === resourcePopup) closeResourcePopup();
});
rewardContinueButton.addEventListener("click", closeRewardPopup);
harvestResultCloseButton.addEventListener("click", closeHarvestResult);
if (harvestRestartButton) {
  harvestRestartButton.addEventListener("click", () => {
    closeHarvestResult();
    const mode = gameModes.find((item) => item.id === currentGameState?.mode) || gameModes[0];
    const restartedState = createNewGameState(mode);
    enterGame(restartedState);
  });
}

gameOverRestartButton.addEventListener("click", () => {
  closeGameOver();
  const mode = gameModes.find((item) => item.id === currentGameState?.mode) || gameModes[0];
  const restartedState = createNewGameState(mode);
  enterGame(restartedState);
});

gameOverExitButton.addEventListener("click", () => {
  closeGameOver();
  localStorage.removeItem(STORAGE_KEY);
  showScreen("landingScreen");
});

/* ==================================================
   GAME RACIK MANIA
================================================== */

const racikAssets = {
  A: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/tiki%20taka/vit%20a.png",
  B: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/tiki%20taka/vit%20b.png",
  X: "https://raw.githubusercontent.com/firaamdhni/INF312-2026-HydroAdapt/refs/heads/main/tiki%20taka/Group%20113-2.png"
};

function closeVitaminChallenge() {
  vitaminChallengePopup.classList.remove("show");
  vitaminChallengePopup.setAttribute("aria-hidden", "true");
  racikBusy = false;
  racikOpenIndexes = [];
}

function renderRacikCards() {
  racikCardGrid.innerHTML = "";

  racikDeck.forEach((type, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "racik-card";
    card.dataset.index = String(index);

    if (racikOpenIndexes.includes(index)) card.classList.add("revealed");
    if (racikMatchedIndexes.has(index)) card.classList.add("matched");
    if (racikMatchedIndexes.has(index) && type === "X") card.classList.add("black-match");

    card.innerHTML = `<img src="${racikAssets[type]}" alt="${type === "A" ? "Vitamin A" : type === "B" ? "Vitamin B" : "Ramuan hitam"}" />`;
    card.addEventListener("click", () => handleRacikCard(index));
    racikCardGrid.appendChild(card);
  });
}

function openVitaminChallenge() {
  if (!currentGameState) return;
  if (!consumeFixForGame("Racik Mania")) return;

  racikDeck = shuffleArray(["A", "A", "B", "B", "X", "X", "X", "X", "X"]);
  racikOpenIndexes = [];
  racikMatchedIndexes = new Set();
  racikMatchedTypes = new Set();
  racikBlackMatches = 0;
  racikBusy = false;

  racikBlackMatchCount.textContent = "0";
  racikGameMessage.textContent = "Temukan pasangan Vitamin A dan Vitamin B.";
  renderRacikCards();

  vitaminChallengePopup.classList.add("show");
  vitaminChallengePopup.setAttribute("aria-hidden", "false");
}

function completeVitaminChallenge() {
  currentGameState.vitaminBottles += 1;
  currentGameState.score += 100;
  saveGameProgress(currentGameState);
  renderZoomTankPage();
  closeVitaminChallenge();

  showMixedReward("Racik Mania");
}

function failVitaminChallenge() {
  saveGameProgress(currentGameState);
  renderZoomTankPage();
  renderMainGame(currentGameState);
  closeVitaminChallenge();

  openGameInfo(
    "Racik Mania Gagal",
    `Ramuan hitam cocok dua kali. Fix yang digunakan tidak kembali. Sisa Fix: ${currentGameState.fixes}.`
  );
  checkGameOver();
}

function handleRacikCard(index) {
  if (racikBusy || racikMatchedIndexes.has(index) || racikOpenIndexes.includes(index)) return;

  racikOpenIndexes.push(index);
  renderRacikCards();

  if (racikOpenIndexes.length < 2) return;

  racikBusy = true;
  const [firstIndex, secondIndex] = racikOpenIndexes;
  const firstType = racikDeck[firstIndex];
  const secondType = racikDeck[secondIndex];

  window.setTimeout(() => {
    if (firstType === secondType) {
      racikMatchedIndexes.add(firstIndex);
      racikMatchedIndexes.add(secondIndex);

      if (firstType === "X") {
        racikBlackMatches += 1;
        racikBlackMatchCount.textContent = String(racikBlackMatches);

        if (racikBlackMatches >= RACIK_BLACK_MATCH_LIMIT) {
          failVitaminChallenge();
          return;
        }

        racikGameMessage.textContent = "Ramuan hitam cocok. Jangan sampai dua kali!";
      } else {
        racikMatchedTypes.add(firstType);
        racikGameMessage.textContent = `Pasangan Vitamin ${firstType} ditemukan.`;
      }
    } else {
      racikGameMessage.textContent = "Belum cocok. Coba dua kotak lain.";
    }

    racikOpenIndexes = [];
    racikBusy = false;
    renderRacikCards();

    if (racikMatchedTypes.has("A") && racikMatchedTypes.has("B")) {
      completeVitaminChallenge();
    }
  }, 520);
}

openZoomTankButton.addEventListener("click", openZoomTankPage);

backFromTankButton.addEventListener("click", () => {
  saveGameProgress(currentGameState);
  renderMainGame(currentGameState);
  showScreen("mainGameScreen");
});

tankPanelButton.addEventListener("click", openControlPanel);
panelButton.addEventListener("click", openControlPanel);

closeControlPanelButton.addEventListener("click", closeControlPanel);
controlPanelPopup.addEventListener("click", (event) => {
  if (event.target === controlPanelPopup) closeControlPanel();
});

vitaminButton.addEventListener("click", openVitaminChallenge);
closeVitaminChallengeButton.addEventListener("click", closeVitaminChallenge);

fillTankButton.addEventListener("click", () => {
  if (!currentGameState || currentGameState.vitaminBottles <= 0) {
    openGameInfo(
      "Botol Kosong",
      "Mainkan tantangan Vitamin terlebih dahulu untuk mendapatkan botol berisi."
    );
    return;
  }

  currentGameState.vitaminBottles -= 1;
  currentGameState.ppm = clamp(currentGameState.ppm + 250, 200, 1800);
  currentGameState.nutrient = clamp(
    ((currentGameState.ppm - 200) / 1600) * 100,
    0,
    100
  );

  updatePlantConditionFromTank();
  saveGameProgress(currentGameState);
  renderZoomTankPage();
  renderControlPanel();

  openGameInfo(
    "Vitamin Ditambahkan",
    `Nutrisi tandon sekarang ${Math.round(currentGameState.ppm)} PPM.`
  );
});


backFromZoomButton.addEventListener("click", () => {
  saveGameProgress(currentGameState);
  renderMainGame(currentGameState);
  showScreen("mainGameScreen");
});

zoomInventoryTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeZoomTab = button.dataset.zoomTab;

    zoomInventoryTabButtons.forEach((tabButton) => {
      tabButton.classList.toggle("active", tabButton.dataset.zoomTab === activeZoomTab);
    });

    if (activeZoomTab === "seed") {
      selectedSeedId = getFirstAvailableSeed();
    } else {
      selectedSeedlingId = getFirstAvailableSeedling();
    }

    renderZoomInventory();
  });
});

/* ==================================================
   SEMAI 5 DETIK
================================================== */

function clearSowingTimers() {
  if (sowingTimeoutId) clearTimeout(sowingTimeoutId);
  if (sowingCountdownId) clearInterval(sowingCountdownId);
  sowingTimeoutId = null;
  sowingCountdownId = null;
}

function updateSowButton() {
  if (!currentGameState?.sowing) {
    sowSeedButton.disabled = false;
    sowSeedButton.textContent = "Semai";
    return;
  }

  const remainingMs = Math.max(0, currentGameState.sowing.finishAt - Date.now());
  const remainingSeconds = Math.max(1, Math.ceil(remainingMs / 1000));

  sowSeedButton.disabled = true;
  sowSeedButton.textContent = `Menyemai ${remainingSeconds}s`;
}

function finishSowing() {
  clearSowingTimers();

  if (!currentGameState?.sowing) return;

  const plantId = currentGameState.sowing.plantId;
  currentGameState.seedlings[plantId] = (Number(currentGameState.seedlings[plantId]) || 0) + 1;
  currentGameState.sowing = null;

  saveGameProgress(currentGameState);
  updateSowButton();
  renderZoomInventory();
  renderSeedlingNotification();

  openGameInfo(
    "Bibit Siap",
    `${plantCatalog[plantId]?.name || "Benih"} sudah menjadi bibit dan dapat dipindahkan ke netpot.`
  );
}

function scheduleSowingTimer() {
  clearSowingTimers();

  if (!currentGameState?.sowing) {
    updateSowButton();
    return;
  }

  const remainingMs = currentGameState.sowing.finishAt - Date.now();

  if (remainingMs <= 0) {
    finishSowing();
    return;
  }

  updateSowButton();
  renderSeedlingNotification();

  sowingCountdownId = setInterval(updateSowButton, 250);
  sowingTimeoutId = setTimeout(finishSowing, remainingMs);
}

function resumeSowingIfNeeded() {
  if (!currentGameState?.sowing) {
    updateSowButton();
    return;
  }

  scheduleSowingTimer();
}

function clearSowingPuzzleTimer() {
  if (sowingPuzzleTimerId) window.clearInterval(sowingPuzzleTimerId);
  sowingPuzzleTimerId = null;
}

function closeSowingPuzzleGame() {
  clearSowingPuzzleTimer();
  sowingGamePopup.classList.remove("show");
  sowingGamePopup.setAttribute("aria-hidden", "true");
  sowingPuzzleSelectedIndex = null;
  sowingPuzzleDraggedIndex = null;
  sowingPuzzleBoard.innerHTML = "";
}

function createLightPuzzleShuffle() {
  const order = Array.from({ length: PUZZLE_TILE_COUNT }, (_, index) => index + 1);

  for (let swap = 0; swap < 7; swap += 1) {
    const first = Math.floor(Math.random() * order.length);
    let second = Math.floor(Math.random() * order.length);
    if (second === first) second = (second + 1) % order.length;
    [order[first], order[second]] = [order[second], order[first]];
  }

  if (order.every((value, index) => value === index + 1)) {
    [order[0], order[1]] = [order[1], order[0]];
  }

  return order;
}

function isSowingPuzzleSolved() {
  return sowingPuzzleOrder.every((pieceId, index) => pieceId === index + 1);
}

function swapSowingTiles(firstIndex, secondIndex) {
  if (firstIndex === secondIndex) return;
  [sowingPuzzleOrder[firstIndex], sowingPuzzleOrder[secondIndex]] = [
    sowingPuzzleOrder[secondIndex],
    sowingPuzzleOrder[firstIndex]
  ];
  renderSowingPuzzle();

  if (isSowingPuzzleSolved()) completeSowingPuzzle();
}

function renderSowingPuzzle() {
  sowingPuzzleBoard.innerHTML = "";

  sowingPuzzleOrder.forEach((pieceId, index) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "sowing-puzzle-tile";
    tile.draggable = true;
    tile.dataset.index = String(index);

    if (sowingPuzzleSelectedIndex === index) tile.classList.add("selected");

    tile.innerHTML = `<img src="${sowingPuzzleImages[pieceId - 1]}" alt="Potongan puzzle ${pieceId}" />`;

    tile.addEventListener("dragstart", () => {
      sowingPuzzleDraggedIndex = index;
      tile.classList.add("dragging");
    });

    tile.addEventListener("dragend", () => {
      sowingPuzzleDraggedIndex = null;
      tile.classList.remove("dragging");
    });

    tile.addEventListener("dragover", (event) => {
      event.preventDefault();
      tile.classList.add("drag-over");
    });

    tile.addEventListener("dragleave", () => tile.classList.remove("drag-over"));

    tile.addEventListener("drop", (event) => {
      event.preventDefault();
      tile.classList.remove("drag-over");
      if (sowingPuzzleDraggedIndex !== null) swapSowingTiles(sowingPuzzleDraggedIndex, index);
    });

    /* Fallback HP: tekan dua potongan untuk menukar. */
    tile.addEventListener("click", () => {
      if (sowingPuzzleSelectedIndex === null) {
        sowingPuzzleSelectedIndex = index;
        renderSowingPuzzle();
        return;
      }

      const firstIndex = sowingPuzzleSelectedIndex;
      sowingPuzzleSelectedIndex = null;
      swapSowingTiles(firstIndex, index);
    });

    sowingPuzzleBoard.appendChild(tile);
  });
}

function failSowingPuzzle(reason) {
  if (sowingPuzzleResolved) return;
  sowingPuzzleResolved = true;
  closeSowingPuzzleGame();
  sowingPuzzlePlantId = null;
  saveGameProgress(currentGameState);
  renderZoomInventory();

  openGameInfo(
    "Penyemaian Gagal",
    `${reason} Benih berkurang 1 dan Fix yang digunakan tidak kembali.`
  );
  checkGameOver();
}

function completeSowingPuzzle() {
  if (sowingPuzzleResolved) return;
  sowingPuzzleResolved = true;
  const plantId = sowingPuzzlePlantId;
  closeSowingPuzzleGame();

  if (!plantId) return;

  currentGameState.sowing = {
    plantId,
    startedAt: Date.now(),
    finishAt: Date.now() + SOWING_DURATION_MS
  };

  sowingPuzzlePlantId = null;
  saveGameProgress(currentGameState);
  renderZoomInventory();
  renderSeedlingNotification();
  scheduleSowingTimer();

  showMixedReward("Puzzle Nyemai");
}

function updateSowingPuzzleTimer() {
  if (sowingPuzzleResolved) return;

  const remainingMs = sowingPuzzleDeadline - Date.now();
  const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
  sowingPuzzleTimer.textContent = String(remainingSeconds);

  if (remainingMs <= 0) failSowingPuzzle("Waktu 100 detik habis.");
}

function openSowingPuzzleGame() {
  if (!currentGameState) return;

  if (currentGameState.sowing) {
    openGameInfo("Sedang Menyemai", "Tunggu proses semai sebelumnya selesai.");
    return;
  }

  const plantId = selectedSeedId || getFirstAvailableSeed();

  if (!plantId || Number(currentGameState.seeds[plantId]) <= 0) {
    openGameInfo("Benih Habis", "Tidak ada benih yang dapat disemai.");
    return;
  }

  if (!consumeFixForGame("game Nyemai")) return;

  /* Benih dan 1 Fix dipakai ketika permainan dimulai. Jika gagal, keduanya tetap terpakai. */
  currentGameState.seeds[plantId] -= 1;
  sowingPuzzlePlantId = plantId;
  sowingPuzzleResolved = false;
  selectedSeedId = getFirstAvailableSeed();
  saveGameProgress(currentGameState);
  renderZoomInventory();

  sowingPuzzleOrder = createLightPuzzleShuffle();
  sowingPuzzleSelectedIndex = null;
  sowingPuzzleMessage.textContent = "Geser potongan hingga gambar tersusun. Waktu 100 detik.";
  renderSowingPuzzle();

  sowingPuzzleDeadline = Date.now() + SOWING_PUZZLE_LIMIT_MS;
  updateSowingPuzzleTimer();
  clearSowingPuzzleTimer();
  sowingPuzzleTimerId = window.setInterval(updateSowingPuzzleTimer, 100);

  sowingGamePopup.classList.add("show");
  sowingGamePopup.setAttribute("aria-hidden", "false");
}

sowSeedButton.addEventListener("click", openSowingPuzzleGame);
closeSowingGameButton.addEventListener("click", () => {
  if (sowingGamePopup.classList.contains("show")) {
    failSowingPuzzle("Permainan ditutup sebelum selesai.");
  }
});

/* ==================================================
   GAME CRIMPING CABLE
================================================== */

const cableColorValues = {
  yellow: "#f4c900",
  blue: "#2d7888",
  green: "#91c66f",
  red: "#ff433b"
};

function closeCrimpingGame() {
  crimpingGamePopup.classList.remove("show");
  crimpingGamePopup.setAttribute("aria-hidden", "true");
  crimpingActiveDrag = null;
}

function resetCrimpingGame() {
  const shellRect = crimpingGameShell.getBoundingClientRect();
  crimpingCableSvg.setAttribute("viewBox", `0 0 ${Math.max(1, shellRect.width)} ${Math.max(1, shellRect.height)}`);
  crimpingCableSvg.setAttribute("preserveAspectRatio", "none");

  crimpingWrongAttempts = 0;
  crimpingConnectedColors = new Set();
  crimpingActiveDrag = null;
  crimpingWrongCount.textContent = "0";
  crimpingGameMessage.textContent = "Tarik kabel kiri ke warna yang sama di kanan.";
  crimpingCableSvg.innerHTML = "";
  document.querySelectorAll(".cable-endpoint").forEach((endpoint) => {
    endpoint.classList.remove("connected", "active");
  });
}

function getCablePoint(endpoint) {
  const shellRect = crimpingGameShell.getBoundingClientRect();
  const endpointRect = endpoint.getBoundingClientRect();

  return {
    x: endpointRect.left + endpointRect.width / 2 - shellRect.left,
    y: endpointRect.top + endpointRect.height / 2 - shellRect.top
  };
}

function createCableLine(color, startPoint, endPoint, temporary = false) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const controlOffset = Math.max(70, Math.abs(endPoint.x - startPoint.x) * 0.32);
  const path = [
    `M ${startPoint.x} ${startPoint.y}`,
    `C ${startPoint.x + controlOffset} ${startPoint.y},`,
    `${endPoint.x - controlOffset} ${endPoint.y},`,
    `${endPoint.x} ${endPoint.y}`
  ].join(" ");

  line.setAttribute("d", path);
  line.setAttribute("fill", "none");
  line.setAttribute("stroke", cableColorValues[color]);
  line.setAttribute("stroke-width", temporary ? "10" : "13");
  line.setAttribute("stroke-linecap", "round");
  line.setAttribute("stroke-linejoin", "round");
  line.setAttribute("opacity", temporary ? "0.78" : "1");
  line.dataset.temporary = temporary ? "true" : "false";
  crimpingCableSvg.appendChild(line);
  return line;
}

function openCrimpingGame() {
  if (!currentGameState?.pumpDamaged) {
    openGameInfo("Pompa Normal", "Pompa tidak mengalami kerusakan.");
    return;
  }

  if (!consumeFixForGame("Crimping Cable")) return;

  crimpingGamePopup.classList.add("show");
  crimpingGamePopup.setAttribute("aria-hidden", "false");
  window.requestAnimationFrame(resetCrimpingGame);
}

function failCrimpingGame() {
  saveGameProgress(currentGameState);
  renderMainGame(currentGameState);
  renderZoomTankPage();
  closeCrimpingGame();

  openGameInfo(
    "Crimping Gagal",
    `Dua kabel disambungkan ke warna yang salah. Fix yang digunakan tidak kembali. Sisa Fix: ${currentGameState.fixes}.`
  );
  checkGameOver();
}

function completeCrimpingGame() {
  currentGameState.pumpDamaged = false;
  currentGameState.score += 150;
  currentGameState.problemsSolved = (currentGameState.problemsSolved || 0) + 1;
  saveGameProgress(currentGameState);
  renderMainGame(currentGameState);
  renderZoomTankPage();
  closeCrimpingGame();

  showMixedReward("Crimping Cable");
}

function finishCableDrag(pointerEvent) {
  if (!crimpingActiveDrag) return;

  const { leftEndpoint, color, temporaryLine } = crimpingActiveDrag;
  const targetElement = document.elementFromPoint(pointerEvent.clientX, pointerEvent.clientY);
  const rightEndpoint = targetElement?.closest?.(".cable-endpoint-right");

  if (temporaryLine) temporaryLine.remove();
  leftEndpoint.classList.remove("active");
  crimpingActiveDrag = null;

  if (!rightEndpoint || rightEndpoint.classList.contains("connected")) return;

  if (rightEndpoint.dataset.color !== color) {
    crimpingWrongAttempts += 1;
    crimpingWrongCount.textContent = String(crimpingWrongAttempts);
    crimpingGameMessage.textContent = "Warna kabel salah.";

    if (crimpingWrongAttempts >= 2) failCrimpingGame();
    return;
  }

  const startPoint = getCablePoint(leftEndpoint);
  const endPoint = getCablePoint(rightEndpoint);
  createCableLine(color, startPoint, endPoint, false);
  leftEndpoint.classList.add("connected");
  rightEndpoint.classList.add("connected");
  crimpingConnectedColors.add(color);
  crimpingGameMessage.textContent = `Kabel ${color} tersambung.`;

  if (crimpingConnectedColors.size === 4) completeCrimpingGame();
}

cableLeftEndpoints.forEach((leftEndpoint) => {
  leftEndpoint.addEventListener("pointerdown", (event) => {
    if (leftEndpoint.classList.contains("connected")) return;

    event.preventDefault();
    const color = leftEndpoint.dataset.color;
    const startPoint = getCablePoint(leftEndpoint);
    leftEndpoint.classList.add("active");

    crimpingActiveDrag = {
      leftEndpoint,
      color,
      startPoint,
      temporaryLine: createCableLine(color, startPoint, startPoint, true)
    };
  });
});

window.addEventListener("pointermove", (event) => {
  if (!crimpingActiveDrag) return;

  const shellRect = crimpingGameShell.getBoundingClientRect();
  const endPoint = {
    x: event.clientX - shellRect.left,
    y: event.clientY - shellRect.top
  };

  const { startPoint, color, temporaryLine } = crimpingActiveDrag;
  temporaryLine.remove();
  crimpingActiveDrag.temporaryLine = createCableLine(color, startPoint, endPoint, true);
});

window.addEventListener("pointerup", finishCableDrag);
window.addEventListener("pointercancel", finishCableDrag);

pumpRepairButton.addEventListener("click", openCrimpingGame);
closeCrimpingGameButton.addEventListener("click", closeCrimpingGame);

/* ==================================================
   GAME PUTAR PIPA
================================================== */

function normalizeRotation(value) {
  return ((Number(value) % 360) + 360) % 360;
}

function clearPipeCompletionTimer() {
  if (pipeCompletionTimeoutId) window.clearTimeout(pipeCompletionTimeoutId);
  pipeCompletionTimeoutId = null;
}

function queueCompletePipeGame() {
  if (pipePuzzleLocked) return;

  pipePuzzleLocked = true;
  pipeGameMessage.textContent = "Pipa berhasil tersambung dari Mulai sampai Akhir!";
  clearPipeCompletionTimer();
  pipeCompletionTimeoutId = window.setTimeout(completePipeGame, 450);
}

function isPipeRotationCorrect(tile, rotation) {
  const current = normalizeRotation(rotation);
  const solved = normalizeRotation(tile.solvedRotation);

  /* Pipa lurus tetap sama jika diputar 180 derajat. */
  if (tile.type === "straight") {
    return current % 180 === solved % 180;
  }

  return current === solved;
}

function isPipePuzzleSolved() {
  return pipePuzzleSolution.every((tile, index) =>
    isPipeRotationCorrect(tile, pipePuzzleRotations[index])
  );
}

function createPipeShuffle() {
  const rotations = pipePuzzleSolution.map((tile) => {
    const options = tile.type === "straight"
      ? [0, 90]
      : [0, 90, 180, 270];

    return options[Math.floor(Math.random() * options.length)];
  });

  /* Jangan pernah membuka puzzle dalam keadaan sudah selesai. */
  if (pipePuzzleSolution.every((tile, index) =>
    isPipeRotationCorrect(tile, rotations[index])
  )) {
    rotations[0] = normalizeRotation(rotations[0] + 90);
  }

  return rotations;
}

function renderPipePuzzle() {
  pipePuzzleGrid.innerHTML = "";

  const tileByCell = new Map(
    pipePuzzleSolution.map((tile, tileIndex) => [tile.cell, { tile, tileIndex }])
  );

  const totalCells = PIPE_GRID_COLUMNS * PIPE_GRID_ROWS;

  for (let cellIndex = 0; cellIndex < totalCells; cellIndex += 1) {
    const cell = document.createElement("div");
    cell.className = "pipe-puzzle-cell";
    cell.dataset.cell = String(cellIndex);

    const entry = tileByCell.get(cellIndex);

    if (entry) {
      const { tile, tileIndex } = entry;
      const button = document.createElement("button");

      button.type = "button";
      button.className = `pipe-puzzle-tile pipe-${tile.type}`;
      button.setAttribute("aria-label", `Putar pipa ${tileIndex + 1}`);
      button.innerHTML = `<img src="${pipeAssets[tile.type]}" alt="Pipa ${tile.type}" />`;
      button.style.setProperty(
        "--pipe-rotation",
        `${pipePuzzleRotations[tileIndex]}deg`
      );

      if (isPipeRotationCorrect(tile, pipePuzzleRotations[tileIndex])) {
        button.classList.add("correct");
      }

      button.addEventListener("click", () => {
        if (pipePuzzleLocked) return;

        pipePuzzleRotations[tileIndex] = normalizeRotation(
          pipePuzzleRotations[tileIndex] + 90
        );

        renderPipePuzzle();

        if (isPipePuzzleSolved()) {
          queueCompletePipeGame();
        }
      });

      cell.appendChild(button);
    }

    pipePuzzleGrid.appendChild(cell);
  }
}

function openPipeGame() {
  if (!currentGameState?.pipeDamaged) {
    openGameInfo("Pipa Normal", "Pipa hidroponik tidak mengalami kebocoran.");
    return;
  }

  if (!consumeFixForGame("Puzzle Pipa")) return;

  clearPipeCompletionTimer();
  pipePuzzleLocked = false;
  pipePuzzleSolution = generateRandomPipePuzzle();
  pipePuzzleRotations = createPipeShuffle();
  pipeGameMessage.textContent =
    "Tekan tiap pipa untuk memutarnya sampai jalur tersambung dari Mulai ke Akhir.";
  renderPipePuzzle();
  pipeGamePopup.classList.add("show");
  pipeGamePopup.setAttribute("aria-hidden", "false");
}

function closePipeGame({ force = false } = {}) {
  if (!force && pipePuzzleLocked && pipeCompletionTimeoutId) return;

  clearPipeCompletionTimer();
  pipeGamePopup.classList.remove("show");
  pipeGamePopup.setAttribute("aria-hidden", "true");
  pipePuzzleLocked = false;
}

function completePipeGame() {
  pipeCompletionTimeoutId = null;

  if (!currentGameState?.pipeDamaged) {
    closePipeGame();
    return;
  }

  currentGameState.pipeDamaged = false;
  currentGameState.score += 125;
  currentGameState.problemsSolved = (currentGameState.problemsSolved || 0) + 1;
  saveGameProgress(currentGameState);
  renderMainGame(currentGameState);
  renderZoomPlantPage();
  closePipeGame({ force: true });
  showMixedReward("Puzzle Pipa");
}

mainPipeWarningButton.addEventListener("click", openZoomPlantPage);
zoomPipeWarningButton.addEventListener("click", openPipeGame);
closePipeGameButton.addEventListener("click", closePipeGame);

/* ==================================================
   DRAG & DROP / TAP BIBIT KE NETPOT
================================================== */

function plantSeedlingToSlot(slotId, plantId) {
  if (!currentGameState || !plantId) return;

  if (currentGameState.plantedSlots[slotId]) {
    openGameInfo("Netpot Terisi", "Slot netpot ini sudah berisi tanaman.");
    return;
  }

  if (Number(currentGameState.seedlings[plantId]) <= 0) {
    openGameInfo("Bibit Tidak Ada", "Bibit tersebut sudah habis.");
    renderZoomInventory();
    return;
  }

  currentGameState.seedlings[plantId] -= 1;
  currentGameState.plantedSlots[slotId] = {
    plantId,
    stage: "seedling",
    condition: "green",
    ageDays: 0,
    stressDays: 0,
    plantedAtDay: currentGameState.day
  };

  selectedSeedlingId = getFirstAvailableSeedling();
  saveGameProgress(currentGameState);
  renderZoomPlantSlots();
  renderZoomInventory();
  renderMainPlantSlots();
  renderSeedlingNotification();
}

zoomPlantSlotButtons.forEach((slotButton) => {
  slotButton.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    slotButton.classList.add("drag-over");
  });

  slotButton.addEventListener("dragleave", () => {
    slotButton.classList.remove("drag-over");
  });

  slotButton.addEventListener("drop", (event) => {
    event.preventDefault();
    slotButton.classList.remove("drag-over");

    const plantId = event.dataTransfer.getData("text/plain") || draggedSeedlingId;
    plantSeedlingToSlot(slotButton.dataset.slot, plantId);
  });

  /* Fallback HP: pilih bibit di panel, lalu tap netpot. */
  slotButton.addEventListener("click", () => {
    if (activeZoomTab !== "seedling") return;
    const plantId = selectedSeedlingId || getFirstAvailableSeedling();
    plantSeedlingToSlot(slotButton.dataset.slot, plantId);
  });
});

/* ==================================================
   HARI BERIKUTNYA & PANEN
================================================== */

function advancePlantsOneDay() {
  Object.values(currentGameState.plantedSlots).forEach((planted) => {
    planted.ageDays = (Number(planted.ageDays) || 0) + 1;

    if (planted.ageDays >= 2) {
      planted.stage = "mature";
    }
  });
}

function applyDailyTankConsumption() {
  const plantCount = getPlantedCount();
  if (plantCount <= 0) return;

  const modeWaterPenalty = currentGameState.mode === "kemarau"
    ? 85
    : currentGameState.mode === "hujan"
      ? -20
      : 0;
  const modeNutrientPenalty = currentGameState.mode === "hujan"
    ? 45
    : currentGameState.mode === "kemarau"
      ? 15
      : 0;

  const waterUse = DAILY_BASE_WATER_USE + (plantCount * DAILY_WATER_USE_PER_PLANT) + modeWaterPenalty;
  const nutrientUse = DAILY_BASE_NUTRIENT_USE + (plantCount * DAILY_NUTRIENT_USE_PER_PLANT) + modeNutrientPenalty;

  currentGameState.volumeLiters = clamp(currentGameState.volumeLiters - waterUse, 200, 1200);
  currentGameState.ppm = clamp(currentGameState.ppm - nutrientUse, 200, 1800);
}

function updatePlantConditionFromTank(options = {}) {
  if (!currentGameState) return { deadPlants: [] };

  const resolveDeaths = Boolean(options.resolveDeaths);

  const phStatus = getParameterStatus("ph", currentGameState.ph);
  const ppmStatus = getParameterStatus("ppm", currentGameState.ppm);
  const volumeStatus = getParameterStatus("volume", currentGameState.volumeLiters);

  const hasDanger =
    phStatus.level === "danger" ||
    ppmStatus.level === "danger" ||
    volumeStatus.level === "danger";

  const hasWarning =
    phStatus.level === "warning" ||
    ppmStatus.level === "warning" ||
    volumeStatus.level === "warning";

  currentGameState.plantHealth = hasDanger ? 45 : hasWarning ? 72 : 100;

  const plantEntries = Object.entries(currentGameState.plantedSlots);

  if (hasDanger) {
    /* All plants turn yellow when danger */
    plantEntries.forEach(([, planted]) => {
      planted.condition = "yellow";
    });
  } else if (hasWarning) {
    /* Only some plants turn yellow (random 1-2, or older plants) */
    plantEntries.forEach(([, planted]) => {
      const age = Number(planted.ageDays) || 0;
      /* Older plants are more vulnerable; random chance for others */
      if (age >= 2 || Math.random() < 0.35) {
        planted.condition = "yellow";
      } else {
        planted.condition = "green";
      }
    });
  } else {
    /* All healthy */
    plantEntries.forEach(([, planted]) => {
      planted.condition = "green";
    });
  }

  /* Kemarau mode: random individual yellowing */
  if (currentGameState.mode === "kemarau") {
    plantEntries.forEach(([, planted]) => {
      if (Math.random() < 0.45) {
        planted.condition = "yellow";
      }
    });
  }

  const deadPlants = [];

  plantEntries.forEach(([slotId, planted]) => {
    const isStressed = planted.condition === "yellow" || hasDanger;
    const currentStressDays = Math.max(0, Number(planted.stressDays) || 0);
    planted.stressDays = isStressed
      ? (resolveDeaths ? currentStressDays + 1 : currentStressDays)
      : 0;

    if (resolveDeaths && planted.stressDays >= PLANT_DEATH_STRESS_DAYS) {
      deadPlants.push({
        slotId,
        plantId: planted.plantId,
        ageDays: Number(planted.ageDays) || 0
      });
    }
  });

  deadPlants.forEach(({ slotId }) => {
    delete currentGameState.plantedSlots[slotId];
  });

  if (deadPlants.length > 0) {
    currentGameState.score = Math.max(0, currentGameState.score - (deadPlants.length * 20));
  }

  return {
    hasDanger,
    hasWarning,
    deadPlants,
    phStatus,
    ppmStatus,
    volumeStatus
  };
}

nextDayButton.addEventListener("click", () => {
  if (!currentGameState) return;

  currentGameState.day += 1;
  advancePlantsOneDay();

  /* Demo teratur: pipa bocor pada day 2, 6, 10, ... */
  if (!currentGameState.pipeDamaged && currentGameState.day % 4 === 2) {
    const positions = ["left", "center", "right"];
    currentGameState.pipeDamaged = true;
    currentGameState.pipeWarningPosition = positions[Math.floor(Math.random() * positions.length)];
  }

  /* Pompa rusak pada day 3, 6, 9, ... */
  if (!currentGameState.pumpDamaged && currentGameState.day % 3 === 0) {
    currentGameState.pumpDamaged = true;
  }

  if (currentGameState.mode === "hujan") {
    currentGameState.volumeLiters = clamp(currentGameState.volumeLiters + 120, 200, 1200);
    currentGameState.ppm = clamp(currentGameState.ppm - 100, 200, 1800);
    currentGameState.ph = clamp(currentGameState.ph + 0.1, 4.0, 8.0);
  } else if (currentGameState.mode === "kemarau") {
    currentGameState.volumeLiters = clamp(currentGameState.volumeLiters - 150, 200, 1200);
    currentGameState.ppm = clamp(currentGameState.ppm + 80, 200, 1800);
    currentGameState.ph = clamp(currentGameState.ph - 0.1, 4.0, 8.0);
  } else {
    currentGameState.volumeLiters = clamp(currentGameState.volumeLiters - 80, 200, 1200);
    currentGameState.ppm = clamp(currentGameState.ppm - 50, 200, 1800);
  }

  applyDailyTankConsumption();

  currentGameState.nutrient = clamp(
    ((currentGameState.ppm - 200) / 1600) * 100,
    0,
    100
  );

  const dailyCareResult = updatePlantConditionFromTank({ resolveDeaths: true });
  saveGameProgress(currentGameState);
  renderMainGame(currentGameState);
  renderZoomPlantSlots();

  if (dailyCareResult.deadPlants.length > 0) {
    const deadCount = dailyCareResult.deadPlants.length;
    showHarvestResult(
      false,
      `${deadCount} tanaman mati karena air atau nutrisi tidak dijaga.`
    );
    return;
  }

  /* Seed reward every 3 days (day 4, 7, 10, 13, ...) */
  const daysSinceLastSeed = currentGameState.day - (currentGameState.lastSeedRewardDay || 1);
  const shouldGrantSeed = daysSinceLastSeed >= 3;

  if (shouldGrantSeed) {
    const randomPlant = plantTypes[Math.floor(Math.random() * plantTypes.length)];
    currentGameState.seeds[randomPlant] = (Number(currentGameState.seeds[randomPlant]) || 0) + 1;
    currentGameState.lastSeedRewardDay = currentGameState.day;
    saveGameProgress(currentGameState);
    renderMainGame(currentGameState);
  }

  if (currentGameState.fixes <= 0 && (currentGameState.pipeDamaged || currentGameState.pumpDamaged)) {
    showGameOver("Fix habis dan masih ada kerusakan yang harus diperbaiki. Permainan berakhir.");
    return;
  }

  if (currentGameState.day >= WIN_DAY && currentGameState.harvestStatus !== "berhasilPanen") {
    showFinalHarvestVictory();
    return;
  }

  const dayIssues = [];
  if (currentGameState.pipeDamaged) dayIssues.push("pipa bocor di Zoom Tanaman");
  if (currentGameState.pumpDamaged) dayIssues.push("pompa rusak di Zoom Tandon");

  let dayMessage = dayIssues.length > 0
    ? `Hari baru dimulai. Ditemukan ${dayIssues.join(" dan ")}. Tekan tanda seru merah untuk memperbaikinya.`
    : "Hari baru dimulai. Pertumbuhan tanaman, volume air, pH, dan nutrisi tandon telah diperbarui.";

  if (shouldGrantSeed) {
    dayMessage += " 🌱 Kamu mendapat 1 benih baru sebagai hadiah!";
  }

  openGameInfo(`Day ${currentGameState.day}`, dayMessage);

  /* Check game over after day advances if damage exists */
  if (currentGameState.fixes <= 0 && (currentGameState.pipeDamaged || currentGameState.pumpDamaged)) {
    window.setTimeout(() => {
      closeGameInfo();
      checkGameOver();
    }, 1500);
  }
});

harvestZoomButton.addEventListener("click", () => {
  if (!currentGameState) return;

  const matureEntries = Object.entries(currentGameState.plantedSlots).filter(
    ([, planted]) => planted.stage === "mature"
  );

  if (matureEntries.length === 0) {
    const plantedCount = getPlantedCount();
    openGameInfo(
      plantedCount === 0 ? "Belum Ada Tanaman" : "Belum Siap Dipotong",
      plantedCount === 0
        ? "Pindahkan bibit ke netpot terlebih dahulu."
        : "Tanaman masih berupa bibit. Lanjutkan hari sampai tanaman tumbuh."
    );
    return;
  }

  /* Check if any mature plants are yellow (failed harvest) */
  const yellowMature = matureEntries.filter(([, planted]) => planted.condition === "yellow");
  const greenMature = matureEntries.filter(([, planted]) => planted.condition === "green");

  if (yellowMature.length > 0 && greenMature.length === 0) {
    /* All mature plants are yellow = harvest fail */
    yellowMature.forEach(([slotId]) => {
      delete currentGameState.plantedSlots[slotId];
    });
    currentGameState.score -= yellowMature.length * 10;
    saveGameProgress(currentGameState);
    renderZoomPlantSlots();
    renderMainPlantSlots();

    showHarvestResult(
      false,
      `${yellowMature.length} tanaman menguning dan gagal dipanen.`
    );
    return;
  }

  /* Harvest green mature plants */
  greenMature.forEach(([slotId]) => {
    delete currentGameState.plantedSlots[slotId];
  });

  /* Yellow ones stay, not harvested */
  currentGameState.harvestCount += greenMature.length;
  currentGameState.score += greenMature.length * 50;
  saveGameProgress(currentGameState);
  renderZoomPlantSlots();
  renderMainPlantSlots();

  let message = `${greenMature.length} tanaman dipanen. Skor bertambah ${greenMature.length * 50}.`;
  if (yellowMature.length > 0) {
    message += ` ${yellowMature.length} tanaman menguning tidak dapat dipanen.`;
  }
  message += ` Terus bertahan sampai Day ${WIN_DAY} untuk membuka hasil akhir dan statistik.`;

  openGameInfo("Panen Tercatat", message);
});

/* ==================================================
   TOMBOL MAIN GAME & MODAL
================================================== */

function openGameInfo(title, text) {
  gameInfoTitle.textContent = title;
  gameInfoText.textContent = text;
  gameInfoPopup.classList.add("show");
  gameInfoPopup.setAttribute("aria-hidden", "false");
}

function closeGameInfo() {
  gameInfoPopup.classList.remove("show");
  gameInfoPopup.setAttribute("aria-hidden", "true");
}

closeGameInfoButton.addEventListener("click", closeGameInfo);
gameInfoPopup.addEventListener("click", (event) => {
  if (event.target === gameInfoPopup) closeGameInfo();
});

wellButton.addEventListener("click", () => {
  if (!currentGameState) return;

  currentGameState.volumeLiters = clamp(
    currentGameState.volumeLiters + 200,
    200,
    1200
  );

  currentGameState.ppm = clamp(currentGameState.ppm - 100, 200, 1800);
  currentGameState.nutrient = clamp(
    ((currentGameState.ppm - 200) / 1600) * 100,
    0,
    100
  );

  updatePlantConditionFromTank();
  saveGameProgress(currentGameState);
  renderMainPlantSlots();

  openGameInfo(
    "Air Sumur Ditambahkan",
    `Volume air sekarang ${(currentGameState.volumeLiters / 100)
      .toFixed(2)
      .replace(".", ",")} L dan nutrisi ${Math.round(currentGameState.ppm)} PPM.`
  );
});

resourceButton.addEventListener("click", openResourcePopup);

pauseGameButton.addEventListener("click", () => {
  pausePopup.classList.add("show");
  pausePopup.setAttribute("aria-hidden", "false");
});

pauseSettingsButton.addEventListener("click", () => {
  pausePopup.classList.remove("show");
  pausePopup.setAttribute("aria-hidden", "true");
  openPopup("settingsPopup");
});

restartGameButton.addEventListener("click", () => {
  const confirmed = window.confirm("Restart permainan dari Day 1? Progress saat ini akan diganti.");
  if (!confirmed) return;

  const mode = gameModes.find((item) => item.id === currentGameState?.mode) || gameModes[0];
  const restartedState = createNewGameState(mode);
  pausePopup.classList.remove("show");
  pausePopup.setAttribute("aria-hidden", "true");
  enterGame(restartedState);
});

resumeGameButton.addEventListener("click", () => {
  pausePopup.classList.remove("show");
  pausePopup.setAttribute("aria-hidden", "true");
});

saveAndExitButton.addEventListener("click", () => {
  if (currentGameState) saveGameProgress(currentGameState);
  pausePopup.classList.remove("show");
  pausePopup.setAttribute("aria-hidden", "true");
  showScreen("landingScreen");
});

/* ==================================================
   BARU, LANJUT, TANTANGAN
================================================== */

playNewGameButton.addEventListener("click", () => {
  const state = createNewGameState(gameModes[selectedModeIndex]);
  enterGame(state);
});

function loadSavedProgressPreview() {
  const progress = getSavedGameProgress();

  if (!progress) {
    savedProgressCard.style.display = "none";
    noSavedProgressMessage.style.display = "block";
    continueGameButton.disabled = true;
    continueGameButton.style.opacity = "0.45";
    return;
  }

  savedProgressCard.style.display = "grid";
  noSavedProgressMessage.style.display = "none";
  savedDay.textContent = progress.day;
  savedHealth.textContent = `${progress.plantHealth}%`;
  savedScore.textContent = progress.score;
  continueGameButton.disabled = false;
  continueGameButton.style.opacity = "1";
}

continueGameButton.addEventListener("click", () => {
  const saved = getSavedGameProgress();
  if (saved) enterGame(saved);
});

function getRandomChallenge() {
  return randomChallenges[Math.floor(Math.random() * randomChallenges.length)];
}

playChallengeButton.addEventListener("click", () => {
  const randomMode = gameModes[Math.floor(Math.random() * gameModes.length)];
  const challengeState = createNewGameState(randomMode);
  challengeState.gameType = "challenge";
  challengeState.modeName = "Tantangan";
  challengeState.currentChallenge = getRandomChallenge();
  challengeState.pumpDamaged = challengeState.currentChallenge === "pompaRusak";

  localStorage.setItem(CHALLENGE_KEY, JSON.stringify(challengeState));
  enterGame(challengeState);
});

/* ==================================================
   PROFIL & SETTINGS
================================================== */

function renderProfileStats() {
  const progress = getSavedGameProgress();
  profilePlantCount.textContent = progress ? getPlantedCount(progress) : 0;
  profileHarvestCount.textContent = progress?.harvestCount || 0;
  profileScore.textContent = progress?.score || 0;
}

function saveSettings() {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({
      musicEnabled: musicToggle.checked,
      soundEnabled: soundToggle.checked,
      volume: Number(volumeRange.value)
    })
  );
}

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return;

  try {
    const settings = JSON.parse(raw);
    musicToggle.checked = settings.musicEnabled ?? true;
    soundToggle.checked = settings.soundEnabled ?? true;
    volumeRange.value = settings.volume ?? 70;
  } catch (error) {
    console.warn("Pengaturan tidak dapat dibaca.", error);
  }
}

musicToggle.addEventListener("change", saveSettings);
soundToggle.addEventListener("change", saveSettings);
volumeRange.addEventListener("input", saveSettings);

/* ==================================================
   KEYBOARD & INITIALIZATION
================================================== */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  popupOverlays.forEach((popup) => {
    if (popup.classList.contains("show")) closePopup(popup);
  });

  if (pausePopup.classList.contains("show")) {
    pausePopup.classList.remove("show");
    pausePopup.setAttribute("aria-hidden", "true");
  }

  if (gameInfoPopup.classList.contains("show")) closeGameInfo();
  if (controlPanelPopup.classList.contains("show")) closeControlPanel();
  if (vitaminChallengePopup.classList.contains("show")) closeVitaminChallenge();
  if (resourcePopup.classList.contains("show")) closeResourcePopup();
  if (pipeGamePopup.classList.contains("show")) closePipeGame();
  if (harvestResultPopup.classList.contains("show")) closeHarvestResult();
  if (gameOverPopup.classList.contains("show")) closeGameOver();
});

function initializeApp() {
  renderSelectedMode();
  loadSettings();
  loadSavedProgressPreview();
  showScreen("landingScreen");
}

initializeApp();
