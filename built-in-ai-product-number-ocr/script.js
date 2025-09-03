const button = document.querySelector('button');
const progress = document.querySelector('progress');
const output = document.querySelector('output');
const image = document.querySelector('img');

const createSession = async (options = {}) => {
  progress.hidden = true;
  progress.value = 0;
  try {
    if (!('LanguageModel' in self)) {
      throw new Error('LanguageModel is not supported.');
    }
    const availability = await LanguageModel.availability();
    if (availability === 'unavailable') {
      throw new Error('LanguageModel is not available.');
    }
    let modelNewlyDownloaded = false;
    if (availability !== 'available') {
      modelNewlyDownloaded = true;
      progress.hidden = false;
    }
    console.log(`LanguageModel is ${availability}.`);
    const session = await LanguageModel.create({
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Downloaded ${e.loaded * 100}%.`);
          progress.value = e.loaded;
          if (modelNewlyDownloaded && e.loaded === 1) {
            // The model was newly downloaded and needs to be extracted
            // and loaded into memory, so show the undetermined state.
            progress.removeAttribute('value');
          }
        });
      },
      ...options,
    });
    return session;
  } catch (error) {
    throw error;
  } finally {
    progress.hidden = true;
    progress.value = 0;
  }
};

button.addEventListener('click', async () => {
  output.textContent = 'Analyzing photo…';
  try {
    const session = await createSession({
      expectedInputs: [{ type: 'text', languages: ['en'] }, { type: 'image' }],
      expectedOutputs: [{ type: 'text', languages: ['en'] }],
      initialPrompts: [
        {
          role: 'system',
          content:
            'Your task is to identify product numbers from photos of identification plates.',
        },
      ],
    });
    const stream = session.promptStreaming(
      [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              value:
                'Extract the product number from this identification plate. It has nine digits and appears after the text "Prod.No.".',
            },
            { type: 'image', value: image },
          ],
        },
      ],
      {
        responseConstraint: /\d{9}/,
      }
    );
    let firstChunk = true;
    for await (const chunk of stream) {
      if (firstChunk) {
        firstChunk = false;
        output.textContent = '';
      }
      output.append(chunk);
    }
  } catch (error) {
    output.textContent = error.message;
    console.error(error.name, error.message);
  }
});
