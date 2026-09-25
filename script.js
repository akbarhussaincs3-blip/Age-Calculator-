let birthDate;
let timer;

function calculateAge() {
  let dateInput = document.getElementById("birthDate").value;

  if (!dateInput) {
    document.getElementById("result").innerHTML =
      "⚠️ Please enter your Date of Birth.";
    return;
  }

  let parts = dateInput.split("/");

  if (
    parts.length !== 3 ||
    isNaN(parts[0]) ||
    isNaN(parts[1]) ||
    isNaN(parts[2]) ||
    parts[0] < 1 ||
    parts[0] > 31 ||
    parts[1] < 1 ||
    parts[1] > 12
  ) {
    document.getElementById("result").innerHTML =
      "⚠️ Please enter a valid date.";
    return;
  }

  let checkDate = new Date(
    Number(parts[2]),
    Number(parts[1]) - 1,
    Number(parts[0])
  );

  if (
    checkDate.getFullYear() != Number(parts[2]) ||
    checkDate.getMonth() != Number(parts[1]) - 1 ||
    checkDate.getDate() != Number(parts[0])
  ) {
    document.getElementById("result").innerHTML =
      "⚠️ Please enter a real date.";
    return;
  }

  let birthTime = document.getElementById("birthTime").value;

  if (!birthTime) {
    document.getElementById("result").innerHTML =
      "⚠️ Please enter your birth time.";
    return;
  }

  let timeParts = birthTime.split(":");

  birthDate = new Date(
    Number(parts[2]),
    Number(parts[1]) - 1,
    Number(parts[0]),
    Number(timeParts[0]),
    Number(timeParts[1])
  );

  let now = new Date();

  if (birthDate > now) {
    document.getElementById("result").innerHTML =
      "⚠️ Please enter a valid past date and time.";
    return;
  }

  clearInterval(timer);

  updateAge();

  timer = setInterval(updateAge, 1000);
}

function updateAge() {
  let today = new Date();

  let years =
    today.getFullYear() - birthDate.getFullYear();

  let month =
    today.getMonth() - birthDate.getMonth();

  let days =
    today.getDate() - birthDate.getDate();
    
  let weeks = Math.floor(days / 7);

  if (days < 0) {
    month--;

    days += new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
  }

  if (month < 0) {
    years--;
    month += 12;
  }

  let difference = today - birthDate;

  let totalSeconds = Math.floor(difference / 1000);

  let hours =
    Math.floor(totalSeconds / 3600) % 24;

  let minutes =
    Math.floor(totalSeconds / 60) % 60;

  let seconds =
    totalSeconds % 60;

  document.getElementById("result").innerHTML =
    "<div><h2>" + years + "</h2><p>🎂 Years</p></div>" +
    "<div><h2>" + month + "</h2><p>📆 Months</p></div>" +
    "<div>" +
  "<h2>" + weeks + "</h2>" +
  "<p>🗓️ Weeks</p>" +
"</div>" +
    "<div><h2>" + days + "</h2><p>🌞 Days</p></div>" +
    "<div><h2>" + hours + "</h2><p>⏰ Hours</p></div>" +
    "<div><h2>" + minutes + "</h2><p>⏱️ Minutes</p></div>" +
    "<div><h2>" + seconds + "</h2><p>⚡ Seconds</p></div>";

  let nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday <= today) {
    nextBirthday.setFullYear(
      today.getFullYear() + 1
    );
  }

  let birthdayDifference =
    nextBirthday - today;

  let birthdayDays = Math.ceil(
    birthdayDifference /
    (1000 * 60 * 60 * 24)
  );

  if (
    today.getMonth() === birthDate.getMonth() &&
    today.getDate() === birthDate.getDate()
  ) {
    document.getElementById("birthday").innerHTML =
      "🎉 Happy Birthday! 🎂";
  } else {
    document.getElementById("birthday").innerHTML =
      "🎂 Next Birthday: " +
      birthdayDays +
      " days remaining";
  }

  let totalMilliseconds = today - birthDate;

  let totalSecondsExact =
    Math.floor(totalMilliseconds / 1000);

  let totalMinutes =
    Math.floor(totalSecondsExact / 60);

  let totalHours =
    Math.floor(totalSecondsExact / 3600);

  let totalDays =
    Math.floor(totalSecondsExact / 86400);

  let totalWeeks =
    Math.floor(totalDays / 7);

  let totalMonths =
    years * 12 + month;

  document.getElementById("totalAge").innerHTML =
    "<h3>Your Age In Total</h3>" +

    "<div><strong>" + totalMonths +
    "</strong><p>📆 Months</p></div>" +

    "<div><strong>" + totalWeeks +
    "</strong><p>🗓️ Weeks</p></div>" +

    "<div><strong>" + totalDays +
    "</strong><p>🌞 Days</p></div>" +

    "<div><strong>" + totalHours +
    "</strong><p>⏰ Hours</p></div>" +

    "<div><strong>" + totalMinutes +
    "</strong><p>⏱️ Minutes</p></div>" +

    "<div><strong>" + totalSecondsExact +
    "</strong><p>⚡ Seconds</p></div>";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function resetCalculator() {
  document.getElementById("birthDate").value = "";
  document.getElementById("birthTime").value = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("birthday").innerHTML = "";
  document.getElementById("totalAge").innerHTML = "";

  clearInterval(timer);

  birthDate = null;
}

const birthDateInput =
  document.getElementById("birthDate");

birthDateInput.addEventListener(
  "input",
  function () {
    let value =
      this.value.replace(/\D/g, "");

    if (value.length > 8) {
      value = value.substring(0, 8);
    }

    if (value.length > 4) {
      value =
        value.substring(0, 2) +
        "/" +
        value.substring(2, 4) +
        "/" +
        value.substring(4);
    } else if (value.length > 2) {
      value =
        value.substring(0, 2) +
        "/" +
        value.substring(2);
    }

    this.value = value;
  }
);

function shareResult() {
  let dateInput =
    document.getElementById("birthDate").value;

  let timeInput =
    document.getElementById("birthTime").value;

  if (!dateInput) {
    alert(
      "⚠️ Please enter your Date of Birth first."
    );
    return;
  }

  if (!timeInput) {
    alert(
      "⚠️ Please enter your Time of Birth first."
    );
    return;
  }

  if (
    !birthDate ||
    !document
      .getElementById("totalAge")
      .innerText
      .trim()
  ) {
    alert(
      "⚠️ Please calculate your age first."
    );
    return;
  }

  let shareText =
    "🎂 My Age Calculator Result\n\n" +
    document.getElementById("result").innerText +
    "\n\n" +
    document.getElementById("birthday").innerText +
    "\n\n" +
    document.getElementById("totalAge").innerText;

  if (navigator.share) {
    navigator.share({
      title: "My Age Calculator Result",
      text: shareText
    });
  } else {
    navigator.clipboard.writeText(shareText);

    alert(
      "✅ Result copied successfully!"
    );
  }
}