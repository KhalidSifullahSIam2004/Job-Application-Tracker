let filterType = "all";

const jobsDiv = document.getElementById("jobsContainer");
const noJobsDiv = document.getElementById("emptyStateSection");
const totalJobs = document.getElementById("totalCount");
const interviewJobs = document.getElementById("interviewCount");
const rejectedJobs = document.getElementById("rejectedCount");
const smallTabText = document.getElementById("tabJobCount");

const allButton = document.getElementById("allFilterButton");
const interviewButton = document.getElementById("interviewFilterButton");
const rejectedButton = document.getElementById("rejectedFilterButton");

function getJobCards() {
    let cards = document.querySelectorAll(".job-card");
    let cardList = [];
    for (let i = 0; i < cards.length; i++) {
        cardList.push(cards[i]);
    }
    return cardList;
}

function getCardBadge(card) {
    let badge = card.querySelector(".space-y-2 button");
    return badge;
}

function getCardStatus(card) {
    let badge = getCardBadge(card);
    if (badge == null) {
        return "not applied";
    }
    let statusText = badge.innerText;
    statusText = statusText.trim();
    statusText = statusText.toLowerCase();
    return statusText;
}

function updateAllNumbers() {
    let allCards = getJobCards();
    let total = allCards.length;
    let interview = 0;
    let rejected = 0;

    for (let i = 0; i < allCards.length; i++) {
        let status = getCardStatus(allCards[i]);
        if (status == "interview") {
            interview = interview + 1;
        }
        if (status == "rejected") {
            rejected = rejected + 1;
        }
    }

    totalJobs.innerText = total;
    interviewJobs.innerText = interview;
    rejectedJobs.innerText = rejected;
}

function makeButtonActive() {
    allButton.classList.remove("bg-blue-500");
    allButton.classList.remove("text-white");
    allButton.classList.add("bg-white");
    allButton.classList.add("text-[#64748b]");

    interviewButton.classList.remove("bg-blue-500");
    interviewButton.classList.remove("text-white");
    interviewButton.classList.add("bg-white");
    interviewButton.classList.add("text-[#64748b]");

    rejectedButton.classList.remove("bg-blue-500");
    rejectedButton.classList.remove("text-white");
    rejectedButton.classList.add("bg-white");
    rejectedButton.classList.add("text-[#64748b]");

    if (filterType == "all") {
        allButton.classList.add("bg-blue-500");
        allButton.classList.add("text-white");
        allButton.classList.remove("bg-white");
        allButton.classList.remove("text-[#64748b]");
    }

    if (filterType == "interview") {
        interviewButton.classList.add("bg-blue-500");
        interviewButton.classList.add("text-white");
        interviewButton.classList.remove("bg-white");
        interviewButton.classList.remove("text-[#64748b]");
    }

    if (filterType == "rejected") {
        rejectedButton.classList.add("bg-blue-500");
        rejectedButton.classList.add("text-white");
        rejectedButton.classList.remove("bg-white");
        rejectedButton.classList.remove("text-[#64748b]");
    }
}

function changeCardBadge(card, newText) {
    let badge = getCardBadge(card);
    if (badge == null) {
        return;
    }

    badge.innerText = newText;

    badge.classList.remove("bg-[#eef4ff]");
    badge.classList.remove("text-[#002c5c]");
    badge.classList.remove("bg-[#ecfdf5]");
    badge.classList.remove("text-[#10b981]");
    badge.classList.remove("bg-[#fef2f2]");
    badge.classList.remove("text-[#ef4444]");

    if (newText == "INTERVIEW") {
        badge.classList.add("bg-[#ecfdf5]");
        badge.classList.add("text-[#10b981]");
    } else if (newText == "REJECTED") {
        badge.classList.add("bg-[#fef2f2]");
        badge.classList.add("text-[#ef4444]");
    } else {
        badge.classList.add("bg-[#eef4ff]");
        badge.classList.add("text-[#002c5c]");
    }
}

function showCardsByFilter() {
    let cards = getJobCards();
    let howManyShow = 0;

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let status = getCardStatus(card);

        if (filterType == "all") {
            card.classList.remove("hidden");
            howManyShow = howManyShow + 1;
        } 
        else if (filterType == "interview") {
            if (status == "interview") {
                card.classList.remove("hidden");
                howManyShow = howManyShow + 1;
            } else {
                card.classList.add("hidden");
            }
        } 
        else if (filterType == "rejected") {
            if (status == "rejected") {
                card.classList.remove("hidden");
                howManyShow = howManyShow + 1;
            } else {
                card.classList.add("hidden");
            }
        }
    }

    if (smallTabText != null) {
        if (filterType == "all") {
            smallTabText.innerText = cards.length + " Jobs";
        } else {
            smallTabText.innerText = howManyShow + " of " + cards.length;
        }
    }

    if (noJobsDiv != null) {
        if (howManyShow == 0) {
            noJobsDiv.classList.remove("hidden");
        } else {
            noJobsDiv.classList.add("hidden");
        }
    }
}

allButton.addEventListener("click", function() {
    filterType = "all";
    makeButtonActive();
    showCardsByFilter();
});

interviewButton.addEventListener("click", function() {
    filterType = "interview";
    makeButtonActive();
    showCardsByFilter();
});

rejectedButton.addEventListener("click", function() {
    filterType = "rejected";
    makeButtonActive();
    showCardsByFilter();
});

jobsDiv.addEventListener("click", function(event) {
    let clickedCard = event.target.closest(".job-card");
    if (clickedCard == null) {
        return;
    }

    let buttonText = "";
    if (event.target.innerText) {
        buttonText = event.target.innerText.trim().toUpperCase();
    }

    if (buttonText == "INTERVIEW") {
        changeCardBadge(clickedCard, "INTERVIEW");
    } else if (buttonText == "REJECTED") {
        changeCardBadge(clickedCard, "REJECTED");
    } else if (event.target.classList.contains("fa-trash-can") || event.target.closest(".fa-trash-can")) {
        clickedCard.remove();
    } else {
        return;
    }

    updateAllNumbers();
    showCardsByFilter();
});

updateAllNumbers();
makeButtonActive();
showCardsByFilter();