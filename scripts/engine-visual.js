const ReloadButton = document.getElementById("ReloadButton");
const EngineStats = document.getElementById("EngineLabel");

const StartEngineButton = document.getElementById("StartEngineButton");

const LoadButton = document.getElementById("LoadButton");

var Pistons = [];

export function GenerateEngine(Cylinders) {
    const EngineVisual = document.getElementById("EngineVisual");
    EngineVisual.innerHTML = "";

    for (let Index = 0; Index < Cylinders; Index++) {
        const Piston = document.createElement("div");
        Piston.innerHTML = Index + 1;
        Piston.id = `P${Index + 1}`;
        EngineVisual.appendChild(Piston);

        Pistons.push(Piston);
    }
}

export function SetPistons(NewPistons) {
    Pistons = NewPistons;
}

function LoadEngine() {
    Pistons = [];

    const Cylinders = parseInt(document.body.getAttribute("CYL")) || 0;
    const PistonWidth = parseInt(document.body.getAttribute("PISW")) || 1;
    const PistonHeight = parseInt(document.body.getAttribute("PISH")) || 1;

    const PistonRadius = PistonWidth / 2;
    const PistonVolume = Math.PI * Math.pow(PistonRadius, 2) * PistonHeight;
    const Liters = (Cylinders * PistonVolume) / 1000;

    window.EngineStats = {
        Cylinders: Cylinders,
        PR: PistonRadius,
        PV: PistonVolume,
        Liters: Liters
    };
    EngineStats.innerHTML = `Inline ${Cylinders}, ${Math.abs(Liters).toFixed(1)}L`;

    document.body.setAttribute("FUEL", "100");

    GenerateEngine(Cylinders);
}

StartEngineButton.addEventListener("click", () => {
    document.body.setAttribute("ON", document.body.getAttribute("ON") !== "true" ? "true" : "false");
    var Timing = 0;

    if (document.body.getAttribute("ON") === "true") {
        function Loop() {
            if (document.body.getAttribute("ON") !== "true") return;

            const FUEL = parseFloat(document.body.getAttribute("FUEL"));

            const RPM = Math.min(parseInt(document.body.getAttribute("RPM")) + 5, parseInt(document.body.getAttribute("RED")));
            const RED = parseInt(document.body.getAttribute("RED"));

            if (FUEL <= 0) {
                document.body.setAttribute("ON", "false");
                return;
            }

            const Piston = Pistons[Timing];
            if (Piston) {
                Piston.style.opacity = "1";
            
                Pistons.forEach(OtherPiston => {
                    if (OtherPiston !== Piston) {
                        OtherPiston.style.opacity = "0.25";
                    }
                });
            }
    
            Timing++;
            if (Timing >= Pistons.length) {
                Timing = 0;
            }
    
            const Delay = Math.max(125 - (RPM / RED) * RED, 50);
            setTimeout(() => {
                Loop();
            }, Delay);
        }

        Loop();
    } else {
        Pistons.forEach(OtherPiston => {
            OtherPiston.style.opacity = "0.25";
        });
    }
});

LoadEngine();

ReloadButton.addEventListener("click", function() {
    LoadEngine();
});

LoadButton.addEventListener("click", function() {
    LoadEngine();
});