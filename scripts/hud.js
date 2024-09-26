const StartEngineButton = document.getElementById("StartEngineButton");
const ECOLABEL = document.getElementById("ECOLABEL");

const ThrottleValve = document.getElementById("ThrottleValve");

const Random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function Loop() {
    const FUEL = parseFloat(document.body.getAttribute("FUEL"));
    const RPM = parseFloat(document.body.getAttribute("RPM"));
    const RED = parseFloat(document.body.getAttribute("RED"));
    const THR = parseFloat(document.body.getAttribute("THR"));
    const IDLE = parseFloat(document.body.getAttribute("IDLE"));

    if (document.body.getAttribute("ON") === "true") {
        if (THR > 0) {
            const NewRPM = RPM + (THR * 2);
            document.body.setAttribute("RPM", NewRPM);
        } else {
            if (RPM > IDLE) {
                const NewRPM = RPM - 25;
                document.body.setAttribute("RPM", NewRPM);
            } else {
                const NewRPM = RPM + 25;
                document.body.setAttribute("RPM", NewRPM);
            }
        }

        if (RPM > RED) {
            const NewRPM = RPM - 300;
            document.body.setAttribute("RPM", NewRPM);
        }
    } else {
        if (RPM > 0) {
            const NewRPM = RPM - 5;
            document.body.setAttribute("RPM", NewRPM);
        }
    }

    const Consumption = document.body.getAttribute("ON") === "true" 
        ? (window.EngineStats.Liters / window.EngineStats.PV) + ((RPM / 200) / IDLE) 
        : 0;

    const NewFuel = FUEL - Consumption;
    document.body.setAttribute("FUEL", Math.max(NewFuel, 0));
    
    ECOLABEL.innerHTML = `${(Consumption * window.EngineStats.Liters).toFixed(2)} L/s`;
    
    FUELDIAL.setAttribute("value", NewFuel);

    ThrottleValve.style.transform = `rotate(${(THR / 100) * 90}deg)`;
    
    setTimeout(Loop, 125);
}

Loop();