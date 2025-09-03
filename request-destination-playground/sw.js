self.addEventListener('install', (installEvent) => {
  return self.skipWaiting();
});

self.addEventListener('activate', (activateEvent) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (fetchEvent) => {
  const request = fetchEvent.request;
  const url = new URL(request.url);
  const destination = request.destination;
  let message;
  if (destination) {
    let icon = '';
    switch (destination) {
      case 'audio':
        icon = '\uD83D\uDD08';
        break;
      case 'audioworklet':
        icon = '\uD83D\uDCE2';
        break;
      case 'document':
        icon = '\uD83D\uDCC4';
        break;
      case 'embed':
        icon = '\uD83D\uDECF';
        break;
      case 'font':
        icon = '\uD83D\uDD24';
        break;
      case 'image':
        icon = '\uD83D\uDDBC';
        break;
      case 'manifest':
        icon = '\uD83D\uDCC3';
        break;
      case 'object':
        icon = '\uD83D\uDCCE';
        break;
      case 'paintworklet':
        icon = '\uD83D\uDC68\u200D\uD83C\uDFA8';
        break;
      case 'report':
        icon = '\uD83D\uDCCA';
        break;
      case 'script':
        icon = '\uD83D\uDCBB';
        break;
      case 'serviceworker':
        icon = '\uD83D\uDC77\u200D\u2642\uFE0F';
        break;
      case 'sharedworker':
        icon = '\uD83E\uDD1D';
        break;
      case 'style':
        icon = '\uD83C\uDFA8';
        break;
      case 'track':
        icon = '\uD83D\uDCDD';
        break;
      case 'video':
        icon = '\uD83D\uDCF9';
        break;
      case 'worker':
        icon = '\u26D1';
        break;
      case 'xslt':
        icon = '\uD83D\uDCD1';
        break;
    }
    message = `${icon} Request for <a href="${url}">${url}</a> had the type <strong>${destination}</strong>.`;
  } else {
    message = `\u26D4\uFE0F Request for <a href="${url}">${url}</a> did not have a type.`;
  }
  messageClients(message);
  console.log(message);
  return fetch(request, { mode: 'no-cors' });
});

const messageClients = (message) => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        command: 'broadcast',
        message: message,
      });
    });
  });
};
