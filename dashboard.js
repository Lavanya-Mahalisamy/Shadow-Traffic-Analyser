// ===== 1. Read analysis result and Home input =====
let result = JSON.parse(localStorage.getItem("analysisResult"));
const data = JSON.parse(localStorage.getItem("trafficData"));

// ===== 2. If no analysisResult, calculate based on Home input =====
if(!result && data){
    const networkScore = data.network === "Public Network" ? 5 : data.network === "Mobile Data" ? 3 : 2;
    const activityScore = data.activity === "Unknown Background Activity" ? 6 : data.activity === "Gaming" ? 4 : data.activity === "Streaming" ? 3 : 1;
    const riskValue = networkScore + activityScore;

    const shadowTraffic = riskValue * 100;
    const activeTraffic = networkScore * 20;
    const totalTraffic = shadowTraffic + activeTraffic;
    const riskLevel = riskValue >= 9 ? "HIGH" : riskValue >=6 ? "MEDIUM" : "LOW";

    result = { activeTraffic, shadowTraffic, totalTraffic, riskLevel };
}

// ===== 3. Update dashboard cards =====
if(result){
    document.getElementById("activeTrafficValue").innerText = result.activeTraffic + " Packets";
    document.getElementById("shadowTrafficValue").innerText = result.shadowTraffic + " Packets";
    document.getElementById("totalTrafficValue").innerText = result.totalTraffic + " Packets";
    document.getElementById("deviceStatusValue").innerText = (result.riskLevel==="HIGH") ? "RISKY" : "Normal";

    // Color coding
    const statusCard = document.getElementById("deviceStatusCard");
    if(result.riskLevel === "HIGH") statusCard.classList.add("red");
    else statusCard.classList.add("green");

    const shadowCard = document.getElementById("shadowTrafficCard");
    if(result.shadowTraffic > 80) shadowCard.classList.add("red");
    else if(result.shadowTraffic > 50) shadowCard.classList.add("yellow");
    else shadowCard.classList.add("green");

    const totalCard = document.getElementById("totalTrafficCard");
    if(result.totalTraffic > 100) totalCard.classList.add("red");
    else totalCard.classList.add("green");

    const activeCard = document.getElementById("activeTrafficCard");
    if(result.activeTraffic > 50) activeCard.classList.add("yellow");
    else activeCard.classList.add("green");
}
