const link = document.querySelector('link[rel="icon"]');
const fieldset = document.querySelector('fieldset');
const css = document.querySelector('#css');
const js = document.querySelector('#js');
const smil = document.querySelector('#smil');

const originalTitle = document.querySelector('title').textContent;

fieldset.addEventListener('change', (e) => {
  if (e.target.nodeName !== 'INPUT') {
    return;
  }
  const id = e.target.id;
  link.href = `icon_${id}.svg`;
  document.title = `${originalTitle} (${id.toUpperCase()})`;
});
