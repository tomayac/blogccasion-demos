document.getElementById('xhr').addEventListener('click', _ => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', _ => {
    console.log(xhr.responseText);
  });
  xhr.open('GET', '/xhr.html');
  xhr.send();
});

document.getElementById('fetch').addEventListener('click', _ => {
  fetch('/fetch.html')
  .then(response => response.text())
  .then(text => console.log(text));
});
