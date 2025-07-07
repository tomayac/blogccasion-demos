if (window.location.protocol !== 'https:') {
  window.location.protocol = 'https:';
}

const div = document.querySelector('div');
const form = document.querySelector('form');
const radios = Array.from(form.querySelectorAll('input[type="radio"]'));
const ranges = Array.from(form.querySelectorAll('input[type="range"]'));
const spans = Array.from(form.querySelectorAll('span'));
const root = document.documentElement;
const section = document.querySelector('section');
const a = document.querySelector('a');

const images = [];

const submitURLs = [
  () => `https://docs.google.com/forms/d/e/1FAIpQLScN_l1hWyzH2A6r2HEmO2TYefqShk8e6MyMuEnL3oz41zgYGA/viewform?usp=pp_url&entry.1313414293=No+Filter`,
  () => `https://docs.google.com/forms/d/e/1FAIpQLScN_l1hWyzH2A6r2HEmO2TYefqShk8e6MyMuEnL3oz41zgYGA/viewform?usp=pp_url&entry.1313414293=Only+Grayscale&entry.824006088=${ranges[0].value}`,
  () => `https://docs.google.com/forms/d/e/1FAIpQLScN_l1hWyzH2A6r2HEmO2TYefqShk8e6MyMuEnL3oz41zgYGA/viewform?usp=pp_url&entry.1313414293=Only+Invert&entry.2135571458=${ranges[1].value}`,
  () => `https://docs.google.com/forms/d/e/1FAIpQLScN_l1hWyzH2A6r2HEmO2TYefqShk8e6MyMuEnL3oz41zgYGA/viewform?usp=pp_url&entry.1313414293=Grayscale+and+Invert&entry.1723468956=${ranges[0].value}&entry.2088631132=${ranges[1].value}`,
];

for (let i = 0; i < 30; i++) {
  const figure = document.createElement('figure');
  const img = new Image();  
  const figcaption = document.createElement('figcaption');  
  figcaption.textContent = `This is the amazing photo with the index ${i}`;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  images[i] = img;
  img.intrinsicsize = '200x200';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.src = `https://picsum.photos/200?random=${i}`;
  div.appendChild(figure);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

const onSubmit = () => {
  ranges.forEach((range, i) => {
    root.style.setProperty(`--${range.id}`, `${range.value}%`);
    spans[i].textContent = `${range.value}%`;
  }); 
  let selected;
  if ((selected = radios.filter((input, i) => {    
    if (input.checked) {
      a.href = submitURLs[i]();
      div.style.display = 'grid';
      section.style.display = 'block';
      if (input.id === 'regular') {
        ranges[0].disabled = true;        
        ranges[1].disabled = true;        
      } else if (input.id === 'grayscale') {
        ranges[0].disabled = false;        
        ranges[1].disabled = true;        
      } else if (input.id === 'invert')  {
        ranges[0].disabled = true;        
        ranges[1].disabled = false;        
      } else {
        ranges[0].disabled = false;        
        ranges[1].disabled = false;                
      }
    }
    return input.checked
  })) && selected.length) {
    selected = selected[0].id
  } else {
    selected = '';
  };
  images.map((img) => {
    img.className = selected;
  });
};
onSubmit();

ranges.concat(radios).forEach((input) => {
  input.addEventListener('input', onSubmit);
});
