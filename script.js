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
    { freq: 392, dur: 0.5 }, { freq: 440, dur: 0.5 }, { freq: 494, dur: 0.6 }, { freq: 523, dur: 0.6 },
    { freq: 587, dur: 0.6 }, { freq: 659, dur: 0.6 },
    { freq: 698, dur: 0.4 }, { freq: 659, dur: 0.4 }, { freq: 587, dur: 0.5 }, { freq: 523, dur: 0.6 },
    { freq: 494, dur: 0.5 }, { freq: 440, dur: 1.0 }
  ];

  let time = context.currentTime;
  notes.forEach(note => {
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.connect(gain);
    gain.connect(context.destination);

    osc.frequency.value = note.freq;
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.2, time);
    osc.start(time);
    osc.stop(time + note.dur);

    time += note.dur + 0.05;
  });
}
