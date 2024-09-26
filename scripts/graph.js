const StrokeGraph = document.getElementById("StrokeGraph");
const SpeedGraph = document.getElementById("SpeedGraph");
const FuelGraph = document.getElementById("FuelGraph");

let StrokeChart;
let SpeedChart;
let FuelChart;
let StrokeTime = [];
let StrokeForce = [];
let SpeedData = [];
let FuelData = [];
let CurrentTime = 1;
let LastUpdate = 0;
const UpdateInterval = 100;

function InitChart() {
    StrokeChart = new Chart(StrokeGraph, {
        type: "line",
        data: {
            labels: StrokeTime,
            datasets: [{
                fill: false,
                lineTension: 0.3,
                backgroundColor: "transparent",
                borderColor: "rgb(155, 155, 55)",
                data: StrokeForce
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 100,
                easing: 'easeInOutQuad'
            },
            legend: { display: false },
            tooltips: { enabled: false },
            scales: {
                xAxes: [{ display: false }],
                yAxes: [{ display: false }]
            }
        }
    });

    SpeedChart = new Chart(SpeedGraph, {
        type: "line",
        data: {
            labels: StrokeTime,
            datasets: [{
                fill: false,
                lineTension: 0.3,
                backgroundColor: "transparent",
                borderColor: "blue",
                data: SpeedData
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 100,
                easing: 'easeInOutQuad'
            },
            legend: { display: false },
            tooltips: { enabled: false },
            scales: {
                xAxes: [{ display: false }],
                yAxes: [{ display: false }]
            }
        }
    });

    FuelChart = new Chart(FuelGraph, {
        type: "line",
        data: {
            labels: StrokeTime,
            datasets: [{
                fill: false,
                lineTension: 0.3,
                backgroundColor: "transparent",
                borderColor: "green",
                data: FuelData
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 100,
                easing: 'easeInOutQuad'
            },
            legend: { display: false },
            tooltips: { enabled: false },
            scales: {
                xAxes: [{ display: false }],
                yAxes: [{ display: false }]
            }
        }
    });
}

function Update(timestamp) {
    if (timestamp - LastUpdate >= UpdateInterval) {
        const Rpm = parseInt(document.body.getAttribute("RPM")) || 0;
        const Fuel = parseFloat(document.body.getAttribute("FUEL")) || 0;
        const Speed = window.Speed || 0;

        StrokeTime.push(CurrentTime);
        StrokeForce.push(Rpm);
        SpeedData.push(Speed);
        FuelData.push(Fuel);
        CurrentTime++;

        if (StrokeTime.length > 0 && (CurrentTime - StrokeTime[0] > 150)) {
            StrokeTime.shift();
            StrokeForce.shift();
            SpeedData.shift();
            FuelData.shift();
        }

        StrokeChart.data.labels = StrokeTime;
        StrokeChart.data.datasets[0].data = StrokeForce;
        StrokeChart.update();

        SpeedChart.data.labels = StrokeTime;
        SpeedChart.data.datasets[0].data = SpeedData;
        SpeedChart.update();

        FuelChart.data.labels = StrokeTime;
        FuelChart.data.datasets[0].data = FuelData;
        FuelChart.update();

        LastUpdate = timestamp;
    }

    requestAnimationFrame(Update);
}

InitChart();
requestAnimationFrame(Update);