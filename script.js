let filter = "all";

const jobsArea = document.getElementById("jobsContainer");
const noJobMessage = document.getElementById("emptyStateSection");
const totalNumber = document.getElementById("totalCount");
const interviewNumber = document.getElementById("interviewCount");
const rejectedNumber = document.getElementById("rejectedCount");
const tabSmallText = document.getElementById("tabJobCount");
const allBtn = document.getElementById("allFilterButton");
const interviewBtn = document.getElementById("interviewFilterButton");
const rejectedBtn = document.getElementById("rejectedFilterButton");


function getCards() {
    const allCards = document.querySelectorAll(".job-card");
    const cardArray = [];
    for (let i = 0; i < allCards.length; i++) {
        cardArray.push(allCards[i]);
    }
    return cardArray;
}

function getBadge(card) {
    const badge = card.querySelector(".space-y-2 button");
    return badge;
}

function checkStatus(card) {
    const badge = getBadge(card)
    if (badge == null) {
        return "not applied";
    }
    let txt = badge.innerText;
    txt = txt.trim();
    txt = txt.toLowerCase();
    return txt;
}

function updateCounts() {
    const cards = getCards();
    const totalCards = cards.length;
    let interviewCount = 0;
    let rejectedCount = 0;

    for (let i = 0; i < cards.length; i++) {
        const st = checkStatus(cards[i]);
        if (st == "interview") {
            interviewCount = interviewCount + 1;
        }
        if (st == "rejected") {
            rejectedCount = rejectedCount + 1;
        }
    }

    totalNumber.innerText = totalCards;
    interviewNumber.innerText = interviewCount;
    rejectedNumber.innerText = rejectedCount;
}

function setActiveBtn() {
    
    allBtn.classList.remove("bg-blue-500");
    allBtn.classList.remove("text-white");
    allBtn.classList.add("bg-white");
    allBtn.classList.add("text-[#64748bFF]");

    interviewBtn.classList.remove("bg-blue-500");
    interviewBtn.classList.remove("text-white");
    interviewBtn.classList.add("bg-white");
    interviewBtn.classList.add("text-[#64748bFF]");

    rejectedBtn.classList.remove("bg-blue-500");
    rejectedBtn.classList.remove("text-white");
    rejectedBtn.classList.add("bg-white");
    rejectedBtn.classList.add("text-[#64748bFF]");

    if (filter == "all") {
        allBtn.classList.add("bg-blue-500");
        allBtn.classList.add("text-white");
        allBtn.classList.remove("bg-white");
        allBtn.classList.remove("text-[#64748bFF]");
    }

    if (filter == "interview") {
        interviewBtn.classList.add("bg-blue-500");
        interviewBtn.classList.add("text-white");
        interviewBtn.classList.remove("bg-white");
        interviewBtn.classList.remove("text-[#64748bFF]");
    }

    if (filter == "rejected") {
        rejectedBtn.classList.add("bg-blue-500");
        rejectedBtn.classList.add("text-white");
        rejectedBtn.classList.remove("bg-white");
        rejectedBtn.classList.remove("text-[#64748bFF]");
    }
}

function changeBadge(card, newStatus) {
    const badge = getBadge(card);
    if (badge == null) return

    badge.innerText = newStatus;

    badge.classList.remove("bg-[#eef4ffFF]");
    badge.classList.remove("text-font-[#002c5cFF]");
    badge.classList.remove("bg-[#ecfdf5]");
    badge.classList.remove("text-[#10b981FF]");
    badge.classList.remove("bg-[#fef2f2]");
    badge.classList.remove("text-[#ef4444FF]");

    if (newStatus == "INTERVIEW") {
        badge.classList.add("bg-[#ecfdf5]");
        badge.classList.add("text-[#10b981FF]");
    } else if (newStatus == "REJECTED") {
        badge.classList.add("bg-[#fef2f2]");
        badge.classList.add("text-[#ef4444FF]");
    } else {
        badge.classList.add("bg-[#eef4ffFF]");
        badge.classList.add("text-font-[#002c5cFF]");
    }
}

function showFilteredCards() {
    const cards = getCards();
    let visible = 0;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const st = checkStatus(card);

        if (filter == "all") {
            card.classList.remove("hidden");
            visible++;
        } else if (filter == "interview") {
            if (st == "interview") {
                card.classList.remove("hidden");
                visible++;
            } else {
                card.classList.add("hidden");
            }
        } else if (filter == "rejected") {
            if (st == "rejected") {
                card.classList.remove("hidden");
                visible++;
            } else {
                card.classList.add("hidden");
            }
        }
    }

    if (tabSmallText) {
        if (filter == "all") {
            tabSmallText.innerText = cards.length + " Jobs";
        } else {
            tabSmallText.innerText = visible + " of " + cards.length;
        }
    }

    if (noJobMessage) {
        if (visible == 0) {
            noJobMessage.classList.remove("hidden");
        } else {
            noJobMessage.classList.add("hidden");
        }
    }
}


allBtn.addEventListener("click", function () {
    filter = "all";
    setActiveBtn();
    showFilteredCards();
})

interviewBtn.addEventListener("click", function () {
    filter = "interview";
    setActiveBtn();
    showFilteredCards();
})

rejectedBtn.addEventListener("click", function () {
    filter = "rejected";
    setActiveBtn();
    showFilteredCards();
})


jobsArea.addEventListener("click", function (e) {
    const card = e.target.closest(".job-card");
    if (card == null) return

    let btnText = "";
    if (e.target.innerText) {
        btnText = e.target.innerText.trim().toUpperCase();;
    }

    if (btnText == "INTERVIEW") {
        changeBadge(card, "INTERVIEW");
    } else if (btnText == "REJECTED") {
        changeBadge(card, "REJECTED");
    } else if (e.target.classList.contains("fa-trash-can")) {
        card.remove();
    } else if (e.target.closest(".fa-trash-can")) {
        card.remove();
    } else {
        return;
    }

    updateCounts();
    showFilteredCards();
})


updateCounts()
setActiveBtn()
showFilteredCards()