let allInsights = []; // Store all insights globally

async function fetchInsights() {
    try {
        const response = await fetch("http://127.0.0.1:8000/insights");
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging log
        allInsights = data.insights; // Store all insights
        displayInsights(allInsights); // Display all insights initially
        setupSearch(); // Set up search functionality
        displayOrdersSummary(allInsights); // Display orders summary
    } catch (error) {
        console.error("Error fetching insights:", error); // Debugging log
    }
}

function displayInsights(insights) {
    console.log("Displaying insights:", insights); // Debugging log

    const allReservationsContainer = document.getElementById("all-reservations");
    const vipGuestsContainer = document.getElementById("vip-guests");
    const dietaryRestrictionsContainer = document.getElementById("dietary-restrictions");
    const specialOccasionsContainer = document.getElementById("special-occasions");

    // Clear all sections
    allReservationsContainer.innerHTML = "";
    vipGuestsContainer.innerHTML = "";
    dietaryRestrictionsContainer.innerHTML = "";
    specialOccasionsContainer.innerHTML = "";

    // Display insights in each section
    insights.forEach(insight => {
        const card = document.createElement("div");
        card.className = "insight-card fade-in";

        // Add color-coded borders
        if (insight.special_occasions.some(occasion => occasion.toLowerCase().includes("vip"))) {
            card.classList.add("vip");
        }
        if (insight.dietary_restrictions.length > 0) {
            card.classList.add("dietary-restriction");
        }
        if (insight.special_occasions.length > 0) {
            card.classList.add("special-occasion");
        }

        card.innerHTML = `
            <h3>${insight.name}</h3>
            <p><strong>Reservation:</strong> ${insight.reservation_time}</p>
            <p><strong>Dietary Restrictions:</strong> ${insight.dietary_restrictions.join(", ")}</p>
            <p><strong>Special Occasions:</strong> ${insight.special_occasions.join(", ")}</p>
            <p><strong>Notes:</strong> ${insight.notes}</p>
        `;

        allReservationsContainer.appendChild(card);

        // Add to VIP Guests section
        if (insight.special_occasions.some(occasion => occasion.toLowerCase().includes("vip"))) {
            const vipCard = card.cloneNode(true);
            vipGuestsContainer.appendChild(vipCard);
        }

        // Add to Dietary Restrictions section
        if (insight.dietary_restrictions.length > 0) {
            const dietaryCard = card.cloneNode(true);
            dietaryRestrictionsContainer.appendChild(dietaryCard);
        }

        // Add to Special Occasions section
        if (insight.special_occasions.length > 0) {
            const occasionCard = card.cloneNode(true);
            specialOccasionsContainer.appendChild(occasionCard);
        }
    });
}

function setupSearch() {
    const searchInput = document.getElementById("search");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();

        // Check if the query is a date (YYYY-MM-DD format)
        const isDateQuery = /^\d{4}-\d{2}-\d{2}$/.test(query);

        const filteredInsights = allInsights.filter(insight => {
            // Search by name, dietary restrictions, or special occasions
            const matchesText =
                insight.name?.toLowerCase().includes(query) ||
                insight.dietary_restrictions?.some(tag => tag.toLowerCase().includes(query)) ||
                insight.special_occasions?.some(occasion => occasion.toLowerCase().includes(query));

            // Search by date (if the query is a valid date)
            const matchesDate = isDateQuery && insight.reservation_time?.includes(query);

            return matchesText || matchesDate;
        });

        displayInsights(filteredInsights); // Display filtered insights
    });
}

function filterByDate() {
    const dateInput = document.getElementById("date-search");
    const selectedDate = dateInput.value;

    if (!selectedDate) {
        displayInsights(allInsights); // Show all insights if no date is selected
        return;
    }

    const filteredInsights = allInsights.filter(insight =>
        insight.reservation_time.includes(selectedDate)
    );

    displayInsights(filteredInsights);
}

