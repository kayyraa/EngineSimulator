Array.from(document.getElementsByTagName("dial")).forEach(Dial => {
    const Suffix = Dial.getAttribute("prefix");

    const Value = parseFloat(Dial.getAttribute("value"));
    const Percentage = Dial.hasAttribute("percentage");

    const Needle = document.createElement("img");
    Needle.src = "../images/Needle.svg";
    Needle.style.width = "100%";
    Needle.style.height = "100%";
    Needle.draggable = false;
    Needle.style.transition = "transform 0.25s ease";
    Dial.appendChild(Needle);

    const ValueLabel = document.createElement("div");
    ValueLabel.innerHTML = `${Value} ${Suffix}`;
    ValueLabel.style.width = "100%";
    ValueLabel.style.height = "25%";
    ValueLabel.style.textWrap = "nowrap";
    ValueLabel.style.fontSize = "1em";
    Dial.appendChild(ValueLabel);

    function Loop() {
        const MaxValue = parseFloat(Dial.getAttribute("max"));
        const MinValue = parseFloat(Dial.getAttribute("min"));
        const Value = Math.min(Math.max(parseFloat(Dial.getAttribute("value")), MinValue), MaxValue);

        const DegreesPerValue = 270 / (MaxValue - MinValue);
        const DegreesForValue = -45 + (Value - MinValue) * DegreesPerValue;
        Needle.style.transform = `rotate(${DegreesForValue}deg)`;

        if (Percentage) {
            ValueLabel.innerHTML = `${Value.toFixed(1)} ${Suffix}<br>${((Value / MaxValue) * 100).toFixed(1)}%`;
        } else {
            ValueLabel.innerHTML = `${Value.toFixed(1)} ${Suffix}`;
        }        

        requestAnimationFrame(Loop);
    }

    Loop();
});