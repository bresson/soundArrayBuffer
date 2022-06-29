// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
// appDiv.innerHTML = `<h1>JS Starter</h1>`;

// https://stackoverflow.com/questions/69760600/how-to-cache-a-webaudio-object-properly
const btn = document.querySelector('button');
const context = new AudioContext();
// a GainNode to control the output volume of our audio
const volumeNode = context.createGain();
volumeNode.gain.value = 0.5; // from 0 to 1
volumeNode.connect(context.destination);

fetch('https://dl.dropboxusercontent.com/s/agepbh2agnduknz/camera.mp3')
  // get the resource as an ArrayBuffer
  .then((resp) => resp.arrayBuffer())
  // decode the Audio data from this resource
  .then((buffer) => context.decodeAudioData(buffer))
  // now we have our AudioBuffer object, ready to be played
  .then((audioBuffer) => {
    btn.onclick = (evt) => {
      // allowing an AudioContext to make noise
      // must be required from an user-gesture
      if (context.status === 'suspended') {
        context.resume();
      }
      // a very light player object
      const source = context.createBufferSource();
      // a simple pointer to the big AudioBuffer (no copy)
      source.buffer = audioBuffer;
      // connect to our volume node, itself connected to audio output
      source.connect(volumeNode);
      // start playing now
      source.start(0);
    };
    // now you can spam the button!
    btn.disabled = false;
  })
  .catch(console.error);
