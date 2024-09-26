import { SetPistons } from "./engine-visual.js";

const EngineVisual = document.getElementById("EngineVisual");
const SaveButton = document.getElementById("SaveButton");
const LoadButton = document.getElementById("LoadButton");

const EngineStats = document.getElementById("EngineLabel");

export function SaveToFile() {
    const DataString = JSON.stringify([
        {
            Cylinders: parseInt(document.body.getAttribute("CYL")),
            PistonWidth: parseInt(document.body.getAttribute("PISW")),
            PistonHeight: parseInt(document.body.getAttribute("PISH")),
            Idle: parseInt(document.body.getAttribute("IDLE")) || 500,
            Redline: parseInt(document.body.getAttribute("RED")) || 6000,
    
            Transmission: parseInt(document.body.getAttribute("TRANS"))
        }
    ]);

    const BlobObject = new Blob([DataString], { type: "application/json" });
    const Url = URL.createObjectURL(BlobObject);
    const A = document.createElement("a");
    A.href = Url;
    A.download = "Engine.json";
    
    document.body.appendChild(A);
    A.click();
    
    document.body.removeChild(A);
    URL.revokeObjectURL(Url);
}

function LoadFromFile() {
    const Input = document.createElement("input");
    Input.type = "file";
    Input.accept = ".json";

    Input.addEventListener("change", (event) => {
        const File = event.target.files[0];
        if (File) {
            const Reader = new FileReader();
            Reader.onload = (e) => {
                EngineVisual.innerHTML = "";

                const EngineData = JSON.parse(e.target.result)[0];

                const PistonRadius = EngineData.PistonWidth / 2;
                const PistonVolume = Math.PI * Math.pow(PistonRadius, 2) * EngineData.PistonHeight;
                const Liters = (EngineData.Cylinders * PistonVolume) / 1000;
                window.EngineStats = {PR: PistonRadius, PV: PistonVolume, Liters: Liters};
                EngineStats.innerHTML = `Inline ${EngineData.Cylinders}, ${Math.abs(Liters).toFixed(1)}L`;

                const Pistons = [];
                for (let Index = 0; Index < EngineData.Cylinders; Index++) {
                    const Piston = document.createElement("div");
                    Piston.innerHTML = Index + 1;
                    Piston.id = `P${Index + 1}`;
                    EngineVisual.appendChild(Piston);
                    Pistons.push(Piston);
                }
                SetPistons(Pistons);
                document.body.setAttribute("CYL", EngineData.Cylinders);
                document.body.setAttribute("PISW", EngineData.PistonWidth);
                document.body.setAttribute("PISH", EngineData.PistonHeight);
                document.body.setAttribute("IDLE", EngineData.Idle);
                document.body.setAttribute("RED", EngineData.Redline);
                document.body.setAttribute("TRANS", EngineData.Transmission);
            };
            Reader.readAsText(File);
        }
    });

    Input.click(); 
}

SaveButton.addEventListener("click", SaveToFile);
LoadButton.addEventListener("click", LoadFromFile);