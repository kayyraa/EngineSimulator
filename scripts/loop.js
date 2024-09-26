const RPMDIAL = document.getElementById("RPMDIAL");

function Loop() {
    RPMDIAL.setAttribute("value", document.body.getAttribute("RPM"));
    RPMDIAL.setAttribute("max", document.body.getAttribute("RED"));

    requestAnimationFrame(Loop);
}

Loop();