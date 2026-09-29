// ===== Read saved analysis result =====
const result = JSON.parse(localStorage.getItem("analysisResult"));


// ===== If no result is available =====
if (!result) {

    document.getElementById("activeTrafficValue").innerText =
        "0 Packets";

    document.getElementById("shadowTrafficValue").innerText =
        "0 Packets";

    document.getElementById("totalTrafficValue").innerText =
        "0 Packets";

    document.getElementById("deviceStatusValue").innerText =
        "No Data";

} else {

    // ===== Display values =====

    document.getElementById("activeTrafficValue").innerText =
        result.activeTraffic + " Packets";

    document.getElementById("shadowTrafficValue").innerText =
        result.shadowTraffic + " Packets";

    document.getElementById("totalTrafficValue").innerText =
        result.totalTraffic + " Packets";


    // ===== Device Status =====

    if (result.riskLevel === "HIGH") {

        document.getElementById("deviceStatusValue").innerText =
            "RISKY";

    } else if (result.riskLevel === "MEDIUM") {

        document.getElementById("deviceStatusValue").innerText =
            "WARNING";

    } else {

        document.getElementById("deviceStatusValue").innerText =
            "NORMAL";

    }


    // ===== Card references =====

    const activeCard =
        document.getElementById("activeTrafficCard");

    const shadowCard =
        document.getElementById("shadowTrafficCard");

    const totalCard =
        document.getElementById("totalTrafficCard");

    const statusCard =
        document.getElementById("deviceStatusCard");


    // ===== Remove old colours =====

    activeCard.classList.remove("green", "yellow", "red");

    shadowCard.classList.remove("green", "yellow", "red");

    totalCard.classList.remove("green", "yellow", "red");

    statusCard.classList.remove("green", "yellow", "red");


    // ===== Active Traffic colour =====

    if (result.activeTraffic > 50) {

        activeCard.classList.add("yellow");

    } else {

        activeCard.classList.add("green");

    }


    // ===== Shadow Traffic colour =====

    if (result.shadowTraffic > 80) {

        shadowCard.classList.add("red");

    } else if (result.shadowTraffic > 50) {

        shadowCard.classList.add("yellow");

    } else {

        shadowCard.classList.add("green");

    }


    // ===== Total Traffic colour =====

    if (result.totalTraffic > 100) {

        totalCard.classList.add("red");

    } else {

        totalCard.classList.add("green");

    }


    // ===== Device Status colour =====

    if (result.riskLevel === "HIGH") {

        statusCard.classList.add("red");

    } else if (result.riskLevel === "MEDIUM") {

        statusCard.classList.add("yellow");

    } else {

        statusCard.classList.add("green");

    }

}
