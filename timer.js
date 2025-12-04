let timerId = null;

function scheduleNextAlert() {
  const now = new Date();

  // Next alert at :45 this hour, otherwise next hour
  const next = new Date(now.getTime());
  next.setMinutes(45, 0, 0);

  if (next <= now) {
    next.setHours(next.getHours() + 1);
  }

  const delay = next - now;

  document.getElementById("status").textContent =
    `Next alert at ${next.toLocaleTimeString()}.`;

  timerId = setTimeout(() => {
    fireAlert();
    scheduleNextAlert();
  }, delay);
}

function fireAlert() {
  // Play sound
  const audio = document.getElementById("alertSound");
  audio.currentTime = 0;
  audio.play().catch(() => {});

  // Alt1 popup notification
  try {
    if (window.alt1 && alt1.setTooltip) {
      alt1.setTooltip("RS Alert", "45-minute reminder", 5000);
    }
  } catch (e) {}
}

function startAlerts() {
  if (timerId === null) {
    scheduleNextAlert();
  }
}

function stopAlerts() {
  clearTimeout(timerId);
  timerId = null;
  document.getElementById("status").textContent = "Alerts are stopped.";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startBtn").onclick = startAlerts;
  document.getElementById("stopBtn").onclick = stopAlerts;
});
