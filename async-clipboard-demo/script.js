const svgButton = document.querySelector('#copy-svg');
const pngButton = document.querySelector('#copy-png');
const debug = document.querySelector('textarea');

const copy = async (img) => {
  const mimeType = img.dataset.mimeType;
  let text = null;
  if (mimeType === 'image/svg+xml') {
    text = await toSourceBlob(img);
  } else {
    text = new Blob([img.alt], { type: 'text/plain' });
  }
  const clipboardData = {
    'text/plain': text,
  };
  clipboardData['image/png'] = await toPNGBlob(img);
  if (mimeType !== 'image/png') {
    clipboardData[mimeType] = await toOriginBlob(img);
  }
  try {
    await navigator.clipboard.write([new ClipboardItem(clipboardData)]);
  } catch (err) {
    console.warn(err.name, err.message);
    if (err.name === 'NotAllowedError') {
      const disallowedMimeType = err.message.replace(
        /^.*? (\w+\/[^\s]+).*?$/,
        '$1'
      );
      delete clipboardData[disallowedMimeType];
      try {
        await navigator.clipboard.write([new ClipboardItem(clipboardData)]);
      } catch (err) {
        throw err;
      }
    }
  }
  console.log(clipboardData);
  debug.value = JSON.stringify(clipboardData, null, 2);
};

const toPNGBlob = async (img) => {
  const canvas = new OffscreenCanvas(img.naturalWidth, img.naturalHeight);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return await canvas.convertToBlob();
};

const toOriginBlob = async (img) => {
  const response = await fetch(img.src);
  return await response.blob();
};

const toSourceBlob = async (img) => {
  const response = await fetch(img.src);
  const source = await response.text();
  return new Blob([source], { type: 'text/plain' });
};

[svgButton, pngButton].map((button) =>
  button.addEventListener('click', (e) => {
    const img = e.target.previousElementSibling;
    copy(img);
  })
);

document.querySelectorAll('img').forEach((img) => {
  img.title = img.alt;
});
