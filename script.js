// ===== 1. Read input from Home page =====
const data = JSON.parse(localStorage.getItem("trafficData"));

if (!data) {
    document.getElementById("resultText").innerText =
        "No input data found. Please go to Home page and start analysis.";
} else {

    // ===== 2. Encode input into internal scores =====
    let networkScore = 0;
    let activityScore = 0;

    if (data.network === "Public Network") networkScore = 5;
    else if (data.network === "Mobile Data") networkScore = 3;
    else networkScore = 2;

    if (data.activity === "Unknown Background Activity") activityScore = 6;
    else if (data.activity === "Gaming") activityScore = 4;
    else if (data.activity === "Streaming") activityScore = 3;
    else activityScore = 1;

    // ===== 3. Risk calculation =====
    const riskValue = networkScore + activityScore;

    let riskLevel = "LOW";
    let lineColor = "#4caf50";

    if (riskValue >= 9) {
        riskLevel = "HIGH";
        lineColor = "#ff1744";
    } else if (riskValue >= 6) {
        riskLevel = "MEDIUM";
        lineColor = "#ff9800";
    }

    // ===== 4. HIGH RISK ALERT =====
    const riskAlertDiv = document.getElementById("riskAlert");
    if (riskLevel === "HIGH") {
        riskAlertDiv.style.display = "block";
        alert("⚠️ HIGH SHADOW TRAFFIC DETECTED!");
    }

    // ===== 5. Show textual analysis =====
    document.getElementById("resultText").innerText =
        `Based on ${data.activity} activity over ${data.network}, the system detected a ${riskLevel} level shadow traffic risk.`;

    // ===== 6. Dynamic chart data =====
    const chartData = [
        10, 15, 25, riskValue*8, riskValue*12, riskValue*15
    ];

    // ===== 7. Draw line chart with tooltip =====
    new Chart(document.getElementById("trafficChart"), {
        type: "line",
        data: {
            labels: ["10AM","11AM","12PM","1PM","2PM","3PM"],
            datasets: [{
                label: "Shadow Traffic Estimation",
                data: chartData,
                borderColor: lineColor,
                backgroundColor: "transparent",
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y * 10 + " packets";
                        }
                    }
                }
            }
        }
    });

    // ===== 8. Traffic progress bars =====
    const trafficBarsDiv = document.getElementById("trafficBars");
    trafficBarsDiv.innerHTML = "";

    chartData.forEach((val, idx) => {
        const container = document.createElement("div");
        container.classList.add("bar-container");

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.width = (val*2) + "%";
        bar.innerText = val*10 + " pkts";

        container.appendChild(bar);
        trafficBarsDiv.appendChild(container);
    });

    // ===== 9. Total traffic mini card =====
    const totalTraffic = chartData.reduce((sum, val) => sum + val*10, 0);
    const totalTrafficValue = document.getElementById("totalTrafficValue");
    totalTrafficValue.innerText = totalTraffic + " packets";

    const totalCard = document.getElementById("totalTrafficCard");
    if (riskLevel === "HIGH") totalCard.classList.add("high-risk");
    else if (riskLevel === "MEDIUM") totalCard.style.borderLeft = "5px solid #ff9800";
    else totalCard.style.borderLeft = "5px solid #4caf50";

    // ===== 10. Suggested solutions =====
    const solutionDiv = document.getElementById("trafficSolution");
    const solutionList = document.getElementById("solutionList");
    solutionList.innerHTML = "";

    if(riskLevel === "HIGH") {
        solutionDiv.style.display = "block";

        const suggestions = [
            "Switch to a private network or secure Wi-Fi.",
            "Close unnecessary background applications.",
            "Limit high-bandwidth activities like streaming or gaming.",
            "Restart your device to clear temporary connections."
        ];

        suggestions.forEach(sol => {
            const li = document.createElement("li");
            li.innerText = sol;
            solutionList.appendChild(li);
        });
    }
}
