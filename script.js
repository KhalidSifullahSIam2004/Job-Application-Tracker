let currentFilter = "all";

const jobsArea = document.getElementById("jobsContainer");
const noJobMessage = document.getElementById("emptyStateSection");

const totalNumber = document.getElementById("totalCount");
const interviewNumber = document.getElementById("interviewCount");
const rejectedNumber = document.getElementById("rejectedCount");
const tabSmallText = document.getElementById("tabJobCount");

const allBtn = document.getElementById("allFilterButton");
const interviewBtn = document.getElementById("interviewFilterButton");
const rejectedBtn = document.getElementById("rejectedFilterButton");

function getAllJobCards() {
    return Array.from(document.querySelectorAll(".job-card"));
}

function findStatusBadge(card) {
    return card.querySelector(".space-y-2 button");
}

function getJobStatus(card) {
    const badge = findStatusBadge(card);
    if (!badge) return "not applied";
    return badge.innerText.trim().toLowerCase();
}

function updateJobCounts() {
    const cards = getAllJobCards();
    let interviewCount = 0;
    let rejectedCount = 0;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const status = getJobStatus(card);

        if (status === "interview") interviewCount++;
        if (status === "rejected") rejectedCount++;
    }

    totalNumber.innerText = cards.length;
    interviewNumber.innerText = interviewCount;
    rejectedNumber.innerText = rejectedCount;
}

function highlightActiveFilter() {
    allBtn.classList.remove("bg-blue-500", "text-white");
    allBtn.classList.add("bg-white", "text-[#64748bFF]");

    interviewBtn.classList.remove("bg-blue-500", "text-white");
    interviewBtn.classList.add("bg-white", "text-[#64748bFF]");

    rejectedBtn.classList.remove("bg-blue-500", "text-white");
    rejectedBtn.classList.add("bg-white", "text-[#64748bFF]");

    if (currentFilter === "all") {
        allBtn.classList.remove("bg-white", "text-[#64748bFF]");
        allBtn.classList.add("bg-blue-500", "text-white");
    }
    else if (currentFilter === "interview") {
        interviewBtn.classList.remove("bg-white", "text-[#64748bFF]");
        interviewBtn.classList.add("bg-blue-500", "text-white");
    }
    else if (currentFilter === "rejected") {
        rejectedBtn.classList.remove("bg-white", "text-[#64748bFF]");
        rejectedBtn.classList.add("bg-blue-500", "text-white");
    }
}

function updateJobStatus(card, newStatus) {
    const badge = findStatusBadge(card);
    if (!badge) return;

    badge.innerText = newStatus;

    badge.classList.remove(
        "bg-[#eef4ffFF]", "text-font-[#002c5cFF]",
        "bg-[#ecfdf5]", "text-[#10b981FF]",
        "bg-[#fef2f2]", "text-[#ef4444FF]"
    );

    if (newStatus === "INTERVIEW") {
        badge.classList.add("bg-[#ecfdf5]", "text-[#10b981FF]");
    }
    else if (newStatus === "REJECTED") {
        badge.classList.add("bg-[#fef2f2]", "text-[#ef4444FF]");
    }
    else {
        badge.classList.add("bg-[#eef4ffFF]", "text-font-[#002c5cFF]");
    }
}

function applyCurrentFilter() {
    const cards = getAllJobCards();
    let visibleCount = 0;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const status = getJobStatus(card);

        let shouldShow = false;

        if (currentFilter === "all") {
            shouldShow = true;
        }
        else if (currentFilter === "interview" && status === "interview") {
            shouldShow = true;
        }
        else if (currentFilter === "rejected" && status === "rejected") {
            shouldShow = true;
        }

        if (shouldShow) {
            card.classList.remove("hidden");
            visibleCount++;
        } else {
            card.classList.add("hidden");
        }
    }

    if (tabSmallText) {
        if (currentFilter === "all") {
            tabSmallText.innerText = cards.length + " Jobs";
        } else {
            tabSmallText.innerText = visibleCount + " of " + cards.length;
        }
    }

    if (noJobMessage) {
        if (visibleCount === 0) {
            noJobMessage.classList.remove("hidden");
        } else {
            noJobMessage.classList.add("hidden");
        }
    }
}

allBtn.addEventListener("click", function () {
    currentFilter = "all";
    highlightActiveFilter();
    applyCurrentFilter();
});

interviewBtn.addEventListener("click", function () {
    currentFilter = "interview";
    highlightActiveFilter();
    applyCurrentFilter();
});

rejectedBtn.addEventListener("click", function () {
    currentFilter = "rejected";
    highlightActiveFilter();
    applyCurrentFilter();
});

jobsArea.addEventListener("click", function (event) {
    const clickedCard = event.target.closest(".job-card");
    if (!clickedCard) return;

    const clickedText = event.target.innerText ? event.target.innerText.trim().toUpperCase() : "";

    if (clickedText === "INTERVIEW") {
        updateJobStatus(clickedCard, "INTERVIEW");
    }
    else if (clickedText === "REJECTED") {
        updateJobStatus(clickedCard, "REJECTED");
    }
    else if (event.target.classList.contains("fa-trash-can") || 
             event.target.closest(".fa-trash-can")) {
        clickedCard.remove();
    }
    else {
        return;
    }

    updateJobCounts();
    applyCurrentFilter();
});

updateJobCounts();
highlightActiveFilter();
applyCurrentFilter();