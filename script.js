const tapa = document.querySelector('.tapa');
const mensaje = document.getElementById('mensaje');
const boton = document.getElementById('play');

const context = new (window.AudioContext || window.webkitAudioContext)();

boton.addEventListener('click', () => {
  tapa.style.transform = 'rotateX(-90deg)';
  mensaje.classList.remove('oculto');
  mensaje.classList.add('visible');

  if (context.state === 'suspended') {
    context.resume().then(playMelody);
  } else {
    playMelody();
  }

  boton.disabled = true;
});

function playMelody() {
  const notes = [
    // Intro de La Vie en Rose (Louis Armstrong)
    { freq: 440, dur: 0.7 },  // A4
    { freq: 493.88, dur: 0.7 }, // B4
    { freq: 523.25, dur: 1.2 }, // C5
    { freq: 440, dur: 0.6 }, 
    { freq: 523.25, dur: 0.6 }, 
    { freq: 587.33, dur: 1.1 }, // D5
    { freq: 659.25, dur: 0.7 }, // E5
    { freq: 587.33, dur: 0.7 }, 
    { freq: 523.25, dur: 1.2 },
    { freq: 493.88, dur: 0.8 },
    { freq: 440, dur: 1.2 },
    { freq: 392.00, dur: 1.2 }, // G4
    { freq: 440.00, dur: 1.5 }
  ];

  let time = context.currentTime;
  notes.forEach(note => {
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.connect(gain);
    gain.connect(context.destination);

    osc.frequency.setValueAtTime(note.freq, time);
    osc.type = 'sawtooth'; // simula timbre de trompeta

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.2, time + 0.05); // fade in
    gain.gain.linearRampToValueAtTime(0, time + note.dur); // fade out

    osc.start(time);
    osc.stop(time + note.dur + 0.1);

    time += note.dur + 0.1;
  });
}
