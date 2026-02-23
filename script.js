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
  return [...document.querySelectorAll(".job-card")];
}

function updateCounts() {
  const cards = getCards();
  let interview = 0;
  let rejected = 0;

  for (const card of cards) {
    let status = "";
    const statusElement = card.querySelector(".space-y-2 button");
    
    if (statusElement) {
      status = statusElement.innerText.toLowerCase().trim();
    }

    if (status === "interview") {
      interview = interview + 1;
    }
    if (status === "rejected") {
      rejected = rejected + 1;
    }
  }

  totalCount.innerText = cards.length;
  interviewCount.innerText = interview;
  rejectedCount.innerText = rejected;
}

function activateButton() {
  allButton.classList.remove("bg-blue-500", "text-white");
  allButton.classList.add("bg-white", "text-[#64748b]");

  interviewButton.classList.remove("bg-blue-500", "text-white");
  interviewButton.classList.add("bg-white", "text-[#64748b]");

  rejectedButton.classList.remove("bg-blue-500", "text-white");
  rejectedButton.classList.add("bg-white", "text-[#64748b]");

  if (filterType === "all") {
    allButton.classList.add("bg-blue-500", "text-white");
    allButton.classList.remove("bg-white", "text-[#64748b]");
  }
  else if (filterType === "interview") {
    interviewButton.classList.add("bg-blue-500", "text-white");
    interviewButton.classList.remove("bg-white", "text-[#64748b]");
  }
  else if (filterType === "rejected") {
    rejectedButton.classList.add("bg-blue-500", "text-white");
    rejectedButton.classList.remove("bg-white", "text-[#64748b]");
  }
}

function showFiltered() {
  const cards = getCards();
  let shown = 0;

  for (const card of cards) {
    let status = "";
    const statusElement = card.querySelector(".space-y-2 button");
    
    if (statusElement) {
      status = statusElement.innerText.toLowerCase().trim();
    }

    if (filterType === "all" || status === filterType) {
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

allButton.addEventListener("click", function() {
  filterType = "all";
  activateButton();
  showFiltered();
});

interviewButton.addEventListener("click", function() {
  filterType = "interview";
  activateButton();
  showFiltered();
});

rejectedButton.addEventListener("click", function() {
  filterType = "rejected";
  activateButton();
  showFiltered();
});

jobsContainer.addEventListener("click", function(e) {
  const card = e.target.closest(".job-card");
  if (!card) {
    return;
  }

  let text = "";
  if (e.target.innerText) {
    text = e.target.innerText.trim().toLowerCase();
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
  else if (e.target.classList.contains("fa-trash-can")) {
    card.remove();
    updateCounts();
    showFiltered();
  }
});

updateCounts();
activateButton();
showFiltered();
