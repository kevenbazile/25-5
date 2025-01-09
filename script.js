let breakLength = 5;
let sessionLength = 25;
let isRunning = false;
let timerInterval;
let timerMode = "session"; // "session" or "break"
let timeLeft = sessionLength * 60;

const breakLengthEl = document.getElementById("break-length");
const sessionLengthEl = document.getElementById("session-length");
const timeLeftEl = document.getElementById("time-left");
const timerLabelEl = document.getElementById("timer-label");

function updateDisplay() {
  breakLengthEl.textContent = breakLength;
  sessionLengthEl.textContent = sessionLength;
  timeLeftEl.textContent = formatTime(timeLeft);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function handleDecrement(id) {
  if (id === "break-decrement" && breakLength > 1) breakLength--;
  if (id === "session-decrement" && sessionLength > 1) {
    sessionLength--;
    if (!isRunning) timeLeft = sessionLength * 60;
  }
  updateDisplay();
}

function handleIncrement(id) {
  if (id === "break-increment" && breakLength < 60) breakLength++;
  if (id === "session-increment" && sessionLength < 60) {
    sessionLength++;
    if (!isRunning) timeLeft = sessionLength * 60;
  }
  updateDisplay();
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  } else {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        timerMode = timerMode === "session" ? "break" : "session";
        timerLabelEl.textContent = timerMode.charAt(0).toUpperCase() + timerMode.slice(1);
        timeLeft = (timerMode === "session" ? sessionLength : breakLength) * 60;
      }
      updateDisplay();
    }, 1000);
    isRunning = true;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timerMode = "session";
  breakLength = 5;
  sessionLength = 25;
  timeLeft = sessionLength * 60;
  timerLabelEl.textContent = "Session";
  updateDisplay();
}

document.getElementById("break-decrement").addEventListener("click", () => handleDecrement("break-decrement"));
document.getElementById("session-decrement").addEventListener("click", () => handleDecrement("session-decrement"));
document.getElementById("break-increment").addEventListener("click", () => handleIncrement("break-increment"));
document.getElementById("session-increment").addEventListener("click", () => handleIncrement("session-increment"));
document.getElementById("start_stop").addEventListener("click", toggleTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

updateDisplay();