function displayOrdersSummary(insights) {
    const ordersSummaryContainer = document.getElementById("orders-summary");
    ordersSummaryContainer.innerHTML = "";

    const ordersSummary = {};
    const guestInsights = [];

    insights.forEach(insight => {
        // Aggregate orders
        insight.orders.forEach(order => {
            if (!ordersSummary[order.item]) {
                ordersSummary[order.item] = 0;
            }
            ordersSummary[order.item] += order.quantity || 1; // Use quantity if available
        });

        // Generate guest insights
        const guestInsight = {
            name: insight.name,
            preferences: getShortPreferences(insight),
            thingsToNote: getThingsToNote(insight),
            uniqueInsights: generateUniqueInsights(insight) // LLM-generated insights
        };
        guestInsights.push(guestInsight);
    });

    // Display orders summary
    const summaryCard = document.createElement("div");
    summaryCard.className = "insight-card";

    let summaryHTML = "<h3 class='orders-summary-heading'>Orders Summary</h3>";
    for (const [item, count] of Object.entries(ordersSummary)) {
        summaryHTML += `<p class="orders-summary-item"><strong>${item}:</strong> ${count}</p>`;
    }

    // Display guest insights
    summaryHTML += "<h3 class='guest-insights-heading'>Guest Insights</h3>";
    guestInsights.forEach(guest => {
        summaryHTML += `
            <div class="guest-insight">
                <strong>${guest.name}</strong>
                <p>Preferences: ${guest.preferences}</p>
                <p>Things to Note: ${guest.thingsToNote}</p>
                <p>Unique Insights: ${guest.uniqueInsights}</p>
            </div>
        `;
    });

    summaryCard.innerHTML = summaryHTML;
    ordersSummaryContainer.appendChild(summaryCard);
}

function getShortPreferences(insight) {
    const preferences = [];
    if (insight.dietary_restrictions.length > 0) {
        preferences.push(`Dietary: ${insight.dietary_restrictions.join(", ")}`);
    }
    if (insight.special_occasions.length > 0) {
        preferences.push(`Special: ${insight.special_occasions.join(", ")}`);
    }
    return preferences.length > 0 ? preferences.join(" | ") : "None";
}

function getThingsToNote(insight) {
    const thingsToNote = [];
    if (insight.dietary_restrictions.length > 0) {
        thingsToNote.push(`Ensure ${insight.dietary_restrictions.join(", ")} options are available.`);
    }
    if (insight.special_occasions.length > 0) {
        thingsToNote.push(`Acknowledge ${insight.special_occasions.join(", ")}.`);
    }
    return thingsToNote.length > 0 ? thingsToNote.join(" ") : "None";
}

function generateUniqueInsights(insight) {
    // Simulate LLM-generated insights (replace with actual OpenAI API call if needed)
    const uniqueInsights = [];
    if (insight.notes.length > 0) {
        uniqueInsights.push(`Loves: ${insight.notes[0].split(".")[0]}.`); // Use the first sentence of notes
    }
    if (insight.special_occasions.length > 0) {
        uniqueInsights.push(`Celebrating: ${insight.special_occasions.join(", ")}.`);
    }
    return uniqueInsights.length > 0 ? uniqueInsights.join(" ") : "No unique insights";
}

function filterByDate() {
    const dateInput = document.getElementById("date-search");
    const selectedDate = dateInput.value;

    if (!selectedDate) {
        displayInsights(allInsights); // Show all insights if no date is selected
        return;
    }

    // Filter insights by the selected date
    const filteredInsights = allInsights.filter(insight =>
        insight.reservation_time === selectedDate
    );

    console.log("Filtered Insights by Date:", filteredInsights); // Debugging log
    displayInsights(filteredInsights);
}

function showTab(tabId) {
    console.log("Showing tab:", tabId); // Debugging log

    // Hide all tab contents
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.style.display = "none";
    });

    // Show the selected tab content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = "flex";
    } else {
        console.error("Tab not found:", tabId); // Debugging log
    }

    // Update active tab
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });
    const activeTab = document.querySelector(`[onclick="showTab('${tabId}')"]`);
    if (activeTab) {
        activeTab.classList.add("active");
    } else {
        console.error("Active tab not found:", tabId); // Debugging log
    }
}

fetchInsights();