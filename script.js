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
    { freq: 261.63, dur: 0.5625 },  // DO4
    { freq: 246.94, dur: 0.1875 },  // SI3
    { freq: 220.00, dur: 0.375 },   // LA3
    { freq: 196.00, dur: 0.375 },   // SOL3
    { freq: 329.63, dur: 0.375 },   // MI4
    { freq: 261.63, dur: 0.5625 },  // DO4
    { freq: 246.94, dur: 0.75 },    // SI3

    { freq: 220.00, dur: 0.375 },   // LA3
    { freq: 196.00, dur: 0.375 },   // SOL3
    { freq: 329.63, dur: 0.375 },   // MI4
    { freq: 261.63, dur: 0.375 },   // DO4
    { freq: 246.94, dur: 0.375 },   // SI3
    { freq: 220.00, dur: 0.5625 },  // LA3

    { freq: 196.00, dur: 0.375 },   // SOL3
    { freq: 329.63, dur: 0.375 },   // MI4
    { freq: 196.00, dur: 0.375 },   // SOL3
    { freq: 261.63, dur: 0.375 },   // DO4
    { freq: 246.94, dur: 0.375 },   // SI3
    { freq: 220.00, dur: 0.5625 }   // LA3
  ];

  let time = context.currentTime;
  notes.forEach(note => {
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = 'sawtooth'; // trompeta
    osc.frequency.setValueAtTime(note.freq, time);

    osc.connect(gain);
    gain.connect(context.destination);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.2, time + 0.02); // entrada más rápida
    gain.gain.linearRampToValueAtTime(0, time + note.dur); // fade out

    osc.start(time);
    osc.stop(time + note.dur);

    time += note.dur; // sin pausa
  });
}
