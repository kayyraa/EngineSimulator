const GearUpButton = document.getElementById("GearUpButton");
const GearDownButton = document.getElementById("GearDownButton");

const SpeedDial = document.getElementById("SPDDIAL");

const MaxGear = parseInt(document.body.getAttribute("TRANS"));

GearUpButton.addEventListener("click", () => {
    const Gear = parseInt(document.body.getAttribute("GEAR"));

    if (Gear < MaxGear) {
        const Rpm = parseInt(document.body.getAttribute("RPM"));
        document.body.setAttribute("RPM", Rpm - (Rpm / MaxGear + Gear));
        document.body.setAttribute("GEAR", Gear + 1);
    }
});

GearDownButton.addEventListener("click", () => {
    const Gear = parseInt(document.body.getAttribute("GEAR"));

    if (Gear > 0) {
        const Rpm = parseInt(document.body.getAttribute("RPM"));
        document.body.setAttribute("RPM", Rpm + (Rpm / MaxGear));
        document.body.setAttribute("GEAR", Gear - 1);
    }
});

var Speed = 0;
function Loop() {
    const Gear = parseInt(document.body.getAttribute("GEAR"));
    const Rpm = parseInt(document.body.getAttribute("RPM"));

    if (Gear > 0) {
        const NewRPM = Rpm - (Rpm / (Gear * 100)) / 1000;
        document.body.setAttribute("RPM", NewRPM);
        Speed += (Rpm / (Gear * 25)) / 1000;
    } else {
        if (Speed > 0) {
            Speed -= 0.25;
        }
    }
    window.Speed = Speed;
    SpeedDial.setAttribute("value", Speed);

    if (Speed > SpeedDial.getAttribute("max")) {
        SpeedDial.setAttribute("max", Speed);
    }

    requestAnimationFrame(Loop);
}

Loop();