const GearUpButton = document.getElementById("GearUpButton");
const GearDownButton = document.getElementById("GearDownButton");

const SpeedDial = document.getElementById("SPDDIAL");

const MaxGear = parseInt(document.body.getAttribute("TRANS"));

GearUpButton.addEventListener("click", () => {
    const Gear = parseInt(document.body.getAttribute("GEAR"));

    if (Gear < MaxGear) {
        const Rpm = parseInt(document.body.getAttribute("RPM"));
        document.body.setAttribute("RPM", Rpm - (Rpm / MaxGear));
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
        Speed += (Rpm / (Gear * 10)) / 1000;
    } else {
        if (Speed > 0) {
            Speed -= 0.125;
        }
    }
    SpeedDial.setAttribute("value", Speed);

    requestAnimationFrame(Loop);
}

Loop();