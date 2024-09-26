const ThrottleUpButton = document.getElementById("ThrottleUpButton");
const ThrottleDownButton = document.getElementById("ThrottleDownButton");

document.addEventListener("keypress", (Event) => {
    if (Event.key.toLowerCase() === "w") {
        document.body.setAttribute("THR", 15);
    } else if (Event.key.toLowerCase() === "e") {
        document.body.setAttribute("THR", 35);
    } else if (Event.key.toLowerCase() === "r") {
        document.body.setAttribute("THR", 50);
    }
});

document.addEventListener("keyup", (Event) => {
    const Key = Event.key.toLowerCase();
    if (Key === "w" || Key === "e" || Key === "r") {
        document.body.setAttribute("THR", 0);
    }
});

ThrottleUpButton.addEventListener("click", () => {
    const CurrentThrottle = parseFloat(document.body.getAttribute("THR"));
    const NewThrottle = Math.min(Math.max(CurrentThrottle + 5, 0), 100);
    document.body.setAttribute("THR", NewThrottle);
});

ThrottleDownButton.addEventListener("click", () => {
    const CurrentThrottle = parseFloat(document.body.getAttribute("THR"));
    const NewThrottle = Math.min(Math.max(CurrentThrottle - 5, 0), 100);
    document.body.setAttribute("THR", NewThrottle);
});