// Enforce https
if (location.protocol !== 'https:') {
 location.protocol = 'https:';
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
  .then(reg => {
    console.log(`Service Worker registered for scope ${reg.scope}.`)
    // Fight the aggressive prefetcher    
    document.getElementById('img').src = 'https://cdn.glitch.com/39a33509-f87b-4b7c-b649-95e32fc4ca6b%2Fjake.jpg?1534258068838'; 
    document.getElementById('iframe').src = '/iframe.html';
    document.getElementById('video').src = 'https://cdn.glitch.com/39a33509-f87b-4b7c-b649-95e32fc4ca6b%2Fdevstories.mp4?1534321981446';
    document.getElementById('video').poster= 'https://cdn.glitch.com/39a33509-f87b-4b7c-b649-95e32fc4ca6b%2Fposter.png?1534321980123';
    document.getElementById('track').src = 'https://cdn.glitch.com/39a33509-f87b-4b7c-b649-95e32fc4ca6b%2Fdevstories-en.vtt?1534321979833';
    document.getElementById('audio').src = 'https://cdn.glitch.com/39a33509-f87b-4b7c-b649-95e32fc4ca6b%2Fviper.mp3?1534336614893';
  })
  .catch(err => console.error(err));
  
  navigator.serviceWorker.onmessage = (event) => {
    document.getElementById('messages').innerHTML += `<li>${event.data.message}</li>`;
  };     
}