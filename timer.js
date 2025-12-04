let timerId40 = null;
let timerId44 = null;

function clearTimers() {
  if (timerId40) {
    clearTimeout(timerId40);
    timerId40 = null;
  }
  if (timerId44) {
    clearTimeout(timerId44);
    timerId44 = null;
  }
}

function scheduleAlerts() {
  clearTimers();

  const now = new Date();

  // --- Next HH:
