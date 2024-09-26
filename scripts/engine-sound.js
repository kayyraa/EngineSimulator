const StartEngineButton = document.getElementById("StartEngineButton");

async function StartEngineSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const Context = new AudioContext();

    await Context.resume();

    const Oscillator1 = Context.createOscillator();
    const Oscillator2 = Context.createOscillator();
    const Gain = Context.createGain();
    Gain.gain.setValueAtTime(5, Context.currentTime);

    Oscillator1.type = 'sine'; 
    Oscillator2.type = 'sine'; 
    Oscillator1.connect(Gain);
    Oscillator2.connect(Gain);
    Gain.connect(Context.destination);

    const NoiseGain = Context.createGain();
    NoiseGain.gain.setValueAtTime(0.125, Context.currentTime);
    NoiseGain.connect(Context.destination);

    Oscillator1.start();
    Oscillator2.start();

    const LowpassFilter = Context.createBiquadFilter();
    LowpassFilter.type = 'lowpass';
    LowpassFilter.frequency.setValueAtTime(1500, Context.currentTime);
    Gain.connect(LowpassFilter);
    LowpassFilter.connect(Context.destination);

    const HighpassFilter = Context.createBiquadFilter();
    HighpassFilter.type = 'highpass';
    HighpassFilter.frequency.setValueAtTime(1500, Context.currentTime);
    Gain.connect(HighpassFilter);
    HighpassFilter.connect(Context.destination);

    const CreateNoiseBuffer = () => {
        const duration = 2;
        const noiseBuffer = Context.createBuffer(1, Context.sampleRate * duration, Context.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        return noiseBuffer;
    };

    const PlayNoise = () => {
        const Noise = Context.createBufferSource();
        Noise.buffer = CreateNoiseBuffer();
        Noise.connect(NoiseGain);
        Noise.start(0);
        Noise.stop(Context.currentTime + 2);
        Noise.onended = PlayNoise;
    };

    const UpdateSound = () => {
        const On = document.body.getAttribute("ON") === "true";

        if (On) {
            const RPM = parseFloat(document.body.getAttribute("RPM"));
            Oscillator1.frequency.setValueAtTime(RPM / 8, Context.currentTime);
            Oscillator2.frequency.setValueAtTime(RPM / 14, Context.currentTime);
            Gain.gain.setValueAtTime(1 + (RPM / 1000), Context.currentTime);
            HighpassFilter.frequency.setValueAtTime(1500 - (RPM / 10), Context.currentTime);
            LowpassFilter.frequency.setValueAtTime(500 - (RPM / 10), Context.currentTime);
            requestAnimationFrame(UpdateSound);
        } else {
            const RPM = parseFloat(document.body.getAttribute("RPM"));
            Oscillator1.stop();
            Oscillator2.stop();
            NoiseGain.gain.setValueAtTime(0, Context.currentTime);
            HighpassFilter.frequency.setValueAtTime(1500 - (RPM / 10), Context.currentTime);
            LowpassFilter.frequency.setValueAtTime(500 - (RPM / 10), Context.currentTime);
            return;
        }
    };

    PlayNoise();
    UpdateSound();
}

let Start = false;
StartEngineButton.addEventListener('click', async () => {
    if (!Start) {
        StartEngineSound();
        Start = true;
    }
});