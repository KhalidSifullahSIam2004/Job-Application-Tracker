let activeFilter = "all";

const jobsContainer = document.getElementById("jobsContainer");
const emptyStateSection = document.getElementById("emptyStateSection");

const totalCountText = document.getElementById("totalCount");
const interviewCountText = document.getElementById("interviewCount");
const rejectedCountText = document.getElementById("rejectedCount");
const tabJobCountText = document.getElementById("tabJobCount");
const emptyStateTitle = document.getElementById("emptyStateTitle");
const emptyStateText = document.getElementById("emptyStateText");

const allFilterButton = document.getElementById("allFilterButton");
const interviewFilterButton = document.getElementById("interviewFilterButton");
const rejectedFilterButton = document.getElementById("rejectedFilterButton");

function getAllCards() {
  return Array.from(document.querySelectorAll(".job-card"));
}

function getStatusBadge(card) {
  return card.querySelector(".space-y-2 button");
}

function getStatusText(card) {
  const badge = getStatusBadge(card);
  return badge ? badge.innerText.trim().toLowerCase() : "not applied";
}

function updateCounts() {
  const cards = getAllCards();
  const interviewCount = cards.filter((card) => getStatusText(card) === "interview").length;
  const rejectedCount = cards.filter((card) => getStatusText(card) === "rejected").length;

  totalCountText.innerText = cards.length;
  interviewCountText.innerText = interviewCount;
  rejectedCountText.innerText = rejectedCount;
}

function updateFilterButtonStyle() {
  [allFilterButton, interviewFilterButton, rejectedFilterButton].forEach((btn) => {
    btn.classList.remove("bg-blue-500", "text-white");
    btn.classList.add("bg-white", "text-[#64748bFF]");
  });

  if (activeFilter === "all") {
    allFilterButton.classList.remove("bg-white", "text-[#64748bFF]");
    allFilterButton.classList.add("bg-blue-500", "text-white");
  }

  if (activeFilter === "interview") {
    interviewFilterButton.classList.remove("bg-white", "text-[#64748bFF]");
    interviewFilterButton.classList.add("bg-blue-500", "text-white");
  }

  if (activeFilter === "rejected") {
    rejectedFilterButton.classList.remove("bg-white", "text-[#64748bFF]");
    rejectedFilterButton.classList.add("bg-blue-500", "text-white");
  }
}

function setStatusText(card, newStatus) {
  const badge = getStatusBadge(card);
  if (!badge) return;

  badge.innerText = newStatus;
  badge.classList.remove("bg-[#eef4ffFF]", "text-font-[#002c5cFF]", "bg-[#ecfdf5]", "text-[#10b981FF]", "bg-[#fef2f2]", "text-[#ef4444FF]");

  if (newStatus === "INTERVIEW") {
    badge.classList.add("bg-[#ecfdf5]", "text-[#10b981FF]");
  } else if (newStatus === "REJECTED") {
    badge.classList.add("bg-[#fef2f2]", "text-[#ef4444FF]");
  } else {
    badge.classList.add("bg-[#eef4ffFF]", "text-font-[#002c5cFF]");
  }
}

function applyFilter() {
  const cards = getAllCards();
  let visibleCount = 0;

  cards.forEach((card) => {
    const status = getStatusText(card);
    const shouldShow =
      activeFilter === "all" ||
      (activeFilter === "interview" && status === "interview") ||
      (activeFilter === "rejected" && status === "rejected");

    card.classList.toggle("hidden", !shouldShow);
    if (shouldShow) visibleCount += 1;
  });

  if (tabJobCountText) {
    tabJobCountText.innerText =
      activeFilter === "all" ? `${cards.length} Jobs` : `${visibleCount} of ${cards.length}`;
  }

  if (emptyStateTitle && emptyStateText) {
    if (activeFilter === "interview") {
      emptyStateTitle.innerText = "No Interview Jobs";
      emptyStateText.innerText = "No jobs are marked as interview right now.";
    } else if (activeFilter === "rejected") {
      emptyStateTitle.innerText = "No Rejected Jobs";
      emptyStateText.innerText = "No jobs are marked as rejected right now.";
    } else {
      emptyStateTitle.innerText = "No Jobs Found";
      emptyStateText.innerText = "Please choose another filter or update a job status.";
    }
  }

  if (emptyStateSection) {
    emptyStateSection.classList.toggle("hidden", visibleCount > 0);
  }
}

allFilterButton.addEventListener("click", () => {
  activeFilter = "all";
  updateFilterButtonStyle();
  applyFilter();
});

interviewFilterButton.addEventListener("click", () => {
  activeFilter = "interview";
  updateFilterButtonStyle();
  applyFilter();
});

rejectedFilterButton.addEventListener("click", () => {
  activeFilter = "rejected";
  updateFilterButtonStyle();
  applyFilter();
});

jobsContainer.addEventListener("click", (event) => {
  const card = event.target.closest(".job-card");
  if (!card) return;

  const clickedText = event.target.innerText ? event.target.innerText.trim().toUpperCase() : "";
  const clickedTrash = event.target.classList.contains("fa-trash-can") || event.target.closest(".fa-trash-can");

  if (clickedText === "INTERVIEW") {
    setStatusText(card, "INTERVIEW");
  } else if (clickedText === "REJECTED") {
    setStatusText(card, "REJECTED");
  } else if (clickedTrash) {
    card.remove();
  } else {
    return;
  }

  updateCounts();
  applyFilter();
});

updateCounts();
updateFilterButtonStyle();
applyFilter();
