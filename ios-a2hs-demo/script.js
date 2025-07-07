const init = () => {
  fetch('manifest.webmanifest')
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .catch((fetchError) => console.log(fetchError))
  .then((manifest) => {
    const fragment = document.createDocumentFragment();
    const p = document.createElement('p');
    p.innerHTML = `The app should be called <span>${manifest.short_name}</span> (short)
        or <span>${manifest.name}</span> (long), launch in <span>${manifest.display}</span> mode,
        have the start URL <span>${manifest.start_url}</span>
        (currently: <span>${document.location.pathname + document.location.hash}</span>),
        have a scope of <span>${manifest.scope}</span> (<a href="/in-scope/index.html">navigate in-scope</a>,
        <a href="https://glitch.com/edit/#!/ios-a2hs-demo">navigate out-scope</a>),
        and use one of the following <span>icons</span>:`;
    fragment.appendChild(p);
    manifest.icons.forEach((icon) => {
      let img = document.createElement('img');
      img.src = icon.src;
      fragment.appendChild(img);      
    });
    document.body.appendChild(fragment);
  });
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('serviceworker.js');
    });
  }
};

init();  