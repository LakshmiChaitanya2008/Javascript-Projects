const timerContainer = document.querySelector(".countdown-timer");
const title = document.querySelector(".title");
class App {
  constructor() {
    setInterval(() => {
      const time = this.getTime();

      this.updateUI(time.days, time.min, time.hours, time.sec);
    }, 100);
  }

  updateUI(days, minutes, hours, seconds) {
    if (days === 0) {
      title.textContent = "Happy New Year 🎉";
    }

    timerContainer.innerHTML = "";
    const markup = `
    <div class="count-down">
        <div class="timer">
          <h2 class="days">${days}</h2>
          <small>Days</small>
        </div>
        <div class="timer">
          <h2 class="hours">${hours}</h2>
          <small>Hours</small>
        </div>
        <div class="timer">
          <h2 class="minutes">${minutes}</h2>
          <small>Minutes</small>
        </div>
        <div class="timer">
          <h2 class="seconds">${seconds}</h2>
          <small>Seconds</small>
        </div>
    `;

    timerContainer.insertAdjacentHTML("afterbegin", markup);
  }

  getTime() {
    const currentTime = new Date().getTime();
    const targetTime = new Date(
      `January 1, ${new Date().getFullYear() + 1} 00:00:00`
    ).getTime();

    const time = targetTime - currentTime;

    return {
      days: Math.floor(time / (1000 * 60 * 60 * 24)),
      hours: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      min: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
      sec: Math.floor((time % (1000 * 60)) / 1000),
    };
  }
}

const timer = new App();
