const button = document.getElementById('button');
const audio = document.getElementById('audio');

function toggleButton() {
  button.disabled = !button.disabled;
}

function speak(joke) {
  VoiceRSS.speech({
    key: 'e2d71b05f9fc40eba0b16fe63d5d0fbe',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

async function getJokes() {
  const url = 'https://sv443.net/jokeapi/v2/joke/Programming';
  let joke = '';
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    speak(joke);
    toggleButton();
  } catch (error) {
    console.log('error: ', error);
  }
}

button.addEventListener('click', getJokes);
audio.addEventListener('ended', toggleButton);
