let filterType = "all";

const jobsContainer = document.getElementById("jobsContainer");
const noJobs = document.getElementById("emptyStateSection");
const totalCount = document.getElementById("totalCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const tabCount = document.getElementById("tabJobCount");

const allButton = document.getElementById("allFilterButton");
const interviewButton = document.getElementById("interviewFilterButton");
const rejectedButton = document.getElementById("rejectedFilterButton");

function getCards() {
  const nodeList = document.querySelectorAll(".job-card");
  const cards = [];

  for (const card of nodeList) {
    cards.push(card);
  }

  return cards;
}

function getCardStatus(card) {
  const statusButton = card.querySelector(".space-y-2 button");

  if (!statusButton) {
    return "";
  }

  return statusButton.innerText.toLowerCase().trim();
}

function updateCounts() {
  const cards = getCards();
  let interview = 0;
  let rejected = 0;

  for (const card of cards) {
    const status = getCardStatus(card);

    if (status === "interview") {
      interview = interview + 1;
    } else if (status === "rejected") {
      rejected = rejected + 1;
    }
  }

  totalCount.innerText = cards.length;
  interviewCount.innerText = interview;
  rejectedCount.innerText = rejected;
}

function setInactive(button) {
  button.classList.remove("bg-blue-500", "text-white");
  button.classList.add("bg-white", "text-[#64748b]");
}

function setActive(button) {
  button.classList.add("bg-blue-500", "text-white");
  button.classList.remove("bg-white", "text-[#64748b]");
}

function activateButton() {
  setInactive(allButton);
  setInactive(interviewButton);
  setInactive(rejectedButton);

  if (filterType === "all") {
    setActive(allButton);
  }
  else if (filterType === "interview") {
    setActive(interviewButton);
  }
  else if (filterType === "rejected") {
    setActive(rejectedButton);
  }
}

function showFiltered() {
  const cards = getCards();
  let shown = 0;

  for (const card of cards) {
    const status = getCardStatus(card);

    if (filterType === "all") {
      card.classList.remove("hidden");
      shown = shown + 1;
    } 
    else if (status === filterType) {
      card.classList.remove("hidden");
      shown = shown + 1;
    }
    else {
      card.classList.add("hidden");
    }
  }

  if (filterType === "all") {
    tabCount.innerText = cards.length + " Jobs";
  }
  else {
    tabCount.innerText = shown + " of " + cards.length;
  }

  if (shown > 0) {
    noJobs.classList.add("hidden");
  }
  else {
    noJobs.classList.remove("hidden");
  }
}

function changeStatus(card, newStatus) {
  const badge = card.querySelector(".space-y-2 button");

  if (!badge) {
    return;
  }

  badge.innerText = newStatus.toUpperCase();

  badge.classList.remove("bg-[#eef4ff]", "text-[#002c5c]");
  badge.classList.remove("bg-[#ecfdf5]", "text-[#10b981]");
  badge.classList.remove("bg-[#fef2f2]", "text-[#ef4444]");

  if (newStatus === "interview") {
    badge.classList.add("bg-[#ecfdf5]", "text-[#10b981]");
  }
  else if (newStatus === "rejected") {
    badge.classList.add("bg-[#fef2f2]", "text-[#ef4444]");
  }
  else {
    badge.classList.add("bg-[#eef4ff]", "text-[#002c5c]");
  }
}

allButton.addEventListener("click", function () {
  filterType = "all";
  activateButton();
  showFiltered();
});

interviewButton.addEventListener("click", function () {
  filterType = "interview";
  activateButton();
  showFiltered();
});

rejectedButton.addEventListener("click", function () {
  filterType = "rejected";
  activateButton();
  showFiltered();
});

jobsContainer.addEventListener("click", function (event) {
  const target = event.target;
  const card = target.closest(".job-card");

  if (!card) {
    return;
  }

  let text = "";
  if (target.innerText) {
    text = target.innerText.trim().toLowerCase();
  }

  if (text === "interview") {
    changeStatus(card, "interview");
    updateCounts();
    showFiltered();
  }
  else if (text === "rejected") {
    changeStatus(card, "rejected");
    updateCounts();
    showFiltered();
  }
  else if (target.classList.contains("fa-trash-can")) {
    card.remove();
    updateCounts();
    showFiltered();
  }
});

updateCounts();
activateButton();
showFiltered();
