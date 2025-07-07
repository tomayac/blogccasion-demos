if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
  .then(reg => {
    console.log(`Service Worker registered for scope ${reg.scope}.`)
    // Fight the aggressive prefetcher
    document.getElementById('img').src = 'jake.jpg';
    document.getElementById('iframe').src = 'iframe.html';
    document.getElementById('video').src = 'devstories.mp4';
    document.getElementById('video').poster= 'poster.png';
    document.getElementById('track').src = 'devstories-en.vtt';
    document.getElementById('audio').src = 'viper.mp3';
  })
  .catch(err => console.error(err.message));

  navigator.serviceWorker.onmessage = (event) => {
    document.getElementById('messages').innerHTML += `<li>${event.data.message}</li>`;
  };
}