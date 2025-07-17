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
    { freq: 261.63, dur: 1.125 },  // DO4
    { freq: 246.94, dur: 0.375 },  // SI3
    { freq: 220.00, dur: 0.75 },   // LA3
    { freq: 196.00, dur: 0.75 },   // SOL3
    { freq: 329.63, dur: 0.75 },   // MI4
    { freq: 261.63, dur: 1.125 },  // DO4
    { freq: 246.94, dur: 1.5 },    // SI3

    { freq: 220.00, dur: 0.75 },   // LA3
    { freq: 196.00, dur: 0.75 },   // SOL3
    { freq: 329.63, dur: 0.75 },   // MI4
    { freq: 261.63, dur: 0.75 },   // DO4
    { freq: 246.94, dur: 0.75 },   // SI3
    { freq: 220.00, dur: 1.125 },  // LA3

    { freq: 196.00, dur: 0.75 },   // SOL3
    { freq: 329.63, dur: 0.75 },   // MI4
    { freq: 196.00, dur: 0.75 },   // SOL3
    { freq: 261.63, dur: 0.75 },   // DO4
    { freq: 2
